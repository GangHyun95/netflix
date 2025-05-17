import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ReactPlayer from 'react-player';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Trailer = {
    key: string;
};

export default function Trailers() {
    const { id } = useParams();
    const [trailers, setTrailers] = useState<Trailer[]>([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const contentType = useSelector((state: RootState) => state.content.contentType);

    useEffect(() => {
        const getTrailers = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get(`/media/${id}/trailers`, {
                    params: {
                        type: contentType,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setTrailers(res.data.trailers);
            } catch (error) {
                console.error('Failed to fetch trailers:', error);
                setTrailers([]);
            } finally {
                setLoading(false);
            }
        };

        getTrailers();
    }, [contentType, id]);

    const handlePrev = () => {
        if (currentTrailerIdx > 0) {
            setCurrentTrailerIdx(currentTrailerIdx - 1);
        }
    };
    const handleNext = () => {
        if (currentTrailerIdx < trailers.length - 1) {
            setCurrentTrailerIdx(currentTrailerIdx + 1);
        }
    };
    if (loading)
        return (
            <>
                <div className='min-h-screen mb-8 p-2 sm:px-10 md:px-32 overflow-hidden'>
                    <div className='animate-pulse overflow-hidden'>
                        <div className='bg-gray-700 rounded-md w-full h-[70vh] mx-auto mb-4 shimmer'></div>
                    </div>
                </div>
            </>
        );
    return (
        <div className='relative aspect-video mb-8 p-2 sm:px-10 md:px-32'>
            {trailers.length > 0 && (
                <div className='flex justify-between items-center mb-4'>
                    <button
                        className={`bg-gray-500/70 hover:bg-gray-500 py-2 px-4 rounded absolute left-0 top-5/12 -translate-y-1/2 ${
                            currentTrailerIdx === 0
                                ? 'cursor-not-allowed opacity-50'
                                : 'cursor-pointer'
                        }`}
                        onClick={handlePrev}
                        disabled={currentTrailerIdx === 0}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className={`bg-gray-500/70 hover:bg-gray-500 py-2 px-4 rounded absolute right-0 top-5/12 -translate-y-1/2 ${
                            currentTrailerIdx === trailers.length - 1
                                ? 'cursor-not-allowed opacity-50'
                                : 'cursor-pointer'
                        }`}
                        onClick={handleNext}
                        disabled={currentTrailerIdx === trailers.length - 1}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            {trailers.length > 0 && (
                <ReactPlayer
                    controls={true}
                    width={'100%'}
                    height={'70vh'}
                    className='mx-auto overflow-hidden rounded-lg'
                    url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                />
            )}

            {trailers.length === 0 && (
                <h2 className='text-xl text-center mt-5 py-60'>
                    이용 가능한 트레일러가 없습니다. 😢
                </h2>
            )}
        </div>
    );
}
