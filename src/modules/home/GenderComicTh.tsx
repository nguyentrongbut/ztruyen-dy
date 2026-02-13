import Carousel from '@/modules/home/carousel';
import { getGenreDetail } from '@/lib/actions/dynamic.page';

const GenderComicTh = async () => {
    const res = await getGenreDetail('manhwa');

    const data = res?.data.items;
    return (
        <Carousel
            data={data}
            title="Góc Manhwa Lãng Mạn"
            href="the-loai/manhwa.html"
        ></Carousel>
    );
};

export default GenderComicTh;
