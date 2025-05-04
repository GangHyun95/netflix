import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

type AuthState = {
    authUser: UserType | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    isCheckingAuth: boolean;
    error: string | null;
};

type UserType = {
    email: string;
    username?: string;
    password: string;
};

const initialState: AuthState = {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    error: null,
};

export const signup = createAsyncThunk(
    'auth/signup',
    async (formData: UserType) => {
        const res = await axiosInstance.post('/v1/auth/signup', formData);
        toast.success('회원가입 성공');
        return res.data.user;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (formData: UserType) => {
        const res = await axiosInstance.post('/v1/auth/login', formData);
        toast.success('로그인 성공');
        return res.data.user;
    }
);

export const logout = createAsyncThunk('auth/logout', async (_) => {
    const res = await axiosInstance.post('/v1/auth/logout');
    toast.success('로그아웃 성공');
    return null;
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_) => {
    const res = await axiosInstance.get('/v1/auth/check');
    return res.data.user;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 회원가입
            .addCase(signup.pending, (state) => {
                state.isSigningUp = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isSigningUp = false;
                state.authUser = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isSigningUp = false;
                state.error = action.payload as string;
            })

            // 로그인
            .addCase(login.pending, (state) => {
                state.isLoggingIn = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggingIn = false;
                state.authUser = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggingIn = false;
                state.error = action.payload as string;
            })

            // 로그아웃
            .addCase(logout.pending, (state) => {
                state.isLoggingOut = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggingOut = false;
                state.authUser = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoggingOut = false;
                state.error = action.payload as string;
            })

            // 인증 확인
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isCheckingAuth = false;
                state.authUser = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isCheckingAuth = false;
                state.authUser = null;
            });
    },
});

export default authSlice.reducer;
