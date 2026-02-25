// ** Type
import { TOtruyenChapter, TOtruyenChapterServer } from '@/types/api';

// ** Component
import GiscusComments from '@/components/common/GiscusComments';

// ** Module Component
import RangeBtnPagination from "@/modules/truyen-tranh/RangeBtnPagination";

type TDetailListChapterProps = {
    listChapter: TOtruyenChapterServer[]
    slug: string
}
const DetailListChapter = ({listChapter, slug}: TDetailListChapterProps) => {

    if (listChapter.length === 0) return (
        <section className='p-5 lg:w-[70%] xl:w-[76%] h-min bg-section-detail'>
            <p className="text-center m-6 text-sm">
                Hiện tại truyện đang cập nhật, hãy quay lại sau nhé !
            </p>
        </section>
    );

    return (
        <section className='p-5 lg:w-[70%] xl:w-[76%] h-min bg-section-detail'>
            <h2 className='text-lg font-medium'>Danh sách chương</h2>
            <RangeBtnPagination chapters={listChapter[0].server_data as TOtruyenChapter[]} slug={slug}/>
            <section className="mt-10">
                <h2 className='mb-4 text-lg font-medium'>Bình luận truyện</h2>
                <div className="max-h-[600px] overflow-y-auto custom-scroll px-2 border border-transparent">
                    <GiscusComments />
                </div>
            </section>
        </section>
    )
}

export default DetailListChapter