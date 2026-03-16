// ** Config
import { BASE_URL } from '@/configs/api';

const BusinessSchema = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ComicStory',
        name: 'Ztruyện',
        image: `${BASE_URL}/bg.png`,
        url: BASE_URL,
        telephone: '+84-326-654-301',
        address: {
            '@type': 'PostalAddress',
            addressLocality: "Hồ Chí Minh",
            addressRegion: "Quận 1 - Hồ Chí Minh",
            addressCountry: "VN"
        },
        areaServed: "Hồ Chí Minh",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />
        </>
    );
};

export default BusinessSchema;
