document.addEventListener('DOMContentLoaded', async () => {
  const STATUS_LABEL = {
    disponivel:    { label: 'Disponível',    cls: 'bg-success' },
    adotado:       { label: 'Adotado',       cls: 'bg-primary' },
    em_tratamento: { label: 'Em tratamento', cls: 'bg-warning text-dark' },
    obito:         { label: 'Óbito',         cls: 'bg-secondary' },
  };

  const LIMIT = 20;
  let currentPage = 1;

  function getChecked(cls) {
    return Array.from(document.querySelectorAll(`.${cls}:checked`)).map(el => el.value).join(',');
  }

  function getFilters() {
    return {
      search:  document.getElementById('tableSearch').value.trim(),
      species: getChecked('filter-species'),
      status:  getChecked('filter-status'),
      size:    getChecked('filter-size'),
    };
  }

  function updateFilterUI() {
    const groups = [
      { cls: 'filter-species', btnId: 'btnSpecies', label: 'Espécie' },
      { cls: 'filter-status',  btnId: 'btnStatus',  label: 'Status' },
      { cls: 'filter-size',    btnId: 'btnSize',    label: 'Porte' },
    ];
    let anyActive = !!document.getElementById('tableSearch').value.trim();
    groups.forEach(({ cls, btnId, label }) => {
      const n   = document.querySelectorAll(`.${cls}:checked`).length;
      const btn = document.getElementById(btnId);
      if (n > 0) {
        btn.innerHTML = `${label} <span class="badge rounded-pill ms-1" style="background:rgba(255,255,255,.3);font-size:.7rem">${n}</span>`;
        btn.classList.replace('btn-outline-secondary', 'btn-primary');
        anyActive = true;
      } else {
        btn.textContent = label;
        btn.classList.replace('btn-primary', 'btn-outline-secondary');
      }
    });
    document.getElementById('clearFilters').style.display = anyActive ? '' : 'none';
  }

  async function load(page = 1) {
    currentPage = page;
    const f = getFilters();
    const params = new URLSearchParams({ page, limit: LIMIT });
    if (f.search)  params.set('search',  f.search);
    if (f.species) params.set('species', f.species);
    if (f.status)  params.set('status',  f.status);
    if (f.size)    params.set('size',    f.size);

    try {
      const result = await api.get(`/beneficiaries?${params}`);
      renderTable(result.data);
      renderPagination(result.total, result.page, result.pages);
      const count = document.getElementById('record-count');
      if (count) count.textContent = `${result.total} animal${result.total !== 1 ? 'is' : ''}`;
    } catch (err) {
      showAlert('danger', 'Erro ao carregar animais: ' + err.message);
    }
  }

  function renderTable(items) {
    const tbody = document.getElementById('tableBody');
    if (!items.length) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">Nenhum animal encontrado.</td></tr>';
      return;
    }
    tbody.innerHTML = items.map(b => {
      const st   = STATUS_LABEL[b.status] || { label: b.status, cls: 'bg-secondary' };
      const icon = b.species === 'Gato' ? 'bi-stars' : 'bi-hearts';
      const breed = b.breed
        ? `<div style="font-size:.78rem;color:var(--text-muted)">${b.breed}</div>` : '';
      return `<tr>
        <td class="text-muted">${b.id}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <div style="width:36px;height:36px;border-radius:6px;background:var(--border-light);display:flex;align-items:center;justify-content:center;font-size:.85rem;color:var(--text-muted)"><i class="bi ${icon}"></i></div>
            <strong>${b.name}</strong>
          </div>
        </td>
        <td>
          <div class="d-flex align-items-center gap-1">
            <i class="bi ${icon}" style="font-size:.82rem;color:var(--primary)"></i>
            <span>${b.species}</span>
          </div>
          ${breed}
        </td>
        <td>${b.sex || '—'}</td>
        <td>${b.size || '—'}</td>
        <td>${b.responsible_name || '<span class="text-muted">—</span>'}</td>
        <td><span class="badge ${st.cls}">${st.label}</span></td>
        <td class="text-end" style="white-space:nowrap">
          <a href="/animal-history?id=${b.id}" class="btn btn-sm btn-outline-info me-1" title="Histórico"><i class="bi bi-clock-history"></i></a>
          <a href="/beneficiaries-form?id=${b.id}" class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delModal"
            data-id="${b.id}" data-name="${b.name}"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
    }).join('');
  }

  function renderPagination(total, page, pages) {
    const el = document.getElementById('tablePagination');
    if (!el) return;
    const start = total === 0 ? 0 : (page - 1) * LIMIT + 1;
    const end   = Math.min(page * LIMIT, total);
    const wrap  = document.createElement('div');
    wrap.className = 'd-flex align-items-center justify-content-between px-3 py-2';

    const info = document.createElement('span');
    info.className = 'text-muted'; info.style.fontSize = '.78rem';
    info.textContent = `${start}–${end} de ${total}`;
    wrap.appendChild(info);

    if (pages > 1) {
      const ul = document.createElement('ul');
      ul.className = 'pagination pagination-sm mb-0';
      const mk = (label, p, disabled, active) => {
        const li = document.createElement('li');
        li.className = `page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}`;
        const a = document.createElement('a');
        a.className = 'page-link'; a.href = '#'; a.innerHTML = label;
        if (!disabled && !active) a.addEventListener('click', e => { e.preventDefault(); load(p); });
        li.appendChild(a);
        return li;
      };
      ul.appendChild(mk('<i class="bi bi-chevron-left"></i>', page - 1, page === 1));
      const d = 2, left = Math.max(1, page - d), right = Math.min(pages, page + d);
      if (left > 1) { ul.appendChild(mk('1', 1)); if (left > 2) ul.appendChild(mk('…', page - 3, true)); }
      for (let i = left; i <= right; i++) ul.appendChild(mk(i, i, false, i === page));
      if (right < pages) { if (right < pages - 1) ul.appendChild(mk('…', page + 3, true)); ul.appendChild(mk(pages, pages)); }
      ul.appendChild(mk('<i class="bi bi-chevron-right"></i>', page + 1, page === pages));
      wrap.appendChild(ul);
    }
    el.innerHTML = '';
    el.appendChild(wrap);
  }

  document.querySelectorAll('.filter-species, .filter-status, .filter-size').forEach(cb => {
    cb.addEventListener('change', () => { updateFilterUI(); load(1); });
  });

  let searchTimer;
  document.getElementById('tableSearch').addEventListener('input', () => {
    clearTimeout(searchTimer);
    updateFilterUI();
    searchTimer = setTimeout(() => load(1), 350);
  });

  document.getElementById('clearFilters').addEventListener('click', () => {
    document.querySelectorAll('.filter-species, .filter-status, .filter-size').forEach(cb => cb.checked = false);
    document.getElementById('tableSearch').value = '';
    updateFilterUI();
    load(1);
  });

  document.getElementById('exportBtn').addEventListener('click', async () => {
    try {
      const f = getFilters();
      const params = new URLSearchParams({ page: 1, limit: 9999 });
      if (f.search)  params.set('search',  f.search);
      if (f.species) params.set('species', f.species);
      if (f.status)  params.set('status',  f.status);
      if (f.size)    params.set('size',    f.size);
      const { data } = await api.get(`/beneficiaries?${params}`);
      const STATUS_TEXT = { disponivel: 'Disponível', adotado: 'Adotado', em_tratamento: 'Em tratamento', obito: 'Óbito' };
      exportCSV(
        ['ID', 'Nome', 'Espécie', 'Raça', 'Sexo', 'Porte', 'Status', 'Responsável', 'Telefone', 'Observações'],
        data.map(b => [b.id, b.name, b.species, b.breed || '', b.sex, b.size || '', STATUS_TEXT[b.status] || b.status, b.responsible_name || '', b.responsible_phone || '', b.notes || '']),
        'animais.csv'
      );
    } catch (err) { showAlert('danger', 'Erro ao exportar: ' + err.message); }
  });

  document.getElementById('delModal').addEventListener('show.bs.modal', e => {
    const btn = e.relatedTarget;
    document.getElementById('del-name').textContent = btn.dataset.name;
    document.getElementById('del-confirm').dataset.id = btn.dataset.id;
  });

  document.getElementById('del-confirm').addEventListener('click', async function () {
    try {
      await api.delete(`/beneficiaries/${this.dataset.id}`);
      sessionStorage.setItem('pendingToast', JSON.stringify({ type: 'success', msg: 'Animal removido com sucesso.' }));
      window.location.reload();
    } catch (err) { showAlert('danger', 'Erro ao remover: ' + err.message); }
  });

  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = '';
  await load(1);
  checkPendingToast();
});
