import Navbar from '../components/Navbar';
import Trailers from '../components/Trailers';
import SimilarContent from '../components/SimilarContent';
import ContentDetails from '../components/ContentDetails';

export default function WatchPage() {
    return (
        <div className='bg-black min-h-screen text-white'>
            <div className='mx-auto container px-4 py-8 h-full'>
                <Navbar />
                <Trailers />
                <ContentDetails />
                <SimilarContent />
            </div>
        </div>
    );
}
