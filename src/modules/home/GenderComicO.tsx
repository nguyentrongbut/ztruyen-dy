import Carousel from '@/modules/home/carousel';
import { getGenreDetail } from '@/lib/actions/dynamic.page';

const GenderComicO = async () => {

    const res = await getGenreDetail('webtoon')

    const data = res?.data.items;

    return (
        <Carousel
            data={data}
            title="Thế Giới Webtoon"
            bgColor
            href="the-loai/webtoon.html"
        ></Carousel>
    )
}

export default GenderComicO