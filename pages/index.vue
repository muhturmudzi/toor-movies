<script setup lang="ts">
import { getTrendingMovies } from '~/services/movies'

const { data: trendMovie } = await useAsyncData(
  'trending-movies',
  () =>  getTrendingMovies()
)
</script>

<template>
  <MovieCarousel :data="trendMovie?.results" />
  <div class="absolute top-[600px] right-0 w-[97%] h-72 bg-white/5 z-[-1]" />
  <DiscoverMovie />
</template>