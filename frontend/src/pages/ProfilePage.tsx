import { Camera, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { updateProfile } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { authUser, isUpdatingProfile } = useSelector(
        (state: RootState) => state.auth
    );

    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error(
                '파일 크기가 너무 큽니다. 최대 1MB까지 업로드할 수 있습니다.'
            );
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            if (typeof base64Image === 'string') {
                setSelectedImg(base64Image);
                await dispatch(updateProfile({ profilePic: base64Image }));
            } else {
                console.error('파일 읽기 실패: Base64 문자열이 아님');
            }
        };
    };
    return (
        <div className='h-screen pt-10'>
            <div className='max-w-2xl mx-auto px-4 py-8'>
                <div className='bg-gray-800 rounded-xl p-6 space-y-8'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold text-white'>
                            프로필
                        </h1>
                        <p className='mt-2 text-gray-400'>
                            프로필 정보를 확인하세요
                        </p>
                    </div>

                    {/* 프로필 사진 */}
                    <div className='flex flex-col items-center gap-4'>
                        <div className='relative'>
                            <img
                                src={selectedImg || authUser?.avatar}
                                alt='프로필'
                                className='w-32 h-32 rounded-full object-cover border-4 border-gray-700'
                            />
                            <label
                                htmlFor='avatar-upload'
                                className={`absolute bottom-0 right-0 bg-gray-700 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                                    isUpdatingProfile
                                        ? 'animate-pulse pointer-events-none'
                                        : ''
                                }`}
                            >
                                <Camera className='w-5 h-5 text-gray-300' />
                                <input
                                    type='file'
                                    id='avatar-upload'
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className='text-sm text-gray-400'>
                            {isUpdatingProfile
                                ? '업로드 중...'
                                : '사진을 변경하려면 카메라 아이콘을 클릭하세요.'}
                        </p>
                    </div>

                    {/* 입력 필드 */}
                    <div className='space-y-6'>
                        <div className='space-y-1.5'>
                            <div className='text-sm text-gray-400 flex items-center gap-2'>
                                <User className='w-4 h-4' />
                                이름
                            </div>
                            <p className='px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600 text-white'>
                                {authUser?.username}
                            </p>
                        </div>

                        <div className='space-y-1.5'>
                            <div className='text-sm text-gray-400 flex items-center gap-2'>
                                <Mail className='w-4 h-4' />
                                이메일 주소
                            </div>
                            <p className='px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600 text-white'>
                                {authUser?.email}
                            </p>
                        </div>
                    </div>

                    <div className='mt-6 bg-gray-800 rounded-xl p-6'>
                        <h2 className='text-lg font-medium mb-4 text-white'>
                            계정 정보
                        </h2>
                        <div className='space-y-3 text-sm text-gray-400'>
                            <div className='flex items-center justify-between py-2 border-b border-gray-700'>
                                <span>가입일</span>
                                <span>
                                    {authUser?.createdAt?.split('T')[0]}
                                </span>
                            </div>
                            <div className='flex items-center justify-between py-2'>
                                <span>계정 상태</span>
                                <span className='text-white'>
                                    {authUser?.googleId
                                        ? 'Google 회원'
                                        : authUser
                                        ? '일반 회원'
                                        : 'Unknown'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
