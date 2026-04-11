// Cloudflare Pages build
import ReadingComicSchema from '@/components/schema/ReadingComicSchema';

export const runtime = 'edge';

// ** Next
import Link from 'next/link';
import { Metadata } from 'next';

// ** Component
import ErrorText from '@/components/common/ErrorText';

// ** Module componnets
import ListImageChapter from '@/modules/doc-truyen/ListImageChapter';

// ** Layout component
import Header from '@/layouts/components/Header';

// ** Services
import { getDetailComic } from '@/services/comic';
import { getListImageChapter } from '@/services/chapter';

// ** Config
import { CONFIG_SLUG } from '@/configs/slug';
import { BASE_URL, CONFIG_API_OTRUYEN } from '@/configs/api';

// ** Utils
import removeExtension from '@/utils/removeExtension';
import getIdFromUrl from '@/utils/getIdFromUrl';
import { getChapterName } from '@/utils/getChapterName';

// ** Type
import { TOtruyenChapter } from '@/types/api';

// ** Icons
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TReadingComic = {
    params: Promise<{ path: string }>;
};

export async function generateMetadata({
                                           params
                                       }: TReadingComic): Promise<Metadata> {

    const { path } = await params

    const paths = removeExtension(path, '.html')
    const slugComic = getChapterName(paths)
    const chapterId = getIdFromUrl(paths, '-')

    const resDetail = await getDetailComic(slugComic)
    const resChapter = await getListImageChapter(chapterId)

    const comic = resDetail.data?.item
    const chapter = resChapter.data?.item

    if (!comic || !chapter) return {}

    const chapterName = chapter.chapter_name

    const title = `${comic.name} - Chương ${chapterName} | Ztruyện`
    const description = `Đọc truyện tranh ${comic.name} chương ${chapterName} tiếng Việt. Cập nhật nhanh nhất tại Ztruyện.`

    return {
        title,
        description,

        alternates: {
            canonical: `${BASE_URL}/${CONFIG_SLUG.READING}/${path}`
        },

        openGraph: {
            title,
            description,
            url: `${BASE_URL}/${CONFIG_SLUG.READING}/${path}`,
            siteName: 'Ztruyện',
            images: [
                {
                    url: `${CONFIG_API_OTRUYEN.IMAGE_COMIC}/${comic.thumb_url}`,
                    width: 1200,
                    height: 630,
                    alt: `${comic.name} - Chương ${chapterName}`
                }
            ],
            locale: 'vi_VN',
            type: 'article'
        },

        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${CONFIG_API_OTRUYEN.IMAGE_COMIC}/${comic.thumb_url}`]
        },
    }
}

const ReadingComic = async ({ params }: TReadingComic) => {
    const { path } = await params;

    const paths = removeExtension(path, '.html');

    const slugComic = getChapterName(paths);

    const chapterId = getIdFromUrl(paths, '-');

    const [resDetail, resChapter] = await Promise.all([
        getDetailComic(slugComic),
        getListImageChapter(chapterId),
    ]);

    const listDetailComic = resDetail.data?.item;
    const listDetailImageChapter = resChapter.data?.item;

    if (!listDetailComic || !listDetailImageChapter) return <ErrorText />;

    const chapters = listDetailComic.chapters?.[0]?.server_data ?? [];

    const currentIndex = chapters.findIndex(
        (ch: TOtruyenChapter) =>
            ch.chapter_name === listDetailImageChapter.chapter_name
    );

    const prevChapter = chapters[currentIndex - 1] ?? null;
    const nextChapter = chapters[currentIndex + 1] ?? null;

    return (
        <>
            <ReadingComicSchema
                comicName={listDetailComic.name}
                chapterName={listDetailImageChapter.chapter_name}
                image={`${CONFIG_API_OTRUYEN.IMAGE_COMIC}/${listDetailComic.thumb_url}`}
                author={listDetailComic.author}
                path={path}
            />
            <Header asChild/>
            <ListImageChapter
                listImageChapter={listDetailImageChapter.chapter_image}
                nextChapter={nextChapter}
                prevChapter={prevChapter}
                currentChapter={chapters[currentIndex].chapter_name}
                slugComic={slugComic}
                chapter_path={listDetailImageChapter.chapter_path}
                chapters={chapters}
                currentChapterId={chapterId}
                path={path}
                listDetailComic={listDetailComic}
            />
        </>
    );
};

export default ReadingComic;
