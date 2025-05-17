import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { axiosInstance } from '../lib/axios';

import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type mediaType = {
    id: number;
    backdrop_path: string;
    title: string;
    name: string;
};

export default function MovieSlider({
    category,
}: {
    category: {
        key: string;
        label: string;
    };
}) {
    const [media, setMedia] = useState<mediaType[]>([]);
    const [showArrows, setShowArrows] = useState(false);
    const slideRef = useRef<HTMLDivElement>(null);


    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const contentType = useSelector((state: RootState) => state.content.contentType);

    const formattedContentType =
        contentType === 'movie' ? '영화' : 'TV 프로그램';

    useEffect(() => {
        const getMedia = async () => {
            try {
                const res = await axiosInstance.get(`/media/${category.key}`, {
                    params: {
                        type: contentType,
                    },

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setMedia(res.data.content);
            } catch (error) {
                console.error('Failed to fetch media:', error);
                setMedia([]);
            }
        };

        getMedia();
    }, [contentType, category]);

    const scrollLeft = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({
                left: -slideRef.current.offsetWidth,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({
                left: slideRef.current.offsetWidth,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div
            className='relative px-5 md:px-20'
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            <h2 className='mb-4 text-2xl font-bold'>
                {category.label} {formattedContentType}
            </h2>

            <div
                className='flex space-x-4 overflow-x-scroll scrollbar-hide'
                ref={slideRef}
            >
                {media.map((item) => (
                    <Link
                        key={item.id}
                        to={`/watch/${item.id}/?type=${contentType}`}
                        className='min-w-[250px] relative group'
                    >
                        <div className='rounded-lg overflow-hidden'>
                            <img
                                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                alt='Movie image'
                                className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                            />
                        </div>
                        <p className='mt-2 text-center'>
                            {item.title || item.name}
                        </p>
                    </Link>
                ))}
            </div>

            {showArrows && (
                <>
                    <button
                        className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 z-10 cursor-pointer'
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 z-10 cursor-pointer'
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
}
