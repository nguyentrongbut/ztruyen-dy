import { ComicStory, WithContext } from 'schema-dts';

type TComicSchema = {
    name: string;
    description?: string;
    image?: string;
    author?: string[];
    genres?: string[];
    ratingValue?: number;
    ratingCount?: number;
    chapterCount?: number;
    datePublished?: string;
    dateModified?: string;
    url: string;
};

const ComicSchema = ({
                         name,
                         description,
                         image,
                         author,
                         genres,
                         ratingValue,
                         ratingCount,
                         datePublished,
                         dateModified,
                         url,
                     }: TComicSchema) => {
    const jsonLd: WithContext<ComicStory> = {
        '@context': 'https://schema.org',
        '@type': 'ComicStory',
        name,
        description,
        image,
        url,
        author: author
            ? {
                '@type': 'Person',
                name: author,
            }
            : undefined,
        genre: genres,
        datePublished,
        dateModified,
        aggregateRating:
            ratingValue && ratingCount
                ? {
                    '@type': 'AggregateRating',
                    ratingValue,
                    ratingCount,
                }
                : undefined,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd),
            }}
        />
    );
};

export default ComicSchema;