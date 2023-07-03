<template>
  <div :class="[variant.background, 'p-4 rounded-md']">
    <div class="flex flex-row">
      <font-awesome-icon
        :icon="['fas', variant.icon]"
        :class="[variant.iconColor, 'h-5 w-5 px-3 mt-[2px]']"
        v-if="variant.icon"
      />
      <div class="flex flex-col">
        <div :class="[variant.title, 'font-bold mb-1']">
          <slot name="title" :class="variant.title"></slot>
        </div>

        <div :class="[variant.bodyText, 'mb-0 text-sm']">
          <slot name="description"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String
  }
})

const variant = computed(() => {
  switch (props.variant) {
    case 'success':
      return {
        background: 'bg-green-50',
        title: 'text-green-800',
        bodyText: 'text-green-700',
        iconColor: 'text-green-400',
        icon: 'file-circle-check'
      }
    case 'warning':
      return {
        background: 'bg-yellow-50',
        title: 'text-yellow-800',
        bodyText: 'text-yellow-700',
        iconColor: 'text-yellow-400',
        icon: 'triangle-exclamation'
      }
    case 'danger':
      return {
        background: 'bg-red-50',
        title: 'text-red-800',
        bodyText: 'text-red-700',
        iconColor: 'text-red-400',
        icon: 'triangle-exclamation'
      }
    case 'info':
      return {
        background: 'bg-blue-50',
        title: 'text-blue-800',
        iconColor: 'text-blue-400',
        bodyText: 'text-blue-700'
      }
    default:
      return {
        background: 'bg-blue-50',
        title: 'text-blue-800',
        bodyText: 'text-blue-700'
      }
  }
})
</script>
