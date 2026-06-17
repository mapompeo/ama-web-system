document.addEventListener('DOMContentLoaded', async () => {
  const STATUS_LABEL = {
    disponivel:    { label: 'Disponível',    cls: 'bg-success' },
    adotado:       { label: 'Adotado',       cls: 'bg-primary' },
    em_tratamento: { label: 'Em tratamento', cls: 'bg-warning text-dark' },
    obito:         { label: 'Óbito',         cls: 'bg-secondary' },
  };

  try {
    const items = await api.get('/beneficiaries');
    const tbody = document.getElementById('tableBody');
    const count = document.getElementById('record-count');
    if (count) count.textContent = `${items.length} registros`;

    if (!items.length) {
      tbody.closest('.table-responsive').innerHTML =
        '<p class="text-muted p-4 mb-0">Nenhum animal cadastrado ainda.</p>';
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = '';
      return;
    }

    tbody.innerHTML = items.map(b => {
      const st   = STATUS_LABEL[b.status] || { label: b.status, cls: 'bg-secondary' };
      const icon = b.species === 'Gato' ? 'bi-stars' : 'bi-hearts';
      const breed = b.breed
        ? `<div style="font-size:.78rem;color:var(--text-muted)">${b.breed}</div>` : '';
      return `<tr>
        <td class="text-muted">${b.id}</td>
        <td><strong>${b.name}</strong></td>
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
        <td class="text-end">
          <a href="/beneficiaries-form?id=${b.id}" class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delModal"
            data-id="${b.id}" data-name="${b.name}"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
    }).join('');

    document.getElementById('delModal').addEventListener('show.bs.modal', e => {
      const btn = e.relatedTarget;
      document.getElementById('del-name').textContent = btn.dataset.name;
      document.getElementById('del-confirm').dataset.id = btn.dataset.id;
    });

    document.getElementById('del-confirm').addEventListener('click', async function () {
      try {
        await api.delete(`/beneficiaries/${this.dataset.id}`);
        window.location.reload();
      } catch (err) { showAlert('danger', 'Erro ao remover: ' + err.message); }
    });

    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = '';
    initTableUtils();
  } catch (err) {
    document.getElementById('loading').innerHTML =
      `<p class="text-danger p-4">Erro: ${err.message}</p>`;
  }
});
