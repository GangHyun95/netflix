import express from 'express';
import {
    getMediaByCategory,
    getMediaDetails,
    getMediaTrailers,
    getSimilarMedia,
    getTrendingMedia,
} from '../controllers/media.controller.js';

const router = express.Router();

router.get('/trending', getTrendingMedia);
router.get('/:id/trailers', getMediaTrailers);
router.get('/:id/details', getMediaDetails);
router.get('/:id/similar', getSimilarMedia);
router.get('/:category', getMediaByCategory);

export default router;
