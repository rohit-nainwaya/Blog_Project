let url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=2db5bc75c33eb661cc482365062fa0e5';

async function getUpcoming() {
    try {
        let res = await axios.get(url);
        let results = res.data.results;
        return results;
    } catch (e) {
        let err = `error- ${e}`;
        return err;
    }
}

let movie_card = document.querySelector('.movie_card');
(async () => {
    let results = await getUpcoming();
    
    if (typeof results === 'string') {
        console.log(results); // Log the error
    } else {
        movie_card.innerHTML = ''; // Clear previous results if any
        for (let movie of results) {
            const mvCard = document.createElement('div');
            mvCard.className = 'mvCard card mb-3';
            mvCard.innerHTML = `
                <a href="#" class="movie-link" data-id="${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Release Date: ${movie.release_date}</p>
                    </div>
                </a>
            `;
            movie_card.appendChild(mvCard);
        }

        document.querySelectorAll('.movie-link').forEach(link => {
            link.addEventListener('click', async (event) => {
                event.preventDefault();
                let movieId = event.currentTarget.getAttribute('data-id');
                await showMovieDetails(movieId);
            });
        });
    }
})();

async function showMovieDetails(movieId) {
    let url2 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=2db5bc75c33eb661cc482365062fa0e5&append_to_response=videos,credits`;
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
            castCard.className = 'col-md-2';
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

function goBack() {
    document.getElementById('movieDetails').classList.add('hidden');
    document.querySelector('.movie_card').classList.remove('hidden');
}
