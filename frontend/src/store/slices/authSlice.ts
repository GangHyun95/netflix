import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios.ts';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { RootState } from '../store.ts';

type AuthState = {
    accessToken: string | null;
    authUser: UserType | null;
    googleClientId: string;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    isCheckingAuth: boolean;
    isUpdatingProfile: boolean;
    error: string | null;
};

type UserType = {
    email: string;
    username?: string;
    password: string;
    avatar?: string;
    profilePic?: string;
    createdAt?: string;
    updatedAt?: string;
    googleId?: string;
};

const initialState: AuthState = {
    accessToken: null,
    authUser: null,
    googleClientId: '',
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,
    error: null,
};

export const signup = createAsyncThunk(
    'auth/signup',
    async (formData: UserType, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/auth/signup', formData);
            toast.success('회원가입 성공');
            return res.data;
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
            return res.data;
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
            const res = await axiosInstance.post('/auth/refresh');
            return res.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage =
                err.response?.data?.message ||
                '인증 확인 중 오류가 발생했습니다.';
            return rejectWithValue(errorMessage);
        }
    }
);

export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (code: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/auth/google', {
                code,
            });
            toast.success('구글 로그인 성공');
            return res.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage =
                err.response?.data?.message ||
                '구글 로그인 중 오류가 발생했습니다.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const getGoogleClientId = createAsyncThunk(
    'auth/getGoogleClientId',
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/auth/google');
            return res.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage =
                err.response?.data?.message ||
                '구글 클라이언트 ID를 가져오는 중 오류가 발생했습니다.';
            console.error('Error:', errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (data: { profilePic: string }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const { accessToken } = state.auth;
            const res = await axiosInstance.put('/auth/update-profile', data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toast.success('프로필 업데이트 성공');
            return res.data.user;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage =
                err.response?.data?.message ||
                '프로필 업데이트 중 오류가 발생했습니다.';
            toast.error(errorMessage);
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
                state.authUser = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isSigningUp = false;
                state.error = action.payload as string;
            });

        // 로그인
        builder
            .addCase(login.pending, (state) => {
                state.isLoggingIn = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggingIn = false;
                state.authUser = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggingIn = false;
                state.error = action.payload as string;
            });

        // 로그아웃
        builder
            .addCase(logout.pending, (state) => {
                state.isLoggingOut = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggingOut = false;
                state.accessToken = null;
                state.authUser = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoggingOut = false;
                state.error = action.payload as string;
            });

        // 인증 확인
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isCheckingAuth = false;
                state.authUser = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isCheckingAuth = false;
                state.authUser = null;
                state.accessToken = null;
            });

        // 프로필 업데이트
        builder
            .addCase(updateProfile.pending, (state) => {
                state.isUpdatingProfile = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isUpdatingProfile = false;
                state.authUser = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isUpdatingProfile = false;
                state.error = action.payload as string;
            });
        // 구글 로그인
        builder
            .addCase(googleLogin.pending, (state) => {
                state.isLoggingIn = true;
                state.error = null;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.isLoggingIn = false;
                state.authUser = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoggingIn = false;
                state.error = action.payload as string;
            });
        // 구글 클라이언트 ID 가져오기
        builder
            .addCase(getGoogleClientId.fulfilled, (state, action) => {
                state.googleClientId = action.payload.googleClientId;
            })
            .addCase(getGoogleClientId.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default authSlice.reducer;
