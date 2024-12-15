<script setup lang="ts">
import { getDetailMovies, getRecommendationMovies } from '~/services/movies'
import { getReviewMovie } from '~/services/review'
import { getYear, formatCurrencies } from '~/lib/utils'

const route = useRoute()
const { public: { imgUrl } } = useRuntimeConfig()

const { data: detail } = await useAsyncData(
  'detail-movie',
  () => getDetailMovies(Number(route.params.id)),
  {
    watch: [route.params]
  }
)

const { data: review } = await useAsyncData(
  'review-movie',
  () => getReviewMovie(Number(route.params.id)),
  {
    watch: [route.params]
  }
)

const { data: recommendation } = await useAsyncData(
  'recommendation-movies',
  () => getRecommendationMovies(Number(route.params.id)),
  {
    watch: [route.params]
  }
)

const genres = computed(() => {
  return detail.value?.genres.map(item => item.name).join(', ')
})

useSeoMeta({
  title: () => String(detail.value?.title),
  ogTitle: () => String(detail.value?.title),
  description: () => detail.value?.overview,
  ogDescription: () => detail.value?.overview,
  ogImage: () => `${imgUrl}/w1280${detail.value?.backdrop_path}`
})
</script>

<template>
  <section class="relative">
    <NuxtImg
      format="webp"
      :src="`${imgUrl}/w1280${detail?.backdrop_path}`"
      :alt="detail?.title"
      class="w-full object-cover opacity-20"
      loading="lazy"
    />

    <div class="bg-black/50 absolute bottom-0 w-full">
      <div class="mov-container">
        <div class="flex items-center space-x-3 py-5 pl-64">
          <div class="flex items-center space-x-4">
            <img
              src="/assets/images/icon/star.svg"
              alt="rating"
              class="w-8"
            >
            <h4 class="text-4xl font-semibold">
              {{ detail?.vote_average }}
            </h4>
          </div>

          <ul class="list-detail">
            <li>
              <span>User Score</span>
              <p>{{ detail?.vote_count }} Votes</p>
            </li>
            <li>
              <span>Status</span>
              <p>{{ detail?.status }}</p>
            </li>
            <li>
              <span>language</span>
              <p>{{ detail?.spoken_languages[0].english_name }}</p>
            </li>
            <li>
              <span>budget</span>
              <p>{{ formatCurrencies(detail?.revenue || 0) }}</p>
            </li>
            <li>
              <span>production</span>
              <p>{{ detail?.production_companies[0].name }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 translate-y-[calc(50%-42px)] w-full">
      <div class="mov-container flex space-x-10">
        <NuxtImg
          format="webp"
          :src="`${imgUrl}/w500${detail?.poster_path}`"
          :alt="detail?.title"
          class="w-[220px] object-cover drop-shadow-lg"
          loading="lazy"
        />
        <div class="flex flex-col justify-between">
          <div class="text-white space-y-1">
            <span class="text-lg font-medium">
              {{ getYear(detail?.release_date || '') }}
            </span>
            <h3 class="text-4xl font-semibold">
              {{ detail?.title }}
            </h3>
            <p>
              {{ genres }}
            </p>
          </div>

          <div class="max-w-3xl">
            <h3 class="text-sm text-[#FF0000] font-semibold">
              OVERVIEW
            </h3>
            <p class="text-sm text-black leading-7 mt-2">
              {{ detail?.overview }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-white pt-40">
    <div class="mov-container">
      <h3 class="text-sm text-[#FF0000] font-semibold">
        REVIEWS
      </h3>
      <div class="snap-x flex space-x-8 overflow-x-auto pt-6 pb-14">
        <div
          v-for="(item, index) in review?.results"
          :key="`review-${index}-${item.id}`"
        >
          <CardReview
            :data="item"
            class="snap-start min-w-[600px]"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="mov-container py-12">
    <h3 class="text-sm text-white font-semibold">
      RECOMMENDATION MOVIES
    </h3>
    <div class="snap-x flex space-x-4 overflow-x-auto mt-10">
      <CardMovie
        v-for="(item, index) in recommendation?.results"
        :key="`movies-${index}-${item.id}`"
        :data="item"
        class="snap-start min-w-60"
      />
    </div>
  </section>
</template>