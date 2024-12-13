<script setup lang="ts">
const colorMode = useColorMode()
const counter = ref(0)
</script>

<template>
  <p>home</p>
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

    <Button as-child>
      <NuxtLink href="/detail/1">
        Go detail
      </NuxtLink>
    </Button>
  </div>
</template>