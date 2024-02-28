<template>
  <div>
    <nav v-if="$route.path != '/'">
      <NuxtLink to="/">Back to Home page</NuxtLink>
    </nav>
    <SgxPageHeader />
    <NuxtPage />
  </div>
</template>
