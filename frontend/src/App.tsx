import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { checkAuth } from './store/slices/authSlice';
import { setContentType } from './store/slices/contentSlice';

import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/home/HomePage';
import Footer from './components/Footer';
import WatchPage from './pages/WatchPage';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import SearchHistoryPage from './pages/SearchHistoryPage';

function App() {
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const { accessToken, isCheckingAuth } = useSelector(
        (state: RootState) => ({
            accessToken: state.auth.accessToken,
            isCheckingAuth: state.auth.isCheckingAuth,
        }),
        shallowEqual
    );
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const type = new URLSearchParams(location.search).get('type');
        if (type === 'tv' || type === 'movie') {
            dispatch(setContentType(type));
        }
    }, []);

    if (isCheckingAuth && !accessToken)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader className='size-10 animate-spin text-red-600' />
            </div>
        );
    return (
        <>
            {accessToken && <Navbar />}
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route
                    path='/login'
                    element={!accessToken ? <LoginPage /> : <Navigate to='/' />}
                />
                <Route
                    path='/signup'
                    element={
                        !accessToken ? <SignupPage /> : <Navigate to='/' />
                    }
                />
                <Route
                    path='/watch/:id'
                    element={
                        accessToken ? <WatchPage /> : <Navigate to='/login' />
                    }
                />

                <Route
                    path='/search'
                    element={
                        accessToken ? <SearchPage /> : <Navigate to='/login' />
                    }
                />

                <Route
                    path='/history'
                    element={
                        accessToken ? (
                            <SearchHistoryPage />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />

                <Route
                    path='/profile'
                    element={
                        accessToken ? <ProfilePage /> : <Navigate to='/login' />
                    }
                />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
            <Footer />
            <Toaster />
        </>
    );
}

export default App;
