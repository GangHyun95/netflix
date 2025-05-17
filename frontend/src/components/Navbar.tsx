import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { setContentType } from '../store/slices/contentSlice';

import { Link, useLocation } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react';

export default function Navbar() {
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const authUser = useSelector((state: RootState) => state.auth.authUser);
    const contentType = useSelector((state: RootState) => state.content.contentType);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleTabClick = (type: 'movie' | 'tv') => {
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }

        if (pathname === '/' && contentType === type) {
            return;
        }

        dispatch(setContentType(type));
    };

    return (
        <header className='relative max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            <div className='flex items-center gap-10 z-50'>
                <Link to={`/?type=${contentType}`}>
                    <img
                        src='/netflix-logo.png'
                        alt='Netflix Logo'
                        className='w-32 sm:w-40'
                    />
                </Link>
                {/* desktop navbar items */}
                <div className='hidden sm:flex gap-2 items-center'>
                    <Link
                        to='/?type=movie'
                        className={`hover:underline ${
                            pathname === '/' && contentType === 'movie'
                                ? 'underline'
                                : ''
                        }`}
                        onClick={() => handleTabClick('movie')}
                    >
                        영화
                    </Link>
                    <div className='text-gray-500'>|</div>
                    <Link
                        to='/?type=tv'
                        className={`hover:underline ${
                            pathname === '/' && contentType === 'tv'
                                ? 'underline'
                                : ''
                        }`}
                        onClick={() => handleTabClick('tv')}
                    >
                        TV 프로그램
                    </Link>
                    <div className='text-gray-500'>|</div>
                    <Link
                        to='/history'
                        className={`hover:underline ${
                            pathname === '/history' ? 'underline' : ''
                        }`}
                    >
                        검색 기록
                    </Link>
                </div>
            </div>

            <div className='flex gap-5 items-center z-50'>
                <Link to='/search'>
                    <Search className='size-6 cursor-pointer' />
                </Link>
                <Link to='/profile'>
                    <img
                        src={authUser?.avatar}
                        alt='Avatar'
                        className='h-8 rounded cursor-pointer'
                    />
                </Link>
                <LogOut
                    className='size-6 cursor-pointer'
                    onClick={() => dispatch(logout())}
                />
                <div className='sm:hidden'>
                    <Menu
                        className='size-6 cursor-pointer'
                        onClick={toggleMobileMenu}
                    />
                </div>
            </div>
            {/* mobile navbar items */}
            {isMobileMenuOpen && (
                <div className='absolute top-20 left-0 bg-black/90 w-full sm:hidden z-50 border-none rounded p-2'>
                    <Link
                        to={'/?type=movie'}
                        className={`block p-2 hover:underline ${
                            pathname === '/' && contentType === 'movie'
                                ? 'underline'
                                : ''
                        }`}
                        onClick={() => handleTabClick('movie')}
                    >
                        영화
                    </Link>
                    <Link
                        to={'/?type=tv'}
                        className={`block p-2 hover:underline ${
                            pathname === '/' && contentType === 'tv'
                                ? 'underline'
                                : ''
                        }`}
                        onClick={() => handleTabClick('tv')}
                    >
                        TV 프로그램
                    </Link>
                    <Link
                        to={'/history'}
                        className={`block hover:underline p-2 ${
                            pathname === '/history' ? 'underline' : ''
                        }`}
                        onClick={toggleMobileMenu}
                    >
                        검색 기록
                    </Link>
                </div>
            )}
        </header>
    );
}
