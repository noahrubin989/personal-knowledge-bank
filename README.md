# Noah's Book Reviews

A personal book review site — a curated shelf of books worth reading, with honest reviews and full breakdowns.

**Live site:** https://noahrubin989.github.io/book-reviews/

## What's inside

- `index.html` — animated landing page
- `library.html` — the book grid, search, filters, and article view
- `blog.html` — the blog: longer-form posts that aren't book reviews
- `script.js` — book data and library logic
- `posts.js` — blog post data
- `blog.js` — blog logic
- `styles.css` — shared library/blog styles
- `landing.css` — landing page styles

## Adding a book review

Edit the `books` array at the top of `script.js`. Each entry takes:

```js
{
  title: "...",
  author: "...",
  genre: "...",
  rating: 5,           // 1–5
  pages: 300,
  yearRead: 2025,
  review: "Short summary shown in the modal.",
  fullReview: "Longer Medium-style article. Use ## for headings.",
  favoriteQuote: "Optional."
}
```

`fullReview` is optional. If omitted, the article page falls back to `review`.

## Adding a blog post

Edit the `posts` array at the top of `posts.js`. Each entry takes:

```js
{
  title: "...",
  date: "2026-04-27",   // ISO date
  tags: ["..."],
  excerpt: "One-line teaser shown on the card.",
  body: "Full post. Use ## for headings, > for blockquotes."
}
```

## Running locally

Open `index.html` in a browser. No build step.

## Deploying updates

```
git add -A
git commit -m "describe what changed"
git push
```

GitHub Pages rebuilds in about a minute.
