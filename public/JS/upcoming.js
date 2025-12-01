// Calls to TMDB are proxied through our backend API to keep the API key secret.
let baseUrl = '/api/upcoming';
let scrollPosition = 0;
let currentPage = 1;
let isLoading = false;
let selectedGenre = '';
let sortBy = 'popularity';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeViewToggle();
    initializeScrollToTop();
    fetchUpcomingMovies();
    setupInfiniteScroll();
});

// Fetch genres for filter
async function fetchGenres() {
    try {
        const res = await axios.get('/api/genres');
        const genres = res.data.genres || [];
        populateGenreFilter(genres);
    } catch (e) {
        console.error('Error fetching genres:', e);
    }
}

// Populate genre filter dropdown
function populateGenreFilter(genres) {
    const genreFilter = document.getElementById('genreFilter');
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreFilter.appendChild(option);
    });
}

// Initialize filters
function initializeFilters() {
    fetchGenres();
    
    const sortBySelect = document.getElementById('sortBy');
    const genreSelect = document.getElementById('genreFilter');
    
    sortBySelect.addEventListener('change', (e) => {
        sortBy = e.target.value;
        resetAndFetch();
    });
    
    genreSelect.addEventListener('change', (e) => {
        selectedGenre = e.target.value;
        resetAndFetch();
    });
}

// Initialize view toggle
function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const movieGrid = document.getElementById('movieGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.getAttribute('data-view');
            if (view === 'list') {
                movieGrid.classList.add('list-view');
            } else {
                movieGrid.classList.remove('list-view');
            }
        });
    });
}

// Initialize scroll to top button
function initializeScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Reset and fetch movies
function resetAndFetch() {
    currentPage = 1;
    document.getElementById('movieGrid').innerHTML = '';
    fetchUpcomingMovies();
}

// Fetch upcoming movies
async function getUpcomingMovies(page = 1) {
    try {
        let url = `${baseUrl}?page=${page}`;
        if (selectedGenre) {
            url += `&genre=${selectedGenre}`;
        }
        const res = await axios.get(url);
        return res.data.results;
    } catch (e) {
        console.error(`Error fetching upcoming movies: ${e}`);
        return [];
    }
}

// Fetch movie details
async function getMovieDetails(movieId) {
    try {
        const res = await axios.get(`/api/movie/${movieId}`);
        return res.data;
    } catch (e) {
        console.error(`Error fetching movie details: ${e}`);
        return null;
    }
}

// Get country by IP
async function getCountryByIP() {
    try {
        const res = await axios.get('https://ipapi.co/json/');
        return res.data.country_code;
    } catch (e) {
        console.error('Error fetching IP location:', e);
        return 'US';
    }
}

// Hide loading skeleton
function hideLoadingSkeleton() {
    const skeleton = document.getElementById('loadingSkeleton');
    if (skeleton) {
        skeleton.style.display = 'none';
    }
}

// Fetch and display movies
async function fetchUpcomingMovies(page = 1) {
    if (isLoading) return;
    
    isLoading = true;
    const results = await getUpcomingMovies(page);
    
    hideLoadingSkeleton();
    
    if (results.length === 0) {
        if (page === 1) {
            showNoResults();
        }
        isLoading = false;
        return;
    }
    
    const movieGrid = document.getElementById('movieGrid');
    
    // Sort results if needed
    const sortedResults = sortMovies(results);
    
    sortedResults.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieGrid.appendChild(movieCard);
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
    
    isLoading = false;
}

// Sort movies based on selected option
function sortMovies(movies) {
    switch (sortBy) {
        case 'release_date':
            return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        case 'rating':
            return movies.sort((a, b) => b.vote_average - a.vote_average);
        case 'popularity':
        default:
            return movies.sort((a, b) => b.popularity - a.popularity);
    }
}

