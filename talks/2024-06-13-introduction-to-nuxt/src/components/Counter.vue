<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  count: {
    default: 0,
  },
});

const counter = ref(props.count);
</script>

<template>
  <div class="flex w-min border rounded-md border-main overflow-hidden">
    <button
      class="border-r border-main p-2 font-mono hover:bg-gray-400 hover:bg-opacity-20"
      @click="counter -= 1"
    >
      -
    </button>
    <span class="m-auto p-2">{{ counter }}</span>
    <button
      class="border-l border-main p-2 font-mono hover:bg-gray-400 hover:bg-opacity-20"
      @click="counter += 1"
    >
      +
    </button>
  </div>
  <div v-if="counter > 10" class="text-red-500 mt-2">Counter is too high!</div>
</template>
