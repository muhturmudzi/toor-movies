<script setup lang="ts">
import { getRecommendationMovies } from '~/services/movies'
import { getReviewMovie } from '~/services/review'

const route = useRoute()
const router = useRouter()

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
</script>

<template>
  <section class="py-10">
    <Button @click="router.back()">
      Back
    </Button>
    <pre>{{ route.params }}</pre>
  </section>

  <section class="bg-white pt-14">
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