import express from 'express';
import {
    searchPerson,
    searchMovie,
    searchTv,
    getSearchHistory,
    deleteSearchHistory,
    addSearchHistory,
} from '../controllers/search.controller.js';

const router = express.Router();

router.get('/person/:query', searchPerson);
router.get('/movie/:query', searchMovie);
router.get('/tv/:query', searchTv);

router.get('/history', getSearchHistory);
router.post('/history', addSearchHistory);

router.delete('/history/:id', deleteSearchHistory);
export default router;
