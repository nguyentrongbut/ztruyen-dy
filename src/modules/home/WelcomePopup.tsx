'use client';

// ** Next
import Link from 'next/link';

// ** React
import { useEffect, useState } from 'react';

// ** Icon
import { X } from 'lucide-react';

// ** Component
import Button from '@/components/common/Button';

const STORAGE_KEY = 'ZTC-goodbye-popup-v1';

const GoodbyePopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const popupClosed = localStorage.getItem(STORAGE_KEY);

        if (!popupClosed) {
            setIsOpen(true);
        }
    }, []);

    const handleClosePopup = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-background relative mx-4 w-full max-w-md rounded-2xl p-6 shadow-2xl">
                <div className="custom-scroll max-h-[90dvh] overflow-y-auto -mr-2 pr-2">
                    {/* Close button */}
                    <Button
                        onClick={handleClosePopup}
                        className="absolute top-4 right-4 size-8 rounded-full transition-colors hover:bg-primary hover:text-white"
                        variant="ghost"
                    >
                        <X className="size-4" />
                    </Button>

                    {/* Header */}
                    <div className="section-header justify-center">
                        <h2 className="heading text-primary">
                            Tạm biệt 👋
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 text-sm leading-relaxed">
                        <p>
                            Chào tạm biệt hơn{' '}
                            <span className="font-semibold text-primary">
                                300.000 người dùng
                            </span>{' '}
                            đã từng ghé qua{' '}
                            <span className="font-semibold text-primary">
                                ZTruyện
                            </span>{' '}
                            ❤️
                        </p>

                        <p>
                            Sau một khoảng thời gian hoạt động, mình xin thông
                            báo rằng{' '}
                            <span className="font-semibold text-primary">
                                website sẽ chính thức đóng vào tuần sau
                            </span>.
                        </p>

                        <p>
                            Cảm ơn mọi người đã luôn đồng hành, đọc truyện,
                            góp ý và ủng hộ ZTruyện trong suốt thời gian qua.
                            Đây thật sự là một hành trình rất đáng nhớ ✨
                        </p>

                        <div className="space-y-3 rounded-xl bg-primary/5 p-4">
                            <p>
                                Từ một dự án nhỏ cá nhân đến khi có hàng trăm
                                nghìn người sử dụng, mình thật sự rất biết ơn
                                vì điều đó 🥹
                            </p>

                            <p>
                                Và trước khi khép lại, mình sẽ ra một video đơn giản
                                hướng dẫn chi tiết cách tạo một website giống{' '}
                                <span className="font-semibold text-primary">
                                    ZTruyện
                                </span>{' '}
                                để mọi người có thể tự build web riêng cho mình
                                🚀
                            </p>
                        </div>

                        <p className="text-center text-xs italic text-gray-400">
                            Cảm ơn vì đã từng là một phần của{' '}
                            <span className="not-italic font-medium text-gray-500">
                                ztruyen.io.vn
                            </span>{' '}
                            ❤️
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoodbyePopup;