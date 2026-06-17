document.addEventListener('DOMContentLoaded', async () => {
  try {
    const items = await api.get('/activities');
    const tbody = document.getElementById('tableBody');
    const count = document.getElementById('record-count');
    if (count) count.textContent = `${items.length} registros`;

    if (!items.length) {
      tbody.closest('.table-responsive').innerHTML = '<p class="text-muted p-4 mb-0">Nenhuma atividade cadastrada ainda.</p>';
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = '';
      return;
    }

    tbody.innerHTML = items.map(a => {
      const date  = new Date(a.activity_date).toLocaleDateString('pt-BR');
      const mapsHref = a.location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.location + ', Blumenau, SC')}` : null;
      const locCell  = mapsHref
        ? `<a href="${mapsHref}" target="_blank" rel="noopener" class="text-decoration-none text-body d-flex align-items-center gap-1">
             <i class="bi bi-geo-alt-fill text-danger" style="font-size:.85rem;flex-shrink:0"></i>
             <span style="font-size:.83rem">${a.location}</span></a>`
        : '—';
      const badge = a.status === 'realizada' ? 'bg-success' : a.status === 'cancelada' ? 'bg-danger' : 'bg-warning text-dark';
      return `<tr>
        <td class="text-muted">${a.id}</td>
        <td><strong>${a.title}</strong></td>
        <td>${date}</td>
        <td>${locCell}</td>
        <td><span class="badge ${badge}">${a.status}</span></td>
        <td class="text-end">
          <a href="/activities-form?id=${a.id}" class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delModal"
            data-id="${a.id}" data-name="${a.title}"><i class="bi bi-trash"></i></button>
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
        await api.delete(`/activities/${this.dataset.id}`);
        sessionStorage.setItem('pendingToast', JSON.stringify({ type: 'success', msg: 'Atividade removida com sucesso.' }));
        window.location.reload();
      } catch (err) { showAlert('danger', 'Erro ao remover: ' + err.message); }
    });

    // Exportar CSV
    document.getElementById('exportBtn')?.addEventListener('click', () => {
      exportCSV(
        ['ID', 'Título', 'Data', 'Local', 'Status', 'Descrição'],
        items.map(a => [
          a.id, a.title,
          new Date(a.activity_date).toLocaleDateString('pt-BR'),
          a.location || '', a.status, a.description || ''
        ]),
        'atividades.csv'
      );
    });

    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = '';
    initTableUtils();
    checkPendingToast();
  } catch (err) {
    document.getElementById('loading').innerHTML = `<p class="text-danger p-4">Erro: ${err.message}</p>`;
  }
});
