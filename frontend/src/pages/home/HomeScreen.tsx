import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import Loader from '../../components/Loader';

export default function HomeScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoggingOut } = useSelector((state: RootState) => state.auth);
    return (
        <div>
            HomeScreen
            <button className='btn' onClick={() => dispatch(logout())}>
                {isLoggingOut ? <Loader /> : '로그아웃'}
            </button>
        </div>
    );
}
