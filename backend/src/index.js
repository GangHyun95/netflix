import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';
import mediaRoutes from './routes/media.route.js';
import searchRoutes from './routes/search.route.js';

import { connectToDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/auth.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/media', protectRoute, mediaRoutes);
app.use('/api/v1/search', protectRoute, searchRoutes);

app.listen(PORT, () => {
    console.log('server is running on PORT: ' + PORT);
    connectToDB();
});
