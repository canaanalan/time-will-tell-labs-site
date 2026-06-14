# Time Will Tell Labs

A small landing site for Time Will Tell Labs.

The site is meant to feel quiet, dark, and technical without turning into a big polished agency page. It introduces the project, shares a little about the work, and gives people two simple paths:

- explore our services
- join our early QA community

## Local Setup

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Email Setup

The contact and community forms send through Resend.

Create a `.env.local` file:

```bash
RESEND_API_KEY=your_resend_key_here
```

While the domain is still being verified in Resend, the app can use Resend's test sender. Once `timewilltelllabs.com` is verified, add:

```bash
RESEND_FROM_EMAIL="Time Will Tell Labs <hello@timewilltelllabs.com>"
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Notes

This is intentionally lightweight for now. No database, no CMS, no heavy backend. The forms are just enough to start real conversations and keep the site moving.
