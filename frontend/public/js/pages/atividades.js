document.addEventListener('DOMContentLoaded', async () => {
  const STATUS_LABEL = {
    agendada:  { label: 'Agendada',  cls: 'bg-warning text-dark' },
    realizada: { label: 'Realizada', cls: 'bg-success' },
    cancelada: { label: 'Cancelada', cls: 'bg-danger' },
  };

  let currentItems = [];
  let sortBy    = 'activity_date';
  let sortOrder = 'desc';

  function sortItems(items) {
    return [...items].sort((a, b) => {
      let va = a[sortBy], vb = b[sortBy];
      if (sortBy === 'activity_date') { va = new Date(va); vb = new Date(vb); }
      else if (sortBy === 'id') { va = Number(va); vb = Number(vb); }
      else { va = String(va || '').toLowerCase(); vb = String(vb || '').toLowerCase(); }
      if (va < vb) return sortOrder === 'asc' ? -1 : 1;
      if (va > vb) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  function updateSortUI() {
    document.querySelectorAll('thead th[data-sort]').forEach(th => {
      const col = th.dataset.sort;
      th.classList.remove('sort-asc', 'sort-desc');
      let icon = th.querySelector('.sort-icon');
      if (!icon) {
        icon = document.createElement('i');
        icon.className = 'bi sort-icon';
        th.appendChild(icon);
      }
      if (col === sortBy) {
        th.classList.add(sortOrder === 'asc' ? 'sort-asc' : 'sort-desc');
        icon.className = `bi sort-icon bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'}`;
      } else {
        icon.className = 'bi sort-icon bi-arrow-down-up';
      }
    });
  }

  function getChecked(cls) {
    return Array.from(document.querySelectorAll(`.${cls}:checked`)).map(el => el.value).join(',');
  }

  function getFilters() {
    return {
      search: document.getElementById('tableSearch').value.trim(),
      status: getChecked('filter-status'),
    };
  }

  function updateFilterUI() {
    const n = document.querySelectorAll('.filter-status:checked').length;
    const btn = document.getElementById('btnStatus');
    if (n > 0) {
      btn.innerHTML = `Status <span class="badge rounded-pill ms-1" style="background:rgba(255,255,255,.3);font-size:.7rem">${n}</span>`;
      btn.classList.replace('btn-outline-secondary', 'btn-primary');
    } else {
      btn.textContent = 'Status';
      btn.classList.replace('btn-primary', 'btn-outline-secondary');
    }
    const anyActive = !!document.getElementById('tableSearch').value.trim() || n > 0;
    document.getElementById('clearFilters').style.display = anyActive ? '' : 'none';
  }

  function renderTable(items) {
    const tbody = document.getElementById('tableBody');
    if (!items.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Nenhuma atividade encontrada.</td></tr>';
      return;
    }
    tbody.innerHTML = sortItems(items).map(a => {
      const date     = new Date(a.activity_date).toLocaleDateString('pt-BR');
      const mapsHref = a.location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.location)}` : null;
      const locCell  = mapsHref
        ? `<a href="${mapsHref}" target="_blank" rel="noopener" class="text-decoration-none text-body d-flex align-items-center gap-1">
             <i class="bi bi-geo-alt-fill text-danger" style="font-size:.85rem;flex-shrink:0"></i>
             <span style="font-size:.83rem">${a.location}</span></a>`
        : '-';
      const st = STATUS_LABEL[a.status] || { label: a.status, cls: 'bg-secondary' };
      return `<tr>
        <td class="text-muted">${a.id}</td>
        <td><strong>${a.title}</strong></td>
        <td>${date}</td>
        <td>${locCell}</td>
        <td><span class="badge ${st.cls}">${st.label}</span></td>
        <td class="text-end">
          <a href="/atividades/${a.id}" class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delModal"
            data-id="${a.id}" data-name="${a.title}"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
    }).join('');
  }

  async function load() {
    const f = getFilters();
    const params = new URLSearchParams();
    if (f.search) params.set('search', f.search);
    if (f.status) params.set('status', f.status);

    try {
      const items = await api.get(`/activities?${params}`);
      currentItems = items;
      const count = document.getElementById('record-count');
      if (count) count.textContent = `${items.length} registro${items.length !== 1 ? 's' : ''}`;

      renderTable(items);
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = '';
      updateSortUI();
      checkPendingToast();
    } catch (err) {
      document.getElementById('loading').innerHTML = `<p class="text-danger p-4">Erro: ${err.message}</p>`;
    }
  }

  document.querySelectorAll('thead th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (sortBy === col) {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        sortBy    = col;
        sortOrder = 'asc';
      }
      renderTable(currentItems);
      updateSortUI();
    });
  });

  document.getElementById('tableSearch').addEventListener('input', () => { updateFilterUI(); load(); });
  document.querySelectorAll('.filter-status').forEach(el => {
    el.addEventListener('change', () => { updateFilterUI(); load(); });
  });
  document.getElementById('clearFilters')?.addEventListener('click', () => {
    document.getElementById('tableSearch').value = '';
    document.querySelectorAll('.filter-status:checked').forEach(el => el.checked = false);
    updateFilterUI();
    load();
  });

  document.getElementById('delModal').addEventListener('show.bs.modal', e => {
    const btn = e.relatedTarget;
    document.getElementById('del-name').textContent = btn.dataset.name;
    document.getElementById('del-confirm').dataset.id = btn.dataset.id;
  });

  document.getElementById('del-confirm').addEventListener('click', async function () {
    try {
      await api.delete(`/activities/${this.dataset.id}`);
      sessionStorage.setItem('pendingToast', JSON.stringify({ type: 'success', msg: 'Atividade removida com sucesso.' }));
      load();
    } catch (err) { showAlert('danger', 'Erro ao remover: ' + err.message); }
  });

  document.getElementById('exportBtn')?.addEventListener('click', () => {
    const rows = currentItems.map(a => [
      a.id,
      a.title,
      new Date(a.activity_date).toLocaleDateString('pt-BR'),
      a.location || '-',
      (STATUS_LABEL[a.status] || { label: a.status }).label,
    ]);
    exportCSV(
      ['ID', 'Título', 'Data', 'Local', 'Status'],
      rows,
      'atividades.csv'
    );
  });

  updateFilterUI();
  load();
});
