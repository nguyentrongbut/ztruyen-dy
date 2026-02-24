// ** React
import { Suspense } from 'react';

// ** Next
import type { Metadata } from 'next';

// ** Layouts
import DefaultLayout from '@/layouts/DefaultLayout';

// ** Modules
import GridCarousel from '@/modules/home/GridCarousel';
import NavbarGenre from '@/modules/home/NavbarGenre';
import GenderComicO from '@/modules/home/GenderComicO';
import GenderComicTw from '@/modules/home/GenderComicTw';
import GenderComicTh from '@/modules/home/GenderComicTh';
import RecommendedComic from '@/modules/home/RecommendedComic';

// ** Skeletons
import GridCarouselSkeleton from '@/skeleton/home/GridCarouselSkeleton';
import NavbarGenreSkeleton from '@/skeleton/home/NavbarGenreSkeleton';
import ListComicSkeleton from '@/skeleton/home/ListComicSkeleton';
import RecommendedComicSkeleton from '@/skeleton/home/RecommendedComicSkeleton';


export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_YOUR_WEBSITE || ''),
    title: 'Đọc truyện tranh Manhwa, Manga, Manhua Online - Ztruyện ',
    description:
        'Web đọc truyện tranh manhwa, manhua, manga, ngôn tình, tiên hiệp, kiếm hiệp online hay và mới nhất cập nhật liên tục tại ztruyen.io.vn',
    keywords: [
        'doc truyen tranh',
        'manga',
        'doc manga',
        'ngon tinh',
        'tien hiep',
    ],
    alternates: {
        canonical: `/`,
        languages: {
            vi: '/vi',
        },
    },
};

const Home = () => {
    return (
        <DefaultLayout>
            <main>
                <Suspense fallback={<GridCarouselSkeleton />}>
                    <GridCarousel />
                </Suspense>

                <Suspense fallback={<NavbarGenreSkeleton />}>
                    <NavbarGenre />
                </Suspense>

                <Suspense fallback={<RecommendedComicSkeleton/>}>
                    <RecommendedComic/>
                </Suspense>

                <Suspense fallback={<ListComicSkeleton bgColor/>}>
                    <GenderComicO />
                </Suspense>

                <Suspense fallback={<ListComicSkeleton bgColor />}>
                    <GenderComicTw />
                </Suspense>

                <Suspense fallback={<ListComicSkeleton bgColor />}>
                    <GenderComicTh />
                </Suspense>

            </main>
        </DefaultLayout>
    );
};

export default Home;
