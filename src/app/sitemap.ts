//  ** services
import { getListGenre } from '@/services/categories';

// ** Config
import { CONFIG_SLUG } from '@/configs/slug';

// ** Enum
import { ESlug } from '@/types/enum';
import { getListByStatus } from '@/services/list';

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_YOUR_WEBSITE;
    const resGenres = await getListGenre();
    const resHome = await getListByStatus(ESlug.NEW);
    const dataHome = resHome.data?.items
    const dataGenres = resGenres.data?.items
    const dataGenreUrls = dataGenres?.map((genre) => ({
        url: `${baseUrl}/${CONFIG_SLUG.GENRE}/${genre.slug}.html`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const dataHomeUrls = dataHome?.map((comic) => ({
        url: `${baseUrl}/${CONFIG_SLUG.DETAIL}/${comic.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/${CONFIG_SLUG.DETAIL}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/${CONFIG_SLUG.READING}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/${CONFIG_SLUG.LIST}/${ESlug.ONGOING}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/${CONFIG_SLUG.LIST}/${ESlug.COMPLETED}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/${CONFIG_SLUG.LIST}/${ESlug.COMING_SOON}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/tim-kiem`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/${CONFIG_SLUG.GENRE}/tat-ca.html`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...(dataGenreUrls ?? []),
        ...(dataHomeUrls ?? [])
    ];
}
