<script setup lang="ts">
const route = useRoute()
const router = useRouter()
</script>

<template>
  <section class="py-10">
    <Button @click="router.back()">
      Back
    </Button>
    <pre>{{ route.params }}</pre>
  </section>
</template>