// Create movie card element (Continued)
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card fade-in';
    
    const posterPath = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : '/assets/home_page/alt.jpg';
    
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    }) : 'TBA';
    
    card.innerHTML = `
        <div class="movie-card-image">
            <img data-src="${posterPath}" class="lazyload" alt="${movie.title}">
            <div class="movie-card-rating">
                <i class="fas fa-star"></i>
                <span>${rating}</span>
            </div>
        </div>
        <div class="movie-card-content">
            <h3 class="movie-card-title">${movie.title}</h3>
            <div class="movie-card-date">
                <i class="fas fa-calendar-alt"></i>
                <span>${releaseDate}</span>
            </div>
            <p class="movie-card-overview">${movie.overview || 'No description available.'}</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        scrollPosition = window.scrollY;
        showMovieDetails(movie.id);
    });
    
    return card;
}

// Lazy load images
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazyload');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazyload').forEach(img => {
        imageObserver.observe(img);
    });
}

// Show no results message
function showNoResults() {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <i class="fas fa-film" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
            <h3 style="color: var(--text-primary);">No movies found</h3>
            <p style="color: var(--text-secondary);">Try adjusting your filters</p>
        </div>
    `;
}

// Fetch watch providers
async function getWatchProviders(movieId) {
    try {
        const res = await axios.get(`/api/movie/${movieId}/providers`);
        return res.data.results || {};
    } catch (e) {
        console.error(`Error fetching watch providers: ${e}`);
        return {};
    }
}

// Show movie details
async function showMovieDetails(movieId) {
    const movieDetails = await getMovieDetails(movieId);
    const url = `/api/movie/${movieId}?append=videos,credits,recommendations`;
    
    try {
        const res = await axios.get(url);
        const movie = res.data;
        
        // Set backdrop
        const backdrop = document.querySelector('.detail-backdrop');
        if (movie.backdrop_path) {
            backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
        }
        
        // Set basic info
        document.getElementById('movieTitle').innerText = movie.title;
        document.getElementById('movieDescription').innerText = movie.overview || 'No description available.';
        
        const posterPath = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : '/assets/home_page/alt.jpg';
        document.getElementById('moviePoster').src = posterPath;
        
        // Rating badge
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
        document.getElementById('ratingBadge').innerText = rating;
        
        // Movie stats
        const countries = movieDetails && movieDetails.production_countries 
            ? movieDetails.production_countries.map(c => c.name).join(', ') 
            : 'Unknown';
        document.getElementById('movieCountry').innerText = countries;
        document.getElementById('movieRuntime').innerText = movie.runtime ? `${movie.runtime} min` : 'N/A';
        document.getElementById('movieRelease').innerText = movie.release_date 
            ? new Date(movie.release_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }) 
            : 'TBA';
        
        // Genres with tags
        const genresContainer = document.getElementById('movieGenres');
        genresContainer.innerHTML = '';
        if (movie.genres && movie.genres.length) {
            movie.genres.forEach(genre => {
                const tag = document.createElement('span');
                tag.className = 'genre-tag';
                tag.innerText = genre.name;
                genresContainer.appendChild(tag);
            });
        }
        
        // Director
        const director = movie.credits && movie.credits.crew 
            ? movie.credits.crew.find(c => c.job === 'Director') 
            : null;
        document.getElementById('movieDirector').innerText = director ? director.name : 'Unknown';
        
        // Production companies
        const prod = movie.production_companies && movie.production_companies.length 
            ? movie.production_companies.map(p => p.name).join(', ') 
            : 'Unknown';
        document.getElementById('movieProduction').innerText = prod;
        
        // Set OTT link based on country
        const countryCode = await getCountryByIP();
        setOTTLink(countryCode);
        
        // Trailer
        const trailer = movie.videos && movie.videos.results 
            ? movie.videos.results.find(video => video.type === "Trailer") 
            : null;
        const trailerIframe = document.getElementById('movieTrailer');
        if (trailer) {
            trailerIframe.src = `https://www.youtube.com/embed/${trailer.key}`;
        } else {
            trailerIframe.parentElement.parentElement.style.display = 'none';
        }
        
        // Cast
        renderCast(movie.credits);
        
        // Watch providers
        await renderWatchProviders(movieId);
        
        // Similar movies
        renderSimilarMovies(movie.recommendations || movie.similar);
        
        // Show modal
        document.getElementById('movieDetails').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
    } catch (e) {
        console.error(`Error showing movie details: ${e}`);
        alert('Error loading movie details. Please try again.');
    }
}

