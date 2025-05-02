import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'
import { generateToken } from '../lib/utils.js'

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({
                success: false,
                message: '모든 필수 항목을 입력해 주세요.',
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: '이메일 형식이 올바르지 않습니다.',
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: '비밀번호는 최소 6자 이상이어야 합니다.',
            });
        }
        
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: '이미 사용 중인 이메일입니다.',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const image =
            PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = await User({
            email,
            password: hashedPassword,
            username,
            image,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                success: true,
                user: {
                    ...newUser._doc,
                    password: '',
                },
            });
        }
    } catch (error) {
        console.log('Error in signup controller:', error.message);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: '모든 필수 항목을 입력해 주세요.',
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: '이메일 또는 비밀번호가 올바르지 않습니다.',
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: '이메일 또는 비밀번호가 올바르지 않습니다.',
            });
        }

        generateToken(user._id, res);
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: '',
            },
        });
    } catch (error) {
        console.log('Error in login controller:', error.message);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt-netflix');
        res.status(200).json({
            success: true,
            message: '로그아웃 성공',
        });
    } catch (error) {
        console.log('Error in logout controller:', error.message);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};
