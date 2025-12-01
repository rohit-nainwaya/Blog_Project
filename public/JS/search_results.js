// Calls to TMDB are proxied through our backend API to keep the API key secret.
let baseUrl = '/api/search';
let scrollPosition = 0;
let currentPage = 1;
let isLoading = false;
let noMoreResults = false;
let allResults = [];
let filteredResults = [];
let mediaTypeFilter = 'all';
let sortBy = 'popularity';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeViewToggle();
    initializeScrollToTop();
    fetchSearchResults(query);
    setupInfiniteScroll();
});

// Initialize filters
function initializeFilters() {
    const mediaTypeSelect = document.getElementById('mediaType');
    const sortBySelect = document.getElementById('sortBy');
    
    mediaTypeSelect.addEventListener('change', (e) => {
        mediaTypeFilter = e.target.value;
        applyFiltersAndSort();
    });
    
    sortBySelect.addEventListener('change', (e) => {
        sortBy = e.target.value;
        applyFiltersAndSort();
    });
}

// Initialize view toggle
function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const resultsGrid = document.getElementById('resultsGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.getAttribute('data-view');
            if (view === 'list') {
                resultsGrid.classList.add('list-view');
            } else {
                resultsGrid.classList.remove('list-view');
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

// Fetch search results
async function getSearchResults(query, page = 1) {
    try {
        const res = await axios.get(`${baseUrl}?q=${encodeURIComponent(query)}&page=${page}`);
        return res.data.results;
    } catch (e) {
        console.error(`Error fetching search results: ${e}`);
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

// Fetch and display search results
async function fetchSearchResults(query, page = 1) {
    if (isLoading || noMoreResults) return;
    
    isLoading = true;
    const results = await getSearchResults(query, page);
    
    hideLoadingSkeleton();
    
    if (results.length === 0) {
        if (page === 1) {
            showNoResults();
        }
        noMoreResults = true;
        isLoading = false;
        return;
    }
    
    // Add results to the all results array
    allResults = allResults.concat(results);
    
    // Apply filters and sort
    applyFiltersAndSort();
    
    isLoading = false;
}

// Apply filters and sorting
function applyFiltersAndSort() {
    // Filter by media type
    if (mediaTypeFilter === 'all') {
        filteredResults = [...allResults];
    } else {
        filteredResults = allResults.filter(item => item.media_type === mediaTypeFilter);
    }
    
    // Sort results
    filteredResults = sortResults(filteredResults);
    
    // Update results count
    updateResultsCount();
    
    // Display results
    displayResults();
}

// Sort results
function sortResults(results) {
    switch (sortBy) {
        case 'rating':
            return results.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        case 'title':
            return results.sort((a, b) => {
                const titleA = (a.title || a.name || '').toLowerCase();
                const titleB = (b.title || b.name || '').toLowerCase();
                return titleA.localeCompare(titleB);
            });
        case 'release_date':
            return results.sort((a, b) => {
                const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01');
                const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01');
                return dateB - dateA;
            });
        case 'popularity':
        default:
            return results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
}

// Update results count
function updateResultsCount() {
    const countElement = document.getElementById('resultsCount');
    countElement.innerHTML = `<strong>${filteredResults.length}</strong> result${filteredResults.length !== 1 ? 's' : ''} found`;
}

// Display results
function displayResults() {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '';
    
    if (filteredResults.length === 0) {
        showNoResults();
        return;
    }
    
    filteredResults.forEach(item => {
        const card = createResultCard(item);
        resultsGrid.appendChild(card);
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
}

// Create result card
function createResultCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card fade-in';
    
    const posterPath = item.poster_path 
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
        : '/assets/home_page/alt.jpg';
    
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
    const title = item.title || item.name || 'Unknown';
    const date = item.release_date || item.first_air_date;
    const displayDate = date ? new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    }) : 'TBA';
    
    const mediaType = item.media_type === 'movie' ? 'Movie' : 'TV Show';
    const mediaIcon = item.media_type === 'movie' ? 'film' : 'tv';
    
    card.innerHTML = `
        <div class="movie-card-image">
            <img data-src="${posterPath}" class="lazyload" alt="${title}">
            <div class="movie-card-rating">
                <i class="fas fa-star"></i>
                <span>${rating}</span>
            </div>
            <div class="search-media-badge">
                <i class="fas fa-${mediaIcon}"></i>
                <span>${mediaType}</span>
            </div>
        </div>
        <div class="movie-card-content">
            <h3 class="movie-card-title">${title}</h3>
            <div class="movie-card-date">
                <i class="fas fa-calendar-alt"></i>
                <span>${displayDate}</span>
            </div>
            <p class="movie-card-overview">${item.overview || 'No description available.'}</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        scrollPosition = window.scrollY;
        showDetails(item.id, item.media_type);
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
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <i class="fas fa-search" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
            <h3 style="color: var(--text-primary);">No results found</h3>
            <p style="color: var(--text-secondary);">Try different keywords or adjust your filters</p>
        </div>
    `;
    document.getElementById('resultsCount').innerHTML = '<strong>0</strong> results found';
}

// Get details
async function getDetails(id, type) {
    const url = type === 'movie' 
        ? `/api/movie/${id}?append=videos,credits,recommendations,similar`
        : `/api/tv/${id}?append=videos,credits,recommendations,similar`;
    
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (e) {
        console.error(`Error fetching details: ${e}`);
        return null;
    }
}

// Get watch providers
async function getWatchProviders(id, type) {
    const url = type === 'movie' ? `/api/movie/${id}/providers` : `/api/tv/${id}/providers`;
    try {
        const res = await axios.get(url);
        return res.data.results || {};
    } catch (e) {
        console.error(`Error fetching watch providers: ${e}`);
        return {};
    }
}

// Show details
async function showDetails(id, type) {
    const details = await getDetails(id, type);
    if (!details) {
        alert('Error loading details. Please try again.');
        return;
    }
    
    const isMovie = type === 'movie';
    
    // Set backdrop
    const backdrop = document.querySelector('.detail-backdrop');
    if (details.backdrop_path) {
        backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`;
    }
    
    // Set basic info
    const title = isMovie ? details.title : details.name;
    document.getElementById('movieTitle').innerText = title;
    document.getElementById('movieDescription').innerText = details.overview || 'No description available.';
    
    const posterPath = details.poster_path 
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}` 
        : '/assets/home_page/alt.jpg';
    document.getElementById('itemPoster').src = posterPath;
    
    // Media type badge
    const mediaTypeBadge = document.getElementById('mediaTypeBadge');
    mediaTypeBadge.className = `media-type-badge ${isMovie ? 'movie' : 'tv'}`;
    mediaTypeBadge.innerHTML = `<i class="fas fa-${isMovie ? 'film' : 'tv'}"></i> <span>${isMovie ? 'Movie' : 'TV Show'}</span>`;
    
    // Rating
    const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A';
    document.getElementById('ratingBadge').innerText = rating;
    
        // Stats
    const countries = details.production_countries 
        ? details.production_countries.map(c => c.name).join(', ') 
        : (details.origin_country ? details.origin_country.join(', ') : 'Unknown');
    document.getElementById('itemCountry').innerText = countries;
    
    if (isMovie) {
        // Movie-specific stats
        document.getElementById('statRuntime').style.display = 'flex';
        document.getElementById('statSeasons').style.display = 'none';
        document.getElementById('statEpisodes').style.display = 'none';
        document.getElementById('creditDirector').style.display = 'flex';
        document.getElementById('creditCreator').style.display = 'none';
        
        document.getElementById('itemRuntime').innerText = details.runtime ? `${details.runtime} min` : 'N/A';
        document.getElementById('itemDate').innerText = details.release_date 
            ? new Date(details.release_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }) 
            : 'TBA';
        
        // Director
        const director = details.credits && details.credits.crew 
            ? details.credits.crew.find(c => c.job === 'Director') 
            : null;
        document.getElementById('itemDirector').innerText = director ? director.name : 'Unknown';
    } else {
        // TV-specific stats
        document.getElementById('statRuntime').style.display = 'none';
        document.getElementById('statSeasons').style.display = 'flex';
        document.getElementById('statEpisodes').style.display = 'flex';
        document.getElementById('creditDirector').style.display = 'none';
        document.getElementById('creditCreator').style.display = 'flex';
        
        document.getElementById('itemSeasons').innerText = details.number_of_seasons 
            ? `${details.number_of_seasons} Season${details.number_of_seasons > 1 ? 's' : ''}` 
            : 'N/A';
        document.getElementById('itemEpisodes').innerText = details.number_of_episodes 
            ? `${details.number_of_episodes} Episodes` 
            : 'N/A';
        document.getElementById('itemDate').innerText = details.first_air_date 
            ? new Date(details.first_air_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }) 
            : 'TBA';
        
        // Creator
        const creator = details.created_by && details.created_by.length 
            ? details.created_by.map(c => c.name).join(', ') 
            : 'Unknown';
        document.getElementById('itemCreator').innerText = creator;
    }
    
    // Genres
    const genresContainer = document.getElementById('itemGenres');
    genresContainer.innerHTML = '';
    if (details.genres && details.genres.length) {
        details.genres.forEach(genre => {
            const tag = document.createElement('span');
            tag.className = 'genre-tag';
            tag.innerText = genre.name;
            genresContainer.appendChild(tag);
        });
    }
    
    // Production
    const prod = details.production_companies && details.production_companies.length 
        ? details.production_companies.map(p => p.name).join(', ') 
        : (details.networks && details.networks.length ? details.networks.map(n => n.name).join(', ') : 'Unknown');
    document.getElementById('itemProduction').innerText = prod;
    
    // Set OTT link
    const countryCode = await getCountryByIP();
    setOTTLink(countryCode);
    
    // Trailer
    const trailer = details.videos && details.videos.results 
        ? details.videos.results.find(video => video.type === "Trailer") 
        : null;
    const trailerIframe = document.getElementById('movieTrailer');
    const trailerSection = trailerIframe.closest('.trailer-section');
    if (trailer) {
        trailerIframe.src = `https://www.youtube.com/embed/${trailer.key}`;
        trailerSection.style.display = 'block';
    } else {
        trailerSection.style.display = 'none';
    }
    
    // Cast
    renderCast(details.credits);
    
    // Watch providers
    await renderWatchProviders(id, type);
    
    // Similar content
    renderSimilarContent(details.recommendations || details.similar, type);
    
    // Show modal
    document.getElementById('movieDetails').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
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
async function renderWatchProviders(id, type) {
    const watchProviders = await getWatchProviders(id, type);
    const watchProvidersList = document.getElementById('watchProvidersList');
    watchProvidersList.innerHTML = '';
    
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

// Render similar content
function renderSimilarContent(data, type) {
    const similarRow = document.getElementById('similarRow');
    similarRow.innerHTML = '';
    
    const similar = data && data.results ? data.results : [];
    
    if (similar.length === 0) {
        similarRow.innerHTML = '<p style="color: var(--text-secondary);">No similar content found.</p>';
        return;
    }
    
    similar.slice(0, 10).forEach(item => {
        const card = document.createElement('div');
        card.className = 'similar-card';
        
        const thumb = item.poster_path 
            ? `https://image.tmdb.org/t/p/w300${item.poster_path}` 
            : '/assets/home_page/alt.jpg';
        
        const title = item.title || item.name;
        
        card.innerHTML = `
            <img src="${thumb}" alt="${title}">
            <div class="similar-card-title">${title}</div>
        `;
        
        card.addEventListener('click', async () => {
            await showDetails(item.id, type);
        });
        
        similarRow.appendChild(card);
    });
}

// Go back from details
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
        if (isLoading || noMoreResults) return;
        
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 500) {
            currentPage++;
            showLoadingMore();
            fetchSearchResults(query, currentPage);
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
        <p>Loading more results...</p>
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