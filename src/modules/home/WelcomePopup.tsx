'use client';

// ** Next
import Link from 'next/link';

// ** React
import { useEffect, useState } from 'react';

// ** Icon
import { X } from 'lucide-react';

// ** Component
import Button from '@/components/common/Button';

const STORAGE_KEY = 'ZTC-popup-v2';

const WelcomePopup = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        localStorage.removeItem('ZTC-popup-count');

        const hasShown = localStorage.getItem(STORAGE_KEY);
        if (!hasShown) setOpen(true);
    }, []);

    const handleClose = () => {
        localStorage.setItem(STORAGE_KEY, '1');
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-background rounded-2xl p-6 max-w-md w-full mx-4 relative shadow-xl">
                <div className="overflow-y-auto custom-scroll max-h-[90dvh] -mr-2 sm:mr-0">
                    {/* Close button */}
                    <Button
                        onClick={handleClose}
                        className="absolute top-4 right-4 size-8 rounded-full hover:bg-primary hover:text-white transition-colors dark:hover:bg-primary dark:hover:text-white"
                        variant="ghost"
                    >
                        <X className="size-4" />
                    </Button>

                    {/* Header */}
                    <div className="section-header justify-center">
                        <h2 className="heading text-primary">Thông báo!</h2>
                    </div>

                    {/* Content */}
                    <div className="text-sm space-y-3">
                        <p>
                            Chào các đọc giả yêu truyện của{' '}
                            <span className="font-semibold text-primary">Ztruyện</span>{' '}
                            nè! ヾ(≧▽≦*)o
                        </p>

                        <p>
                            Tin vui! <span className="font-semibold">ZTruyện</span> giờ đã có{' '}
                            <span className="font-semibold text-primary">bản PWA</span> — bạn có thể cài
                            thẳng lên màn hình chính, đọc truyện nhanh hơn mà không cần mở trình duyệt!
                        </p>

                        <ul className="bg-primary/5 rounded-xl p-3 space-y-2">
                            <li className="flex items-center gap-2">
                                📱 Cài như app thật — không qua App Store
                            </li>
                            <li className="flex items-center gap-2">
                                ⚡ Mở nhanh, giao diện toàn màn hình
                            </li>
                        </ul>

                        <p className="text-center leading-relaxed">
                            Xem hướng dẫn cài đặt chi tiết tại bài post bên dưới nhé!
                        </p>

                        <Link
                            href="https://www.facebook.com/share/p/1NTunHTvEx/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2.5 px-4 rounded-xl transition-colors"
                            onClick={handleClose}
                        >
                            👉 Xem hướng dẫn cài PWA
                        </Link>

                        <p className="text-center text-gray-400 italic text-xs">
                            Cảm ơn bạn đã đồng hành cùng{' '}
                            <span className="not-italic font-medium text-gray-500">ztruyen.io.vn</span>{' '}
                            ~ Sắp có update ngon rồi! ❤️
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePopup;