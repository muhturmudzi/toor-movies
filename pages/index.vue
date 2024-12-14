<script setup lang="ts">
import { getTrendingMovies } from '~/services/movies'

const { data: trendMovie } = await useAsyncData(
  'trending-movies',
  () =>  getTrendingMovies()
)
</script>

<template>
  <MovieCarousel :data="trendMovie?.results" />
  <div class="absolute top-[600px] left-4 w-full h-72 bg-white/5 z-[-1]" />
  <DiscoverMovie />
</template>