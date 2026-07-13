# Overplay Sports — Placeholder Site

A "coming soon" landing page with email capture for **Overplay Sports**, a 5v5 cage
soccer venue: youth technical training, adult leagues, pickup memberships,
event rentals, and experiential marketing space.

Built with **Vite + React**. Dark / green / urban styling.

## Run it

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Hooking up the waitlist

The email form works out of the box — with no config it saves signups to the
visitor's browser (`localStorage`). To collect real signups, point it at a form
service:

1. Copy `.env.example` to `.env`.
2. Set `VITE_WAITLIST_ENDPOINT` to an endpoint that accepts a JSON `POST`
   with `{ "email": "..." }`. [Formspree](https://formspree.io) is the quickest
   (free tier, no backend needed); Mailchimp/Buttondown/your own API also work.
3. Restart `npm run dev`.

## Deploying

The output in `dist/` is fully static — drop it on **Netlify**, **Vercel**,
**Cloudflare Pages**, or **GitHub Pages**. On Netlify/Vercel, just connect the
repo and it auto-detects Vite.

## Where to edit

- `src/App.jsx` — copy, headline, and the "What's dropping" offerings list.
- `src/index.css` — colors (see the `:root` variables at top), fonts, layout.
- `index.html` — page title, social preview text, fonts.
