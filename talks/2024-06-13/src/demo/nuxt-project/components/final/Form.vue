<script setup lang="ts">
const emit = defineEmits<{ (e: 'submit', text: string): void }>()
const text = ref('')
function submit() {
  emit('submit', text.value)
  text.value = ''
}
</script>

<template>
  <form @submit.prevent="submit">
    <label>
      Note
      <input v-model="text" type="text" />
    </label>
    <button>Submit</button>
  </form>
</template>
