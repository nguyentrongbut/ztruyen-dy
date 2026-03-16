// ** Next
import { MetadataRoute } from 'next';

//  ** services
import { getListGenre } from '@/services/categories';

// ** Config
import { CONFIG_SLUG } from '@/configs/slug';

// ** Enum
import { ESlug } from '@/types/enum';
import { getListByStatus } from '@/services/list';
import { BASE_URL } from '@/configs/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const resGenres = await getListGenre();
    const resHome = await getListByStatus(ESlug.NEW);
    const dataHome = resHome.data?.items
    const dataGenres = resGenres.data?.items
    const dataGenreUrls = dataGenres?.map((genre) => ({
        url: `${BASE_URL}/${CONFIG_SLUG.GENRE}/${genre.slug}.html`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const dataHomeUrls = dataHome?.map((comic) => ({
        url: `${BASE_URL}/${CONFIG_SLUG.DETAIL}/${comic.slug}`,
        lastModified: comic.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [
        {
            url: BASE_URL || "",
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/${CONFIG_SLUG.DETAIL}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/${CONFIG_SLUG.READING}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/${CONFIG_SLUG.LIST}/${ESlug.ONGOING}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/${CONFIG_SLUG.LIST}/${ESlug.COMPLETED}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/${CONFIG_SLUG.LIST}/${ESlug.COMING_SOON}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/tim-kiem`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/${CONFIG_SLUG.GENRE}/tat-ca.html`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...(dataGenreUrls ?? []),
        ...(dataHomeUrls ?? [])
    ];
}
