# Building this portfolio from scratch — a junior-dev walkthrough

This is the complete story of how this site was built, from an empty folder to a
live URL with an AI chatbot. Read it top to bottom once; then use it as a
reference. Each phase explains **what** we did and, more importantly, **why**.

## Table of contents
1. [The tools & the mental model](#1-the-tools--the-mental-model)
2. [Scaffolding the project](#2-scaffolding-the-project)
3. [The styling system (Tailwind + theming)](#3-the-styling-system)
4. [Content as a single source of truth](#4-content-as-a-single-source-of-truth)
5. [Reusable building blocks](#5-reusable-building-blocks)
6. [The sections (the actual page)](#6-the-sections)
7. [Light / dark theme](#7-light--dark-theme)
8. [Animations](#8-animations)
9. [The chatbot](#9-the-chatbot)
10. [Making it fast](#10-making-it-fast)
11. [Git](#11-git)
12. [The AI backend (Cloudflare Worker)](#12-the-ai-backend)
13. [Deploying to GitHub Pages](#13-deploying-to-github-pages)
14. [The whole picture](#14-the-whole-picture)

---

## 1. The tools & the mental model

Before any code, know the players:

| Tool | What it is | Why we use it |
| --- | --- | --- |
| **Node.js** | JavaScript that runs on your computer (not just the browser) | Runs all our build tools |
| **npm** | Node's package manager | Installs libraries, runs scripts |
| **Vite** | A build tool / dev server | Instant reload while coding; bundles for production |
| **React** | A UI library | Build the page from reusable "components" |
| **Tailwind CSS** | Utility CSS framework | Style with classes like `flex p-4` instead of writing CSS files |
| **Framer Motion** | Animation library for React | Smooth fades, hovers, transitions |
| **Git / GitHub** | Version control + hosting | Track changes; host the code and the live site |
| **Cloudflare Workers** | Tiny serverless functions | Run backend code (the AI) for free |

**The mental model:** you write source code → Vite *builds* it into plain
HTML/CSS/JS in a `dist/` folder → those static files get uploaded to a host
(GitHub Pages). The browser only ever sees the built files, never your source.

---

## 2. Scaffolding the project

Every React+Vite project needs a few core files. We created them by hand:

- **`package.json`** — the project's manifest: its name, its dependencies, and
  the scripts you can run (`npm run dev`, `npm run build`).
- **`vite.config.js`** — configures Vite. Two key settings:
  ```js
  export default defineConfig({
    base: './',                          // makes asset links relative → works on any host path
    plugins: [react(), tailwindcss()],   // enable React + Tailwind
  })
  ```
- **`index.html`** — the single HTML page. It has one important line:
  ```html
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
  ```
  That empty `<div>` is where React "mounts" the whole app.
- **`src/main.jsx`** — the entry point that connects React to that div:
  ```js
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  ```

Then: `npm install` (downloads all dependencies into `node_modules/`).

**Why by hand instead of a template?** So you understand every file. Normally
you'd run `npm create vite@latest`, but building it manually removes the magic.

---

## 3. The styling system

We use **Tailwind CSS v4**. Instead of writing `.button { padding: 1rem }` in a
CSS file, you put utility classes directly on elements: `<button class="p-4">`.

All of it is set up in **`src/index.css`**:
```css
@import 'tailwindcss';

/* enable dark mode via a class on <html> */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-display: 'Space Grotesk', sans-serif;  /* custom design tokens */
  --color-brand-500: #10b981;                    /* our accent color */
}
```

**Key idea — design tokens:** by defining `--color-brand-500` once, we can use
`text-brand-500`, `bg-brand-500`, etc. everywhere. Change it in one place, the
whole site updates. We also made reusable component classes like `.glass` (the
frosted-card look) and `.section` (consistent spacing).

**Dark mode** works by toggling a single `dark` class on the `<html>` element.
Every `dark:` class (like `dark:bg-slate-950`) activates when that class is present.

---

## 4. Content as a single source of truth

**`src/data/content.js`** holds *all* the text: your bio, skills, experience,
projects, education. It's just plain JavaScript objects and arrays:
```js
export const skills = [
  { title: 'Backend Architecture', items: ['Clean Architecture', 'DDD', ...] },
  ...
]
```

**Why separate data from UI?** The components stay simple (they just loop over
data), and you can update the whole site by editing one file — no digging
through JSX. This is a professional habit: **separation of concerns.**

---

## 5. Reusable building blocks

Before the big sections, we built small reusable components in `src/components/ui/`:

- **`Reveal.jsx`** — wraps anything and fades + slides it in when you scroll to it.
- **`SectionHeading.jsx`** — the consistent "01 — About" heading style.
- **`SpotlightCard.jsx`** — a card that lifts and shows a glow following your mouse.

**Why?** DRY — *Don't Repeat Yourself*. Write the reveal animation once, use it
in 30 places. If you want to change it, you change one file.

---

## 6. The sections

The page is just these components stacked in **`src/App.jsx`**:
```jsx
<Navbar />
<main>
  <Hero /> <About /> <Skills /> <Experience />
  <Projects /> <Education /> <Contact />
</main>
<Footer />
```

Each is a component in `src/components/`. A component is a function that returns
JSX (HTML-like markup). Example pattern used everywhere — **loop over data**:
```jsx
{skills.map((group) => (
  <SpotlightCard key={group.title}>
    <h3>{group.title}</h3>
    {group.items.map((item) => <span key={item}>{item}</span>)}
  </SpotlightCard>
))}
```
`key` helps React track list items efficiently — always add it in a `.map`.

---

## 7. Light / dark theme

The logic lives in **`src/hooks/useTheme.js`** (a custom "hook" — reusable
stateful logic). It:
1. reads the saved choice from `localStorage`, or falls back to the OS setting,
2. toggles the `dark` class on `<html>`,
3. saves the choice so it persists on reload.

**One subtle pro-move:** in `index.html` there's a tiny script that runs
*before* the page paints, setting the theme immediately. Without it, a
dark-mode user would see a white flash on every load ("FOUC" — flash of
unstyled content).

---

## 8. Animations

Powered by **Framer Motion**. The main patterns:

- **Scroll reveal** — `whileInView` animates an element when it enters the viewport:
  ```jsx
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} />
  ```
- **Hover** — `whileHover={{ y: -6 }}` lifts a card on hover.
- **Staggered entrance** — the hero's items appear one after another using
  `variants` + `staggerChildren`.
- **Scroll progress bar** — `useScroll()` + `useSpring()` drive the thin bar at
  the top of the page.

**Accessibility note:** `index.css` respects `prefers-reduced-motion`, disabling
animations for users who ask their OS to reduce motion. Always consider this.

---

## 9. The chatbot

(There's a dedicated deep-dive in [`CHATBOT.md`](./CHATBOT.md).) In short:
- **`src/data/assistant.js`** — an offline keyword bot (always works, no cost).
- **`src/components/chat/ChatPanel.jsx`** — the chat UI (React state + `fetch`).
- **`src/config.js`** — `CHAT_API_URL` decides: real API or offline bot.
- **`server/worker.js`** — a serverless function that calls Google Gemini.
- It **falls back** to the offline bot if the API fails — it never breaks.

---

## 10. Making it fast

Three concrete optimizations:

1. **Code splitting** — in `vite.config.js` we split big libraries (React,
   Framer Motion) into separate files (`manualChunks`). They get cached by the
   browser, so updates to *your* code don't force re-downloading them.
2. **Lazy loading** — the chat widget isn't needed for the first paint, so:
   ```js
   const FloatingDock = lazy(() => import('./components/FloatingDock'))
   ```
   It loads *after* the page appears. `<Suspense>` handles the "still loading" gap.
3. **Cheaper effects** — heavy `backdrop-blur` over the animated background caused
   scroll jank, so we dialed it down. Pretty *and* smooth beats just pretty.

**Measure, don't guess:** `npm run build` prints each chunk's size. That's how we
saw the app code drop from one 104 KB file to an 12 KB file + cached vendors.

---

## 11. Git

Version control — a save-history for your code.
```bash
git init -b main          # start a repo on the "main" branch
git add -A                # stage all changes
git commit -m "message"   # save a snapshot
```

**`.gitignore`** lists files git should ignore: `node_modules` (huge, re-installable),
`dist` (rebuildable), `.env` (secrets), and your `.docx` CV (don't publish the
editable personal doc). **Rule:** never commit secrets or generated files.

---

## 12. The AI backend

GitHub Pages only serves **static files** — it can't run backend code. But our
chatbot needs a server to hold the secret Gemini key. Solution: a **Cloudflare
Worker** (free serverless function), in `server/`.

Deploy steps (one-time):
```bash
cd server
npx wrangler login                       # sign in to Cloudflare (free)
npx wrangler secret put GEMINI_API_KEY   # store the key encrypted, server-side
npx wrangler deploy                       # go live → prints your Worker URL
```

**The big lesson:** secrets (API keys) must **never** ship to the browser —
anyone can read frontend code. The Worker keeps the key on the server and only
returns the finished reply. It also sets **CORS** headers so your site is allowed
to call it.

---

## 13. Deploying to GitHub Pages

We automated it with **GitHub Actions** — `.github/workflows/deploy.yml`. On every
`git push` to `main`, GitHub:
1. checks out the code,
2. runs `npm ci` (clean install) and `npm run build`,
3. uploads `dist/` and publishes it to GitHub Pages.

Steps you did:
1. Created the repo `connectwithnafis.github.io` and pushed.
2. **Settings → Pages → Source → "GitHub Actions"** (tells GitHub to use our workflow).
3. Added a repo **variable** `VITE_CHAT_API_URL` = your Worker URL. The workflow
   injects it at build time so the live site knows where the AI backend is.
4. Re-ran the workflow so the variable got baked in.

**Why a variable, not a file?** The Worker URL differs per person/environment.
Keeping it in GitHub (not in code) means the same code works anywhere.

Now your workflow is: **edit → `git push` → site auto-updates.** That's CI/CD
(Continuous Integration / Continuous Deployment) in its simplest form.

---

## 14. The whole picture

```
   YOUR SOURCE CODE (this repo)
        │  git push
        ▼
   GitHub Actions  ── npm run build ──►  dist/ (static files)
        │                                   │
        │                                   ▼
        │                            GitHub Pages
        │                     https://connectwithnafis.github.io
        │                                   │  (browser loads the site)
        │                                   ▼
        │                         Visitor opens the chat
        │                                   │  fetch()
        ▼                                   ▼
   Cloudflare Worker  ◄──────────────  (your site calls it)
        │  (holds GEMINI_API_KEY)
        ▼
   Google Gemini  ──►  reply  ──►  back to the visitor's screen
```

Two separate free hosts working together: **GitHub Pages** (the website) and
**Cloudflare** (the AI). That separation — a static frontend + a small backend
API — is one of the most common architectures in the whole industry. You just
built and shipped it. 🎉

---

## Concepts you now understand
- Node / npm / Vite build pipeline; static vs dynamic hosting
- React components, props, state, hooks, lists & keys
- Utility CSS + design tokens + dark mode
- Separation of concerns (data vs UI vs config vs backend)
- Animations + accessibility (`prefers-reduced-motion`)
- `async/await`, `fetch`, graceful fallback
- Performance: code splitting, lazy loading, measuring bundle size
- Git basics + `.gitignore` + never committing secrets
- Serverless functions, CORS, keeping API keys server-side
- CI/CD with GitHub Actions + build-time environment variables

## Where to go next
- Add a real contact form (e.g. Formspree) — practice APIs.
- Add a blog section — practice routing (React Router).
- Write a unit test for `getBotReply()` — practice testing (Vitest).
- Add a custom domain to GitHub Pages — practice DNS.
