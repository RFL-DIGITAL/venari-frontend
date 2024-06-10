import { Paginator } from "@/stores/types/schema";
import { omit } from 'lodash'

export function getPaginator<T extends Paginator>(value: T) {
    return omit(value, 'data')
}