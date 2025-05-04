import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios.ts'
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

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
    image?: string;
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
    async (formData: UserType, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/auth/signup', formData);
            toast.success('회원가입 성공');
            return res.data.user;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage =
                err.response?.data?.message ||
                '회원가입 중 오류가 발생했습니다.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (formData: UserType, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/auth/login', formData);
            toast.success('로그인 성공');
            return res.data.user;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage =
                err.response?.data?.message ||
                '회원가입 중 오류가 발생했습니다.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.post('/auth/logout');
            toast.success('로그아웃 성공');
            return null;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage =
                err.response?.data?.message ||
                '회원가입 중 오류가 발생했습니다.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/auth/check');
            return res.data.user;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage =
                err.response?.data?.message ||
                '인증 확인 중 오류가 발생했습니다.';
            return rejectWithValue(errorMessage);
        }
    }
);

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
