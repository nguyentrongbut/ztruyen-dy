'use server'

// ** fetch wrapper
import { fetchAPI } from '@/lib/actions/api';

// ** Types
import { IOTruyenChapter } from '@/types/api';

// ** Config
import { CONFIG_API_OTRUYEN } from '@/configs/api';

export async function getListImageChapter(id: string) {
    return fetchAPI<IApiOtruyenResDetail<IOTruyenChapter>>(`${CONFIG_API_OTRUYEN.CHAPTER}/${id}`, {}, 60);
}