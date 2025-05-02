import { fetchFromTMDB } from '../services/tmdb.service.js';

export const getTrendingMedia = async (req, res) => {
    const { type } = req.query; 
    try {
        if (!['movie', 'tv'].includes(type)) {
            return res.status(400).json({ success: false, message: '잘못된 타입입니다.' });
        }

        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`
        );

        const randomItem =
            data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({ success: true, content: randomItem });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
        console.error('Error in getTrendingItem controller:', error.message);
    }
};

export const getMediaTrailers = async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;
    try {
        if (!['movie', 'tv'].includes(type)) {
            return res.status(400).json({ success: false, message: '잘못된 타입입니다.' });
        }

        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`
        );
        res.json({ success: true, trailers: data.results });
    } catch (error) {
        if (error.message.includes('404')) {
            return res.status(404).send(null);
        }
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
        console.error('Error in getMediaTrailers controller:', error.message);
    }
};

export const getMediaDetails = async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;
    try {
        if (!['movie', 'tv'].includes(type)) {
            return res.status(400).json({ success: false, message: '잘못된 타입입니다.' });
        }

        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/${type}/${id}?language=en-US`
        );
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (error.message.includes('404')) {
            return res.status(404).send(null);
        }
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
        console.error('Error in getMediaDetails controller:', error.message);
    }
};

export const getSimilarMedia = async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;
    try {
        if (!['movie', 'tv'].includes(type)) {
            return res.status(400).json({ success: false, message: '잘못된 타입입니다.' });
        }

        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`
        );
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        if (error.message.includes('404')) {
            return res.status(404).send(null);
        }
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
        console.error('Error in getSimilarMedia controller:', error.message);
    }
};

export const getMediaByCategory = async (req, res) => {
    const { category } = req.params;
    const { type } = req.query;
    try {
        if (!['movie', 'tv'].includes(type)) {
            return res.status(400).json({ success: false, message: '잘못된 타입입니다.' });
        }

        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`
        );
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};
