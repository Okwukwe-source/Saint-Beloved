// essay.js — Renders a single essay page

(function () {
  const container = document.getElementById('essay-content');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const essays = window.ESSAYS || [];
  const essay = essays.find((e) => String(e.id) === String(id));

  if (!essay) {
    container.innerHTML = `
      <p style="color: var(--bone-dim); font-style: italic;">
        This essay could not be found. <a href="agora.html" style="color: var(--gold);">Return to The Agora.</a>
      </p>
    `;
    return;
  }

  document.title = `${essay.title} — Saint Beloved`;

  const formattedDate = new Date(essay.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  container.innerHTML = `
    <div class="essay-cover">
      <img src="${essay.cover}" alt="${essay.title}" />
    </div>
    <div class="essay-heading">
      <h1>${essay.title}</h1>
      <p class="essay-date">${formattedDate}</p>
    </div>
    <div class="essay-body">
      ${essay.body}
    </div>
  `;
})();
