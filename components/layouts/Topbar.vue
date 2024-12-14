<script setup lang="ts">
import { getGenreMovies } from '~/services/genre'
const genreStore = useGenreMovieStore()

await useAsyncData('genres', () => getGenreMovies().then((data) => {
  genreStore.genres = data.genres
}))
</script>

<template>
  <header class="topbar">
    <div class="mov-container flex items-center py-4 space-x-8 lg:space-x-12">
      <img
        src="/assets/images/icon/moovietime-logo.svg"
        alt="moovietime"
      >

      <InputSearch />

      <ul class="hidden md:flex items-center space-x-6 lg:space-x-10 uppercase text-sm font-semibold [&>li]:cursor-pointer">
        <Popover>
          <PopoverTrigger as-child>
            <li class="flex space-x-2">
              <img
                src="/assets/images/icon/grid-icon.svg"
                alt="grid"
              >
              <span>Categories</span>
            </li>
          </PopoverTrigger>
          <PopoverContent class="w-48">
            <ul class="text-xs space-y-1">
              <li
                v-for="(item, index) in genreStore.genres"
                :key="`genre-${index}-${item.name}`"
                class="py-1 px-2 hover:bg-red-600 rounded-sm cursor-pointer"
              >
                {{ item.name }}
              </li>
            </ul>
          </PopoverContent>
        </Popover>
        <li>Movies</li>
        <li>Tv Shows</li>
        <li>Login</li>
      </ul>
    </div>
  </header>
</template>