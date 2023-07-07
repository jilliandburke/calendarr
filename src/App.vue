<template>
  <div class="h-full m-auto p-6 bg-qalendar-black text-white">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
.bg-qalendar-black {
  background-color: #121212;
}
</style>
