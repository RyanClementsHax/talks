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

<img src="/tech-logos/nuxt-logo.svg" alt="Nuxt logo" class="background"/>

---
layout: image-right
image: headshot.jpg
---

# About me

<v-clicks>

<div>Ryan Clements, MANTIS core team, and owner of <span class="accent">Byte Bot</span> 🤖</div>

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

<Youtube id="LB8KwiiUGy0" class="w-full h-full"  />

---

<Youtube id="U6s2pdxebSo" class="w-full h-full"  />

---
layout: center
---

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

```ts
// [id].get.ts
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

Fancier tools

- Vite
- Storybook
- Nx

---

Framework improvements

- SSR/SSG
- Analog

---

Mantis logo

---

Mantis breakdown

---

Comparison table

---

Demo

- Show installation

---

Roadmap

---

Where to go from here

- https://github.com/mantis-apps/mantis-cli
- https://github.com/mantis-apps/examples
- Discord link

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
