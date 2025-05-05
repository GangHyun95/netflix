import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const emailInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            emailInputRef.current?.focus();
            return;
        }
        navigate('/signup?email=' + email);
    };
    return (
        <div className='hero-bg relative'>
            {/* Navbar */}
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
                <img
                    src='/netflix-logo.png'
                    alt='Netflix logo'
                    className='w-32 md:w-52'
                />
                <Link
                    to='login'
                    className='btn py-1 px-2 rounded'
                >
                    로그인
                </Link>
            </header>

            {/* hero section */}
            <div className='flex flex-col items-center justify-center text-center py-40 max-w-6xl mx-auto'>
                <h1 className='text-4xl md:text-6xl font-bold mb-4 leading-tight'>
                    영화, 시리즈 등을 무제한으로
                </h1>
                <p className='text-lg mb-8'>
                    어디서나 자유롭게 시청하세요. 해지는 언제든 가능합니다.
                </p>
                <p className='mb-4'>
                    시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면
                    이메일 주소를 입력하세요.
                </p>

                <form
                    className='flex flex-col md:flex-row gap-4 w-1/2'
                    onSubmit={handleSubmit}
                >
                    <input
                        ref={emailInputRef}
                        type='email'
                        placeholder='이메일 주소'
                        className='p-4 rounded flex-1 bg-black/80 border border-gray-700'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className='btn text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded'>
                        시작하기
                        <ChevronRight className='size-6 md:size-8' />
                    </button>
                </form>
            </div>

            {/* separator */}
            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />
            <div className='py-10 bg-black'>
                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
                    {/* left */}
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
                            TV로 즐기세요
                        </h2>
                        <p className='text-lg md:text-xl'>
                            스마트 TV, PlayStation, Xbox, Chromecast, Apple TV,
                            블루레이 플레이어 등 다양한 디바이스에서 시청하세요.
                        </p>
                    </div>
                    {/* right */}
                    <div className='flex-1 relative'>
                        <img
                            src='/tv.png'
                            alt='Tv Image'
                            className='mt-4 z-20 relative'
                        />
                        <video
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                        >
                            <source src='/hero-vid.m4v' type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>
            {/* separator */}
            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />
            <div className='py-10 bg-black'>
                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2'>
                    {/* left */}
                    <div className='flex-1'>
                        <div className='relative'>
                            <img
                                src='/stranger-things-lg.png'
                                alt='Stranger Things img'
                                className='mt-4'
                            />

                            <div className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>
                                <img
                                    src='/stranger-things-sm.png'
                                    alt='image'
                                    className='h-full'
                                />
                                <div className='flex justify-between items-center w-full'>
                                    <div className='flex flex-col gap-0'>
                                        <span className='text-md lg:text-lg font-bold'>
                                            Stranger Things
                                        </span>
                                        <span className='text-sm text-blue-500'>
                                            Downloading...
                                        </span>
                                    </div>
                                    <img
                                        src='/download-icon.gif'
                                        alt=''
                                        className='h-12'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* right */}
                    <div className='flex-1 md:text-left text-center'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>
                            즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요
                        </h2>
                        <p className='text-lg md:text-xl'>
                            비행기, 기차, 잠수함. 어디서든 시청하세요.
                        </p>
                    </div>
                </div>
            </div>

            {/* separator */}
            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />
            <div className='py-10 bg-black'>
                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
                    {/* left */}
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
                            어디서나 자유롭게 시청하세요
                        </h2>
                        <p className='text-lg md:text-xl'>
                            각종 영화와 시리즈를 스마트폰, 태블릿, 노트북,
                            TV에서 무제한으로 스트리밍하세요.
                        </p>
                    </div>
                    {/* right */}
                    <div className='flex-1 relative overflow-hidden'>
                        <img
                            src='/device-pile.png'
                            alt='Device Image'
                            className='mt-4 z-20 relative'
                        />
                        <video
                            className='absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]'
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                        >
                            <source src='/video-devices.m4v' type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>

            {/* separator */}
            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

            <div className='py-10 bg-black'>
                <div className='flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2'>
                    {/* left */}
                    <div className='flex-1 relative'>
                        <img
                            src='/kids.png'
                            alt='Enjoy on your TV'
                            className='mt-4'
                        />
                    </div>
                    {/* right */}
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
                            어린이 전용 프로필을 만들어 보세요
                        </h2>
                        <p className='text-lg md:text-xl'>
                            자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는
                            모험. 자녀에게 이 특별한 경험을 선물하세요. 넷플릭스
                            회원이라면 무료입니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
