<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  avatar: string;
  handle: string;
  date: string;
  name: string;
  text: string;
}>();
</script>

<template>
  <div class="flex border border-main rounded-md p-3 w-full">
    <img :src="props.avatar" alt="avatar" class="w-10 h-10 rounded-full" />
    <div class="flex flex-col ml-2 w-full">
      <div class="flex">
        <span>{{ props.name }}</span>
        <span class="text-stone-500 ml-2">
          <span>{{ props.handle }}</span>
          ·
          <span>{{ props.date }}</span>
        </span>
        <ph:dots-three class="ml-auto text-stone-500" />
      </div>
      <p class="!mt-2 !mb-0">{{ props.text }}</p>
    </div>
  </div>
</template>
