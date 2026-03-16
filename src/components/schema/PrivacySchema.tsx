import { BASE_URL } from '@/configs/api';

const PrivacySchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Chính sách bảo mật",
        description:
            "Chính sách bảo mật của Ztruyện khi người dùng sử dụng website đọc truyện trực tuyến.",
        author: {
            "@type": "Organization",
            name: "Ztruyện",
        },
        publisher: {
            "@type": "Organization",
            name: "Ztruyện",
            logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/logo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE_URL}/chinh-sach-bao-mat`,
        },
        datePublished: "2026-01-01",
        dateModified: "2026-01-01",
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export default PrivacySchema