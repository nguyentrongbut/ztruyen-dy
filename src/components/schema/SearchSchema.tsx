import { SearchResultsPage, WithContext } from 'schema-dts';
import { BASE_URL } from '@/configs/api';

type TSearchSchema = {
    keyword: string;
};

const SearchSchema = ({ keyword }: TSearchSchema) => {
    const jsonLd: WithContext<SearchResultsPage> = {
        '@context': 'https://schema.org',
        '@type': 'SearchResultsPage',
        name: `Kết quả tìm kiếm "${keyword}"`,
        url: `${BASE_URL}/tim-kiem?tu-khoa=${encodeURIComponent(keyword)}`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({jsonLd}),
            }}
        />
    );
};

export default SearchSchema;
