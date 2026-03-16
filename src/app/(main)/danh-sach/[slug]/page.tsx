// Cloudflare Pages build
export const runtime = 'edge';

// ** Next
import {Metadata} from "next";

// ** React
import {Suspense} from "react";

// ** Utils
import removeExtension from "@/utils/removeExtension";
import { convertStatusComic } from '@/utils/convertStatusComic';

// ** Components
import ListComicByStatus from "@/components/common/ListComicByStatus";
import SortByDate from "@/components/common/SortByDate";
import StatusSchema from '@/components/schema/StatusSchema';

// ** Skeleton
import ListComicByStatusSkeleton from '@/skeleton/common/ListComicByStatusSkeleton';

// ** Enum
import {ESlug, ESortOrder} from "@/types/enum";

// ** Services
import { getListByStatus } from '@/services/list';

// ** Config
import {CONFIG_SLUG} from "@/configs/slug";
import { BASE_URL } from '@/configs/api';


type TStatusComic = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{
        trang?: string
        'sap-xep'?: ESortOrder
    }>
}

export async function generateMetadata({
                                           params,
                                           searchParams,
                                       }: TStatusComic): Promise<Metadata> {

    const { slug } = await params
    const slugComic = removeExtension(slug, '.html')

    const { trang } = await searchParams
    const pageQuery = parseInt((trang as string) || '1') || 1

    const res = await getListByStatus(slugComic as ESlug)

    const status = res.data?.titlePage || 'Truyện'

    const listOgImage = res.data?.seoOnPage?.og_image;

    const baseImgUrl = res.data?.APP_DOMAIN_CDN_IMAGE;

    const canonical =
        pageQuery === 1
            ? `${CONFIG_SLUG.LIST}/${slug}`
            : `${CONFIG_SLUG.LIST}/${slug}?trang=${pageQuery}`

    const title =
        pageQuery > 1
            ? `${status} - Trang ${pageQuery} | Ztruyện`
            : `${status} | Ztruyện`

    const description =
        pageQuery > 1
            ? `Danh sách ${status} trang ${pageQuery}. Đọc truyện mới nhất tại Ztruyện`
            : `Danh sách ${status} cập nhật mới nhất tại Ztruyện`

    const keyword = res.data?.items.map((item) => `${item.name} ${status.toLowerCase()} tại Ztruyen`) || [];

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

        keywords: [
            `truyện ${status}`,
            `truyện tranh`,
            `manga`,
            `manhua`,
            `comic`,
            ...keyword
        ],

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

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/logo-all.png"],
        },
    }
}

const StatusComic = async ({params, searchParams}: TStatusComic) => {

    const {slug} = await params

    const slugComic = removeExtension(slug, '.html')

    const {trang, 'sap-xep': sort} = await searchParams

    const pageQuery = parseInt((trang as string) || '1') || 1;
    const sortQuery = sort || ESortOrder.UPDATED_AT_DESC

    const statusComic = convertStatusComic(slugComic as ESlug)

    return (
        <>
            <StatusSchema
                statusName={statusComic.title}
                url={`${BASE_URL}/${CONFIG_SLUG.LIST}/${slug}`}
            />
            <div className='section-header gap-2.5 sm:gap-4 flex-col md:flex-row container py-5'>
                <h1 className='heading py-0'>{statusComic.title}</h1>
                <p className='desc'>{statusComic.description}</p>
            </div>

            <SortByDate/>

            <Suspense fallback={<ListComicByStatusSkeleton/>}>
                <ListComicByStatus slug={slugComic} pageQuery={pageQuery} sortQuery={sortQuery}/>
            </Suspense>
        </>
    );
};

export default StatusComic;
