import { useSelector } from 'react-redux';
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { RootState } from '../../store/store';

export default function HomePage() {
    const { authUser } = useSelector((state: RootState) => state.auth);

    return <>{authUser ? <HomeScreen /> : <AuthScreen />}</>;
}
