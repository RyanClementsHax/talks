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

<div>Ryan Clements, Owner of <span class="text-yellow-400">Byte Bot</span> 🤖</div>

<v-clicks>

<span class="muted">a software agency that helps software teams ❤️ their SaaS apps.</span>

<div class="flex gap-2 mt-10">
  <img src="/tech-logos/react-logo.svg" alt="react" class="logo" />
  <img src="/tech-logos/nextjs-logo.svg" alt="nextjs" class="logo" />
  <img src="/tech-logos/vue-logo.svg" alt="vue" class="logo" />
  <img src="/tech-logos/nuxt-logo.svg" alt="nuxt" class="logo" />
  <img src="/tech-logos/typescript-logo.svg" alt="typescript" class="logo" />
  <img src="/tech-logos/javascript-logo.svg" alt="javascript" class="logo" />
  <img src="/tech-logos/node-logo.svg" alt="node" class="logo" />
</div>

<div class="flex flex-col gap-2 mt-10">

<div>🌐 bytebot.io</div>
<div>📧 info@bytebot.io</div>
<div>🐤 @RyanClementsHax</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>

</div>

</v-clicks>

---
layout: image
image: blog-screenshot.png
backgroundSize: contain
transition: fade
---

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
layout: image
image: frustrating-blog-post.png
---

---
layout: center
---

````md magic-move

```js
// .storybook/preview.js
import "../styles/globals.css";
```

```tsx
// .storybook/preview.js
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
```

```diff
// package.json

"scripts": {
-    "storybook": "start-storybook -p 6006",
-    "build-storybook": "build-storybook"
+    "storybook": "start-storybook -p 6006 -s ./public",
+    "build-storybook": "build-storybook -s public"
}
```

````

---
layout: center
---

# My solution wasn't perfect either, however{.transition-text}

---
layout: center
---

# <span class="tag">Lesson #2:</span> It doesn't have to be perfect

---

# Here's all the things wrong with it <span class="no-clip">😬</span>

<div>

<v-clicks>

❌ Didn't even cover 50% of Next.js's api

❌ Didn't have any tests

❌ Didn't support every Next.js version

❌ Didn't support every Storybook version

❌ Didn't have a fancy brancing strategy (i.e. everything off of `main`)

</v-clicks>

</div>

---
layout: center
---

# Predicting all of your users' needs beforehand is futile{.transition-text}

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

# More on my blog...

<div class="flex gap-10">

<img src="/you-probably-dont-need-mocking.png"  class="blog-card" alt="you probably don't need mocking" />
<img src="/justifying-mocking.png"  class="blog-card" alt="justifying mocking" />

</div>

---
layout: center
---

# Why did it get so much traction anyway?{.transition-text}

---
layout: center
---

# <span class="tag">Lesson #4:</span> Zero config is a killer feature

---
layout: center
---

````md magic-move

```sh
npm install --save-dev storybook-addon-next
```

```js
// .storybook/main.js

module.exports = {
  // other config ommited for brevity
  addons: [
    // ...
    'storybook-addon-next'
    // ...
  ]
}
```

````

---
layout: center
---

# <span class="no-clip">🥳</span> <span class="tag">You're done</span> <span v-click>...seriously</span>

---
layout: center
---

```js {7}
// .storybook/main.js

module.exports = {
  // other config ommited for brevity
  addons: [
    // ...
    'storybook-addon-next'
    // ...
  ]
}
```

---
layout: center
---

# <span class="tag">Lesson #5:</span> Documentation is a killer feature

---
layout: center
---

<SlidevVideo autoplay loop>
  <source src="/docs-scroll.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# <span class="no-clip">😫</span> Success started to be a burden though{.transition-text}

---
layout: center
---

# <span class="tag">Lesson #6:</span> Automate as much as possible

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
---

````md magic-move

```yml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: restore dependencies
        uses: bahmutov/npm-install@v1
      - run: yarn lint:all
  type_check:
    name: type check
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: restore dependencies
        uses: bahmutov/npm-install@v1
      - run: yarn type-check
```

```yml
jobs:
  e2e:
    strategy:
      matrix:
        include:
          - project-name: next v13
            project-path: examples/nextv13
            chromatic-token: CHROMATIC_TOKEN_EXAMPLES_NEXTV13
          # ... and a bunch of other test projects
    name: ${{ matrix.project-name }}
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0 # 👈 Required to retrieve git history
      - name: restore addon dependencies
        uses: bahmutov/npm-install@v1
      - name: build addon
        run: yarn build
      - name: restore project dependencies
        uses: bahmutov/npm-install@v1
        with:
          working-directory: ${{ matrix.project-path }}
      - name: publish to chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets[matrix.chromatic-token] }}
          workingDir: ${{ matrix.project-path }}
          buildScriptName: ${{ matrix.build-script-name }}
```

```yml
name: 'Close stale issues and PRs'
on:
  workflow_dispatch:
  schedule:
    # This runs every day at 1:30am https://crontab.guru/#30_1_*_*_*
    - cron: '30 1 * * *'

permissions:
  issues: write
  pull-requests: write

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v4
        with:
          stale-issue-message: 'This issue has been automatically ...'
          stale-pr-message: 'This PR has been automatically ...'
          close-issue-message: 'This issue has been automatically ...'
          close-pr-message: 'This PR has been automatically ...'
          exempt-issue-labels: keep
```

```yaml
name: Publish
on:
  push:
    branches:
      - main
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v2
        with:
          node-version: 'lts/*'
          registry-url: https://registry.npmjs.org/
      - name: restore dependencies
        uses: bahmutov/npm-install@v1
      - name: release
        run: yarn release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

````

---
layout: center
---

<h1 class="no-clip !text-[100px]">💪</h1>

---
layout: center
---

# Automation aside, there's a more critical thing to build{.transition-text}

---
layout: center
transition: fade
---

# <span class="tag">Lesson #7:</span> Get good at spelunking

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

# Code isn't the only thing you trip over though{.transition-text}

---
layout: center
---

# <span class="tag">Lesson #8:</span> Write well for your own sake

---
layout: center
---

<SlidevVideo autoplay loop>
  <source src="/docs-scroll.mp4" type="video/mp4" />
</SlidevVideo>

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
---

# Unfortunately, you still get pressured in issues{.tag}

---
layout: center
transition: none
---

# <span class="tag">Lesson #9:</span> Stand up for yourself

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

# <span class="tag">Lesson #10:</span> It's ok to let go

---
layout: image
image: storybook-nextjs-screenshot.png
---

---
layout: center
---

# <span class="tag">Lesson #11:</span> It's worth it

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

<div>🌐 bytebot.io</div>
<div>📧 info@bytebot.io</div>
<div>🐤 @RyanClementsHax</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>

</div>
