//  ** services
import { getListGenre } from '@/services/categories';

// ** Config
import { CONFIG_SLUG } from '@/configs/slug';

// ** Enum
import { ESlug } from '@/types/enum';
import { getListByStatus } from '@/services/list';

export default async function sitemap() {
    const baseURL = process.env.NEXT_PUBLIC_YOUR_WEBSITE;
    const resGenres = await getListGenre();
    const resHome = await getListByStatus(ESlug.NEW);
    const dataHome = resHome.data?.items
    const dataGenres = resGenres.data?.items
    const dataGenreUrls = dataGenres?.map((genre) => ({
        url: `${baseURL}/${CONFIG_SLUG.GENRE}/${genre.slug}.html`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const dataHomeUrls = dataHome?.map((comic) => ({
        url: `${baseURL}/${CONFIG_SLUG.DETAIL}/${comic.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));


    console.log(dataGenreUrls);
    console.log(dataHomeUrls);
    return [
        {
            url: baseURL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseURL}/${CONFIG_SLUG.DETAIL}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseURL}/${CONFIG_SLUG.READING}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseURL}/${CONFIG_SLUG.LIST}/${ESlug.ONGOING}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseURL}/${CONFIG_SLUG.LIST}/${ESlug.COMPLETED}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseURL}/${CONFIG_SLUG.LIST}/${ESlug.COMING_SOON}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseURL}/tim-kiem`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseURL}/${CONFIG_SLUG.GENRE}/tat-ca.html`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...(dataGenreUrls ?? []),
        ...(dataHomeUrls ?? [])
    ];
}
