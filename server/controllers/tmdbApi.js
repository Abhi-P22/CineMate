const axios = require('axios')
const proModel = require('../models/productModel')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchWithRetry(url, options = {}, retries = 3, backoff = 500) {
    for (let i = 0; i <= retries; i++) {
        try {
            return await axios.get(url, { timeout: 5000, ...options })
        } catch (e) {
            const isTransient = e.code === 'ECONNRESET' || e.code === 'ETIMEDOUT' || !e.response
            if (i === retries || !isTransient) throw e
            await sleep(backoff * (i + 1))
        }
    }
}

const tmdbApi = async () => {
    try {
        if (!process.env.TMDB_API_KEY) {
            console.warn('TMDB_API_KEY not set — skipping TMDB population.')
            return
        }

        const headers = {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            accept: 'application/json',
        }

        const genRes = await fetchWithRetry('https://api.themoviedb.org/3/genre/movie/list', { headers })
        const genreMap = {}
        for (const genre of genRes.data.genres || []) {
            genreMap[genre.id] = genre.name
        }

        const res = await fetchWithRetry('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', { headers })
        const movies = res.data.results || []

        if (!movies.length) {
            console.info('No movies returned from TMDB.')
            return
        }

        const movieDocs = movies.map((movie) => ({
            product_id: movie.id,
            title: movie.title || 'Untitled',
            year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
            genre: (movie.genre_ids || []).map((id) => genreMap[id]).filter(Boolean),
            images: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
            description: movie.overview || '',
        }))

        await proModel.insertMany(movieDocs, { ordered: false })
        console.info(`Inserted ${movieDocs.length} movies into database.`)
    } catch (e) {
        console.error('Error populating database:', e.code || e.response?.status || 'NO_CODE', e.message)
    }
}

module.exports = tmdbApi
