<script setup lang="ts">
import {
  getTrendingMovies,
  // type IMovie
} from '~/services/movies'

const colorMode = useColorMode()
const counter = ref(0)

// const trending = ref<IGeneralResponse<IMovie[]>>({
//   page: 0,
//   results: [],
//   total_pages: 0,
//   total_results: 0
// })

// const fetchTrending = async () => {
//   try {
//     const res = await getTrendingMovies()
//     trending.value = res
//   } catch (error) {
//     console.error(error)
//   }
// }

const { data: trend, refresh } = await useAsyncData(
  'trending-movies',
  () =>  getTrendingMovies()
)

// onMounted(() => {
//   fetchTrending()
// })
</script>

<template>
  <p>home</p>
  <!-- <pre>{{ trending }}</pre>
  <pre>{{ trend }}</pre> -->
  <div>
    <Button
      @click="counter++"
    >
      Counter++
    </Button>

    <Button
      variant="destructive"
      @click="counter--"
    >
      Counter--
    </Button>

    <p class="text-red-600">
      {{ counter }}
    </p>

    <Button @click="colorMode.preference = 'light'">
      Light
    </Button>
    <Button @click="colorMode.preference = 'dark'">
      Dark
    </Button>
    <Button @click="colorMode.preference = 'system'">
      System
    </Button>

    <Button as-child>
      <NuxtLink href="/detail/1">
        Go detail
      </NuxtLink>
    </Button>

    <Button @click="refresh">
      Refresh
    </Button>

    <div>
      <p
        v-for="item in trend?.results"
        :key="item.title"
        class="mb-2"
      >
        {{ item.title }}
      </p>
    </div>
  </div>
</template>