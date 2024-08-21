<template>
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_13_117)">
      <circle cx="7.5" cy="4.5" r="3.3" :stroke="color" stroke-width="1.6" />
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M13.6 15.5C13.6 12.1311 10.869 9.39999 7.50002 9.39999C4.13109 9.39999 1.40002 12.1311 1.40002 15.5H3.00002C3.00002 13.0147 5.01474 11 7.50002 11C9.98531 11 12 13.0147 12 15.5H13.6Z"
        :fill="color" />
    </g>
    <defs>
      <clipPath id="clip0_13_117">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isLight = window.matchMedia('(prefers-color-scheme: light)').matches
const color = ref('black')
if (!isLight) {
  color.value = '#cccccc'
}
</script>