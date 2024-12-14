<script setup lang="ts">
const listSort = [
  { value: 'popularity-asc', name: 'Popularity Ascending' },
  { value: 'popularity-dsc', name: 'Popularity Descending' },
  { value: 'release-date-asc', name: 'Release Date Ascending' },
  { value: 'release-date-dsc', name: 'Release Date Descending' },
  { value: 'rating-asc', name: 'Rating Ascending' },
  { value: 'rating-dsc', name: 'Rating Descending' },
]

const { genres } = useGenreMovieStore()
</script>

<template>
  <section class="mov-container py-24">
    <div class="relative flex items-center justify-between after:absolute after:-top-3 after:left-0 after:w-28 after:h-1 after:bg-destructive">
      <h3 class="text-2xl font-semibold">
        Discover Movies
      </h3>
      <p>
        <span class="text-sm font-medium mr-4">My Movies</span>
        <span class="text-xs py-3 px-4 rounded-full bg-black/20"><b class="text-sm mr-1">2</b> Movies</span>
      </p>
    </div>

    <div class="grid grid-cols-[240px_1fr] gap-8 mt-12">
      <div class="bg-gradient-1 w-full rounded-lg py-5">
        <p class="px-4 font-semibold">
          Sort Result By
        </p>

        <hr class="my-4">

        <div class="px-4">
          <Select
            id="sort"
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="(item, index) in listSort"
                :key="`sortby-${index}-${item.value}`"
                :value="item.value"
              >
                {{ item.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <hr class="my-4">

        <p class="px-4 font-semibold">
          Genres
        </p>

        <hr class="my-4">

        <div class="grid gap-4 px-4">
          <Label
            v-for="(item, index) in genres"
            :key="`genre-${index}-${item.id}`"
            :for="`genre-${index}-${item.id}`"
            class="flex items-center justify-between cursor-pointer"
          >
            <span>{{ item.name }}</span>
            <Checkbox
              :id="`genre-${index}-${item.id}`"
              class="border-white/50 bg-white/20 data-[state=checked]:bg-destructive data-[state=checked]:text-primary"
            />
          </Label>
        </div>
      </div>
      <div>
        hallo
      </div>
    </div>
  </section>
</template>