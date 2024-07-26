let apiKey = '2db5bc75c33eb661cc482365062fa0e5';
let baseUrl = 'https://api.themoviedb.org/3/movie/upcoming';

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
            castCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" class="img-fluid" alt="${actor.name}">
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
(async () => {
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
        upcomingMovies.forEach(movie => {
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
        });

        // Display remaining movies
        remainingMovies.forEach(movie => {
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
        });

        document.querySelectorAll('.movie-link').forEach(link => {
            link.addEventListener('click', async (event) => {
                event.preventDefault();
                let movieId = event.currentTarget.getAttribute('data-id');
                await showMovieDetails(movieId);
            });
        });
    }
})();

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
        fetchUpcomingMovies(currentPage);
    }
});

// Initial load
fetchUpcomingMovies();
