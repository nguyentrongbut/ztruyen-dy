'use server'

// ** fetch wrapper
import { fetchAPI } from '@/lib/actions/api';

// ** Types
import { IOtruyenListComic, IOtruyenListGenre } from '@/types/api';

// ** Config
import { CONFIG_API_OTRUYEN } from '@/configs/api';

// ** Enums
import { ESortField, ESortType } from '@/types/enum';

export async function getListGenre() {
    return fetchAPI<IApiOtruyenRes<IOtruyenListGenre[]>>(CONFIG_API_OTRUYEN.CATEGORY, {}, 3600);
}

export async function getListByGender(slug: string, pageQuery: number = 1, sortField: ESortField = ESortField.UPDATED_AT, sortType: ESortType = ESortType.DESC) {
    return fetchAPI<IApiOtruyenResWPagination<IOtruyenListComic[]>>(`${CONFIG_API_OTRUYEN.CATEGORY}/${slug}?page=${pageQuery}&sort_field=${sortField}&sort_type=${sortType}`, {}, 60);
}