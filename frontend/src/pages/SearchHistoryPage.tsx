import { useEffect, useState } from 'react';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '../utils/dateFunction';
import { axiosInstance } from '../lib/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type SearchHistory = {
    id: number;
    title: string;
    image: string;
    createdAt: string;
    searchType: 'movie' | 'tv' | 'person';
};

export default function SearchHistoryPage() {
    const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
    const { accessToken } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        const getSearchHistory = async () => {
            try {
                const res = await axiosInstance.get('/search/history', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSearchHistory(res.data.content);
            } catch (error) {
                setSearchHistory([]);
            }
        };
        getSearchHistory();
    }, []);

    const handleDelete = async (entry: SearchHistory) => {
        try {
            await axiosInstance.delete(
                `/search/history/${entry.id}/?createdAt=${entry.createdAt}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setSearchHistory(
                searchHistory.filter(
                    (item) =>
                        !(
                            item.id === entry.id &&
                            item.createdAt === entry.createdAt
                        )
                )
            );
        } catch (error) {
            toast.error('검색 기록 삭제에 실패했습니다.');
        }
    };

    if (searchHistory?.length === 0) {
        return (
            <div className='min-h-screen'>
                <div className='max-w-6xl mx-auto px-4 py-8'>
                    <h1 className='text-3xl font-bold mb-8'>검색 기록</h1>
                    <div className='flex justify-center items-center h-96'>
                        <p className='text-xl'>검색 기록이 없습니다.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen'>
            <div className='max-w-6xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold mb-8'>검색 기록</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {searchHistory?.map((entry) => (
                        <div
                            key={`${entry.id}-${entry.createdAt}`}
                            className='bg-gray-800 p-4 rounded flex items-start'
                        >
                            <img
                                src={SMALL_IMG_BASE_URL + entry.image}
                                alt='기록 이미지'
                                className='size-16 rounded-full object-cover mr-4'
                            />
                            <div className='flex flex-col'>
                                <span className='text-lg'>{entry.title}</span>
                                <span className='text-gray-400 text-sm'>
                                    {formatDate(entry.createdAt)}
                                </span>
                            </div>

                            <span
                                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                                    entry.searchType === 'movie'
                                        ? 'bg-red-600'
                                        : entry.searchType === 'tv'
                                        ? 'bg-blue-600'
                                        : 'bg-green-600'
                                }`}
                            >
                                {entry.searchType === 'movie'
                                    ? '영화'
                                    : entry.searchType === 'tv'
                                    ? 'TV 프로그램'
                                    : '인물'}
                            </span>
                            <Trash
                                className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600'
                                onClick={() => handleDelete(entry)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
