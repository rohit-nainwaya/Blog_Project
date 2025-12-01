// Calls to TMDB are proxied through our backend API to keep the API key secret.
let baseUrl = '/api/tv/popular';
let scrollPosition = 0;
let currentPage = 1;
let isLoading = false;
let selectedGenre = '';
let sortBy = 'popularity';

// Country codes mapping
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeViewToggle();
    initializeScrollToTop();
    fetchPopularTVShows();
    setupInfiniteScroll();
});

// Fetch TV genres for filter
async function fetchTVGenres() {
    try {
        const res = await axios.get('/api/tv/genres');
        const genres = res.data.genres || [];
        populateGenreFilter(genres);
    } catch (e) {
        console.error('Error fetching TV genres:', e);
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
    fetchTVGenres();
    
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
    const tvShowGrid = document.getElementById('tvShowGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.getAttribute('data-view');
            if (view === 'list') {
                tvShowGrid.classList.add('list-view');
            } else {
                tvShowGrid.classList.remove('list-view');
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

// Reset and fetch TV shows
function resetAndFetch() {
    currentPage = 1;
    document.getElementById('tvShowGrid').innerHTML = '';
    fetchPopularTVShows();
}

// Fetch popular TV shows
async function getPopularTVShows(page = 1) {
    try {
        let url = `${baseUrl}?page=${page}`;
        if (selectedGenre) {
            url += `&genre=${selectedGenre}`;
        }
        const res = await axios.get(url);
        return res.data.results;
    } catch (e) {
        console.error(`Error fetching popular TV shows: ${e}`);
        return [];
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

// Fetch and display TV shows
async function fetchPopularTVShows(page = 1) {
    if (isLoading) return;
    
    isLoading = true;
    const results = await getPopularTVShows(page);
    
    hideLoadingSkeleton();
    
    if (results.length === 0) {
        if (page === 1) {
            showNoResults();
        }
        isLoading = false;
        return;
    }
    
    const tvShowGrid = document.getElementById('tvShowGrid');
    
    // Sort results if needed
    const sortedResults = sortTVShows(results);
    
    sortedResults.forEach(tvshow => {
        const tvShowCard = createTVShowCard(tvshow);
        tvShowGrid.appendChild(tvShowCard);
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
    
    isLoading = false;
}

// Sort TV shows based on selected option
function sortTVShows(shows) {
    switch (sortBy) {
        case 'first_air_date':
            return shows.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));
        case 'rating':
            return shows.sort((a, b) => b.vote_average - a.vote_average);
        case 'name':
            return shows.sort((a, b) => a.name.localeCompare(b.name));
        case 'popularity':
        default:
            return shows.sort((a, b) => b.popularity - a.popularity);
    }
}

// Create TV show card element
function createTVShowCard(tvshow) {
    const card = document.createElement('div');
    card.className = 'movie-card fade-in';
    
    const posterPath = tvshow.poster_path 
        ? `https://image.tmdb.org/t/p/w500${tvshow.poster_path}` 
        : '/assets/home_page/alt.jpg';
    
    const rating = tvshow.vote_average ? tvshow.vote_average.toFixed(1) : 'N/A';
    const airDate = tvshow.first_air_date ? new Date(tvshow.first_air_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    }) : 'TBA';
    
    const countries = tvshow.origin_country 
        ? tvshow.origin_country.map(getCountryName).join(', ') 
        : 'Unknown';
    
    const popularity = tvshow.popularity ? Math.round(tvshow.popularity) : 0;
    
    card.innerHTML = `
        <div class="movie-card-image">
            <img data-src="${posterPath}" class="lazyload" alt="${tvshow.name}">
            <div class="movie-card-rating">
                <i class="fas fa-star"></i>
                <span>${rating}</span>
            </div>
            <div class="popular-indicator">
                <i class="fas fa-fire"></i>
                <span>${popularity}</span>
            </div>
        </div>
        <div class="movie-card-content">
            <h3 class="movie-card-title">${tvshow.name}</h3>
            <div class="movie-card-date">
                <i class="fas fa-calendar-alt"></i>
                <span>${airDate}</span>
            </div>
            <div class="movie-card-country">
                <i class="fas fa-globe"></i>
                <span>${countries}</span>
            </div>
            <p class="movie-card-overview">${tvshow.overview || 'No description available.'}</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        scrollPosition = window.scrollY;
        showTVShowDetails(tvshow.id);
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
    const tvShowGrid = document.getElementById('tvShowGrid');
    tvShowGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <i class="fas fa-tv" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
            <h3 style="color: var(--text-primary);">No TV shows found</h3>
            <p style="color: var(--text-secondary);">Try adjusting your filters</p>
        </div>
    `;
}

// Fetch watch providers
async function getWatchProviders(tvshowId) {
    try {
        const res = await axios.get(`/api/tv/${tvshowId}/providers`);
        return res.data.results || {};
    } catch (e) {
        console.error(`Error fetching watch providers: ${e}`);
        return {};
    }
}

// Show TV show details
async function showTVShowDetails(tvshowId) {
    const url = `/api/tv/${tvshowId}?append=videos,credits,recommendations,similar`;
    
    try {
        const res = await axios.get(url);
        const tvshow = res.data;
        
        // Set backdrop
        const backdrop = document.querySelector('.detail-backdrop');
        if (tvshow.backdrop_path) {
            backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${tvshow.backdrop_path})`;
        }
        
        // Set basic info
        document.getElementById('tvshowTitle').innerText = tvshow.name;
        document.getElementById('tvshowDescription').innerText = tvshow.overview || 'No description available.';
        
        const posterPath = tvshow.poster_path 
            ? `https://image.tmdb.org/t/p/w500${tvshow.poster_path}` 
            : '/assets/home_page/alt.jpg';
        document.getElementById('tvshowPoster').src = posterPath;
        
        // Rating badge
        const rating = tvshow.vote_average ? tvshow.vote_average.toFixed(1) : 'N/A';
        document.getElementById('ratingBadge').innerText = rating;
        
        // TV Show stats
        const countries = tvshow.origin_country 
            ? tvshow.origin_country.map(getCountryName).join(', ') 
            : 'Unknown';
        document.getElementById('tvshowCountry').innerText = countries;
        document.getElementById('tvshowSeasons').innerText = tvshow.number_of_seasons 
            ? `${tvshow.number_of_seasons} Season${tvshow.number_of_seasons > 1 ? 's' : ''}` 
            : 'N/A';
        document.getElementById('tvshowEpisodes').innerText = tvshow.number_of_episodes 
            ? `${tvshow.number_of_episodes} Episodes` 
            : 'N/A';
        document.getElementById('tvshowAirDate').innerText = tvshow.first_air_date 
            ? new Date(tvshow.first_air_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }) 
            : 'TBA';
        document.getElementById('tvshowStatus').innerText = tvshow.status || 'Unknown';
        
        // Genres with tags
        const genresContainer = document.getElementById('tvshowGenres');
        genresContainer.innerHTML = '';
        if (tvshow.genres && tvshow.genres.length) {
            tvshow.genres.forEach(genre => {
                const tag = document.createElement('span');
                tag.className = 'genre-tag';
                tag.innerText = genre.name;
                genresContainer.appendChild(tag);
            });
        }
        
        // Creator
        const creator = tvshow.created_by && tvshow.created_by.length 
            ? tvshow.created_by.map(c => c.name).join(', ') 
            : 'Unknown';
        document.getElementById('tvshowCreator').innerText = creator;
        
        // Network
        const network = tvshow.networks && tvshow.networks.length 
            ? tvshow.networks.map(n => n.name).join(', ') 
            : 'Unknown';
        document.getElementById('tvshowNetwork').innerText = network;
        
        // Set OTT link based on country
        const countryCode = await getCountryByIP();
        setOTTLink(countryCode);
        
                // Trailer
        const trailer = tvshow.videos && tvshow.videos.results 
            ? tvshow.videos.results.find(video => video.type === "Trailer") 
            : null;
        const trailerIframe = document.getElementById('tvshowTrailer');
        const trailerSection = trailerIframe.closest('.trailer-section');
        if (trailer) {
            trailerIframe.src = `https://www.youtube.com/embed/${trailer.key}`;
            trailerSection.style.display = 'block';
        } else {
            trailerSection.style.display = 'none';
        }
        
        // Cast
        renderCast(tvshow.credits);
        
        // Watch providers
        await renderWatchProviders(tvshowId);
        
        // Similar shows
        renderSimilarShows(tvshow.recommendations || tvshow.similar);
        
        // Show modal
        document.getElementById('tvshowDetails').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
    } catch (e) {
        console.error(`Error showing TV show details: ${e}`);
        alert('Error loading TV show details. Please try again.');
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
async function renderWatchProviders(tvshowId) {
    const watchProviders = await getWatchProviders(tvshowId);
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

// Render similar shows
function renderSimilarShows(data) {
    const similarRow = document.getElementById('similarRow');
    similarRow.innerHTML = '';
    
    const similar = data && data.results ? data.results : [];
    
    if (similar.length === 0) {
        similarRow.innerHTML = '<p style="color: var(--text-secondary);">No similar shows found.</p>';
        return;
    }
    
    similar.slice(0, 10).forEach(show => {
        const card = document.createElement('div');
        card.className = 'similar-card';
        
        const thumb = show.poster_path 
            ? `https://image.tmdb.org/t/p/w300${show.poster_path}` 
            : '/assets/home_page/alt.jpg';
        
        card.innerHTML = `
            <img src="${thumb}" alt="${show.name}">
            <div class="similar-card-title">${show.name}</div>
        `;
        
        card.addEventListener('click', async () => {
            await showTVShowDetails(show.id);
        });
        
        similarRow.appendChild(card);
    });
}

// Go back from TV show details
function goBack() {
    document.getElementById('tvshowDetails').classList.add('hidden');
    document.body.style.overflow = 'auto';
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    
    // Reset trailer
    document.getElementById('tvshowTrailer').src = '';
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
            fetchPopularTVShows(currentPage);
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
        <p>Loading more TV shows...</p>
    `;
    document.querySelector('.container').appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 2000);
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('tvshowDetails');
        if (!modal.classList.contains('hidden')) {
            goBack();
        }
    }
});

// Close modal on backdrop click
document.getElementById('tvshowDetails')?.addEventListener('click', (e) => {
    if (e.target.id === 'tvshowDetails') {
        goBack();
    }
});