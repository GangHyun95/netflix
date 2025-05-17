import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { formatReleaseDate } from '../utils/dateFunction';
import { SMALL_IMG_BASE_URL } from '../utils/constants';

type Content = {
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
    adult?: boolean;
    overview?: string;
    poster_path?: string;
};

export default function ContentDetails() {
    const { id } = useParams();

    const [content, setContent] = useState<Content>({});
    const [loading, setLoading] = useState(true);
    
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const contentType = useSelector((state: RootState) => state.content.contentType);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axiosInstance.get(`/media/${id}/details`, {
                    params: {
                        type: contentType,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setContent(res.data.content);
            } catch (error) {
                console.error('Failed to fetch details content:', error);
                setContent({});
            } finally {
                setLoading(false);
            }
        };

        getContentDetails();
    }, [contentType, id]);

    if (loading)
        return (
            <>
                <div className='max-w-6xl mx-auto h-screen '>
                    <div className='animate-pulse flex gap-20'>
                        <div className='flex-1'>
                            <div className='bg-gray-700 rounded-md w-full h-12 mb-8 shimmer'></div>
                            <div className='bg-gray-700 rounded-md w-full h-6 mb-4 shimmer'></div>
                            <div className='bg-gray-700 rounded-md w-full h-6 mb-4 shimmer'></div>
                            <div className='bg-gray-700 rounded-md w-full h-6 mb-4 shimmer'></div>
                            <div className='bg-gray-700 rounded-md w-full h-6 mb-4 shimmer'></div>
                        </div>
                        <div className='flex-1 bg-gray-700 rounded-md w-full h-96 mb-4 shimmer'></div>
                    </div>
                </div>
            </>
        );

    if (!content) {
        return (
            <div className=''>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mx-auto px-4 py-8 h-full mb-32'>
                        <h2 className='text-2xl sm:text-5xl font-bold text-balance'>
                            CONTENT NOT FOUND 🥲
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
            <div className='mb-4 md:mb-0'>
                <h2 className='text-5xl font-bold text-balance'>
                    {content.title || content.name}
                </h2>

                <p className='mt-2 text-lg'>
                    {formatReleaseDate(
                        (content?.release_date ||
                            content?.first_air_date) as string
                    )}{' '}
                    |{' '}
                    {content?.adult ? (
                        <span className='text-red-600'>18+</span>
                    ) : (
                        <span className='text-green-600'>PG-13</span>
                    )}
                </p>
                <p className='mt-4 text-lg'>{content?.overview}</p>
            </div>
            <img
                src={SMALL_IMG_BASE_URL + content?.poster_path}
                alt='Poster Image'
                className='max-w-[600px] rounded-md'
            />
        </div>
    );
}
