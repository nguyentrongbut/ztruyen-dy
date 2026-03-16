// ** Schema dts
import { WithContext, CollectionPage, BreadcrumbList } from "schema-dts"

// ** Config
import { BASE_URL } from '@/configs/api';
import { CONFIG_SLUG } from '@/configs/slug';

type TGenreSchemaProps = {
    genreName: string
    url: string
}

const GenreSchema = ({ genreName, url }: TGenreSchemaProps) => {

    const collectionJsonLd: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Truyện ${genreName}`,
        description: `Danh sách truyện tranh thể loại ${genreName} mới nhất tại Ztruyện`,
        url,
        isPartOf: {
            "@type": "WebSite",
            name: "Ztruyện",
            url: BASE_URL
        }
    }

    const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: BASE_URL
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Thể loại",
                item: `${BASE_URL}/${CONFIG_SLUG.GENRE}`
            },
            {
                "@type": "ListItem",
                position: 3,
                name: genreName,
                item: url
            }
        ]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(collectionJsonLd)
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd)
                }}
            />
        </>
    )
}

export default GenreSchema