---
defaults:
  transition: slide-left
title: Introduction to Nuxt - The Vue.js Metaframework
mdc: true
drawings:
  persist: false
---


# Introduction to Nuxt
## The Vue.js Metaframework{.opacity-70}

<div class="mt-5">
<span class="opacity-70">by Ryan Clements, Owner of </span><span class="accent">Byte Bot</span> 🤖
</div>

<img src="/tech-logos/nuxt-logo.svg" alt="Nuxt logo" class="background"/>

---
layout: image-right
image: headshot.jpg
---

# About me

<v-clicks>

<div>Ryan Clements, Owner of <span class="accent">Byte Bot</span> 🤖</div>

<span class="opacity-80">a software agency that helps software teams ❤️ their 🏔️ Nuxt and 🖖 Vue apps.</span>

In my free time I like to contribute to Nuxt! My most is mostly on prerendering.

<div class="flex flex-col gap-2 mt-6">

<div>📧 info@bytebot.io</div>
<div>🐤 @RyanClementsHax</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>

</div>

</v-clicks>

---
layout: center
---

# <span class="no-clip">🖖</span> Vue.js refresher

<img src="/tech-logos/vue-logo.svg" alt="Vue logo" class="background h-100 w-100"/>

---

# What is web development?

<blockquote class="quote">Simply put, if it has to with something that shows up in a browser, it's web development <span class="not-italic">🌐</span></blockquote>

<div class="screenshot-heap">
<v-clicks>
<img src="/google-page.png" alt="google page" class="absolute top-20 left-40 -rotate-10 h-75">
<img src="/twitter-page.png" alt="twitter page" class="absolute top-15 right-40 rotate-5 h-75">
<img src="/azure-page.png" alt="azure page" class="absolute top-25 right-30 -rotate-5 h-75">
<img src="/discord-app.png" alt="discord app" class="absolute top-15 left-25 -rotate-15 h-75">
<img src="/shipt-app.webp" alt="shipt app" class="absolute top-10 left-70 h-100">
<img src="/slides-screenshot.png" alt="slides screenshot" class="absolute rotate-3 top-5 left-30 h-75">
</v-clicks>
</div>

---

# What problems does Vue solve?

<blockquote class="quote">Simply put, reactivity <span class="not-italic">🏃‍♂️</span>, state <span class="not-italic">🔢</span> and composition <span class="not-italic">🪆</span></blockquote>

<div class="flex flex-col gap-2 my-2">
<v-clicks>
<Counter :count="0" />
<Comment avatar="/headshot.jpg" name="Ryan Clements" handle="@RyanClementsHax" date="Mar 29" text="Testing in production is underrated but of course needs to be done carefully." />
<Comment avatar="/daniel-roe-headshot.jpg" name="daniel roe" handle="@danielcroe" date="Mar 29" text="✨ One of the changes we're landing in Nuxt v4 is a new default folder structure. Alongside a server/ directory (for nitro routes/api/etc.), we'll have another folder with the code we run to render pages for your site. It runs on both server + client We'd love ideas! 🙏" />
<Comment avatar="/anthony-fu-headshot.jpg" name="Anthony Fu" handle="@antfu7" date="Mar 26" text="Is it a good idea to livestream on talk preparation? 👀" />
</v-clicks>
</div>

---
layout: two-cols-normal-header
---

# Overview of Vue concepts

::left::

````md magic-move
```vue
<template>
  <div>
    <button>
      -
    </button>
    <span></span>
    <button>
      +
    </button>
  </div>
</template>
```

```vue {*|10,15,18,19}
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
  <div>
    <button @click="counter -= 1">
      -
    </button>
    <span>{{ counter }}</span>
    <button @click="counter += 1">
      +
    </button>
  </div>
</template>
```

```vue {*|23}
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
  <div>
    <button @click="counter -= 1">
      -
    </button>
    <span>{{ counter }}</span>
    <button @click="counter += 1">
      +
    </button>
  </div>
  <div v-if="counter > 10">Counter is too high!</div>
</template>
```

```vue {*}
<template>
  <div>
    <button @click="counter -= 1">
      -
    </button>
    <span>{{ counter }}</span>
    <button @click="counter += 1">
      +
    </button>
  </div>
  <div v-if="counter > 10">Counter is too high!</div>
</template>
```

```vue {*|2,4,9,11,17}
<template>
  <div class="flex w-min border ...">
    <button
      class="border-r border-main p-2 font-mono ..."
      @click="counter -= 1"
    >
      -
    </button>
    <span class="m-auto p-2">{{ counter }}</span>
    <button
      class="border-l border-main p-2 ..."
      @click="counter += 1"
    >
      +
    </button>
  </div>
  <div v-if="counter > 10" class="text-red-500 mt-2">
    Counter is too high!
  </div>
</template>
```
````

::right::

```vue
<Counter :count="0" />
```

<Counter :count="0" />

---
layout: center
---

# Introduction to 🏔️ Nuxt

<img src="/tech-logos/nuxt-logo.svg" alt="Nuxt logo" class="background h-100 w-100"/>

---
layout: two-cols-normal-header
---

# What problems does Nuxt solve within web development?

<blockquote class="quote">Nuxt is a batteries included framework to develop websites and applications using Vue <span class="not-italic">📦</span></blockquote>

::left::

## 🖖 Vue

<v-clicks>

- ✅ Reactivity
- ✅ State
- ✅ Composition

</v-clicks>

::right::

## 🏔️ Nuxt

<v-clicks>

- ✅ Routing
- ✅ Data fetching
- ✅ Server rendering
- ✅ Static rendering
- ✅ Search Engine Optimization (SEO)
- ✅ Layouts
- ✅ Building
- ✅ Modules
- ✅ Pre-packaged utilities
- ✅ Better developer experience

</v-clicks>

---

# Who uses Nuxt?

<div class="screenshot-heap">
<v-clicks>
<img src="/openai-page.png" alt="openai page" class="absolute top-20 left-40 -rotate-10 h-75">
<img src="/upwork-page.png" alt="upwork page" class="absolute top-15 right-40 rotate-5 h-75">
<img src="/jpl-page.png" alt="jpl page" class="absolute top-25 right-30 -rotate-5 h-75">
<img src="/netlify-page.png" alt="netlify page" class="absolute top-15 left-25 -rotate-15 h-75">
<img src="/asus-page.png" alt="asus page" class="absolute top-10 left-15 h-75">
<img src="/2k-page.png" alt="2k page" class="absolute rotate-3 top-5 left-30 h-75">
</v-clicks>
</div>

---
layout: center
---

# <span class="no-clip">🖼️</span> Demo time

---
layout: two-cols-normal-header
---

# Where to go from here...

::left::

## 🖖 Vue

- https://vuejs.org/
- https://vueschool.io/
- https://www.vuemastery.com/
- https://discord.com/invite/vue

::right::

## 🏔️ Nuxt

- https://nuxt.com/
- https://masteringnuxt.com/nuxt3
- https://discord.com/invite/nuxt

---
layout: center
---

# <span class="no-clip">🤔</span> Got questions?

---
layout: image-left
image: linktree-qr.png
backgroundSize: contain
---

# Here's how we can stay in touch

<div class="flex flex-col gap-5 text-2xl mt-5">

<div>📧 coaching@bytebot.io</div>
<div>🐤 @RyanClementsHax</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>

</div>
