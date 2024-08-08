let apiKey = '2db5bc75c33eb661cc482365062fa0e5';
let baseUrl = 'https://api.themoviedb.org/3/search/multi';
let scrollPosition = 0;
let noMoreResults = false; // Flag to indicate if no more results are available

async function getSearchResults(query, page = 1) {
    try {
        let res = await axios.get(`${baseUrl}?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`);
        return res.data.results;
    } catch (e) {
        console.error(`Error fetching search results: ${e}`);
        return [];
    }
}

async function getDetails(id, type) {
    let url;
    if (type === 'movie') {
        url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits`;
    } else if (type === 'tv') {
        url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=videos,credits`;
    }
    try {
        let res = await axios.get(url);
        return res.data;
    } catch (e) {
        console.error(`Error fetching details: ${e}`);
        return null;
    }
}

async function fetchSearchResults(query, page = 1) {
    if (noMoreResults) return; // Exit early if no more results are available

    let results = await getSearchResults(query, page);
    let movie_card = document.querySelector('.movie_card');

    if (results.length === 0) {
        if (page === 1) { // Show the message only if it's the first page
            const noResult = document.createElement('h1');
            noResult.style.color = 'red';
            noResult.innerText = `Sorry, No Results Found!`;
            movie_card.appendChild(noResult);
        }
        noMoreResults = true; // Set the flag to true
        return;
    }

    for (let item of results) {
        const movieCard = document.createElement('div');
        movieCard.className = 'mvCard card mb-3';

        const posterPath = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/assets/home_page/alt.jpg'; // Fallback image

        movieCard.innerHTML = `
            <a href="#" class="movie-link" data-id="${item.id}" data-type="${item.media_type}">
                <img data-src="${posterPath}" class="card-img-top lazyload" alt="${item.title || item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.title || item.name}</h5>
                    <p class="card-text">Rating: ${item.vote_average || 'N/A'}</p>
                </div>
            </a>
        `;
        movie_card.appendChild(movieCard);
    }

    document.querySelectorAll('.movie-link').forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            scrollPosition = window.scrollY;

            let id = event.currentTarget.getAttribute('data-id');
            let type = event.currentTarget.getAttribute('data-type');
            console.log(`Clicked ID: ${id}, Type: ${type}`); // Debugging line to check the captured ID and type
            await showDetails(id, type);
        });
    });
}

async function getWatchProviders(id, type) {
    let url;
    if (type === 'movie') {
        url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`;
    } else if (type === 'tv') {
        url = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`;
    }
    try {
        let res = await axios.get(url);
        return res.data.results;
    } catch (e) {
        console.error(`Error fetching watch providers: ${e}`);
        return {};
    }
}

async function showDetails(id, type) {
    const details = await getDetails(id, type);
    if (!details) {
        console.error('No details found');
        return;
    }

    const countries = details.production_countries ? details.production_countries.map(c => c.name).join(', ') : 'Unknown';
    let title = type === 'movie' ? details.title : details.name;
    let overview = details.overview;
    let trailer = details.videos.results.find(video => video.type === "Trailer");

    document.getElementById('movieTitle').innerText = title;
    document.getElementById('movieDescription').innerText = overview;
    document.getElementById('movieCountry').innerText = `Country: ${countries}`;
    if(countries == "India"){
        document.getElementById('ottLink').href = `https://amzn.to/3yr2kKQ`;
    }else{
        document.getElementById('ottLink').href = `https://amzn.to/4dBo6dy`;
    }
    document.getElementById('movieTrailer').src = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

    let castList = document.getElementById('castList');
    castList.innerHTML = '';
    details.credits.cast.slice(0, 5).forEach(actor => {
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
    let watchProviders = await getWatchProviders(id, type);
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

    document.querySelector('.movie_card').classList.add('hidden');
    document.getElementById('movieDetails').classList.remove('hidden');
}

function goBack() {
    document.getElementById('movieDetails').classList.add('hidden');
    document.querySelector('.movie_card').classList.remove('hidden');
    window.scrollTo(0, scrollPosition);
}

// Infinite Scroll
let currentPage = 1;
function handleScroll() {
    if (noMoreResults) return; // Exit if no more results are available

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        currentPage++;
        fetchSearchResults(query, currentPage);
    }
}

window.addEventListener('scroll', handleScroll);

// Initial load
fetchSearchResults(query);
