import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import mediaRoutes from './routes/media.route.js';
import searchRoutes from './routes/search.route.js';

import { connectToDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/auth.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/media', protectRoute, mediaRoutes);
app.use('/api/search', protectRoute, searchRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log('server is running on PORT: ' + PORT);
    connectToDB();
});
