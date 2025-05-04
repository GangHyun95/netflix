import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Info, Play } from 'lucide-react';

export default function HomeScreen() {
    return (
        <>
            <div className='relative h-screen text-white'>
                <Navbar />
                <img
                    src='/extraction.jpg'
                    alt='Hero img'
                    className='absolute top-0 left-0 w-full object-cover -z-50'
                />
                <div
                    className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50'
                    aria-hidden='true'
                />
                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16'>
                    <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />
                    <div className='max-w-xl'>
                        <img
                            src='/extraction-logo.jpg'
                            className='pr-4'
                        />
                        <div className='flex gap-2 mt-6 text-lg'>
                            <p>2024</p>
                            <div>|</div>
                            <p>15+</p>
                        </div>

                        <p className='mt-4 text-lg'>
                            밤낮없이 범죄와 싸우는 베테랑 형사 서도철과
                            강력범죄수사대 형사들. 어느 날, 한 대학교수의 죽음을
                            계기로 연쇄 살인 가능성이 떠오르는데. 단서를 찾아
                            나선 형사들 앞에 충격적인 영상이 공개된다.
                        </p>
                    </div>

                    <div className='flex mt-8'>
                        <Link
                            to='/watch/123'
                            className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'
                        >
                            <Play className='size-6 mr-2 fill-black' />
                            재생
                        </Link>
                        <Link
                            to='/watch/123'
                            className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'
                        >
                            <Info className='size-6 mr-2' />
                            상세 정보
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
