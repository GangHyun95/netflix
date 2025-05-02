import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-netflix'];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No Token Provided',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token',
            });
        }

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log('Error in protectRoute middleware:', error.message);
        return res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};
