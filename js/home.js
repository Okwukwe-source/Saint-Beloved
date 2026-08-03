// home.js — Renders the latest essay as the hero

(function () {
  const heroContent = document.getElementById('hero-content');
  if (!heroContent) return;

  const essays = window.ESSAYS || [];

  if (!essays.length) return;

  const sorted = [...essays].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = sorted[0];

  const formattedDate = new Date(latest.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  heroContent.innerHTML = `
    <div class="hero-image-wrap">
      <img src="${latest.cover}" alt="${latest.title}" />
    </div>
    <p class="hero-meta">${formattedDate}</p>
    <h1 class="hero-title">
      <a href="essay.html?id=${latest.id}">${latest.title}</a>
    </h1>
    <p class="hero-excerpt">${latest.excerpt || ''}</p>
    <a class="hero-read-link" href="essay.html?id=${latest.id}">Read Essay</a>
  `;
})();
