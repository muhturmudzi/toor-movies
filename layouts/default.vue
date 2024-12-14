<script setup lang="ts">
useSeoMeta({
  title: 'Toor Movies',
  ogTitle: 'Toor Movies',
  description: 'This is Toor Movies Website',
  ogDescription: 'This is Toor Movies Website',
  ogImage: '/moovietime-logo@2x.png'
})
</script>

<template>
  <LayoutsTopbar />

  <main class="relative">
    <slot />
  </main>
</template>