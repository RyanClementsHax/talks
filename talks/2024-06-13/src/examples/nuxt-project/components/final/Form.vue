<script setup lang="ts">
const emit = defineEmits<{ (e: "submit", text: string): void }>();
const text = ref("");
function submit() {
  emit("submit", text.value);
  text.value = "";
}
</script>

<template>
  <form @submit.prevent="submit">
    <input type="text" v-model="text" />
    <button>Submit</button>
  </form>
</template>
