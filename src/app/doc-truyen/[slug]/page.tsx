// Cloudflare Pages build
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const runtime = 'edge';

// ** Next
import Link from 'next/link';

// ** Layout
import Header from '@/layouts/components/Header/Header';

// ** Modules
import ImgsChapter from '@/modules/doc-truyen/ImageChapter';
import ScrollSaver from '@/modules/doc-truyen/ScrollSaver';

// ** utils
import getIdFromUrl from '@/utils/getIdFromUrl';
import { getChapterName } from '@/utils/getChapterName';
import removeExtension from '@/utils/removeExtension';

// ** action service
import { getChapter } from '@/lib/actions/chapter';
import { getComicDetail } from '@/lib/actions/detail';
import React from 'react';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = removeExtension((await params).slug, '.html');

    const res = await getChapter(getIdFromUrl(slug, '-') as string);

    const chapter: IReader = res?.data?.item;

    return {
        title: `${chapter?.comic_name} - Chap ${chapter?.chapter_name} Next Chap ${Number(chapter?.chapter_name) + 1}  Tiếng Việt`,
        description: `Đọc truyện ${chapter?.comic_name} chap ${chapter?.chapter_name} next chap ${Number(chapter?.chapter_name) + 1}  tiếng việt Mới nhất nhanh nhất tại ztruyen.io.vn`,
        keywords: [
            `${chapter?.comic_name} ${chapter?.chapter_name}`,
            `${chapter?.comic_name} chap ${chapter?.chapter_name}`,
            `đọc truyện tranh ${chapter?.comic_name} chap ${chapter?.chapter_name}`,
            `${chapter?.comic_name} chương ${chapter?.chapter_name}`,
            `${chapter?.comic_name} ${chapter?.chapter_name} tiếng việt`,
        ],
        alternates: {
            canonical: `/doc-truyen/${slug}`,
            languages: {
                vi: `/vi/doc-truyen/${slug}`,
            },
        },
        openGraph: {
            title: `${chapter?.comic_name} - Chap ${chapter?.chapter_name} Next Chap ${Number(chapter?.chapter_name) + 1}  Tiếng Việt`,
            description: `Đọc truyện ${chapter?.comic_name} chap ${chapter?.chapter_name} next chap ${Number(chapter?.chapter_name) + 1}  tiếng việt Mới nhất nhanh nhất tại ztruyen.io.vn`,
            images: [
                {
                    url: '/logo-all.png',
                    width: 400,
                    height: 200,
                },
            ],
        },
    };
}

const ChapterPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    // slug page
    const slug = removeExtension((await params).slug, '.html');

    const res = await getChapter(getIdFromUrl(slug, '-') as string);
    const response = await getComicDetail(getChapterName(slug));
    const chapter: IReader = res?.data?.item;
    // slug chapter
    const slugChapter = response?.data?.item?.slug;
    const thumbImg = response?.data?.item?.thumb_url;

    const listChapter: IChapter[] =
        response?.data?.item?.chapters[0].server_data;

    const indexCurrentChapter = listChapter.findIndex(
        (chapter) =>
            getIdFromUrl(chapter.chapter_api_data, '/') ===
            getIdFromUrl(slug, '-')
    );

    // Next chapter
    const nextChapter = listChapter[indexCurrentChapter + 1];

    // Prev chapter
    const prevChapter = listChapter[indexCurrentChapter - 1];

    return (
        <>
            <Header asChild={true}>
                <div className="flex items-center justify-between gap-5">
                    {prevChapter ? (
                        <Link
                            href={`/doc-truyen/${getChapterName(slug)}-chuong-${prevChapter?.chapter_name}-${getIdFromUrl(prevChapter?.chapter_api_data, '/')}.html`}
                            className="flex items-center gap-1 text-xs hover:text-primaryColor active:text-primaryColor"
                        >
                            <ChevronLeft className="size-4" />
                            <span className="hidden sm:block">
                                Chương
                            </span>
                            <span className='capitalize sm:normal-case'>trước</span>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-1 text-xs opacity-50">
                            <ChevronLeft className="size-4" />
                            <span className="hidden sm:block">
                                Chương
                            </span>
                            <span className='capitalize sm:normal-case'>trước</span>
                        </div>
                    )}
                    <h1 className="text-sm line-clamp-1 hidden md:block">
                        <Link
                            href={`/truyen-tranh/${response?.data?.item.slug}`}
                            className="hover:text-primaryColor"
                        >
                            {response?.data?.item.name} {' - '}
                        </Link>
                        Chương {chapter.chapter_name}
                    </h1>
                    {nextChapter ? (
                        <Link
                            href={`/doc-truyen/${getChapterName(slug)}-chuong-${nextChapter?.chapter_name}-${getIdFromUrl(nextChapter?.chapter_api_data, '/')}.html`}
                            className="flex items-center gap-1 text-xs hover:text-primaryColor active:text-primaryColor"
                        >
                            <span className="hidden sm:block">Chương</span>
                            <span className='capitalize sm:normal-case'>sau</span>
                            <ChevronRight className="size-4" />
                        </Link>
                    ) : (
                        <div className="flex items-center gap-1 text-xs opacity-50">
                            <span className="hidden sm:block">Chương</span>
                            <span className='capitalize sm:normal-case'>sau</span>
                            <ChevronRight className="size-4" />
                        </div>
                    )}
                </div>
            </Header>
            <ImgsChapter
                numberOfChapters={res?.data?.item?.chapter_name}
                chapters={chapter?.chapter_image}
                url={res?.data?.domain_cdn}
                urlPath={chapter?.chapter_path}
                chapterName={chapter?.comic_name}
                listChapter={listChapter}
                currentUrl={slug}
                slugChapter={slugChapter}
            />
            <ScrollSaver
                chapterName={chapter?.comic_name}
                numberOfChapters={res?.data?.item?.chapter_name}
                currentUrl={slug}
                image={thumbImg}
                slug={slugChapter}
            />
        </>
    );
};

export default ChapterPage;
