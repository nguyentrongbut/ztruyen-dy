import Carousel from '@/modules/home/carousel';
import { getGenreDetail } from '@/lib/actions/dynamic.page';

const GenderComicTw = async () => {

    const res = await getGenreDetail('ngon-tinh')

    const data = res?.data.items;

    return (
        <Carousel
            data={data}
            title="Một Góc Nhỏ Cho Người Mộng Mơ"
            bgColor
            href="the-loai/ngon-tinh.html"
        ></Carousel>
    )
}

export default GenderComicTw