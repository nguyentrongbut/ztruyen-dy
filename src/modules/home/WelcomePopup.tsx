'use client';

// ** Next
import Link from 'next/link';

// ** React
import { useEffect, useState } from 'react';

// ** Icon
import { X } from 'lucide-react';

// ** Component
import Button from '@/components/common/Button';

const STORAGE_KEY = 'ZTC-popup-count';

const WelcomePopup = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const hasShown = localStorage.getItem(STORAGE_KEY);

        if (!hasShown) {
            setOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem(STORAGE_KEY, '1');
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative shadow-xl ">
               <div className='overflow-y-auto custom-scroll max-h-screen -mr-2 sm:mr-0'>
                   {/* Close button */}
                   <Button
                       onClick={handleClose}
                       className="absolute top-4 right-4 size-8 rounded-full hover:bg-primary hover:text-white transition-colors"
                       variant="ghost"
                   >
                       <X className="size-4" />
                   </Button>

                   {/* Header */}
                   <div className="section-header justify-center">
                       <h2 className="heading">Thông báo!</h2>
                   </div>

                   {/* Content */}
                   <div className="text-sm text-gray-600 space-y-3">
                       <p>
                           Chào các đọc giả yêu truyện của{' '}
                           <span className="font-semibold text-primary">
                            Ztruyện
                        </span>{' '}
                           nè! ヾ(≧▽≦*)o
                       </p>

                       <p>
                           Bản <span className="font-semibold">Beta v1.1</span>{' '}
                           đang được làm với các tính năng:
                       </p>

                       <ul className="bg-gray-50 rounded-xl p-3 space-y-2">
                           <li className="flex items-center gap-2">
                               🔐 Đăng nhập / Đăng ký
                           </li>
                           <li className="flex items-center gap-2">
                               💬 Bình luận truyện
                           </li>
                           <li className="flex items-center gap-2">
                               🏆 Top truyện yêu thích & bình luận nhiều nhất
                           </li>
                       </ul>

                       <p className="text-center leading-relaxed">
                           Nếu bạn có góp ý về UI/UX thì comment tại post này nhé!
                       </p>

                       <Link
                           href="https://www.facebook.com/p/Ztruyen-io-vn-61582484157563"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2.5 px-4 rounded-xl transition-colors"
                       >
                           👉 Bài post góp ý cải thiện giao diện
                       </Link>

                       <p className="text-center">
                           Mình sẽ ưu tiên update theo góp ý hợp lý. ❤️
                       </p>

                       <p className="text-center text-gray-400 italic text-xs">
                           Cảm ơn bạn đã đồng hành cùng{' '}
                           <span className="not-italic font-medium text-gray-500">
                            ztruyen.io.vn
                        </span>{' '}
                           ~ Sắp có update ngon rồi!
                       </p>
                   </div>
               </div>
            </div>
        </div>
    );
};

export default WelcomePopup;
