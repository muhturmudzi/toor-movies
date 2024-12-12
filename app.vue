<script setup lang="ts">
const colorMode = useColorMode()
const counter = ref(0)
</script>

<template>
  <div>
    <Button
      @click="counter++"
    >
      Counter++
    </Button>

    <Button
      variant="destructive"
      @click="counter--"
    >
      Counter--
    </Button>

    <p class="text-red-600">
      {{ counter }}
    </p>

    <Button @click="colorMode.preference = 'light'">
      Light
    </Button>
    <Button @click="colorMode.preference = 'dark'">
      Dark
    </Button>
    <Button @click="colorMode.preference = 'system'">
      System
    </Button>

    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
  </div>
</template>
