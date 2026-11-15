# Mithran Mohanraj's Portfolio

Yes, this is another basic Next.js application. I could have deployed it on Vercel but Cloudflare Pages is a lot more cost effective.

I worked a lot harder on the aesthetic decisions than the actual front end design, and I must say I am quite proud of how it turned out.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Blog

Add one folder per post to `public/blog/`, with the post content in
`public/blog/<slug>/prose.html` (for example, `public/blog/my-first-post/prose.html`
is available at `/blog/my-first-post`). Keep post images and other assets in that
folder and reference them with relative URLs, such as `images/photo.png`. The first
`<h1>` is used as the post title; if there is no `<h1>`, the `<title>` is used, then
the folder name. Existing root-level `.html` posts are also supported. Blog pages
are generated when you build the site.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!