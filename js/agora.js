// agora.js — Renders all essays in The Agora archive

(function () {
  const grid = document.getElementById('agora-grid');
  const empty = document.getElementById('agora-empty');
  if (!grid) return;

  const essays = window.ESSAYS || [];

  if (!essays.length) {
    grid.style.display = 'none';
    if (empty) empty.style.display = 'block';
    return;
  }

  const sorted = [...essays].sort((a, b) => new Date(b.date) - new Date(a.date));

  sorted.forEach((essay) => {
    const formattedDate = new Date(essay.date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const card = document.createElement('div');
    card.className = 'essay-card';
    card.innerHTML = `
      <a href="essay.html?id=${essay.id}" class="essay-card-image">
        <img src="${essay.cover}" alt="${essay.title}" loading="lazy" />
      </a>
      <p class="essay-card-meta">${formattedDate}</p>
      <a href="essay.html?id=${essay.id}">
        <h2 class="essay-card-title">${essay.title}</h2>
      </a>
      ${essay.excerpt ? `<p class="essay-card-excerpt">${essay.excerpt}</p>` : ''}
      <a href="essay.html?id=${essay.id}" class="essay-card-link">Read Essay</a>
    `;
    grid.appendChild(card);
  });
})();
