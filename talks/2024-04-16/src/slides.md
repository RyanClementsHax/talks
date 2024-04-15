---
defaults:
  transition: slide-left
title: From 0 to 146k weekly downloads - lessons from accidental open source success
mdc: true
drawings:
  persist: true
---

# From 0 to 146k weekly downloads
## Lessons from accidental open source success{.opacity-70}

<div class="mt-5">
<span class="opacity-70">by Ryan Clements, Owner of </span><span class="accent">Byte Bot</span> 🤖
</div>

<img src="/downloads-graph.png" alt="downloads graph" class="background"/>

---
layout: image-right
image: headshot.jpg
---

# Who am I?

<v-clicks>

<div>Ryan Clements, Owner of <span class="text-yellow-400">Byte Bot</span> 🤖</div>

<span class="opacity-80">a software agency that helps teams ship full stack solutions to their users through</span> <span class="text-yellow-400">training and consulting</span> 🚀

🤓 I also coach software developers!

<div class="flex gap-2">
  <img src="/tech-logos/react-logo.svg" alt="react" class="logo" />
  <img src="/tech-logos/nextjs-logo.svg" alt="nextjs" class="logo" />
  <img src="/tech-logos/vue-logo.svg" alt="vue" class="logo" />
  <img src="/tech-logos/nuxt-logo.svg" alt="nuxt" class="logo" />
  <img src="/tech-logos/typescript-logo.svg" alt="typescript" class="logo" />
  <img src="/tech-logos/javascript-logo.svg" alt="javascript" class="logo" />
</div>

<div class="flex gap-2 mt-2">
  <img src="/tech-logos/node-logo.svg" alt="node" class="logo" />
  <img src="/tech-logos/deno-logo.svg" alt="deno" class="logo" />
  <img src="/tech-logos/csharp-logo.svg" alt="csharp" class="logo" />
  <img src="/tech-logos/aspnet-core-logo.svg" alt="aspnet core" class="logo" />
  <img src="/tech-logos/postgres-logo.svg" alt="postgres" class="logo" />
</div>

<div class="flex flex-col gap-2 text-sm mt-5">

<div>📲 calendly.com/byte-bot</div>
<div>📧 info@bytebot.io</div>
<div>📧 coaching@bytebot.io</div>
<div>🐤 @RyanClementsHax</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>
<div>🔗 linkedin.com/in/ryan-clements-hax</div>

</div>

</v-clicks>

---
layout: image
image: blog-screenshot.png
backgroundSize: contain
transition: fade
---

---
layout: center
clicks: 3
---

<div class="relative h-50 w-150">
<div
  v-motion
  :initial="{ y: -50 }"
  :enter="{ x: 200, y: 0 }"
  :click-1="{ x: 75 }"
  class="absolute inset-0"
>
  <img src="/tech-logos/nextjs-logo.svg" alt="nextjs logo" class="h-50 w-50" />
</div>
<div
  v-click
  v-motion
  :enter="{ x: 0, y: 0 }"
  :click-1="{ x: 325 }"
  class="absolute inset-0">
  <img src="/tech-logos/storybook-logo.svg" alt="storybook logo" class="h-50 w-50" />
</div>
<div
  v-click
  v-motion
  :initial="{ x: 125, y: -125, rotate: 0 }"
  :click-2="{ y: -85 }"
  :click-3="{ rotate: 10 }"
  class="absolute text-[250px]">
  {{ $clicks > 2 ? '💔' : '❤️' }}
</div>
</div>

---
layout: image
image: storybook-screenshot-component.png
backgroundSize: contain
---

---
layout: image
image: storybook-screenshot.png
backgroundSize: contain
---

---
src: ./pages/nextjs-storybook-integration.md
---

---
layout: center
clicks: 3
---

<h1 class="no-clip !text-[100px]">{{ feelings[$clicks] }} </h1>

<script setup lang="ts">
const feelings = ['😬', '🤔', '🤷‍♂️', '🚀']
</script>

---
layout: image
image: initial-release.png
---

---

<div class="flex justify-center w-full">
  <Tweet id="1484910294694604807" cards="hidden" />
</div>

---
layout: image
image: lee-rob-issue.png
backgroundSize: contain
---

---
layout: image
image: issues-floodeth.png
---

---
layout: center
---

# <span class="tag">Lesson #1:</span> Scratch your itch

---
layout: center
---

# <span class="tag">Lesson #2:</span> It doesn't have to be perfect

---
layout: center
---

# <span class="tag">Lesson #3:</span> You will never be able to predict the needs of your users until you ship

---
layout: image
image: styled-jsx-issue.png
---

---
layout: image
image: font-import-issue.png
---

---
layout: image
image: nextjs-runtime-issue.png
---

---
layout: center
---

# <span class="tag">Lesson #4:</span> Automate as much as possible

---
layout: two-cols-normal-header
clicks: 14
---

# The Maintainer's Dilema

::left::

## 😀 What you want to do

<v-clicks>

👍 Fix your own problem

👍 Make meaningful contributions

👍 Keep your tool stable

</v-clicks>

::right::

## 🥲 What you have to do

<v-clicks>

🔨 <span :class="$clicks > 13 && 'line-through text-stone-400'">Testing changes</span><span v-if="$clicks > 13"> Github Actions</span>

