<template>
  <svg class="icon">
    <use :href="`#${name}`" :xlink:href="`#${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: string }>();
</script>
