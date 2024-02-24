<template>
  <component :is="as">
    <slot v-bind="pageHeader">{{ pageHeader.title }}</slot>
  </component>
</template>

<script setup lang="ts">
import { usePageHeader } from '../composables/page-header'

interface Props {
  as?: string
}

interface Slot {
  title: string
  [key: string]: unknown
}

withDefaults(defineProps<Props>(), { as: 'h1' })
defineSlots<{ default(props: Slot): any }>()

const pageHeader = usePageHeader()
</script>
