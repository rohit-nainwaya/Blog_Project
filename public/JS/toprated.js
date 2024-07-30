let apiKey = '2db5bc75c33eb661cc482365062fa0e5';
let baseUrl = 'https://api.themoviedb.org/3/movie/top_rated';

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

// Fetch a single page of top rated movies
async function getTopRatedMovies(page = 1) {
    try {
        let res = await axios.get(`${baseUrl}?api_key=${apiKey}&page=${page}`);
        return res.data.results;
    } catch (e) {
        console.error(`Error fetching popular movies: ${e}`);
        return [];
    }
}

// Fetch movie details to get production countries
async function getMovieDetails(movieId) {
    try {
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        return res.data;
    } catch (e) {
        console.error(`Error fetching movie details: ${e}`);
        return null;
    }
}

// Fetch and display a page of top rated movies
async function fetchTopRatedMovies(page = 1) {
    let results = await getTopRatedMovies(page);

    if (results.length === 0) {
        console.log('No results found.');
        return;
    }


    let movie_card = document.querySelector('.movie_card');
    for (let movie of results) {
        const movieCard = document.createElement('div');
        movieCard.className = 'mvCard card mb-3';

        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/assets/home_page/alt.jpg'; // Fallback image

        movieCard.innerHTML = `
            <a href="#" class="movie-link" data-id="${movie.id}">
                <img data-src="${posterPath}" class="card-img-top lazyload" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">Rating: ${movie.vote_average}</p>
                </div>
            </a>
        `;
        movie_card.appendChild(movieCard);
    }

    document.querySelectorAll('.movie-link').forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            let movieId = event.currentTarget.getAttribute('data-id');
            await showMovieDetails(movieId);
        });
    });
}

// Fetch watch providers for a movie
async function getWatchProviders(movieId) {
    try {
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`);
        return res.data.results;
    } catch (e) {
        console.error(`Error fetching watch providers: ${e}`);
        return {};
    }
}

// Show movie details
async function showMovieDetails(movieId) {
    const movieDetails = await getMovieDetails(movieId);
    const countries = movieDetails && movieDetails.production_countries ? movieDetails.production_countries.map(c => getCountryName(c.iso_3166_1)).join(', ') : 'Unknown';
    let url2 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,credits`;
    try {
        let res = await axios.get(url2);
        let movie = res.data;

        document.getElementById('movieTitle').innerText = movie.title;
        document.getElementById('movieDescription').innerText = movie.overview;
        document.getElementById('movieCountry').innerText = `Country: ${countries}`;
        document.getElementById('ottLink').href = `https://www.themoviedb.org/movie/${movie.id}`;
        let trailer = movie.videos.results.find(video => video.type === "Trailer");
        document.getElementById('movieTrailer').src = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

        let castList = document.getElementById('castList');
        castList.innerHTML = '';
        movie.credits.cast.slice(0, 5).forEach(actor => {
            let castCard = document.createElement('div');
            castCard.className = 'cast-card';
            
            const actorProfilePath = actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '/assets/home_page/alt.jpg'; // Fallback image for actor
            castCard.innerHTML = `
                <img src="${actorProfilePath}" class="img-fluid" alt="${actor.name}">
                <p class="text-white">${actor.name}</p>
                <p class="text-muted">${actor.character}</p>
            `;
            castList.appendChild(castCard);
        });

        // Display watch providers
        let watchProviders = await getWatchProviders(movieId);
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
    } catch (e) {
        console.error(`Error showing movie details: ${e}`);
    }
}

// Function to go back from movie details view
function goBack() {
    document.getElementById('movieDetails').classList.add('hidden');
    document.querySelector('.movie_card').classList.remove('hidden');
}

// Infinite Scroll
let currentPage = 1;
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        currentPage++;
        fetchTopRatedMovies(currentPage);
    }
});

// Initial load
fetchTopRatedMovies();