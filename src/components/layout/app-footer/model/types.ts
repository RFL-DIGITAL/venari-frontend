import { RouteLocationRaw } from "vue-router"

export interface AppNavListItem {
  text: string
  icon?: string
  iconActive?: string
  to?: RouteLocationRaw
}
