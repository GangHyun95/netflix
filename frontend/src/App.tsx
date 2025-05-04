import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { checkAuth } from './store/authSlice';

import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/home/HomePage';
import Footer from './components/Footer';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { authUser, isCheckingAuth } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (isCheckingAuth && !authUser)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader className='size-10 animate-spin text-red-600' />
            </div>
        );
    return (
        <>
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
            </Routes>
            <Footer />
            <Toaster />
        </>
    );
}

export default App;
