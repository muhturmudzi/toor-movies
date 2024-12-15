<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { getSearchMovie, type IMovie } from '~/services/movies'

const search = ref('')
const listMovie = ref<IMovie[]>([])
const loading = ref(false)

const fetchMovie = async () => {
  try {
    const { results } = await getSearchMovie(search.value)
    loading.value = false
    listMovie.value = results
  } catch (error) {
    console.error(error)
    loading.value = false
    listMovie.value = []
  }
}

const debouncedFn = useDebounceFn(() => {
  fetchMovie()
}, 1000)

watch(
  () => search.value,
  (newValue) => {
    if (!newValue) {
      loading.value = false
      listMovie.value = []
      return
    }
    loading.value = true
    debouncedFn()
  }
)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <div
        class="relative flex-1"
      >
        <Input
          v-model="search"
          placeholder="Find Movies"
          class="pl-12 pr-8"
        />
        <img
          class="absolute top-1/2 -translate-y-1/2 left-3"
          src="/assets/images/icon/movie-icon.svg"
          alt="movie"
        >
        <img
          class="absolute top-1/2 -translate-y-1/2 right-3"
          src="/assets/images/icon/search-icon.svg"
          alt="search"
        >
      </div>
    </PopoverTrigger>
    <PopoverContent class="w-full">
      <ul
        v-if="listMovie.length && search"
        class="text-xs space-y-1 max-h-[80vh] overflow-auto"
      >
        <li
          v-for="(item, index) in listMovie"
          :key="`genre-${index}-${item.title}`"
        >
          <NuxtLink
            :href="`/detail/${item.id}`"
            class="py-1 px-2 hover:bg-destructive rounded-sm block"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
      <p
        v-if="listMovie.length < 1 && !search"
        class="text-xs"
      >
        Type something...
      </p>
      <p
        v-if="listMovie.length < 1 && search && !loading"
        class="text-xs"
      >
        Not found
      </p>
      <p
        v-if="loading && search"
        class="text-xs"
      >
        Loading...
      </p>
    </PopoverContent>
  </Popover>
</template>