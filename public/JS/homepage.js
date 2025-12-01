// homepage.js - Enhanced for cinematic homepage
document.addEventListener('DOMContentLoaded', () => {
    // Initialize country detection and OTT links
    initializeOTTLinks();
    
    // Define sections to populate
    const sections = [
        { id: 'trending-row', url: '/api/trending' },
        { id: 'popular-row', url: '/api/popular' },
        { id: 'toprated-row', url: '/api/toprated' },
        { id: 'upcoming-row', url: '/api/upcoming' },
        { id: 'popular-tv-row', url: '/api/tv/popular' }
    ];

    // Fetch and render all sections
    sections.forEach(s => fetchAndRenderSection(s.url, s.id));

    // Click delegation for movie tiles
    document.body.addEventListener('click', async (ev) => {
        const tile = ev.target.closest('.movie-tile');
        if (!tile) return;
        ev.preventDefault();
        const id = tile.getAttribute('data-id');
        const type = tile.getAttribute('data-type') || 'movie';
        await showMovieModal(id, type);
    });

    // Smooth scroll for hero buttons
    initializeSmoothScroll();
});

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

// OTT Links mapping
const ottLinks = {
    'IN': 'https://amzn.to/3yr2kKQ',
    'US': 'https://amzn.to/4dBo6dy',
    'GB': 'https://amzn.to/46EBCLa',
    'UK': 'https://amzn.to/46EBCLa',
    'CA': 'https://amzn.to/3yyeUb7',
    'DE': 'https://amzn.to/3M1pJFO',
    'JP': 'https://amzn.to/3AkJANH',
    'FR': 'https://amzn.to/46EevAD',
    'ES': 'https://amzn.to/4ch9MWx'
};

// Initialize OTT links based on user location
function initializeOTTLinks() {
    // Try to detect user's country (you can use an IP geolocation API)
    detectUserCountry().then(countryCode => {
        setOTTLink(countryCode);
        updateCountryDisplay(countryCode);
    }).catch(() => {
        // Default to US if detection fails
        setOTTLink('US');
        updateCountryDisplay('US');
    });
}

// Detect user country (placeholder - integrate with actual geolocation service)
async function detectUserCountry() {
    try {
        // You can integrate with services like ipapi.co, ipgeolocation.io, etc.
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_code || 'US';
    } catch (error) {
        console.log('Country detection failed, using default');
        return 'US';
    }
}

// Set OTT link based on country
function setOTTLink(countryCode) {
    const ottLinkElement = document.getElementById('primaryOttLink');
    if (ottLinkElement) {
        ottLinkElement.href = ottLinks[countryCode] || ottLinks['US'];
    }
}

// Update country display
function updateCountryDisplay(countryCode) {
    const countryNameElement = document.getElementById('currentCountryName');
    if (countryNameElement) {
        countryNameElement.textContent = countryCodes[countryCode] || 'United States';
    }
}

// Get country name from code
function getCountryName(code) {
    return countryCodes[code] || code;
}

