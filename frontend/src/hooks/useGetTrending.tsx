import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { axiosInstance } from '../lib/axios';

type TrendingContent = {
    backdrop_path: string;
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
    overview: string;
    adult: boolean;
    id: number;
} | null;

export default function useGetTrending() {
    const [trendingContent, setTrendingContent] =
        useState<TrendingContent>(null);
    const { contentType } = useSelector((state: RootState) => state.content);

    useEffect(() => {
        const getTrendingContent = async () => {
            try {
                const res = await axiosInstance.get(`/media/trending`, {
                    params: {
                        type: contentType,
                    },
                });
                setTrendingContent(res.data.content);
            } catch (error) {
                console.error('Failed to fetch trending content:', error);
                setTrendingContent(null);
            }
        };

        getTrendingContent();
    }, [contentType]);

    return { trendingContent };
}
