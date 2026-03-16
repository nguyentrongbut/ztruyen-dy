'use server'

// ** React
import { cache } from 'react';

// ** fetch wrapper
import { fetchAPI } from '@/lib/actions/api';

// ** Types
import { IOtruyenDetailComic } from '@/types/api';

// ** Config
import { CONFIG_API_OTRUYEN } from '@/configs/api';

export const getDetailComic = cache(async (slug: string) => {
    return fetchAPI<IApiOtruyenResDetail<IOtruyenDetailComic>>(
        `${CONFIG_API_OTRUYEN.COMIC}/${slug}`,
        {},
        60
    )
})