# Noah's Book Reviews

A personal book review site — a curated shelf of books worth reading, with honest reviews and full breakdowns.

**Live site:** https://noahrubin989.github.io/book-reviews/

## What's inside

- `index.html` — animated landing page
- `library.html` — the book grid, search, filters, and article view
- `script.js` — book data and app logic
- `styles.css` — library styles
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

## Running locally

Open `index.html` in a browser. No build step.

## Deploying updates

```
git add -A
git commit -m "describe what changed"
git push
```

GitHub Pages rebuilds in about a minute.
