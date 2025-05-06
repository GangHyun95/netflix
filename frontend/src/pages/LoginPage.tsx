import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getGoogleClientId, login } from '../store/slices/authSlice';
import Loader from '../components/Loader';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from '../components/GoogleLoginButton';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch<AppDispatch>();
    const { isLoggingIn, googleClientId } = useSelector(
        (state: RootState) => state.auth
    );

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    useEffect(() => {
        dispatch(getGoogleClientId());
    }, [getGoogleClientId]);

    console.log(googleClientId);
    if (!googleClientId) return <Loader />;

    return (
        <div className='h-screen w-full hero-bg'>
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
                <Link to='/'>
                    <img src='/netflix-logo.png' alt='logo' className='w-52' />
                </Link>
            </header>

            <div className='flex justify-center items-center mt-20 mx-3'>
                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                    <h1 className='text-center text-2xl font-bold mb-4'>
                        로그인
                    </h1>

                    <form className='space-y-4' onSubmit={handleSignup}>
                        <div>
                            <label
                                htmlFor='email'
                                className='text-sm font-medium text-gray-300 block'
                            >
                                이메일
                            </label>
                            <input
                                id='email'
                                type='email'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring'
                                placeholder='이메일을 입력하세요.'
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='password'
                                className='text-sm font-medium text-gray-300 block'
                            >
                                비밀번호
                            </label>
                            <input
                                id='password'
                                type='password'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring'
                                placeholder='비밀번호를 입력하세요.'
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <button className='btn w-full gap-1.5 px-4 py-2 text-sm font-semibold rounded-md'>
                            {isLoggingIn ? <Loader /> : '로그인'}
                        </button>

                        <div className='flex items-center gap-4'>
                            <div className='flex-1 h-px bg-gray-300/50' />
                            <span className='text-sm text-muted-foreground'>
                                or
                            </span>
                            <div className='flex-1 h-px bg-gray-300/50' />
                        </div>
                        <GoogleOAuthProvider clientId={googleClientId}>
                            <GoogleLoginButton />
                        </GoogleOAuthProvider>
                    </form>
                    <div className='text-center text-gray-400'>
                        넷플릭스 회원이 아닌가요?{' '}
                        <Link
                            to='/signup'
                            className='text-red-500 hover:underline'
                        >
                            지금 가입하세요.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
