<script setup lang="ts">
const { data: notes, refresh } = await useFetch('/final/notes')

async function submit(text: string) {
  await $fetch('/final/notes', {
    method: 'post',
    body: {
      text
    }
  })
  await refresh()
}

async function deleteNote(id: number) {
  await $fetch(`/final/notes/${id}`, {
    method: 'delete'
  })
  await refresh()
}
</script>

<template>
  <FinalForm @submit="submit" />
  <ul>
    <FinalNote v-for="note of notes" :note="note" @delete="deleteNote" />
  </ul>
</template>
