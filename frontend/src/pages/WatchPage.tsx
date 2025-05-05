import Trailers from '../components/Trailers';
import SimilarContent from '../components/SimilarContent';
import ContentDetails from '../components/ContentDetails';

export default function WatchPage() {
    return (
        <div className='min-h-screen'>
            <div className='mx-auto container px-4 py-8 h-full'>
                <Trailers />
                <ContentDetails />
                <SimilarContent />
            </div>
        </div>
    );
}
