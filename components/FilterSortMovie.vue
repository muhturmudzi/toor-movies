<script setup lang="ts">
interface IProps {
  listSort: { value: string, name: string }[]
  sortValue: string
}

defineProps<IProps>()
const emit = defineEmits(['onSortChange', 'onCheckedGenreChange'])
const { genres } = useGenreMovieStore()

const listCheckedGenre = ref<number[]>([])
const toggleCheckbox = ($event: boolean, id: number) => {
  if ($event) {
    listCheckedGenre.value.push(id)
    return
  }

  const index = listCheckedGenre.value.indexOf(id)
  if (index > -1) {
    listCheckedGenre.value.splice(index, 1)
  }
}

const isGenreChecked = (id: number) => {
  return listCheckedGenre.value.includes(id)
}

watch(
  () => listCheckedGenre.value,
  (newChecked) => {
    emit('onCheckedGenreChange', newChecked)
  },
  { deep: true }
)
</script>

<template>
  <div class="bg-gradient-1 w-full rounded-lg py-5">
    <p class="px-4 font-semibold">
      Sort Result By
    </p>

    <hr class="my-4">

    <div class="px-4">
      <Select
        id="sort"
        :default-value="sortValue"
        @update:model-value="emit('onSortChange', $event)"
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
          :checked="isGenreChecked(item.id)"
          @update:checked="toggleCheckbox($event, item.id)"
        />
      </Label>
    </div>
  </div>
</template>