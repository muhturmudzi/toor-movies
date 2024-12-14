<script setup lang="ts">

</script>

<template>
  <header class="topbar">
    <div class="mov-container flex items-center py-4 space-x-8 lg:space-x-12">
      <img
        src="/assets/images/icon/moovietime-logo.svg"
        alt="moovietime"
      >

      <InputSearchMovie />

      <ul class="hidden md:flex items-center space-x-6 lg:space-x-10 uppercase text-sm font-semibold">
        <li class="flex space-x-2">
          <img
            src="/assets/images/icon/grid-icon.svg"
            alt="grid"
          >
          <span>Categories</span>
        </li>
        <li>Movies</li>
        <li>Tv Shows</li>
        <li>Login</li>
      </ul>
    </div>
  </header>
</template>