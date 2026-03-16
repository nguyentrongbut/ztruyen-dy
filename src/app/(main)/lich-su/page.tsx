// ** Modules
import ReadingHistory from '@/modules/lich-su/ReadingHistory';

export async function generateMetadata() {
    return {
        title: `Lịch sử đọc truyện của bạn - ztruyen.io.vn`,
        description: `Lịch sử đọc truyện của bạn tại ztruyen.io.vn`,
        robots: {
            index: false,
            follow: true,
        },
    };
}

const ReadingHistoryPage = () => {
    return <ReadingHistory />;
};

export default ReadingHistoryPage;
