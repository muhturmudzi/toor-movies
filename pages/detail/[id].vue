<script setup lang="ts">
const route = useRoute()
const router = useRouter()
</script>

<template>
  <Button @click="router.back()">
    Back
  </Button>
  <pre>{{ route.params }}</pre>
</template>