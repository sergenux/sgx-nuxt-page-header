import { name, version } from '../package.json'
import {
  addComponent,
  addImports,
  createResolver,
  defineNuxtModule
} from '@nuxt/kit'

export interface ModuleOptions {
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'sgxPageHeader'
  },
  defaults: {
    prefix: 'Sgx'
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.build.transpile.push(resolve('runtime'))

    addComponent({
      name: `${options.prefix}PageHeader`,
      filePath: resolve('runtime/components/page-header.vue')
    })

    addImports({
      name: 'usePageHeader',
      as: `use${options.prefix}PageHeader`,
      from: resolve('runtime/composables/page-header')
    })
  }
})

declare module '#app/../pages/runtime/composables' {
  interface PageMeta {
    title?: string
    pageHeader?: {
      title?: string
      visible?: boolean
      [key: string]: unknown
    }
  }
}
