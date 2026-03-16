// ** Schema dts
import { Article, WithContext } from 'schema-dts'

// ** Config
import { BASE_URL } from '@/configs/api'
import { CONFIG_SLUG } from '@/configs/slug'

type TReadingComicSchemaProps = {
    comicName: string
    chapterName: string
    image: string
    author?: string[]
    path: string
}

const ReadingComicSchema = ({
                                comicName,
                                chapterName,
                                image,
                                author,
                                path
                            }: TReadingComicSchemaProps) => {

    const jsonLd: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${comicName} - Chương ${chapterName}`,
        image,
        author: {
            '@type': 'Person',
            name: author?.length ? author.join(', ') : 'Đang cập nhật'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Ztruyện',
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.png`
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/${CONFIG_SLUG.READING}/${path}`
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd)
            }}
        />
    )
}

export default ReadingComicSchema