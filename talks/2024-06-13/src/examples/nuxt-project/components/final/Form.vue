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
      <input type="text" v-model="text" />
    </label>
    <button>Submit</button>
  </form>
</template>
