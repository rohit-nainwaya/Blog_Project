// homepage.js: populate IMDB-like rows using proxied /api endpoints
document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        { id: 'popular-row', url: '/api/popular' },
        { id: 'trending-row', url: '/api/trending' },
        { id: 'toprated-row', url: '/api/toprated' },
        { id: 'upcoming-row', url: '/api/upcoming' },
        { id: 'popular-tv-row', url: '/api/tv/popular' }
    ];

    sections.forEach(s => fetchAndRenderSection(s.url, s.id));

    // click delegation for tiles
    document.body.addEventListener('click', async (ev) => {
        const tile = ev.target.closest('.movie-tile');
        if (!tile) return;
        ev.preventDefault();
        const id = tile.getAttribute('data-id');
        const type = tile.getAttribute('data-type') || 'movie';
        await showMovieModal(id, type);
    });
});

async function fetchAndRenderSection(apiUrl, containerId) {
    try {
        const res = await axios.get(`${apiUrl}?page=1`);
        const results = res.data.results || [];
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        results.slice(0, 12).forEach(item => {
            const poster = item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : '/assets/home_page/alt.jpg';
            const title = item.title || item.name || '';
            const year = (item.release_date || item.first_air_date || '').split('-')[0] || '';
            const vote = item.vote_average ? item.vote_average.toFixed(1) : '';
            const type = (item.media_type) ? item.media_type : (item.title ? 'movie' : 'tv');

            const tile = document.createElement('a');
            tile.className = 'movie-tile text-decoration-none';
            tile.setAttribute('href', '#');
            tile.setAttribute('data-id', item.id);
            tile.setAttribute('data-type', type);
            tile.innerHTML = `
                <div>
                    <img loading="lazy" src="${poster}" alt="${title}" />
                    <div class="tile-title">${title} ${year ? `<small style="color:var(--muted)">(${year})</small>` : ''}</div>
                    <div style="color:var(--muted);font-size:0.85rem">${vote ? `⭐ ${vote}` : ''}</div>
                </div>
            `;
            container.appendChild(tile);
        });
    } catch (e) {
        console.error('Error fetching section', apiUrl, e);
    }
}

async function showMovieModal(id, type='movie') {
    try {
        const url = type === 'tv' ? `/api/tv/${id}?append=videos,credits` : `/api/movie/${id}?append=videos,credits`;
        const res = await axios.get(url);
        const d = res.data;
        document.getElementById('homeMovieTitle').innerText = d.title || d.name || 'Details';
        document.getElementById('homeMovieOverview').innerText = d.overview || '';
        const poster = d.poster_path ? `https://image.tmdb.org/t/p/w500${d.poster_path}` : '/assets/home_page/alt.jpg';
        document.getElementById('homeMoviePoster').src = poster;
        const year = (d.release_date || d.first_air_date || '').split('-')[0] || '';
        const runtime = d.runtime ? ` • ${d.runtime} min` : '';
        document.getElementById('homeMovieMeta').innerText = `${year}${runtime}`;

        // Cast
        const castContainer = document.getElementById('homeCast');
        castContainer.innerHTML = '';
        if (d.credits && d.credits.cast) {
            d.credits.cast.slice(0,6).forEach(c => {
                const el = document.createElement('div');
                el.style.width = '80px';
                el.innerHTML = `
                    <img src="${c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : '/assets/home_page/alt.jpg'}" class="img-fluid rounded" alt="${c.name}" />
                    <div style="font-size:0.8rem;color:var(--muted)">${c.name}</div>
                `;
                castContainer.appendChild(el);
            });
        }

        // Trailer
        let trailerKey = '';
        if (d.videos && d.videos.results) {
            const trailer = d.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
            trailerKey = trailer ? trailer.key : '';
        }
        const iframe = document.getElementById('homeMovieTrailer');
        iframe.src = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : '';

        // Show modal
        const modalEl = document.getElementById('homeMovieModal');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    } catch (e) {
        console.error('Error fetching movie details', e);
    }
}
