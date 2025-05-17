import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/slices/authSlice';
import Loader from '../components/Loader';

export default function SignupPage() {
    const { searchParams } = new URL(window.location.href);
    const emailValue = searchParams.get('email') || '';
    const [formData, setFormData] = useState({
        email: emailValue,
        username: '',
        password: '',
    });

    const dispatch = useDispatch<AppDispatch>();
    const isSigningUp = useSelector((state: RootState) => state.auth.isSigningUp);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signup(formData));
    };

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
                        회원가입
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
                                htmlFor='username'
                                className='text-sm font-medium text-gray-300 block'
                            >
                                사용자 이름
                            </label>
                            <input
                                id='username'
                                type='text'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring'
                                placeholder='사용자 이름을 입력하세요.'
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
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

                        <button
                            type='submit'
                            className='btn w-full gap-1.5 px-4 py-2 text-sm font-semibold rounded-md'
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? <Loader /> : '회원가입'}
                        </button>
                    </form>
                    <div className='text-center text-gray-400'>
                        이미 계정이 있으신가요?{' '}
                        <Link
                            to='/login'
                            className='text-red-500 hover:underline'
                        >
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
