<script setup lang="ts">
const search = ref('')
const onSearch = () => {
  console.log(search.value)
}
</script>

<template>
  <form
    class="relative flex-1"
    @submit.prevent="onSearch"
  >
    <Input
      v-model="search"
      placeholder="Find Movies"
      class="pl-12 pr-8"
    />
    <img
      class="absolute top-1/2 -translate-y-1/2 left-3"
      src="/assets/images/icon/movie-icon.svg"
    >
    <img
      class="absolute top-1/2 -translate-y-1/2 right-3"
      src="/assets/images/icon/search-icon.svg"
    >
  </form>
</template>