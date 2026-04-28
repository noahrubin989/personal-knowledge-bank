// Book data lives in data/books.js - `books` is loaded as a global before this file.
const grid = document.getElementById('book-grid');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search');
const genreFilter = document.getElementById('genre-filter');
const ratingFilter = document.getElementById('rating-filter');
const sortSelect = document.getElementById('sort');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const libraryView = document.getElementById('library-view');
const articleView = document.getElementById('article-view');
const articleBody = document.getElementById('article-body');
const prevLink = document.getElementById('prev-link');
const nextLink = document.getElementById('next-link');

function renderStars(rating) {
  const filled = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);
  return `<span class="stars"><span class="filled">${filled}</span><span class="empty">${empty}</span></span>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function paragraphize(text) {
  return text
    .split(/\n\s*\n/)
    .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function bookCard(book, index) {
  return `
    <article class="book-card" data-index="${index}" tabindex="0" role="button" aria-label="Open review of ${escapeHtml(book.title)}">
      <div class="book-cover">${escapeHtml(book.title)}</div>
      <h3 class="book-title">${escapeHtml(book.title)}</h3>
      <p class="book-author">by ${escapeHtml(book.author)}</p>
      <div class="book-meta">
        ${renderStars(book.rating)}
        <span class="genre-tag">${escapeHtml(book.genre)}</span>
      </div>
    </article>
  `;
}

function populateGenres() {
  const genres = [...new Set(books.map(b => b.genre))].sort();
  for (const g of genres) {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    genreFilter.appendChild(opt);
  }
}

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const genre = genreFilter.value;
  const minRating = Number(ratingFilter.value);
  const sort = sortSelect.value;

  let filtered = books
    .map((b, i) => ({ ...b, _index: i }))
    .filter(b => {
      if (genre && b.genre !== genre) return false;
      if (b.rating < minRating) return false;
      if (q) {
        const hay = `${b.title} ${b.author} ${b.genre}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

  switch (sort) {
    case 'rating-desc': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'rating-asc':  filtered.sort((a, b) => a.rating - b.rating); break;
    case 'title':       filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
    case 'author':      filtered.sort((a, b) => a.author.localeCompare(b.author)); break;
    case 'recent':      filtered.sort((a, b) => (b.yearRead || 0) - (a.yearRead || 0)); break;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    grid.innerHTML = filtered.map(b => bookCard(b, b._index)).join('');
  }
}

function openModal(index) {
  const book = books[index];
  if (!book) return;
  modalBody.innerHTML = `
    <h2 id="modal-title">${escapeHtml(book.title)}</h2>
    <p class="author">by ${escapeHtml(book.author)}</p>
    ${renderStars(book.rating)}
    <div class="review-meta">
      <span><strong>Genre:</strong> ${escapeHtml(book.genre)}</span>
      ${book.pages ? `<span><strong>Pages:</strong> ${book.pages}</span>` : ''}
      ${book.yearRead ? `<span><strong>Read:</strong> ${book.yearRead}</span>` : ''}
    </div>
    <div class="review-text">${paragraphize(book.review)}</div>
    ${book.favoriteQuote ? `<blockquote class="favorite-quote">"${escapeHtml(book.favoriteQuote)}"</blockquote>` : ''}
    <a href="#book/${index}" class="full-breakdown-btn" data-breakdown>See full breakdown &rarr;</a>
  `;
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function renderArticleBody(text) {
  // Lightweight markdown: ## headings, blank-line paragraphs, > blockquotes.
  const blocks = text.split(/\n\s*\n/);
  return blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('## ')) {
      return `<h2>${escapeHtml(trimmed.slice(3))}</h2>`;
    }
    if (trimmed.startsWith('### ')) {
      return `<h3>${escapeHtml(trimmed.slice(4))}</h3>`;
    }
    if (trimmed.startsWith('> ')) {
      return `<blockquote>${escapeHtml(trimmed.slice(2))}</blockquote>`;
    }
    return `<p>${escapeHtml(trimmed).replace(/\n/g, '<br>')}</p>`;
  }).join('');
}

function renderArticle(index) {
  const book = books[index];
  if (!book) {
    articleBody.innerHTML = `<p>Book not found. <a href="#">Back to all reviews</a>.</p>`;
    prevLink.hidden = true;
    nextLink.hidden = true;
    return;
  }

  const content = book.fullReview || book.review;
  const note = book.fullReview
    ? ''
    : `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 1.5rem;">A longer breakdown for this book is coming soon - here's the short take in the meantime.</p>`;

  articleBody.innerHTML = `
    <header>
      <h1>${escapeHtml(book.title)}</h1>
      <p class="article-author">by ${escapeHtml(book.author)}</p>
      <div class="article-meta-row">
        ${renderStars(book.rating)}
        <span class="genre-tag">${escapeHtml(book.genre)}</span>
        ${book.pages ? `<span>${book.pages} pages</span>` : ''}
        ${book.yearRead ? `<span>Read ${book.yearRead}</span>` : ''}
      </div>
    </header>
    <div class="article-content">
      ${note}
      ${renderArticleBody(content)}
      ${book.favoriteQuote ? `
        <aside class="pull-quote">
          <span class="quote-label">Favourite quote</span>
          "${escapeHtml(book.favoriteQuote)}"
        </aside>` : ''}
    </div>
  `;

  const prevIndex = index > 0 ? index - 1 : null;
  const nextIndex = index < books.length - 1 ? index + 1 : null;

  if (prevIndex !== null) {
    prevLink.hidden = false;
    prevLink.href = `#book/${prevIndex}`;
    prevLink.querySelector('span').textContent = books[prevIndex].title;
  } else {
    prevLink.hidden = true;
  }

  if (nextIndex !== null) {
    nextLink.hidden = false;
    nextLink.href = `#book/${nextIndex}`;
    nextLink.querySelector('span').textContent = books[nextIndex].title;
  } else {
    nextLink.hidden = true;
  }
}

function showLibrary() {
  articleView.hidden = true;
  libraryView.hidden = false;
  document.title = "Noah's Book Reviews";
}

function showArticle(index) {
  closeModal();
  libraryView.hidden = true;
  articleView.hidden = false;
  renderArticle(index);
  const book = books[index];
  if (book) document.title = `${book.title} - Noah's Book Reviews`;
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function handleRoute() {
  const hash = window.location.hash;
  const match = hash.match(/^#book\/(\d+)$/);
  if (match) {
    showArticle(Number(match[1]));
  } else {
    showLibrary();
  }
}

function closeModal() {
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

grid.addEventListener('click', e => {
  const card = e.target.closest('.book-card');
  if (card) openModal(Number(card.dataset.index));
});
grid.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.book-card');
  if (card) { e.preventDefault(); openModal(Number(card.dataset.index)); }
});

modal.addEventListener('click', e => {
  if (e.target.matches('[data-close]')) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

[searchInput, genreFilter, ratingFilter, sortSelect].forEach(el =>
  el.addEventListener('input', applyFilters)
);

window.addEventListener('hashchange', handleRoute);

populateGenres();
applyFilters();
handleRoute();
