'use server'

import { cache } from 'react'

// ** fetch wrapper
import { fetchAPI } from '@/lib/actions/api'

// ** Types
import { IOTruyenChapter } from '@/types/api'

// ** Config
import { CONFIG_API_OTRUYEN } from '@/configs/api'

export const getListImageChapter = cache(async (id: string) => {
    return fetchAPI<IApiOtruyenResDetail<IOTruyenChapter>>(
        `${CONFIG_API_OTRUYEN.CHAPTER}/${id}`,
        {},
        3600
    )
})