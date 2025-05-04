import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { setContentType } from '../store/slices/contentSlice';

import { Link } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react';

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            <div className='flex items-center gap-10 z-50'>
                <Link to='/'>
                    <img
                        src='/netflix-logo.png'
                        alt='Netflix Logo'
                        className='w-32 sm:w-40'
                    />
                </Link>
                {/* desktop navbar items */}
                <div className='hidden sm:flex gap-2 items-center'>
                    <Link
                        to='/'
                        className='hover:underline'
                        onClick={() => dispatch(setContentType('movie'))}
                    >
                        영화
                    </Link>
                    <div className='text-gray-500'>|</div>
                    <Link
                        to='/'
                        className='hover:underline'
                        onClick={() => dispatch(setContentType('tv'))}
                    >
                        TV 프로그램
                    </Link>
                    <div className='text-gray-500'>|</div>
                    <Link to='/history' className='hover:underline'>
                        시청 기록
                    </Link>
                </div>
            </div>

            <div className='flex gap-5 items-center z-50'>
                <Link to='/search'>
                    <Search className='size-6 cursor-pointer' />
                </Link>
                <img
                    src={authUser?.image}
                    alt='Avatar'
                    className='h-8 rounded cursor-pointer'
                />
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
                <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                    <Link
                        to={'/'}
                        className='block hover:underline p-2'
                        onClick={toggleMobileMenu}
                    >
                        영화
                    </Link>
                    <Link
                        to={'/'}
                        className='block hover:underline p-2'
                        onClick={toggleMobileMenu}
                    >
                        TV 프로그램
                    </Link>
                    <Link
                        to={'/history'}
                        className='block hover:underline p-2'
                        onClick={toggleMobileMenu}
                    >
                        시청 기록
                    </Link>
                </div>
            )}
        </header>
    );
}
