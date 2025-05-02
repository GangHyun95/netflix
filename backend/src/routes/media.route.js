import express from 'express';
import {
    getMediaByCategory,
    getMediaDetails,
    getMediaTrailers,
    getSimilarMedia,
    getTrendingMedia,
} from '../controllers/media.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/trending', protectRoute, getTrendingMedia);
router.get('/:id/trailers', protectRoute, getMediaTrailers);
router.get('/:id/details', protectRoute, getMediaDetails);
router.get('/:id/similar', protectRoute, getSimilarMedia);
router.get('/:category', protectRoute, getMediaByCategory);

export default router;
