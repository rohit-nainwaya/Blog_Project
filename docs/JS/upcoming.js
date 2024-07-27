let apiKey = '2db5bc75c33eb661cc482365062fa0e5';
let baseUrl = 'https://api.themoviedb.org/3/movie/upcoming';

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

// Fetch movie details to get production countries
async function getMovieDetails(movieId) {
    try {
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        return res.data;
    } catch (e) {
        console.error(`Error fetching movie details: ${e}`);
        return null;
    }
};

let displayedMovieIds = new Set(); // Track displayed movie IDs to avoid duplicates

// Fetch a single page of upcoming movies
async function getUpcoming(page = 1) {
    try {
        let res = await axios.get(`${baseUrl}?api_key=${apiKey}&page=${page}`);
        let results = res.data.results;
        return results;
    } catch (e) {
        let err = `error- ${e}`;
        return err;
    }
}

// Fetch all upcoming movies
async function fetchAllUpcomingMovies() {
    let allMovies = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
        let results = await getUpcoming(page);
        if (typeof results === 'string') {
            console.log(results); // Log the error
            break;
        }
        
        allMovies = allMovies.concat(results);

        // Check if there are more pages
        if (page === 1) {
            let res = await axios.get(`${baseUrl}?api_key=${apiKey}&page=${page}`);
            totalPages = res.data.total_pages;
        }

        page++;
    }

    return allMovies;
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
            const profilePath = actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : './assets/alt.jpg'; // Fallback image
            castCard.innerHTML = `
                <img src="${profilePath}" class="img-fluid" alt="${actor.name}">
                <p class="text-white">${actor.name}</p>
                <p class="text-muted">${actor.character}</p>
            `;
            castList.appendChild(castCard);
        });

        document.querySelector('.movie_card').classList.add('hidden');
        document.getElementById('movieDetails').classList.remove('hidden');
    } catch (e) {
        let err = `error- ${e}`;
        console.log(err);
    }
}

// Sort and display movies
async function sortAndDisplayMovies() {
    let results = await fetchAllUpcomingMovies();
    
    if (typeof results === 'string') {
        console.log(results); // Log the error
    } else {
        let currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        let upcomingMovies = results.filter(movie => movie.release_date >= currentDate);
        let remainingMovies = results.filter(movie => movie.release_date < currentDate);

        // Sort upcoming movies by release date
        upcomingMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        remainingMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        let movie_card = document.querySelector('.movie_card');
        movie_card.innerHTML = ''; // Clear previous results if any

        // Display upcoming movies
        for(let movie of upcomingMovies){
            const movieDetails = await getMovieDetails(movie.id);
            const countries = movieDetails && movieDetails.production_countries ? movieDetails.production_countries.map(c => getCountryName(c.iso_3166_1)).join(', ') : "Unknown";
            if (!displayedMovieIds.has(movie.id)) {
                displayedMovieIds.add(movie.id);
                const mvCard = document.createElement('div');
                mvCard.className = 'mvCard card mb-3';
                const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : './assets/alt.jpg'; // Fallback image
                mvCard.innerHTML = `
                    <a href="#" class="movie-link" data-id="${movie.id}">
                        <img data-src="${posterPath}" class="card-img-top lazyload" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">Release Date: ${movie.release_date}</p>
                            <p class="card-text">Country: ${countries}</p>
                        </div>
                    </a>
                `;
                movie_card.appendChild(mvCard);
            }
        };

        // Display remaining movies
        for(movie of remainingMovies){
            const movieDetails = await getMovieDetails(movie.id);
            const countries = movieDetails && movieDetails.production_countries ? movieDetails.production_countries.map(c => getCountryName(c.iso_3166_1)).join(', ') : "Unknown";
            if (!displayedMovieIds.has(movie.id)) {
                displayedMovieIds.add(movie.id);
                const mvCard = document.createElement('div');
                mvCard.className = 'mvCard card mb-3';
                mvCard.innerHTML = `
                    <a href="#" class="movie-link" data-id="${movie.id}">
                        <img data-src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top lazyload" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">Release Date: ${movie.release_date}</p>
                            <p class="card-text">Country: ${countries}</p>
                        </div>
                    </a>
                `;
                movie_card.appendChild(mvCard);
            }
        };

        document.querySelectorAll('.movie-link').forEach(link => {
            link.addEventListener('click', async (event) => {
                event.preventDefault();
                let movieId = event.currentTarget.getAttribute('data-id');
                await showMovieDetails(movieId);
            });
        });
    }
}

// Function to go back from movie details view
function goBack() {
    document.getElementById('movieDetails').classList.add('hidden');
    document.querySelector('.movie_card').classList.remove('hidden');
}

// Infinite Scroll
let currentPage = 1;
async function fetchUpcomingMovies(page) {
    let results = await getUpcoming(page);

    if (typeof results === 'string') {
        console.log(results); // Log the error
    } else {
        let currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        let upcomingMovies = results.filter(movie => movie.release_date >= currentDate);
        let remainingMovies = results.filter(movie => movie.release_date < currentDate);

        // Sort upcoming movies by release date
        upcomingMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        remainingMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        let movie_card = document.querySelector('.movie_card');

        // Display upcoming movies
        upcomingMovies.forEach(movie => {
            if (!displayedMovieIds.has(movie.id)) {
                displayedMovieIds.add(movie.id);
                const mvCard = document.createElement('div');
                mvCard.className = 'mvCard card mb-3';
                mvCard.innerHTML = `
                    <a href="#" class="movie-link" data-id="${movie.id}">
                        <img data-src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top lazyload" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">Release Date: ${movie.release_date}</p>
                        </div>
                    </a>
                `;
                movie_card.appendChild(mvCard);
            }
        });

        // Display remaining movies
        remainingMovies.forEach(movie => {
            if (!displayedMovieIds.has(movie.id)) {
                displayedMovieIds.add(movie.id);
                const mvCard = document.createElement('div');
                mvCard.className = 'mvCard card mb-3';
                mvCard.innerHTML = `
                    <a href="#" class="movie-link" data-id="${movie.id}">
                        <img data-src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top lazyload" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">Release Date: ${movie.release_date}</p>
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
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        currentPage++;
        fetchUpcomingMovies(currentPage);
    }
});

// Initial load
sortAndDisplayMovies();
