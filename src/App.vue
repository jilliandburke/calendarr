<template>
  <div class='h-full m-auto p-6 bg-qalendar-black text-white'>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router'
import { useConfigStore } from './stores/config-store';

const configStore = useConfigStore()

onBeforeMount(async () => {
  try {
    await configStore.readConfig()
  } catch (error) {
    console.log(error)
  }
})
</script>

<style>
  .bg-qalendar-black {
    background-color: #121212;
  }
</style>
