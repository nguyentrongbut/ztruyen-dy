// Cloudflare Pages build
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const runtime = 'edge';

// ** Next
import Link from 'next/link';

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

// ** Utils
import removeExtension from '@/utils/removeExtension';
import getIdFromUrl from '@/utils/getIdFromUrl';
import { getChapterName } from '@/utils/getChapterName';

// ** Type
import { TOtruyenChapter } from '@/types/api';

type TReadingComic = {
    params: Promise<{ path: string }>;
};

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
            <Header asChild>
                <div className="flex items-center justify-between gap-5">
                    {prevChapter ? (
                        <Link
                            href={`/${CONFIG_SLUG.READING}/${getChapterName(slugComic)}-chuong-${prevChapter?.chapter_name}-${getIdFromUrl(prevChapter?.chapter_api_data, '/')}.html`}
                            className="flex items-center gap-1 text-xs hover:text-primary active:text-primary"
                        >
                            <ChevronLeft className="size-4" />
                            <span className="hidden sm:block">Chương</span>
                            <span className="capitalize sm:normal-case">
                                trước
                            </span>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-1 text-xs opacity-50">
                            <ChevronLeft className="size-4" />
                            <span className="hidden sm:block">Chương</span>
                            <span className="capitalize sm:normal-case">
                                trước
                            </span>
                        </div>
                    )}
                    <h1 className="text-sm line-clamp-1 hidden md:block">
                        <Link
                            href={`/${CONFIG_SLUG.DETAIL}/${listDetailComic.slug}`}
                            className="hover:text-primary"
                        >
                            {listDetailComic.name} {' - '}
                        </Link>
                        Chương {listDetailImageChapter.chapter_name}
                    </h1>
                    {nextChapter ? (
                        <Link
                            href={`/${CONFIG_SLUG.READING}/${slugComic}-chuong-${nextChapter?.chapter_name}-${getIdFromUrl(nextChapter?.chapter_api_data, '/')}.html`}
                            className="flex items-center gap-1 text-xs hover:text-primary active:text-primary"
                        >
                            <span className="hidden sm:block">Chương</span>
                            <span className="capitalize sm:normal-case">
                                sau
                            </span>
                            <ChevronRight className="size-4" />
                        </Link>
                    ) : (
                        <div className="flex items-center gap-1 text-xs opacity-50">
                            <span className="hidden sm:block">Chương</span>
                            <span className="capitalize sm:normal-case">
                                sau
                            </span>
                            <ChevronRight className="size-4" />
                        </div>
                    )}
                </div>
            </Header>
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
