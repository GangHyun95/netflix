import { useSelector } from 'react-redux';
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { RootState } from '../../store/store';

export default function HomePage() {
    const { accessToken } = useSelector((state: RootState) => state.auth);

    return <>{accessToken ? <HomeScreen /> : <AuthScreen />}</>;
}
