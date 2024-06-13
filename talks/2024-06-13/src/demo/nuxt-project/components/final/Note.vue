<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
defineProps<{ note: { id: number; text: string } }>()
const emit = defineEmits<{ (e: 'delete', id: number): void }>()
</script>

<template>
  <li>
    {{ note.text }}
    <button class="danger" @click="emit('delete', note.id)">Delete</button>
  </li>
</template>
