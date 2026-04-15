<!--
  Usage:
```md
---
layout: two-cols-normal-header
---
This spans both
::left::
# Left
This shows on the left
::right::
# Right
This shows on the right
::bottom::
This shows at the bottom, aligned to the end (bottom) of the grid
```
-->

<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
  },
  layoutClass: {
    type: String,
  },
});
</script>

<template>
  <div
    class="slidev-layout default slidev-page two-cols-normal-header"
    :class="layoutClass"
  >
    <div class="header">
      <slot />
    </div>
    <div class="flex gap-5">
      <div :class="props.class">
        <slot name="left" />
      </div>
      <div :class="props.class">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style>
.two-cols-normal-header {
  display: flex;
  flex-direction: column;
}

.header > *:last-child {
  @apply mb-5;
}
</style>
