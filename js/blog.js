const grid = document.getElementById('post-grid');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search');
const tagFilter = document.getElementById('tag-filter');
const sortSelect = document.getElementById('sort');
const blogView = document.getElementById('blog-view');
const articleView = document.getElementById('article-view');
const articleBody = document.getElementById('article-body');
const prevLink = document.getElementById('prev-link');
const nextLink = document.getElementById('next-link');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function postCard(post, index) {
  const tags = (post.tags || []).map(t => `<span class="genre-tag">${escapeHtml(t)}</span>`).join('');
  return `
    <article class="book-card post-card" data-index="${index}" tabindex="0" role="button" aria-label="Open post: ${escapeHtml(post.title)}">
      <div class="book-cover post-cover">${escapeHtml(post.title)}</div>
      <h3 class="book-title">${escapeHtml(post.title)}</h3>
      <p class="book-author">${formatDate(post.date)}</p>
      <p class="post-excerpt">${escapeHtml(post.excerpt || '')}</p>
      <div class="book-meta">${tags}</div>
    </article>
  `;
}

function populateTags() {
  const tags = [...new Set(posts.flatMap(p => p.tags || []))].sort();
  for (const t of tags) {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    tagFilter.appendChild(opt);
  }
}

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const tag = tagFilter.value;
  const sort = sortSelect.value;

  let filtered = posts
    .map((p, i) => ({ ...p, _index: i }))
    .filter(p => {
      if (tag && !(p.tags || []).includes(tag)) return false;
      if (q) {
        const hay = `${p.title} ${(p.tags || []).join(' ')} ${p.excerpt || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

  switch (sort) {
    case 'oldest':
      filtered.sort((a, b) => {
        const cmp = (a.date || '').localeCompare(b.date || '');
        return cmp !== 0 ? cmp : b._index - a._index;
      });
      break;
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'recent':
    default:
      filtered.sort((a, b) => {
        const cmp = (b.date || '').localeCompare(a.date || '');
        return cmp !== 0 ? cmp : a._index - b._index;
      });
      break;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    grid.innerHTML = filtered.map(p => postCard(p, p._index)).join('');
  }
}

function inlineFormat(escaped) {
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function renderArticleBody(text) {
  const blocks = text.split(/\n\s*\n/);
  return blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('## ')) return `<h2>${escapeHtml(trimmed.slice(3))}</h2>`;
    if (trimmed.startsWith('### ')) return `<h3>${escapeHtml(trimmed.slice(4))}</h3>`;
    if (trimmed.startsWith('> ')) return `<blockquote>${inlineFormat(escapeHtml(trimmed.slice(2)))}</blockquote>`;
    const img = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      return `<figure class="post-figure"><img src="${escapeHtml(img[2])}" alt="${escapeHtml(img[1])}" loading="lazy">${img[1] ? `<figcaption>${escapeHtml(img[1])}</figcaption>` : ''}</figure>`;
    }
    const lines = trimmed.split('\n');
    if (lines.every(l => /^- /.test(l))) {
      const items = lines.map(l => `<li>${inlineFormat(escapeHtml(l.slice(2)))}</li>`).join('');
      return `<ul>${items}</ul>`;
    }
    return `<p>${inlineFormat(escapeHtml(trimmed)).replace(/\n/g, '<br>')}</p>`;
  }).join('');
}

function renderArticle(index) {
  const post = posts[index];
  if (!post) {
    articleBody.innerHTML = `<p>Post not found. <a href="#">Back to all posts</a>.</p>`;
    prevLink.hidden = true;
    nextLink.hidden = true;
    return;
  }

  const tags = (post.tags || []).map(t => `<span class="genre-tag">${escapeHtml(t)}</span>`).join('');

  articleBody.innerHTML = `
    <header>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="article-author">${formatDate(post.date)}</p>
      <div class="article-meta-row">${tags}</div>
    </header>
    <div class="article-content">
      ${renderArticleBody(post.body || post.excerpt || '')}
    </div>
  `;

  const prevIndex = index > 0 ? index - 1 : null;
  const nextIndex = index < posts.length - 1 ? index + 1 : null;

  if (prevIndex !== null) {
    prevLink.hidden = false;
    prevLink.href = `#post/${prevIndex}`;
    prevLink.querySelector('span').textContent = posts[prevIndex].title;
  } else {
    prevLink.hidden = true;
  }

  if (nextIndex !== null) {
    nextLink.hidden = false;
    nextLink.href = `#post/${nextIndex}`;
    nextLink.querySelector('span').textContent = posts[nextIndex].title;
  } else {
    nextLink.hidden = true;
  }
}

function showBlog() {
  articleView.hidden = true;
  blogView.hidden = false;
  document.title = "Noah's Blog";
}

function showArticle(index) {
  blogView.hidden = true;
  articleView.hidden = false;
  renderArticle(index);
  const post = posts[index];
  if (post) document.title = `${post.title} - Noah's Blog`;
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function handleRoute() {
  const hash = window.location.hash;
  const match = hash.match(/^#post\/(\d+)$/);
  if (match) {
    showArticle(Number(match[1]));
  } else {
    showBlog();
  }
}

grid.addEventListener('click', e => {
  const card = e.target.closest('.post-card');
  if (card) window.location.hash = `#post/${card.dataset.index}`;
});
grid.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.post-card');
  if (card) { e.preventDefault(); window.location.hash = `#post/${card.dataset.index}`; }
});

[searchInput, tagFilter, sortSelect].forEach(el =>
  el.addEventListener('input', applyFilters)
);

window.addEventListener('hashchange', handleRoute);

populateTags();
applyFilters();
handleRoute();
