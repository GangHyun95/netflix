import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContentType } from '../store/slices/contentSlice';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { AxiosError } from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';
import { RootState } from '../store/store';

type SearchResult = {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    profile_path?: string;
};

export default function SearchPage() {
    const [activeTab, setActiveTab] = useState<'movie' | 'tv' | 'person'>(
        'movie'
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);

    const dispatch = useDispatch();

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const contentType = useSelector((state: RootState) => state.content.contentType);

    const location = useLocation();
    const navigate = useNavigate();

    const fetchResults = async (
        tab: 'movie' | 'tv' | 'person',
        query: string
    ) => {
        try {
            const res = await axiosInstance.get(`/search/${tab}/${query}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setResults(res.data.content);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            if (err.response?.status === 404) {
                toast.error('검색 결과가 없습니다.');
            } else {
                toast.error('검색 중 오류가 발생했습니다.');
            }
        }
    };

    const handleTabClick = (tab: 'movie' | 'tv' | 'person') => {
        setActiveTab(tab);
        setSearchTerm('');
        setResults([]);
        navigate(`?tab=${tab}`);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            toast.error('검색어를 입력하세요.');
            return;
        }
        navigate(`?tab=${activeTab}&query=${searchTerm}`);
        fetchResults(activeTab, searchTerm);
    };

    const handleAddToHistory = async (item: SearchResult) => {
        try {
            await axiosInstance.post(
                '/search/history',
                {
                    id: item.id,
                    image: item.poster_path || item.profile_path,
                    title: item.title || item.name,
                    searchType: activeTab,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        } catch (error) {
            console.error('검색 기록 추가 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab') as 'movie' | 'tv' | 'person';
        const query = params.get('query');

        if (tab && tab !== activeTab) setActiveTab(tab);
        if (query && query !== searchTerm) {
            setSearchTerm(query);
            fetchResults(tab || 'movie', query);
        }
    }, [location.search]);

    return (
        <div className='min-h-screen'>
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center items-center gap-3 mb-4'>
                    <button
                        className={`py-2 px-4 rounded ${
                            activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-800'
                        } hover:bg-red-700`}
                        onClick={() => handleTabClick('movie')}
                    >
                        영화
                    </button>

                    <button
                        className={`py-2 px-4 rounded ${
                            activeTab === 'tv' ? 'bg-red-600' : 'bg-gray-800'
                        } hover:bg-red-700`}
                        onClick={() => handleTabClick('tv')}
                    >
                        TV 프로그램
                    </button>

                    <button
                        className={`py-2 px-4 rounded ${
                            activeTab === 'person'
                                ? 'bg-red-600'
                                : 'bg-gray-800'
                        } hover:bg-red-700`}
                        onClick={() => handleTabClick('person')}
                    >
                        인물
                    </button>
                </div>

                <form
                    className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto'
                    onSubmit={handleSearch}
                >
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={
                            activeTab === 'movie'
                                ? '영화를 검색하세요'
                                : activeTab === 'tv'
                                ? 'TV 프로그램을 검색하세요'
                                : '인물을 검색하세요'
                        }
                        className='w-full p-2 rounded bg-gray-800'
                    />
                    <button className='bg-red-600 hover:bg-red-700 p-2 rounded'>
                        <Search className='size-6' />
                    </button>
                </form>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {results.map((result) => {
                        if (!result.poster_path && !result.profile_path)
                            return null;

                        return (
                            <div
                                key={result.id}
                                className='bg-gray-800 p-4 rounded'
                            >
                                {activeTab === 'person' ? (
                                    <div className='flex flex-col items-center'>
                                        <img
                                            src={
                                                ORIGINAL_IMG_BASE_URL +
                                                result.profile_path
                                            }
                                            alt={result.name}
                                            className='max-h-96 rounded mx-auto'
                                        />
                                        <h2 className='mt-2 text-xl font-bold'>
                                            {result.name}
                                        </h2>
                                    </div>
                                ) : (
                                    <Link
                                        to={
                                            '/watch/' +
                                            result.id +
                                            '?type=' +
                                            contentType
                                        }
                                        onClick={() => {
                                            handleAddToHistory(result);
                                            dispatch(setContentType(activeTab));
                                        }}
                                    >
                                        <img
                                            src={
                                                ORIGINAL_IMG_BASE_URL +
                                                result.poster_path
                                            }
                                            alt={result.title || result.name}
                                            className='w-full h-auto rounded'
                                        />
                                        <h2 className='mt-2 text-xl font-bold'>
                                            {result.title || result.name}
                                        </h2>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
