document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('tableSearch');
  const tableBody   = document.getElementById('tableBody');
  const paginEl     = document.getElementById('tablePagination');
  const PER_PAGE    = 8;

  if (!tableBody) return;

  const allRows  = Array.from(tableBody.querySelectorAll('tr'));
  let filtered   = [...allRows];
  let page       = 1;

  function render() {
    const start = (page - 1) * PER_PAGE;
    allRows.forEach(r => (r.style.display = 'none'));
    filtered.slice(start, start + PER_PAGE).forEach(r => (r.style.display = ''));
    renderPagination();
  }

  function renderPagination() {
    if (!paginEl) return;
    const total = Math.ceil(filtered.length / PER_PAGE);
    paginEl.innerHTML = '';
    if (total <= 1) return;

    const ul = document.createElement('ul');
    ul.className = 'pagination pagination-sm mb-0 justify-content-end';

    const mkItem = (label, p, disabled, active) => {
      const li = document.createElement('li');
      li.className = `page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}`;
      li.innerHTML = `<a class="page-link" href="#" data-p="${p}">${label}</a>`;
      return li;
    };

    ul.appendChild(mkItem('<i class="bi bi-chevron-left"></i>', page - 1, page === 1));
    for (let i = 1; i <= total; i++) ul.appendChild(mkItem(i, i, false, i === page));
    ul.appendChild(mkItem('<i class="bi bi-chevron-right"></i>', page + 1, page === total));

    ul.querySelectorAll('[data-p]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const p = +a.dataset.p;
        if (p >= 1 && p <= total) { page = p; render(); }
      });
    });

    paginEl.appendChild(ul);
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      filtered = q ? allRows.filter(r => r.textContent.toLowerCase().includes(q)) : [...allRows];
      page = 1;
      render();
    });
  }

  render();
});
