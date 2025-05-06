import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

export default function GoogleLoginButton() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoggingIn } = useSelector((state: RootState) => state.auth);
    const googleLoginHandler = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (response) => {
            const code = response.code;
            await dispatch(googleLogin(code));
        },
        onError: () => {
            toast.error('Google 로그인 실패');
        },
    });

    return (
        <button
            type='button'
            className='flex justify-center items-center gap-3 w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer'
            disabled={isLoggingIn}
            onClick={() => googleLoginHandler()}
        >
            <img src='/google.png' alt='google' className='w-5' />
            {isLoggingIn ? (
                <>
                    <Loader2 className='size-5 animate-spin' />
                    Loading...
                </>
            ) : (
                'Google 계정으로 로그인'
            )}
        </button>
    );
}
