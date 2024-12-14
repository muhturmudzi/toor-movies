<script setup lang="ts">
import type { IMovie } from '~/services/movies'
import { getYear } from '~/lib/utils'

interface IProps {
  data: IMovie
}

defineProps<IProps>()
const { public: { imgUrl } } = useRuntimeConfig()
const { getGenreNameById } = useGenreMovieStore()
</script>

<template>
  <div>
    <div class="relative group">
      <NuxtImg
        :src="`${imgUrl}${data.poster_path}`"
        class="w-full object-cover"
        loading="lazy"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/80 flex flex-col space-y-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="flex items-center space-x-2">
          <img
            src="/assets/images/icon/star.svg"
            alt="rating"
            class="w-7"
          >
          <span class="text-2xl font-semibold">{{ data.vote_average }}</span>
        </div>
        <p class="text-lg font-semibold">
          {{ getGenreNameById(data.genre_ids[0]) }}
        </p>
        <div class="flex flex-col space-y-3">
          <Button
            variant="red"
            size="sm"
            class="rounded-full w-24"
          >
            <NuxtLink :href="`/detail/${data.id}`">
              View
            </NuxtLink>
          </Button>
          <Button
            variant="outline-white"
            size="sm"
            class="uppercase rounded-full w-24"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
    <p class="font-semibold mt-3">
      {{ data.title }}
    </p>
    <span class="text-sm text-[#929292]">{{ getYear(data.release_date) }}</span>
  </div>
</template>