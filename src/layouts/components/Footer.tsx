// ** Components
import { Tag } from '@/components/common/Tag';
import Logo from '@/components/common/Logo';

// ** Configs
import { tagsFooter } from '@/configs/layout';

const Footer = () => {
    return (
        <footer className="w-full">
            <div className="bg-secondary pt-10 pb-5 shadow-custom">
                <div className="wrapper text-white/70">
                    <div className="flex justify-between items-center gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5">
                            <div>
                                <Logo size='lg'/>
                            </div>
                            <ul className="flex flex-wrap gap-2">
                                {tagsFooter.map((tag) => (
                                    <Tag
                                        key={tag?.title}
                                        href={tag?.href}
                                        theme="dark"
                                    >
                                        {tag?.title}
                                    </Tag>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-1.5 text-xs">
                        <h3 className="font-semibold text-white/70 md:text-base">
                            Miễn trừ trách nhiệm
                        </h3>
                        <p className="text-sm leading-relaxed">
                            ZTruyen chỉ cung cấp giao diện và tổng hợp dữ liệu từ
                            <strong className="mx-1 text-white/70">OTruyen</strong>.
                            Chúng tôi không lưu trữ hoặc sở hữu nội dung truyện.
                            Thông tin hiển thị chỉ mang tính tham khảo và
                            <strong className="mx-1 text-white/70">
                                không chịu trách nhiệm
                            </strong>
                            về độ chính xác, liên kết ngoài hoặc nội dung do bên
                            thứ ba cung cấp.
                        </p>
                    </div>
                    <p className="mt-5 text-xs md:text-sm font-semibold">
                        Copyright @ {new Date().getFullYear()} Ztruyện
                    </p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
