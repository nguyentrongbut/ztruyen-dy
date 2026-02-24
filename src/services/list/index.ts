'use server'

// ** fetch wrapper
import { fetchAPI } from '@/lib/actions/api';

// ** Type
import { IOtruyenListComic } from '@/types/api';

// ** Enums
import { ESlug, ESortField, ESortType } from '@/types/enum';

// ** Config
import { CONFIG_API_OTRUYEN } from '@/configs/api';

export async function getListByStatus(slug: ESlug, pageQuery: number = 1, sortField: ESortField = ESortField.UPDATED_AT, sortType: ESortType = ESortType.DESC) {
    return fetchAPI<IApiOtruyenResWPagination<IOtruyenListComic[]>>(`${CONFIG_API_OTRUYEN.LIST}/${slug}?page=${pageQuery}&sort_field=${sortField}&sort_type=${sortType}`, {}, 60);
}