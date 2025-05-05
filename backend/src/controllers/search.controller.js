import User from '../models/user.model.js';
import { fetchFromTMDB } from '../services/tmdb.service.js';

export const searchPerson = async (req, res) => {
    const { query } = req.params;

    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=ko-KR&page=1`
        );

        if (response.results.length === 0) {
            return res.status(404).json({ message: '검색 결과가 없습니다.' });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: 'person',
                    createdAt: new Date(),
                },
            },
        });
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error('Error in searchPerson controller: ', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

export const searchMovie = async (req, res) => {
    const { query } = req.params;

    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`
        );

        if (response.results.length === 0) {
            return res.status(404).json({ message: '검색 결과가 없습니다.' });
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: 'movie',
                    createdAt: new Date(),
                },
            },
        });
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error('Error in searchMovie controller: ', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

export const searchTv = async (req, res) => {
    const { query } = req.params;

    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=ko-KR&page=1`
        );
        if (response.results.length === 0) {
            return res.status(404).json({ message: '검색 결과가 없습니다.' });
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: 'tv',
                    createdAt: new Date(),
                },
            },
        });

        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error('Error in searchTv controller: ', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

export const getSearchHistory = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            content: req.user.searchHistory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
        console.error('Error in getSearchHistory controller: ', error);
    }
};

export const deleteSearchHistory = async (req, res) => {
    const { id } = req.params;
    const { createdAt } = req.query;

    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: parseInt(id),
                    createdAt: new Date(createdAt),
                },
            },
        });

        res.status(200).json({
            success: true,
            message: 'Search history deleted successfully',
        });
    } catch (error) {
        console.log('Error in deleteSearchHistory controller: ', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};