// Set OTT link based on country
function setOTTLink(countryCode) {
    const ottLinkElement = document.getElementById('ottLink');
    const links = {
        'IN': 'https://amzn.to/3yr2kKQ',
        'US': 'https://amzn.to/4dBo6dy',
        'UK': 'https://amzn.to/46EBCLa',
        'CA': 'https://amzn.to/3yyeUb7',
        'DE': 'https://amzn.to/3M1pJFO',
        'JP': 'https://amzn.to/3AkJANH',
        'FR': 'https://amzn.to/46EevAD',
        'ES': 'https://amzn.to/4ch9MWx'
    };
    ottLinkElement.href = links[countryCode] || links['US'];
}

// Render cast
function renderCast(credits) {
    const castList = document.getElementById('castList');
    castList.innerHTML = '';
    
    if (!credits || !credits.cast || credits.cast.length === 0) {
        castList.innerHTML = '<p style="color: var(--text-secondary);">No cast information available.</p>';
        return;
    }
    
    credits.cast.slice(0, 10).forEach(actor => {
        const castCard = document.createElement('div');
        castCard.className = 'cast-card';
        
        const actorProfilePath = actor.profile_path 
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` 
            : '/assets/home_page/alt.jpg';
        
        castCard.innerHTML = `
            <img src="${actorProfilePath}" alt="${actor.name}">
            <div class="cast-info">
                <div class="cast-name">${actor.name}</div>
                <div class="cast-character">${actor.character || 'Unknown'}</div>
            </div>
        `;
        castList.appendChild(castCard);
    });
}

// Render watch providers
async function renderWatchProviders(movieId) {
    const watchProviders = await getWatchProviders(movieId);
    const watchProvidersList = document.getElementById('watchProvidersList');
    watchProvidersList.innerHTML = '';
    
    // Try to get providers for user's country, fallback to US, then IN
    const countryCode = await getCountryByIP();
    const providers = watchProviders[countryCode] || watchProviders['US'] || watchProviders['IN'];
    
    if (providers && providers.flatrate && providers.flatrate.length > 0) {
        providers.flatrate.forEach(provider => {
            const providerItem = document.createElement('div');
            providerItem.className = 'provider-item';
            providerItem.innerHTML = `
                <i class="fas fa-tv"></i>
                <span>${provider.provider_name}</span>
            `;
            watchProvidersList.appendChild(providerItem);
        });
    } else {
        watchProvidersList.innerHTML = '<p style="color: var(--text-secondary);">No streaming information available for your region.</p>';
    }
}

// Render similar movies
function renderSimilarMovies(data) {
    const similarRow = document.getElementById('similarRow');
    similarRow.innerHTML = '';
    
    const similar = data && data.results ? data.results : [];
    
    if (similar.length === 0) {
        similarRow.innerHTML = '<p style="color: var(--text-secondary);">No similar movies found.</p>';
        return;
    }
    
    similar.slice(0, 10).forEach(sm => {
        const card = document.createElement('div');
        card.className = 'similar-card';
        
        const thumb = sm.poster_path 
            ? `https://image.tmdb.org/t/p/w300${sm.poster_path}` 
            : '/assets/home_page/alt.jpg';
        
        card.innerHTML = `
            <img src="${thumb}" alt="${sm.title || sm.name}">
            <div class="similar-card-title">${sm.title || sm.name}</div>
        `;
        
        card.addEventListener('click', async () => {
            await showMovieDetails(sm.id);
        });
        
        similarRow.appendChild(card);
    });
}

// Go back from movie details
function goBack() {
    document.getElementById('movieDetails').classList.add('hidden');
    document.body.style.overflow = 'auto';
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    
    // Reset trailer
    document.getElementById('movieTrailer').src = '';
}

// Setup infinite scroll
function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if (isLoading) return;
        
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 500) {
            currentPage++;
            showLoadingMore();
            fetchUpcomingMovies(currentPage);
        }
    });
}

// Show loading indicator
function showLoadingMore() {
    const existingLoader = document.querySelector('.loading-more');
    if (existingLoader) return;
    
    const loader = document.createElement('div');
    loader.className = 'loading-more';
    loader.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading more movies...</p>
    `;
    document.querySelector('.container').appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 2000);
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('movieDetails');
        if (!modal.classList.contains('hidden')) {
            goBack();
        }
    }
});

// Close modal on backdrop click
document.getElementById('movieDetails')?.addEventListener('click', (e) => {
    if (e.target.id === 'movieDetails') {
        goBack();
    }
});