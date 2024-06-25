---
defaults:
  transition: slide-left
title: MANTIS - The next evolution of the MEAN stack
mdc: true
drawings:
  persist: false
---


# M.A.N.T.I.S.
## The next evolution of the MEAN stack{.opacity-70}

<div class="mt-5">
<span class="muted">by Ryan Clements, Owner of </span><span class="accent">Byte Bot</span> 🤖
</div>

<img src="/tech-logos/mantis-logo.png" alt="mantis logo" class="background"/>

---
layout: image-right
image: headshot.jpg
---

# About me

<div>Ryan Clements, MANTIS core team, and owner of <span class="accent">Byte Bot</span> 🤖</div>

<v-clicks>

<span class="muted">a software agency that helps software teams ❤️ their SaaS apps.</span>

<div class="flex flex-col gap-2 mt-6">

<div>📧 info@bytebot.io</div>
<div>🐤 @RyanClementsHax</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>

</div>

</v-clicks>

---
layout: image
image: mean.jpg
---

---

# It all started with <img src="/tech-logos/node-logo.svg" alt="Node.js logo" class="inline w-[1em] h-[1em] align-top" />...

<Youtube id="LB8KwiiUGy0" class="w-full h-full"  />

---

# Then came <img src="/tech-logos/typescript-logo.svg" alt="Node.js logo" class="inline w-[1em] h-[1em] align-top" />...

<Youtube id="U6s2pdxebSo" class="w-full h-full"  />

---
layout: center
---

# Then came ESM...

```ts
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {bootstrapApplication} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <label for="name">Name:</label>
    <input type="text" id="name" [(ngModel)]="name" placeholder="Enter a name here" />
    <hr />
    <h1>Hello {{ name }}!</h1>
  `,
  imports: [FormsModule],
})
export class DemoComponent {
  name = '';
}
```

---
layout: center
---

# Then came `async`/`await`...

```ts
// users/[id].get.ts
export default defineEventHandler(async () => {
  const id = getRouterParam(event, 'id')

  const db = useDatabase();

  const { user } = await db.sql`SELECT * FROM users WHERE id = ${id}`;

  return {
    user,
  };
});
```

---
transition: fade
---

# And fancier tools..

<div class="screenshot-heap">
<v-clicks>
<img src="/tech-logos/nx-logo.svg" alt="nx logo" class="absolute -top-10 left-60 rotate-5 h-75" />
<img src="/tech-logos/vite-logo.svg" alt="vite logo" class="absolute top-50 right-80 -rotate-10 h-50" />
<img src="/tech-logos/storybook-logo.svg" alt="storybook logo" class="absolute top-25 right-20 rotate-5 h-50" />
<img src="/tech-logos/analog-logo.svg" alt="analog logo" class="absolute top-40 left-5 -rotate-15 h-50" />
</v-clicks>
</div>

---
layout: image
image: tech-logos/mantis-logo-expanded.jpeg
---

---

# Mantis breakdown

<div class="content-center gap-10">

<img src="/tech-logos/mongo-logo.svg" alt="mongo logo" class="h-20" />
<img src="/tech-logos/analog-logo.svg" alt="analog logo" class="h-20" />
<img src="/tech-logos/nx-logo.svg" alt="nx logo" class="h-20 scale-200 mr-2" />
<img src="/tech-logos/tailwind-logo.svg" alt="tailwind logo" class="h-20" />
<img src="/tech-logos/ionic-logo.svg" alt="ionic logo" class="h-20" />
<img src="/tech-logos/storybook-logo.svg" alt="storybook logo" class="h-20" />

</div>

---

# Your core team

<div class="relative h-full">
<Avatar src="/ady.jpg" name="Ady Ngom" decoration="⚡" class="absolute top-0 left-0 right-0" />
<Avatar src="/babacar.jpg" name="Babacar Niang" decoration="🔥" class="absolute top-30 bottom-0 left-30" />
<Avatar src="/ibrahim.jpg" name="Ibrahim Sefer" decoration="👨‍💻" class="absolute top-30 bottom-0 right-30" />
<Avatar src="/headshot.jpg" name="Ryan Clements" decoration="🚀" class="absolute bottom-15 left-0 right-0" />
<img src="/tech-logos/mantis-logo.png" alt="mantis-loto" class="absolute top-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-20 w-20" />
</div>

---

# Project goals

<div class="content-center">
<div>
<v-clicks>

<div>✅ Provide full stack solution for most angular apps</div>
<div>✅ Get started insanely quick</div>
<div>✅ Provide templates</div>
<div>✅ Greate developer experience</div>
<div>❤️ Stay open source</div>

</v-clicks>
</div>
</div>

---

# Project anti-goals

<div class="content-center">
<div>
<v-clicks>

<div>❌ Provide full stack solution for <span class="italic">every</span> app</div>
<div>❌ Prevent you from using your favorite tech</div>

</v-clicks>
</div>
</div>

---
layout: center
---

# <span class="no-clip">🖼️</span> Demo time

---

# Roadmap

<div class="content-center">
<div>

<div class="line-through">✅ Create a project generator</div>
<div>🛠️ Create a UI library using shadcn</div>
<div>🛠️ Provide more templates</div>
<div>🛠️ Create a discord community</div>

</div>
</div>

---

# Where to go from here

<div class="content-center">
<div>
<div>https://github.com/mantis-apps</div>
<div>https://discord.gg/aJCCFqgx</div>
</div>
</div>

---
layout: image-left
image: linktree-qr.png
backgroundSize: contain
---

# Here's how we can stay in touch

<div class="flex flex-col gap-5 text-2xl mt-5">

<div>🐤 @RyanClementsHax</div>
<div>📥 bytebot.beehiiv.com/subscribe</div>
<div>🤖 https://discord.gg/aJCCFqgx</div>

</div>
