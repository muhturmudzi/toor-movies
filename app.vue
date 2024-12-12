<script setup lang="ts">
const counter = ref(0)
</script>

<template>
  <div>
    <Button @click="counter++">Counter++</Button>
    <Button variant="destructive" @click="counter--">Counter--</Button>
    <p class="text-red-600">{{ counter }}</p>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
