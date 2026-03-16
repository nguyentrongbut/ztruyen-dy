// Cloudflare Pages build
import { notFound } from 'next/navigation';

export const runtime = 'edge';

// ** Next
import { Metadata } from 'next';

// ** React
import { Suspense } from 'react';

// ** Util
import removeExtension from '@/utils/removeExtension';

// ** Components
import ListComicByStatus from '@/components/common/ListComicByStatus';
import SortByDate from '@/components/common/SortByDate';

// ** Module components
import ListGenre from '@/modules/the-loai/ListGenre';

// ** Service
import { getListByGender } from '@/services/categories';

// ** Skeleton
import ListComicByStatusSkeleton from '@/skeleton/common/ListComicByStatusSkeleton';
import NavListGenreSkeleton from '@/skeleton/the-loai/NavListGenreSkeleton';

// ** Enum
import { ESortOrder } from '@/types/enum';
import { CONFIG_SLUG } from '@/configs/slug';
import GenreSchema from '@/components/schema/GenreSchema';
import { BASE_URL } from '@/configs/api';

type TGenreComic = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{
        trang?: string;
        'sap-xep'?: ESortOrder;
    }>;
};

export async function generateMetadata({
    params,
    searchParams,
}: TGenreComic): Promise<Metadata> {
    const { slug } = await params;
    const slugComic = removeExtension(slug, '.html');

    const { trang } = await searchParams;
    const pageQuery = parseInt((trang as string) || '1') || 1;

    const res = await getListByGender(slugComic);

    if (!res) {
        return notFound();
    }

    const genreName = res.data?.seoOnPage?.titleHead || 'Tất cả';

    const listOgImage = res.data?.seoOnPage?.og_image;

    const baseImgUrl = res.data?.APP_DOMAIN_CDN_IMAGE;

    const canonical =
        pageQuery === 1
            ? `${CONFIG_SLUG.GENRE}/${slug}`
            : `${CONFIG_SLUG.GENRE}/${slug}?trang=${pageQuery}`;

    const title =
        pageQuery > 1
            ? `Truyện ${genreName} - Trang ${pageQuery} | Ztruyện`
            : `Thể loại - Truyện ${genreName} | Ztruyện`;

    const description =
        pageQuery > 1
            ? `Danh sách truyện ${genreName} trang ${pageQuery}. Đọc truyện mới nhất tại Ztruyện`
            : `Khám phá những câu chuyện hấp dẫn thuộc thể loại ${genreName}. Đọc ngay các truyện hay nhất tại Ztruyện`;

    const keyword = res.data?.items.map((item) => `${item.name} | Ztruyen`);

    const images = listOgImage?.length
        ? listOgImage.map((img: string) => ({
              url: `${baseImgUrl}${img}`,
              width: 1200,
              height: 630,
          }))
        : [
              {
                  url: '/bg.png',
                  width: 1200,
                  height: 630,
              },
          ];

    return {
        title,
        description,
        keywords: keyword,

        alternates: {
            canonical,
        },

        robots: {
            index: pageQuery === 1,
            follow: true,
        },

        openGraph: {
            title,
            description,
            url: canonical,
            images: images,
        },
    };
}

const GenreComic = async ({ params, searchParams }: TGenreComic) => {
    const { slug } = await params;

    const slugComic = removeExtension(slug, '.html');

    const { trang, 'sap-xep': sort } = await searchParams;

    const pageQuery = parseInt((trang as string) || '1') || 1;
    const sortQuery = sort || ESortOrder.UPDATED_AT_DESC;

    return (
        <>
            <GenreSchema
                genreName={slugComic}
                url={`${BASE_URL}/${CONFIG_SLUG.GENRE}/${slug}`}
            />
            <Suspense fallback={<NavListGenreSkeleton />}>
                <ListGenre slug={slugComic} />
            </Suspense>

            <SortByDate />

            <Suspense fallback={<ListComicByStatusSkeleton />}>
                <ListComicByStatus
                    slug={slugComic}
                    pageQuery={pageQuery}
                    sortQuery={sortQuery}
                />
            </Suspense>
        </>
    );
};

export default GenreComic;
