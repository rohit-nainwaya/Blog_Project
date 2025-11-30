const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_KEY = process.env.API_KEY;
const BASE = 'https://api.themoviedb.org/3';

if (!TMDB_KEY) {
    console.warn('Warning: API_KEY is not set in environment. API routes will fail.');
}

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 2; // 2 minutes

function getCached(key) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.t > CACHE_TTL) {
        cache.delete(key);
        return null;
    }
    return entry.v;
}

function setCached(key, value) {
    cache.set(key, { v: value, t: Date.now() });
}

async function tmdbGet(path, params = {}) {
    if (!TMDB_KEY) throw new Error('TMDB API key not configured');
    const key = `${path}|${JSON.stringify(params)}`;
    const cached = getCached(key);
    if (cached) return cached;

    const url = `${BASE}${path}`;
    const resp = await axios.get(url, { params: { api_key: TMDB_KEY, ...params } });
    setCached(key, resp.data);
    return resp.data;
}

router.get('/popular', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tmdbGet('/movie/popular', { page });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/upcoming', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tmdbGet('/movie/upcoming', { page });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/trending', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tmdbGet('/trending/movie/day', { page });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/toprated', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tmdbGet('/movie/top_rated', { page });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Movie detail and providers
router.get('/movie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const append = req.query.append;
        const params = {};
        if (append) params.append_to_response = append;
        const data = await tmdbGet(`/movie/${id}`, params);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/movie/:id/providers', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await tmdbGet(`/movie/${id}/watch/providers`);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// TV endpoints
router.get('/tv/popular', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tmdbGet('/tv/popular', { page });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/tv/on_the_air', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tmdbGet('/tv/on_the_air', { page });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/tv/airing_today', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tmdbGet('/tv/airing_today', { page });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/tv/top_rated', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tmdbGet('/tv/top_rated', { page });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/tv/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const append = req.query.append;
        const params = {};
        if (append) params.append_to_response = append;
        const data = await tmdbGet(`/tv/${id}`, params);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/tv/:id/providers', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await tmdbGet(`/tv/${id}/watch/providers`);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Search (multi)
router.get('/search', async (req, res) => {
    try {
        const q = req.query.q || '';
        const page = req.query.page || 1;
        const data = await tmdbGet('/search/multi', { query: q, page });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
