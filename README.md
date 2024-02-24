# sgx-nuxt-page-header

Page header feature for Nuxt.

## Setup

1.  Install package:

```bash
npm install sgx-nuxt-page-header
```

2. Add package to `modules` in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['sgx-nuxt-page-header']
})
```

3. Add `<SgxPageHeader>` component to `app.vue`:

```vue
<template>
  <div>
    <SgxPageHeader />
    <NuxtPage />
  </div>
</template>
```

## Configuration

### Module options

**Type:**

```ts
interface ModuleOptions {
  // Prefix for components and composables
  // Default: "Sgx"
  prefix?: string
}
```

**Usage:**

Set module options to `sgxPageHeader` in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['sgx-nuxt-page-header'],
  sgxPageHeader: {
    // Module options...
  }
})
```

## Page properties

**Type:**

```ts
interface PageMeta {
  // Base page title
  // Default: Generated from URL slug
  title?: string

  // Page header params
  pageHeader?: {
    // Page header title
    // Default: From base page title
    title?: string

    // Component visibility
    // Default: true
    visible?: boolean

    // Custom params
    [key: string]: unknown
  }
}
```

**Usage:**

Auto-title from URL slug if no params:

```vue
<script setup lang="ts">
definePageMeta({
  // Empty...
})
</script>
```

Base page title:

```vue
<script setup lang="ts">
definePageMeta({
  title: 'Posts'
})
</script>
```

Override base title:

```vue
<script setup lang="ts">
definePageMeta({
  title: 'Posts'
  pageHeader: {
    title: "List of posts"
  }
})
</script>
```

Custom params:

```vue
<script setup lang="ts">
definePageMeta({
  pageHeader: {
    myParam1: 'my-param-1',
    myParam2: 'my-param-2'
  }
})
</script>
```

Hide page header component:

```vue
<script setup lang="ts">
definePageMeta({
  pageHeader: {
    visible: false
  }
})
</script>
```

Override with dynamic data:

```vue
<script setup lang="ts">
definePageMeta({
  middleware: async (route) => {
    const data = await fetchData(route.params)

    // Base page title
    route.meta.title = data.title

    // Page header params
    route.meta.pageHeader = {
      ...route.meta.pageHeader,
      title: data.title
      // Other params...
    }
  }
})
</script>
```

## Components

### `<SgxPageHeader>`

**Types:**

```ts
interface Props {
  // Element
  // Default: 'h1'
  as?: string
}

interface Slot {
  // Page title
  title: string

  // Custom params
  [key: string]: unknown
}
```

**Usage:**

Basic usage:

```vue
<template>
  <SgxPageHeader />
</template>
```

Override component template:

```vue
<template>
  <SgxTitle v-slot="{ title, myParam1, myParam2 }" as="div">
    <h1>{{ title }}</h1>
    <p>{{ myParam1 }}</p>
    <p>{{ myParam2 }}</p>
  </SgxTitle>
</template>
```

## Composables

### `usePageHeader`

**Type:**

```ts
function (): ComputedRef<Result>

interface Result {
  // Page title
  title: string

  // Component visibility
  visible: boolean

  // Custom params
  [key: string]: unknown
}
```

**Usage:**

```vue
<template>
  <div v-if="pageHeader.visible">
    <h1>{{ pageHeader.title }}</h1>
    <p>{{ pageHeader.myParam1 }}</p>
    <p>{{ pageHeader.myParam2 }}</p>
  </div>
</template>

<script setup lang="ts">
const pageHeader = useSgxPageHeader()

// Individual values without loss of reactivity
// const title = computed(() => pageHeader.value.title)
// const visible = computed(() => pageHeader.value.visible)
// const myParam1 = computed(() => pageHeader.value.myParam1)
// const myParam2 = computed(() => pageHeader.value.myParam2)
</script>
```

## Development

```bash
# Clone repository
git clone https://github.com/sergenux/sgx-nuxt-page-header.git

# Change directory
cd sgx-nuxt-page-header

# Install dependencies
npm install

# Prepare types
npm run dev:prepare

# Develop with playground
npm run dev

# Build playground
npm run dev:build

# Code checks
npm run typecheck
npm run lint
npm run lint:fix
npm run format
npm run format:fix
```
