import express from 'express';
import axios from 'axios';

export const getNowPlaying = async (req: express.Request, res: express.Response) => {
    try {
        const TMDB_URL = process.env.TMDB_URL;
        const TMDB_API_KEY = process.env.TMDB_API;

        if (!TMDB_URL || !TMDB_API_KEY) {
            res.status(500).json({ error: 'Missing TMDB_URL or TMDB_API_KEY in environment variables.' });
            return;
        }

        const { page = 1 } = req.query;

        if (isNaN(Number(page)) || Number(page) <= 0) {
            res.status(400).json({ error: 'page must be a valid number greater than 0.' });
            return;
        }

        const response = await axios.get(`${TMDB_URL}/movie/now_playing`, {
            params: {
                api_key: TMDB_API_KEY,
                page: Number(page),
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while fetching now playing movies.' });
    }
}

export const getPopular = async (req: express.Request, res: express.Response) => {
    try {
        const TMDB_URL = process.env.TMDB_URL;
        const TMDB_API_KEY = process.env.TMDB_API;

        if (!TMDB_URL || !TMDB_API_KEY) {
            res.status(500).json({ error: 'Missing TMDB_URL or TMDB_API_KEY in environment variables.' });
            return;
        }

        const response = await axios.get(`${TMDB_URL}/movie/popular`, {
            params: { api_key: TMDB_API_KEY },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while fetching popular movies.' });
    }
}

export const getCredits = async (req: express.Request, res: express.Response) => {
    try {
        const TMDB_URL = process.env.TMDB_URL;
        const TMDB_API_KEY = process.env.TMDB_API;

        if (!TMDB_URL || !TMDB_API_KEY) {
            res.status(500).json({ error: 'Missing TMDB_URL or TMDB_API_KEY in environment variables.' });
            return;
        }

        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ error: 'movie_id is required and must be a valid number.' });
            return;
        }

        const response = await axios.get(`${TMDB_URL}/movie/${id}/credits`, {
            params: { api_key: TMDB_API_KEY },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while fetching movie credits.' });
    }
}

export const getDetail = async (req: express.Request, res: express.Response) => {
    try {
        const TMDB_URL = process.env.TMDB_URL;
        const TMDB_API_KEY = process.env.TMDB_API;

        if (!TMDB_URL || !TMDB_API_KEY) {
            res.status(500).json({ error: 'Missing TMDB_URL or TMDB_API_KEY in environment variables.' });
            return;
        }

        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ error: 'movie_id is required and must be a valid number.' });
            return;
        }

        const response = await axios.get(`${TMDB_URL}/movie/${id}`, {
            params: { api_key: TMDB_API_KEY },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while fetching movie credits.' });
    }
}