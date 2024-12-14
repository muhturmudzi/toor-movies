<script setup lang="ts">
import { watchOnce } from '@vueuse/core'
import type { IMovie } from '~/services/movies'
import type { CarouselApi } from './ui/carousel'
import type { EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { getYear } from '~/lib/utils'

interface IProps {
  data?: IMovie[]
}

defineProps<IProps>()
const { public: { imgUrl } } = useRuntimeConfig()
const { getGenreNameById } = useGenreMovieStore()

const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

const onSelect = () => {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return

  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

const onThumbClick = (index: number) => {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return

  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})
</script>

<template>
  <section class="relative pt-32 pb-20 overflow-hidden">
    <Carousel
      :plugins="[Autoplay({
        delay: 3000,
      })]"
      class="max-w-[600px] mx-auto"
      @init-api="(val: EmblaCarouselType | undefined) => emblaMainApi = val"
    >
      <CarouselContent :show-overflow="true">
        <CarouselItem
          v-for="(item, index) in data"
          :key="index"
        >
          <div
            class="flex mx-5 transition"
            :class="{'opacity-30': selectedIndex !== index}"
          >
            <NuxtImg
              :src="`${imgUrl}${item.poster_path}`"
              class="w-60 object-cover"
              loading="lazy"
            />
            <div class="flex items-center w-full">
              <div class="bg-black text-white p-5 w-full">
                <div class="flex items-center space-x-2">
                  <img
                    src="/assets/images/icon/star.svg"
                    alt="rating"
                  >
                  <span class="font-bold">{{ item.vote_average }}</span>
                </div>

                <h4 class="text-2xl font-medium">
                  {{ item.title }}
                </h4>

                <div class="flex items-center space-x-2 mt-2">
                  <p>{{ getYear(item.release_date) }}</p>
                  <div class="bg-white/50 w-2 h-2 rounded-full" />
                  <p>{{ getGenreNameById(item.genre_ids[0]) }}</p>
                </div>

                <p class="text-xs leading-5 mt-2">
                  {{ item.overview }}
                </p>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>

    <Carousel
      class="absolute left-1/2 -translate-x-2/4 bottom-4"
      @init-api="(val: EmblaCarouselType | undefined) => emblaThumbnailApi = val"
    >
      <CarouselContent class="flex space-x-2 ml-0">
        <CarouselItem
          v-for="(_, index) in data"
          :key="index"
          class="pl-1 basis-1/20 cursor-pointer"
          @click="onThumbClick(index)"
        >
          <button
            :class="`h-3 rounded-full transition-all ${index === selectedIndex ? 'w-16 bg-destructive' : 'w-3 bg-white/50'}`"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </section>
</template>