🔨 <span :class="$clicks > 13 && 'line-through text-stone-400'">Formatting</span><span v-if="$clicks > 13"> Github Actions</span>

🔨 <span :class="$clicks > 13 && 'line-through text-stone-400'">Linting</span><span v-if="$clicks > 13"> Github Actions</span>

🔨 <span :class="$clicks > 13 && 'line-through text-stone-400'">Building</span><span v-if="$clicks > 13"> Github Actions</span>

🔨 <span :class="$clicks > 13 && 'line-through text-stone-400'">Changelogs</span><span v-if="$clicks > 13"> Github Actions</span>

🔨 <span :class="$clicks > 13 && 'line-through text-stone-400'">Github releases</span><span v-if="$clicks > 13"> Github Actions</span>

🔨 <span :class="$clicks > 13 && 'line-through text-stone-400'">Version management</span><span v-if="$clicks > 13"> Github Actions</span>

🔨 <span :class="$clicks > 13 && 'line-through text-stone-400'">Publishing to NPM</span><span v-if="$clicks > 13"> Github Actions</span>

🔨 <span :class="$clicks > 13 && 'line-through text-stone-400'">Closing stale issues</span><span v-if="$clicks > 13"> Github Actions</span>

🔨 Asking for reproduction repos

</v-clicks>

---
layout: center
transition: fade
---

# <span class="tag">Lesson #5:</span> Get good at spelunking

<img src="/spelunking.jpg" alt="spelunking" class="background"/>

---
layout: center
transition: fade
---

<div class="relative h-50 w-150">
<div
  v-motion
  :initial="{ y: -50 }"
  :enter="{ x: 75, y: 0 }"
  :click-1="{ x: 200 }"
  class="absolute inset-0"
>
  <img src="/tech-logos/nextjs-logo.svg" alt="nextjs logo" class="h-50 w-50" />
</div>
<div
  v-motion
  :initial="{ y: -50 }"
  :enter="{ x: 300, y: 0, opacity: 1 }"
  :click-1="{ y: -50, opacity: 0 }"
  class="absolute inset-0">
  <img src="/tech-logos/storybook-logo.svg" alt="storybook logo" class="h-50 w-50" />
</div>
<div
  v-motion
  :initial="{ y: -100 }"
  :enter="{ x: 125, y: -85, opacity: 1 }"
  :click-1="{ y: -100, opacity: 0 }"
  class="absolute text-[250px]">
  ❤️
</div>
<div
  v-click
  v-motion
  :initial="{ x: 250, y: -125, opacity: 0 }"
  :click-2="{ y: 25, opacity: 1 }"
  class="absolute text-[200px]">
  🔍
</div>
</div>

---
layout: center
---

# More on my blog...

<div class="flex gap-10">

<img src="/spelunking-part-1.png"  class="blog-card" alt="spelunking post part 1" />
<img src="/spelunking-part-2.png"  class="blog-card" alt="spelunking post part 2" />

</div>

---
layout: center
---

# <span class="tag">Lesson #6:</span> Write well

---
layout: center
---

````md magic-move

```ts
const hasCustomBabelFile = async () => {
  const config = await loadPartialConfigAsync({
    // in order to load babel config, we need to give babel a file
    // we just choose the project's package.json cuz we know it has
    // to be present
    // filename is resolved relative to the root (defaulted to process.cwd())
    // https://babeljs.io/docs/en/options#filename
    filename: './package.json'
  })
  return config?.babelrc || config?.config
}
```

```ts
/**
 * webpack v4-v6 api
 * https://webpack.js.org/loaders/css-loader/#url
 * https://webpack.js.org/loaders/css-loader/#import
 *
 * webpack v3 api
 * https://webpack-3.cdn.bcebos.com/loaders/css-loader/#url
 * https://webpack-3.cdn.bcebos.com/loaders/css-loader/#import
 */
const getImportAndUrlCssLoaderOptions = (nextConfig: NextConfig) =>
  isCssLoaderV6()
    ? {
        url: {
          filter: getUrlResolver(nextConfig)
        },
        import: {
          filter: getImportResolver(nextConfig)
        }
      }
    : {
        url: getUrlResolver(nextConfig),
        import: getImportResolver(nextConfig)
      }
```

````

---
layout: image
image: descriptive-comment.png
---

---
layout: center
transition: none
---

# <span class="tag">Lesson #7:</span> Stand up for yourself

---
layout: image
image: saying-no.png
backgroundSize: contain
transition: none
---

---
layout: image
image: saying-no-response.png
---

---
layout: center
---

# <span class="tag">Lesson #8:</span> Good documentation matters

---
layout: center
---

# <span class="tag">Lesson #9:</span> It's ok to let go

---
layout: image
image: storybook-nextjs-screenshot.png
---

---
layout: center
---

# <span class="tag">Lesson #10:</span> It's worth it

---
layout: image
image: its-worth-it.png
backgroundSize: contain
---

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

<div>📲 calendly.com/byte-bot</div>
<div>📧 info@bytebot.io</div>
<div>📧 coaching@bytebot.io</div>
<div>🐤 @RyanClementsHax</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>
<div>🔗 linkedin.com/in/ryan-clements-hax</div>

</div>

---
