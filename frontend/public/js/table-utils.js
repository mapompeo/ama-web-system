document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('tableSearch');
  const tableBody   = document.getElementById('tableBody');
  const paginEl     = document.getElementById('tablePagination');
  const wrapper     = document.querySelector('.table-responsive');

  if (!tableBody) return;

  const allRows = Array.from(tableBody.querySelectorAll('tr'));
  let filtered  = [...allRows];
  let page      = 1;
  let PER_PAGE  = calcPerPage();

  function calcPerPage() {
    if (!wrapper) return 8;
    const thead = tableBody.closest('table')?.querySelector('thead');
    const theadH = thead ? thead.offsetHeight : 45;
    const available = wrapper.clientHeight - theadH;
    const rowH = 53;
    return Math.max(5, Math.floor(available / rowH));
  }

  function render() {
    PER_PAGE = calcPerPage();
    const start = (page - 1) * PER_PAGE;
    allRows.forEach(r => (r.style.display = 'none'));
    filtered.slice(start, start + PER_PAGE).forEach(r => (r.style.display = ''));
    renderPagination();
  }

  function renderPagination() {
    if (!paginEl) return;
    const total = Math.ceil(filtered.length / PER_PAGE);
    paginEl.innerHTML = '';

    // info de registros
    const info = document.createElement('span');
    info.className = 'text-muted me-3';
    info.style.fontSize = '.78rem';
    const start = filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1;
    const end   = Math.min(page * PER_PAGE, filtered.length);
    info.textContent = `${start}–${end} de ${filtered.length}`;

    const wrap = document.createElement('div');
    wrap.className = 'd-flex align-items-center justify-content-between px-3 py-2';
    wrap.appendChild(info);

    if (total > 1) {
      const ul = document.createElement('ul');
      ul.className = 'pagination pagination-sm mb-0';

      const mkItem = (label, p, disabled, active) => {
        const li = document.createElement('li');
        li.className = `page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" data-p="${p}">${label}</a>`;
        return li;
      };

      ul.appendChild(mkItem('<i class="bi bi-chevron-left"></i>', page - 1, page === 1));

      // janela de páginas: mostra até 5 ao redor da atual
      const delta = 2;
      const left  = Math.max(1, page - delta);
      const right = Math.min(total, page + delta);
      if (left > 1) { ul.appendChild(mkItem('1', 1, false, false)); if (left > 2) ul.appendChild(mkItem('…', page - 3, true)); }
      for (let i = left; i <= right; i++) ul.appendChild(mkItem(i, i, false, i === page));
      if (right < total) { if (right < total - 1) ul.appendChild(mkItem('…', page + 3, true)); ul.appendChild(mkItem(total, total, false, false)); }

      ul.appendChild(mkItem('<i class="bi bi-chevron-right"></i>', page + 1, page === total));

      ul.querySelectorAll('[data-p]').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          const p = +a.dataset.p;
          if (p >= 1 && p <= total) { page = p; render(); }
        });
      });

      wrap.appendChild(ul);
    }

    paginEl.appendChild(wrap);
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      filtered = q ? allRows.filter(r => r.textContent.toLowerCase().includes(q)) : [...allRows];
      page = 1;
      render();
    });
  }

  // recalcula ao redimensionar
  window.addEventListener('resize', () => { PER_PAGE = calcPerPage(); render(); });

  render();
});
