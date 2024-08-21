<template>
<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8.68618" cy="9.57108" r="6.2" transform="rotate(-45 8.68618 9.57108)" :stroke="color" stroke-width="2.4"/>
  <rect x="11.8682" y="14.8744" width="3" height="9" rx="1" transform="rotate(-45 11.8682 14.8744)" :fill="color"/>
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