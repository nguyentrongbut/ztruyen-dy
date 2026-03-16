// ** Config
import { BASE_URL } from '@/configs/api';

const TermsSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Thỏa thuận người dùng",
        description:
            "Điều khoản và thỏa thuận khi sử dụng website đọc truyện Ztruyện.",
        url: `${BASE_URL}}/thoa-thuan-nguoi-dung`,

        isPartOf: {
            "@type": "WebSite",
            name: "Ztruyện",
            url: `${BASE_URL}`,
        },

        publisher: {
            "@type": "Organization",
            name: "Ztruyện",
            logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/logo.png`,
            },
        },

        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Trang chủ",
                    item: `${BASE_URL}`,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Thỏa thuận người dùng",
                    item: `${BASE_URL}/thoa-thuan-nguoi-dung`,
                },
            ],
        },

        inLanguage: "vi",
        datePublished: "2026-01-01",
        dateModified: "2026-01-01",
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    )
}

export default TermsSchema