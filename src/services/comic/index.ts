'use server'

// ** fetch wrapper
import { fetchAPI } from '@/lib/actions/api';

// ** Types
import { IOtruyenDetailComic } from '@/types/api';

// ** Config
import { CONFIG_API_OTRUYEN } from '@/configs/api';

export async function getDetailComic(slug: string) {
    return fetchAPI<IApiOtruyenResDetail<IOtruyenDetailComic>>(`${CONFIG_API_OTRUYEN.COMIC}/${slug}`, {}, 60);
}