'use server'

// ** fetch wrapper
import { fetchAPI } from '@/lib/actions/api';

// ** Types
import { IOtruyenSearchComic } from '@/types/api';

// ** Config
import { CONFIG_API_OTRUYEN } from '@/configs/api';

export async function getListBySearch(keyword: string, pageQuery: number = 1) {
    return fetchAPI<IApiOtruyenResWPagination<IOtruyenSearchComic[]>>(`${CONFIG_API_OTRUYEN.SEARCH}?keyword=${keyword}&page=${pageQuery}`, {}, 60);
}