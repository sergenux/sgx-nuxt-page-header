import { computed, useRoute, type ComputedRef } from '#imports'

export interface Result {
  title: string
  visible: boolean
  [key: string]: unknown
}

export function usePageHeader(): ComputedRef<Result> {
  const route = useRoute()
  return computed(() => ({
    title: route.meta.title ?? '',
    visible: true,
    ...route.meta.pageHeader
  }))
}
