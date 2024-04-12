---
defaults:
  transition: slide-left
title: From 0 to 146k weekly downloads - lessons from accidental open source success
mdc: true
drawings:
  persist: false
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

Outline

- Intro slide
- Who I am
- The story begins...
  - I wanted to build a blog, but be proud about how I built it
  - TypeScript, Next.js, tests, a11y, theme switcher, storybook
- What Storybook and Next.js is
- Setting up Storybook with Next.js was a MASSIVE PAIN
  - Very little help online
  - Needed to gather advice from 2-3 articles, sprinkle in a little bit of what works for you, and shove it in your `.storybook` folder
- I figured I'd share my learnings by publishing a package
  - It wasn't perfect by any means
  - Published it to npm on Jan 20, 2022 https://github.com/RyanClementsHax/storybook-addon-next/releases/tag/v1.0.0
  - Put it on some market places like Storybook's addon page
- Instantly went viral
  - Michael Shilman, one of the core Storybook maintainers, tweeted it
  - Lee Rob, PM for Next.js wanted the official Next.js Storybook example to use my plugin
- Issues started rolling in
  - Oh hey! Cool! People actually like what I did!
  - Oh crap....they really liked what I did...
- Lesson 1: Scratch your itch
- Lesson 2: It doesn't need to be perfect
- The influx of issues began to show me things
- Lesson 3: You will never be able to predict the needs of your users until you ship
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/4
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/15
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/47
- Lesson 4: Automate EVERYTHING
  - Not having to do things manually made it more fun to work on the project
  - I sometimes would put off working on the project because I didn't want the drudgery of retesting the addon manually
    - I promised support for Next.js v9+
    - Added up to 15min of testing per change
  - https://github.com/RyanClementsHax/storybook-addon-next/pull/148
- Lesson 5: Get good at code spelunking
  - https://github.com/RyanClementsHax/storybook-addon-next/blob/6fefca04a68a6aeee28847bd1e22611dc4a208a5/src/images/next-image-loader-stub.ts
- Lesson 6: Write well
  - https://github.com/RyanClementsHax/storybook-addon-next/blob/6fefca04a68a6aeee28847bd1e22611dc4a208a5/src/styledJsx/babel.ts#L15
  - https://github.com/RyanClementsHax/storybook-addon-next/blob/6fefca04a68a6aeee28847bd1e22611dc4a208a5/src/css/webpack.ts#L76
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/72#issuecomment-1109093239
- Lesson 7: Standup for yourself
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/7
  - Give them opportunities like with CodeSandbox
  - Say NO
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/79
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/120
- Lesson 8: Good documentation matters
  - https://github.com/RyanClementsHax/storybook-addon-next
  - https://github.com/RyanClementsHax/storybook-addon-next/blob/main/MIGRATING.md
- Lesson 9: It's ok to let go
  - https://www.npmjs.com/package/@storybook/nextjs
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/112
- Lesson 10: It's worth it in the end
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/3
  - https://github.com/RyanClementsHax/storybook-addon-next/issues/47
