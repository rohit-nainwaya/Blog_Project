let apiKey = '2db5bc75c33eb661cc482365062fa0e5';
let baseUrl = 'https://api.themoviedb.org/3/tv/top_rated';

// Function to map country codes to full country names
const countryCodes = {
    "US": "United States",
    "GB": "United Kingdom",
    "CA": "Canada",
    "IN": "India",
    "CN": "China",
    "KR": "South Korea",
    "ZA": "South Africa",
    "NL": "Netherlands",
    "JP": "Japan",
    "DE": "Germany",
    "ES": "Spain",
    "PT": "Portugal",
    "AU": "Australia",
    "PE": "Peru",
    "CO": "Colombia",
    "CL": "Chile",
    "HK": "Hong Kong",
    "FI": "Finland",
    "AR": "Argentina",
    "FR": "France",
    "IT": "Italy",
    "MX": "Mexico",
    "PL": "Poland",
    "BR": "Brazil",
    "TR": "Turkey",
    "PH": "Philippines"
};

function getCountryName(code) {
    return countryCodes[code] || code;
};

// Fetch a single page of top rated TV shows
async function getTopRatedTVShows(page = 1) {
    try {
        let res = await axios.get(`${baseUrl}?api_key=${apiKey}&page=${page}`);
        let results = res.data.results;
        return results;
    } catch (e) {
        console.error(`Error fetching top rated TV shows: ${e}`);
        return [];
    }
}

// Fetch and display a page of top rated TV shows
async function fetchTopRatedTVShows(page = 1) {
    let results = await getTopRatedTVShows(page);
    
    if (results.length === 0) {
        console.log('No results found.');
        return;
    }

    results.sort((a, b) => b.vote_average - a.vote_average); // Sort by rating
    
    let tvshow_card = document.querySelector('.tvshow_card');
    results.forEach(tvshow => {
        const tvCard = document.createElement('div');
        tvCard.className = 'tvCard card mb-3';
        tvCard.innerHTML = `
            <a href="#" class="tvshow-link" data-id="${tvshow.id}">
                <img data-src="https://image.tmdb.org/t/p/w500${tvshow.poster_path}" class="card-img-top lazyload" alt="${tvshow.name}">
                <div class="card-body">
                    <h5 class="card-title">${tvshow.name}</h5>
                    <p class="card-text">Rating: ${tvshow.vote_average}</p>
                    <p class="card-text">Country: ${tvshow.origin_country.map(getCountryName).join(', ')}</p>
                </div>
            </a>
        `;
        tvshow_card.appendChild(tvCard);
    });

    document.querySelectorAll('.tvshow-link').forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            let tvshowId = event.currentTarget.getAttribute('data-id');
            await showTVShowDetails(tvshowId);
        });
    });
}

// Fetch watch providers for a TV show
async function getWatchProviders(tvshowId) {
    try {
        let res = await axios.get(`https://api.themoviedb.org/3/tv/${tvshowId}/watch/providers?api_key=${apiKey}`);
        return res.data.results;
    } catch (e) {
        console.error(`Error fetching watch providers: ${e}`);
        return {};
    }
};

// Show TV show details
async function showTVShowDetails(tvshowId) {
    let url2 = `https://api.themoviedb.org/3/tv/${tvshowId}?api_key=${apiKey}&append_to_response=videos,credits`;
    try {
        let res = await axios.get(url2);
        let tvshow = res.data;
        
        document.getElementById('tvshowTitle').innerText = tvshow.name;
        document.getElementById('tvshowDescription').innerText = tvshow.overview;
        document.getElementById('ottLink').href = `https://www.themoviedb.org/tv/${tvshow.id}`;
        let trailer = tvshow.videos.results.find(video => video.type === "Trailer");
        document.getElementById('tvshowTrailer').src = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

        let castList = document.getElementById('castList');
        castList.innerHTML = '';
        tvshow.credits.cast.slice(0, 5).forEach(actor => {
            let castCard = document.createElement('div');
            castCard.className = 'cast-card';
            castCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" class="img-fluid" alt="${actor.name}">
                <p class="text-white">${actor.name}</p>
                <p class="text-muted">${actor.character}</p>
            `;
            castList.appendChild(castCard);
        });

        // Display watch providers
        let watchProviders = await getWatchProviders(tvshowId);
        let watchProvidersList = document.getElementById('watchProvidersList');
        watchProvidersList.innerHTML = '';
        if (watchProviders && watchProviders.IN && watchProviders.IN.flatrate) {
            let providers = watchProviders.IN.flatrate;
            if (providers.length > 0) {
                providers.forEach(provider => {
                    let listItem = document.createElement('li');
                    listItem.innerText = provider.provider_name;
                    watchProvidersList.appendChild(listItem);
                });
            } else {
                watchProvidersList.innerHTML = '<li>No providers available</li>';
            }
        } else {
            watchProvidersList.innerHTML = '<li>No providers information available</li>';
        }

        document.querySelector('.tvshow_card').classList.add('hidden');
        document.getElementById('tvshowDetails').classList.remove('hidden');
    } catch (e) {
        console.error(`Error showing TV show details: ${e}`);
    }
}

// Function to go back from TV show details view
function goBack() {
    document.getElementById('tvshowDetails').classList.add('hidden');
    document.querySelector('.tvshow_card').classList.remove('hidden');
}

// Infinite Scroll
let currentPage = 1;
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        currentPage++;
        fetchTopRatedTVShows(currentPage);
    }
});

// Initial load
fetchTopRatedTVShows();
