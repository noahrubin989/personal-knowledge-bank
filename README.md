# Personal Knowledge Bank

A personal blog and knowledge collection - longer-form notes on mental models and ideas worth keeping, alongside a shelf of books that have shaped the thinking.

**Live site:** https://noahrubin989.github.io/personal-knowledge-bank/

## What's inside

```
.
├── index.html        # animated landing page
├── library.html      # book grid, search, filters, article view
├── blog.html         # blog: longer-form posts
├── assets/
│   ├── landing.css
│   └── styles.css    # shared library + blog styles
├── data/
│   ├── books.js      # book reviews - edit this to add a book
│   └── posts.js      # blog posts - edit this to add a post
└── js/
    ├── library.js    # library logic
    └── blog.js       # blog logic
```

## Adding a book review

Edit the `books` array in `data/books.js`. Each entry takes:

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

Edit the `posts` array in `data/posts.js`. Each entry takes:

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
