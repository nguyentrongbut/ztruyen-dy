// ** Schema dts
import { WithContext, WebSite, Organization } from "schema-dts";

// ** Config
import { BASE_URL } from '@/configs/api';

const HomeSchema = () => {

    const websiteJsonLd: WithContext<WebSite> = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Ztruyện",
        url: BASE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: "https://ztruyen.io.vn/tim-kiem?tu-khoa={search_term_string}",
        }
    };

    const organizationJsonLd: WithContext<Organization> = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ztruyện",
        url: BASE_URL,
        logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/logo.png`
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteJsonLd)
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationJsonLd)
                }}
            />
        </>
    );
};

export default HomeSchema;