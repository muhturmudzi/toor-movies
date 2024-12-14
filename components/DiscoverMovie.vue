<script setup lang="ts">
import {
  LoaderCircle
} from 'lucide-vue-next'
import { getDiscoverMovies, type IMovie } from '~/services/movies'

type ISort =
  'popularity-asc' |
  'popularity-dsc' |
  'release-asc' |
  'release-dsc' |
  'rating-asc' |
  'rating-dsc'

const listSort: { value: ISort, name: string }[] = [
  { value: 'popularity-asc', name: 'Popularity Ascending' },
  { value: 'popularity-dsc', name: 'Popularity Descending' },
  { value: 'release-asc', name: 'Release Date Ascending' },
  { value: 'release-dsc', name: 'Release Date Descending' },
  { value: 'rating-asc', name: 'Rating Ascending' },
  { value: 'rating-dsc', name: 'Rating Descending' },
]

const page = ref(1)
const discoverMovies = ref<IMovie[]>([])

const { data: discover, status: statDiscover } = await useAsyncData(
  'discover-movies',
  async () => getDiscoverMovies({ page: page.value }),
  {
    watch: [page]
  }
)

if (discover.value) {
  discoverMovies.value = discover.value.results
}

watch(discover, (newDiscover) => {
  if (newDiscover?.results) {
    discoverMovies.value = [...discoverMovies.value, ...newDiscover.results]
  }
})

const sortSelected = ref<ISort>('popularity-asc')
const listGenreChecked = ref<number[]>([])

const sortMovies = (movies: IMovie[], key: 'popularity' | 'rating' | 'release', order: 'asc' | 'dsc'): IMovie[] => {
  return movies.sort((a, b) => {
    let valueA: number | Date = 0
    let valueB: number | Date = 0

    switch (key) {
      case 'popularity':
        valueA = a.popularity
        valueB = b.popularity
        break
      case 'rating':
        valueA = a.vote_average
        valueB = b.vote_average
        break
      case 'release':
        valueA = new Date(a.release_date)
        valueB = new Date(b.release_date)
        break
    }

    return order === 'asc'
      ? valueA < valueB ? -1 : valueA > valueB ? 1 : 0
      : valueA > valueB ? -1 : valueA < valueB ? 1 : 0
  })
}

const sortedAndFilteredMovies = computed(() => {
  const filteredMovies = listGenreChecked.value.length
    ? discoverMovies.value.filter(movie => movie.genre_ids.some(genre => listGenreChecked.value.includes(genre)))
    : discoverMovies.value

  const [key, order] = sortSelected.value.split('-') as [string, 'asc' | 'dsc']
  return sortMovies(filteredMovies, key as 'popularity' | 'rating' | 'release', order)
})

const totalSortedAndFilteredMovies = computed(() => {
  return sortedAndFilteredMovies.value.length
})
</script>

<template>
  <section class="mov-container py-24">
    <div class="relative flex items-center justify-between after:absolute after:-top-3 after:left-0 after:w-28 after:h-1 after:bg-destructive">
      <h3 class="text-2xl font-semibold">
        Discover Movies
      </h3>
      <p>
        <span class="text-sm font-medium mr-4">My Movies</span>
        <span class="text-xs py-3 px-4 rounded-full bg-black/20"><b class="text-sm mr-1">{{ totalSortedAndFilteredMovies }}</b> Movies</span>
      </p>
    </div>

    <div class="grid grid-cols-[240px_1fr] gap-8 mt-12">
      <div>
        <FilterSortMovie
          :list-sort="listSort"
          :sort-value="sortSelected"
          @on-sort-change="sortSelected = $event"
          @on-checked-genre-change="listGenreChecked = $event"
        />
      </div>
      <div>
        <div class="grid grid-cols-4 gap-4">
          <CardMovie
            v-for="(item, index) in sortedAndFilteredMovies"
            :key="`movies-${index}-${item.id}`"
            :data="item"
          />
        </div>

        <div class="text-center mt-14">
          <Button
            v-if="page < 5"
            variant="red"
            class="rounded-full w-40"
            @click="page++"
          >
            <LoaderCircle
              v-if="statDiscover === 'pending'"
              :size="16"
              class="animate-spin mr-2"
            />
            {{ statDiscover === 'pending'? 'Please wait' : 'Show More' }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>