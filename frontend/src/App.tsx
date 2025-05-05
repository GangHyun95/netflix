import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function App() {
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { authUser, isCheckingAuth } = useSelector(
        (state: RootState) => state.auth
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

    if (isCheckingAuth && !authUser)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader className='size-10 animate-spin text-red-600' />
            </div>
        );
    return (
        <>
            {authUser && <Navbar />}
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route
                    path='/login'
                    element={!authUser ? <LoginPage /> : <Navigate to='/' />}
                />
                <Route
                    path='/signup'
                    element={!authUser ? <SignupPage /> : <Navigate to='/' />}
                />
                <Route
                    path='/watch/:id'
                    element={
                        authUser ? <WatchPage /> : <Navigate to='/login' />
                    }
                />

                <Route
                    path='/search'
                    element={
                        authUser ? <SearchPage /> : <Navigate to='/login' />
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
