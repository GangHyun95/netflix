import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { axiosInstance } from '../lib/axios';

type Content = {
    id?: number;
    title?: string;
    name?: string;
    poster_path?: string;
};

export default function SimilarContent() {
    const { id } = useParams();
    const [similarContent, setSimilarContent] = useState<Content[]>([]);

    const { contentType } = useSelector((state: RootState) => state.content);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axiosInstance.get(`/media/${id}/similar`, {
                    params: {
                        type: contentType,
                    },
                });
                setSimilarContent(res.data.similar);
            } catch (error) {
                console.error('Failed to fetch similar content:', error);
                setSimilarContent([]);
            }
        };

        getSimilarContent();
    }, [contentType, id]);

    const scrollLeft = () => {
        if (sliderRef.current)
            sliderRef.current.scrollBy({
                left: -sliderRef.current.offsetWidth,
                behavior: 'smooth',
            });
    };
    const scrollRight = () => {
        if (sliderRef.current)
            sliderRef.current.scrollBy({
                left: sliderRef.current.offsetWidth,
                behavior: 'smooth',
            });
    };
    return (
        <>
            {similarContent.length > 0 && (
                <div className='mt-12 max-w-5xl mx-auto relative'>
                    <h3 className='text-3xl font-bold my-8'>
                        유사한 영화/TV 프로그램
                    </h3>
                    <div
                        className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group'
                        ref={sliderRef}
                    >
                        {similarContent.map((content) => {
                            if (content.poster_path === null) return null;
                            return (
                                <Link
                                    key={content?.id}
                                    to={`/watch/${content?.id}/?type=${contentType}`}
                                    className='w-52 flex-none'
                                >
                                    <img
                                        src={
                                            SMALL_IMG_BASE_URL +
                                            content.poster_path
                                        }
                                        alt='Poster path'
                                        className='w-full h-auto rounded-md object-cover'
                                    />
                                    <h4 className='mt-2 text-lg font-semibold'>
                                        {content?.title || content?.name}
                                    </h4>
                                </Link>
                            );
                        })}

                        <ChevronRight
                            className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 rounded-full'
                            onClick={scrollRight}
                        />
                        <ChevronLeft
                            className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 rounded-full'
                            onClick={scrollLeft}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
