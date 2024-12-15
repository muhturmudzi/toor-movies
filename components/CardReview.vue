<script setup lang="ts">
import type { IReview } from '~/services/review'

interface IProps {
  data: IReview
}

const props = defineProps<IProps>()
const { public: { imgUrl } } = useRuntimeConfig()

const showAllDesc = ref(false)

const isMaxDesc = computed(() => {
  return props.data.content.length > 600
})

const description = computed(() => {
  if (showAllDesc.value) return props.data.content

  return props.data.content.slice(0, 600) + '...'
})
</script>

<template>
  <div class="bg-[#F9F9F9] shadow-lg rounded-xl p-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <NuxtImg
          v-if="data.author_details.avatar_path"
          format="webp"
          :src="`${imgUrl}${data.author_details.avatar_path}`"
          :alt="data.author"
          class="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div
          v-else
          class="w-12 h-12 rounded-full bg-[#1E232B36]"
        />
        <div>
          <p class="text-[#1E232A] text-sm font-bold">
            {{ data.author }}
          </p>
          <span class="text-xs text-[#666666]">
            {{ data.created_at }}
          </span>
        </div>
      </div>

      <div class="flex space-x-2 bg-[#C4C4C447] px-4 py-1 rounded-md">
        <div>
          <img
            src="/assets/images/icon/star.svg"
            alt="rating"
            class="w-4 mt-2"
          >
        </div>
        <p class="text-4xl text-black font-semibold">
          {{ data.author_details.rating || '-' }}
        </p>
      </div>
    </div>

    <p class="text-xs italic text-black leading-5 mt-6">
      {{ description }}
      <button
        v-if="isMaxDesc && !showAllDesc"
        aria-label="more-desc"
        class="italic text-xs text-destructive underline"
        @click="showAllDesc = !showAllDesc"
      >
        read the rest
      </button>
    </p>
  </div>
</template>