// Fetch and render section with enhanced UI
async function fetchAndRenderSection(apiUrl, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Show loading skeleton
    container.innerHTML = createLoadingSkeleton(12);

    try {
        const res = await axios.get(`${apiUrl}?page=1`);
        const results = res.data.results || [];
        container.innerHTML = '';

        results.slice(0, 12).forEach(item => {
            const tile = createMovieTile(item);
            container.appendChild(tile);
        });

        // Add scroll functionality
        makeScrollable(container);
    } catch (e) {
        console.error('Error fetching section', apiUrl, e);
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load content. Please try again later.</p>
            </div>
        `;
    }
}

// Create movie tile element with enhanced design
function createMovieTile(item) {
    const poster = item.poster_path 
        ? `https://image.tmdb.org/t/p/w300${item.poster_path}` 
        : '/assets/home_page/alt.jpg';
    const title = item.title || item.name || 'Untitled';
    const year = (item.release_date || item.first_air_date || '').split('-')[0] || '';
    const vote = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
    const type = (item.media_type) ? item.media_type : (item.title ? 'movie' : 'tv');

    const tile = document.createElement('div');
    tile.className = 'movie-tile';
    tile.setAttribute('data-id', item.id);
    tile.setAttribute('data-type', type);
    
    tile.innerHTML = `
        <div class="movie-tile-inner">
            <div class="movie-tile-poster">
                <img src="${poster}" alt="${title}" loading="lazy" class="movie-tile-image">
                <div class="movie-tile-overlay">
                    <button class="movie-tile-play-btn">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                ${vote !== 'N/A' ? `
                <div class="movie-tile-rating">
                    <i class="fas fa-star"></i>
                    <span>${vote}</span>
                </div>
                ` : ''}
            </div>
            <div class="movie-tile-info">
                <h3 class="movie-tile-title">${title}</h3>
                ${year ? `<p class="movie-tile-year">${year}</p>` : ''}
            </div>
        </div>
    `;

    return tile;
}

// Create loading skeleton
function createLoadingSkeleton(count) {
    let skeletons = '';
    for (let i = 0; i < count; i++) {
        skeletons += `
            <div class="movie-tile skeleton-tile">
                <div class="skeleton-poster"></div>
                <div class="skeleton-title"></div>
            </div>
        `;
    }
    return skeletons;
}

// Make container horizontally scrollable
function makeScrollable(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
}

// Show movie modal with enhanced details
async function showMovieModal(id, type = 'movie') {
    try {
        const url = type === 'tv' 
            ? `/api/tv/${id}?append=videos,credits` 
            : `/api/movie/${id}?append=videos,credits`;
        
        const res = await axios.get(url);
        const d = res.data;

        // Set title
        document.getElementById('homeMovieTitle').innerText = d.title || d.name || 'Details';

        // Set overview
        const overview = d.overview || 'No overview available.';
        document.getElementById('homeMovieOverview').innerText = overview;

        // Set poster
        const poster = d.poster_path 
            ? `https://image.tmdb.org/t/p/w500${d.poster_path}` 
            : '/assets/home_page/alt.jpg';
        document.getElementById('homeMoviePoster').src = poster;

        // Set meta information
        const year = (d.release_date || d.first_air_date || '').split('-')[0] || 'N/A';
        const runtime = d.runtime ? ` • ${d.runtime} min` : '';
        const rating = d.vote_average ? ` • ⭐ ${d.vote_average.toFixed(1)}` : '';
        document.getElementById('homeMovieMeta').innerHTML = `
            <span class="modal-meta-item"><i class="fas fa-calendar"></i> ${year}</span>
            ${runtime ? `<span class="modal-meta-item"><i class="fas fa-clock"></i> ${d.runtime} min</span>` : ''}
            ${rating ? `<span class="modal-meta-item"><i class="fas fa-star"></i> ${d.vote_average.toFixed(1)}</span>` : ''}
        `;

        // Set cast
        const castContainer = document.getElementById('homeCast');
        castContainer.innerHTML = '';
        if (d.credits && d.credits.cast && d.credits.cast.length > 0) {
            d.credits.cast.slice(0, 6).forEach(c => {
                const castEl = document.createElement('div');
                castEl.className = 'modal-cast-item';
                const profileImg = c.profile_path 
                    ? `https://image.tmdb.org/t/p/w200${c.profile_path}` 
                    : '/assets/home_page/alt.jpg';
                
                castEl.innerHTML = `
                    <img src="${profileImg}" alt="${c.name}" class="modal-cast-image">
                    <div class="modal-cast-info">
                        <p class="modal-cast-name">${c.name}</p>
                        <p class="modal-cast-character">${c.character || 'Unknown'}</p>
                    </div>
                `;
                castContainer.appendChild(castEl);
            });
        } else {
            castContainer.innerHTML = '<p class="text-muted">No cast information available.</p>';
        }

        // Set trailer
        let trailerKey = '';
        if (d.videos && d.videos.results && d.videos.results.length > 0) {
            const trailer = d.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
            trailerKey = trailer ? trailer.key : '';
        }
        const iframe = document.getElementById('homeMovieTrailer');
        if (trailerKey) {
            iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
            iframe.parentElement.style.display = 'block';
        } else {
            iframe.src = '';
            iframe.parentElement.style.display = 'none';
        }

        // Show modal
        const modalEl = document.getElementById('homeMovieModal');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();

        // Clear iframe when modal is closed
        modalEl.addEventListener('hidden.bs.modal', function () {
            iframe.src = '';
        }, { once: true });

    } catch (e) {
        console.error('Error fetching movie details', e);
        alert('Failed to load movie details. Please try again.');
    }
}

// Initialize smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Enhanced carousel auto-play control
(function() {
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (bsCarousel) bsCarousel.pause();
        });

        carousel.addEventListener('mouseleave', () => {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (bsCarousel) bsCarousel.cycle();
        });
    }
})();

// Add intersection observer for lazy loading sections
(function() {
    const sections = document.querySelectorAll('.content-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
})();

