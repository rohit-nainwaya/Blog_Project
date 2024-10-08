let apiKey = '2db5bc75c33eb661cc482365062fa0e5';
let baseUrl = 'https://api.themoviedb.org/3/tv/on_the_air';
let scrollPosition = 0;

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
}

// Fetch a single page of TV shows currently airing
async function getOnTV(page = 1) {
    try {
        let res = await axios.get(`${baseUrl}?api_key=${apiKey}&page=${page}`);
        let results = res.data.results;
        return results;
    } catch (e) {
        console.error(`Error fetching TV shows on the air: ${e}`);
        return [];
    }
}

// Geolocation fallback for IP-based location detection
async function getCountryByIP() {
    try {
        let res = await axios.get('https://ipapi.co/json/');
        return res.data.country_code;
    } catch (e) {
        console.error('Error fetching IP location:', e);
        return 'US'; // Default to US if there's an error
    }
}

// Fetch and display a page of TV shows currently airing
async function fetchOnTVShows(page = 1) {
    let results = await getOnTV(page);
    
    if (results.length === 0) {
        console.log('No results found.');
        return;
    }

    let tvshow_card = document.querySelector('.tvshow_card');
    results.forEach(tvshow => {
        const tvCard = document.createElement('div');
        tvCard.className = 'tvCard card mb-3';
        const posterPath = tvshow.poster_path ? `https://image.tmdb.org/t/p/w500${tvshow.poster_path}` : '/assets/home_page/alt.jpg'; // Fallback image
        tvCard.innerHTML = `
            <a href="#" class="tvshow-link" data-id="${tvshow.id}">
                <img data-src="${posterPath}" class="card-img-top lazyload" alt="${tvshow.name}">
                <div class="card-body">
                    <h5 class="card-title">${tvshow.name}</h5>
                    <p class="card-text">Rating: ${tvshow.vote_average}</p>
                    <p class="card-text text-green">Country: ${tvshow.origin_country.map(getCountryName).join(', ')}</p>
                </div>
            </a>
        `;
        tvshow_card.appendChild(tvCard);
    });

    document.querySelectorAll('.tvshow-link').forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            scrollPosition = window.scrollY;
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
}

// Show TV show details
async function showTVShowDetails(tvshowId) {
    let url2 = `https://api.themoviedb.org/3/tv/${tvshowId}?api_key=${apiKey}&append_to_response=videos,credits`;
    try {
        let res = await axios.get(url2);
        let tvshow = res.data;
        
        document.getElementById('tvshowTitle').innerText = tvshow.name;
        document.getElementById('tvshowDescription').innerText = tvshow.overview;
        // Get user country
        let countryCode = await getCountryByIP();
        let ottLinkElement = document.getElementById('ottLink');

        // Set the appropriate Amazon link based on the user's country
        switch (countryCode) {
            case 'IN':
                ottLinkElement.href = `https://amzn.to/3yr2kKQ`;
                break;
            case 'US':
                ottLinkElement.href = `https://amzn.to/4dBo6dy`;
                break;
            case 'UK':
                ottLinkElement.href = `https://amzn.to/46EBCLa`;
                break;
            case 'CA':
                ottLinkElement.href = `https://amzn.to/3yyeUb7`;
                break;
            case 'DE':
                ottLinkElement.href = `https://amzn.to/3M1pJFO`;
                break;
            case 'JP':
                ottLinkElement.href = `https://amzn.to/3AkJANH`;
                break;
            case 'FR':
                ottLinkElement.href = `https://amzn.to/46EevAD`;
                break;
            case 'ES':
                ottLinkElement.href = `https://amzn.to/4ch9MWx`;
                break;    
            default:
                ottLinkElement.href = `https://amzn.to/4dBo6dy`; // Fallback
        }

        let trailer = tvshow.videos.results.find(video => video.type === "Trailer");
        document.getElementById('tvshowTrailer').src = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

        let castList = document.getElementById('castList');
        castList.innerHTML = '';
        tvshow.credits.cast.slice(0, 5).forEach(actor => {
            let castCard = document.createElement('div');
            castCard.className = 'cast-card';
            const actorProfilePath = actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '/assets/home_page/alt.jpg'; // Fallback image for actor
            castCard.innerHTML = `
                <img src="${actorProfilePath}" class="img-fluid" alt="${actor.name}">
                <p class="text-green">${actor.name}</p>
                <p class="text-white">${actor.character}</p>
            `;
            castList.appendChild(castCard);
        });

        // Display watch providers
        let watchProviders = await getWatchProviders(tvshowId);
        let watchProvidersList = document.getElementById('watchProvidersList');
        watchProvidersList.innerHTML = '';
        if (watchProviders && watchProviders.US && watchProviders.US.flatrate) {
            let providers = watchProviders.US.flatrate;
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
    window.scrollTo(0, scrollPosition);
}

// Infinite Scroll
let currentPage = 1;
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        currentPage++;
        fetchOnTVShows(currentPage);
    }
});

// Initial load
fetchOnTVShows();
