import { computed, useRoute, type ComputedRef } from '#imports'
import { parseFilename, withoutTrailingSlash } from 'ufo'
import { titleCase } from 'scule'
import { defu } from 'defu'

export interface Result {
  title: string
  visible: boolean
  [key: string]: unknown
}

export function usePageHeader(): ComputedRef<Result> {
  const route = useRoute()

  const meta = computed(() =>
    defu(
      route.meta.pageHeader,
      ...route.matched.map((item) => item.meta.pageHeader)
    )
  )

  return computed(() => {
    let title = route.meta.title ?? ''

    if (!title) {
      const path = withoutTrailingSlash(route.path)
      const basename = parseFilename(path, { strict: false })
      title = basename ? titleCase(basename) : 'Home'
    }

    return {
      title,
      visible: true,
      ...meta.value
    }
  })
}
