// ** Schema dts
import { WithContext, CollectionPage, BreadcrumbList } from "schema-dts"

// ** Config
import { BASE_URL } from '@/configs/api';
import { CONFIG_SLUG } from '@/configs/slug';

type TStatusSchemaProps = {
    statusName: string
    url: string
}

const StatusSchema = ({ statusName, url }: TStatusSchemaProps) => {

    const collectionJsonLd: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: statusName,
        description: `Danh sách ${statusName} cập nhật mới nhất tại Ztruyện`,
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
                name: "Danh sách truyện",
                item: `${BASE_URL}/${CONFIG_SLUG.LIST}`
            },
            {
                "@type": "ListItem",
                position: 3,
                name: statusName,
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

export default StatusSchema