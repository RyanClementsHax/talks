<script setup lang="ts">
defineProps<{
  src: string;
  name: string;
  decoration: string;
}>();
</script>
<template>
  <figure>
    <img :src="src" :alt="`${name} avatar`" />
    <figcaption>{{ decoration }}{{ name }}</figcaption>
  </figure>
</template>
<style scoped>
figure {
  @apply flex flex-col items-center;
}
img {
  @apply h-30 w-30 rounded-full object-cover;
}
</style>
