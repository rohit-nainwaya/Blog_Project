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

// Fetch a single page of top-rated movies
async function getTopRated(page = 1) {
    try {
        let res = await axios.get(`${baseUrl}?api_key=${apiKey}&page=${page}`);
        return res.data.results;
    } catch (e) {
        console.log(`Error: ${e}`);
        return [];
    }
}

// Fetch detailed information about a movie
async function getMovieDetails(movieId) {
    try {
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        return res.data;
    } catch (e) {
        console.log(`Error: ${e}`);
        return null;
    }
}

// Fetch watch providers information for a movie
async function getWatchProviders(movieId) {
    try {
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`);
        return res.data.results;
    } catch (e) {
        console.log(`Error: ${e}`);
        return null;
    }
}

// Fetch and display a page of top-rated movies
async function fetchTopRatedMovies(page = 1) {
    let results = await getTopRated(page);
    let movie_card = document.querySelector('.movie_card');
    
    let movieDetailsPromises = results.map(movie => getMovieDetails(movie.id));
    let moviesDetails = await Promise.all(movieDetailsPromises);
    
    moviesDetails.forEach((movieDetails, index) => {
        if (movieDetails) {
            let countries = movieDetails.production_countries.map(country => getCountryName(country.iso_3166_1)).join(', ');
            const movie = results[index];
            
            const mvCard = document.createElement('div');
            mvCard.className = 'mvCard card mb-3';
            mvCard.innerHTML = `
                <a href="#" class="movie-link" data-id="${movie.id}">
                    <img data-src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top lazyload" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Rating: ${movie.vote_average}</p>
                        <p class="card-text">Country: ${countries}</p>
                    </div>
                </a>
            `;
            movie_card.appendChild(mvCard);
        }
    });

    document.querySelectorAll('.movie-link').forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            let movieId = event.currentTarget.getAttribute('data-id');
            await showMovieDetails(movieId);
        });
    });
}

// Show movie details
async function showMovieDetails(movieId) {
    let url2 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,credits`;
    try {
        let res = await axios.get(url2);
        let movie = res.data;
        
        document.getElementById('movieTitle').innerText = movie.title;
        document.getElementById('movieDescription').innerText = movie.overview;
        document.getElementById('ottLink').href = `https://www.themoviedb.org/movie/${movie.id}`;
        let trailer = movie.videos.results.find(video => video.type === "Trailer");
        document.getElementById('movieTrailer').src = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

        let castList = document.getElementById('castList');
        castList.innerHTML = '';
        movie.credits.cast.slice(0, 5).forEach(actor => {
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
        console.log(`Error: ${e}`);
    }
}

// Function to go back from movie details view
function goBack() {
    document.getElementById('movieDetails').classList.add('hidden');
    document.querySelector('.movie_card').classList.remove('hidden');
}

// Infinite Scroll
let currentPage = 1;
let isLoading = false;
window.addEventListener('scroll', async () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isLoading) {
        isLoading = true;
        currentPage++;
        await fetchTopRatedMovies(currentPage);
        isLoading = false;
    }
});

// Initial load
fetchTopRatedMovies();
