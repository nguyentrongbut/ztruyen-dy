// Cloudflare Pages build
import { BASE_URL } from '@/configs/api';

export const runtime = 'edge';

// ** Next
import {Metadata} from "next";

// ** React
import {Suspense} from "react";

// ** Module component
import ListSearchComic from "@/modules/tim-kiem/ListSearchComic";

// ** Skeleton
import ListSearchComicSkeleton from '@/skeleton/tim-kiem/ListSearchComicSkeleton';

// ** Component
import SearchSchema from '@/components/schema/SearchSchema';

type TSearchComic = {
    searchParams: Promise<{
        trang?: string
        'tu-khoa'?: string
    }>
}

export async function generateMetadata({searchParams}: TSearchComic): Promise<Metadata> {

    const {'tu-khoa': keyword} = await searchParams


    if (!keyword) {
        return {
            title: `Tìm kiếm truyện tranh tại Ztruyện`,
            description: `Tìm truyện tranh - Tất cả truyện đều có thể tìm thấy tại Ztruyện`,
            robots: {
                index: false,
                follow: true,
            },
        };
    }

    return {
        title: `${keyword} - Kết quả tìm kiếm | Ztruyện`,
        description: `Tìm truyện tranh - Tất cả truyện đều có thể tìm thấy tại Ztruyện`,
        keywords: [
            `tìm truyện tranh`,
            `tìm truyện tiếng việt`,
            `đọc truyện tranh`,
            `tìm ${keyword} với ztruyen.io.vn`,
            `kết quả tìm kiếm ${keyword} từ ztruyen.io.vn`,
        ],
        alternates: {
            canonical: `${BASE_URL}/tim-kiem?tu-khoa=${keyword}`,
        },
        openGraph: {
            title: `${keyword} - Kết quả tìm kiếm | Ztruyện`,
            description: `Tìm truyện tranh - Tất cả truyện đều có thể tìm thấy tại Ztruyện`,
            url: `${BASE_URL}/tim-kiem?tu-khoa=${encodeURIComponent(keyword)}`,
            images: [
                {
                    url: '/bg.png',
                    width: 1200,
                    height: 630,
                    alt: `${keyword} - Kết quả tìm kiếm | Ztruyện`
                },
            ],
            locale: 'vi_VN',
            phoneNumbers: '0326654301',
            emails: 'ree6i6x@gmail.com',
            type: 'website',
            countryName: 'Việt Nam',
        },
        robots: {
            index: false,
            follow: true,
        }
    };
}

const SearchComic = async ({searchParams}: TSearchComic) => {

    const {trang, 'tu-khoa': keyword} = await searchParams

    const pageQuery = parseInt((trang as string) || '1') || 1;

    return (
        <section>
            <SearchSchema keyword={keyword || ''} />
            <div className="flex gap-[5px] text-sm py-8 container">
                <span className="text-primary">{`"${keyword}"`}</span>
                <span>Kết quả tìm kiếm</span>
            </div>
            <Suspense fallback={<ListSearchComicSkeleton/>}>
                <ListSearchComic keyword={keyword || ''} pageQuery={pageQuery}/>
            </Suspense>
        </section>
    )
}

export default SearchComic;