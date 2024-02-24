import { defineNuxtRouteMiddleware } from '#imports'
import { defu } from 'defu'
import { titleCase } from 'scule'
import { parseFilename, withoutTrailingSlash } from 'ufo'

export default defineNuxtRouteMiddleware((route) => {
  if (route.meta.title === undefined) {
    const path = withoutTrailingSlash(route.path)
    const basename = parseFilename(path, { strict: false })
    route.meta.title = basename ? titleCase(basename) : 'Home'
  }

  route.meta.pageHeader = defu(
    route.meta.pageHeader,
    ...route.matched.map((item) => item.meta.pageHeader)
  )
})
