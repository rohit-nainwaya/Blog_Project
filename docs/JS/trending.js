let apiKey = '2db5bc75c33eb661cc482365062fa0e5';
let baseUrl = 'https://api.themoviedb.org/3/trending/movie/week';

// Fetch a single page of trending movies
async function getTrending(page = 1) {
    try {
        let res = await axios.get(`${baseUrl}?api_key=${apiKey}&page=${page}`);
        let results = res.data.results;
        return results;
    } catch (e) {
        let err = `error- ${e}`;
        return err;
    }
}

// Fetch and display a page of trending movies
async function fetchTrendingMovies(page = 1) {
    let results = await getTrending(page);
    
    if (typeof results === 'string') {
        console.log(results); // Log the error
    } else {
        let movie_card = document.querySelector('.movie_card');
        results.forEach(movie => {
            const mvCard = document.createElement('div');
            mvCard.className = 'mvCard card mb-3';
            mvCard.innerHTML = `
                <a href="#" class="movie-link" data-id="${movie.id}">
                    <img data-src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top lazyload" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Popularity: ${movie.popularity}</p>
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
        fetchTrendingMovies(currentPage);
    }
});

// Initial load
fetchTrendingMovies();
