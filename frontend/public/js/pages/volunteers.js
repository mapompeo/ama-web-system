document.addEventListener('DOMContentLoaded', async () => {
  try {
    const volunteers = await api.get('/volunteers');
    const tbody = document.getElementById('tableBody');
    const count = document.getElementById('record-count');
    if (count) count.textContent = `${volunteers.length} registros`;

    if (!volunteers.length) {
      tbody.closest('.table-responsive').innerHTML = '<p class="text-muted p-4 mb-0">Nenhum voluntário cadastrado ainda.</p>';
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = '';
      return;
    }

    tbody.innerHTML = volunteers.map(v => {
      const date = v.join_date ? new Date(v.join_date).toLocaleDateString('pt-BR') : '—';
      const mapsHref = v.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.address)}` : null;
      const addrCell = mapsHref
        ? `<a href="${mapsHref}" target="_blank" rel="noopener" class="text-decoration-none text-body d-flex align-items-center gap-1">
             <i class="bi bi-geo-alt-fill text-danger" style="font-size:.85rem;flex-shrink:0"></i>
             <span style="font-size:.83rem">${v.address}</span></a>`
        : '—';
      const badge = v.status === 'ativo' ? 'bg-success' : 'bg-secondary';
      return `<tr>
        <td class="text-muted">${v.id}</td>
        <td><strong>${v.name}</strong></td>
        <td>${v.email || '—'}</td>
        <td>${v.phone || '—'}</td>
        <td>${addrCell}</td>
        <td>${date}</td>
        <td><span class="badge ${badge}">${v.status}</span></td>
        <td class="text-end">
          <a href="/volunteers-form?id=${v.id}" class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delModal"
            data-id="${v.id}" data-name="${v.name}"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
    }).join('');

    // Modal de exclusão
    document.getElementById('delModal').addEventListener('show.bs.modal', e => {
      const btn = e.relatedTarget;
      document.getElementById('del-name').textContent = btn.dataset.name;
      document.getElementById('del-confirm').dataset.id = btn.dataset.id;
    });

    document.getElementById('del-confirm').addEventListener('click', async function () {
      try {
        await api.delete(`/volunteers/${this.dataset.id}`);
        sessionStorage.setItem('pendingToast', JSON.stringify({ type: 'success', msg: 'Voluntário removido com sucesso.' }));
        window.location.reload();
      } catch (err) { showAlert('danger', 'Erro ao remover: ' + err.message); }
    });

    // Exportar CSV
    document.getElementById('exportBtn')?.addEventListener('click', () => {
      exportCSV(
        ['ID', 'Nome', 'E-mail', 'Telefone', 'CPF', 'Endereço', 'Data de entrada', 'Status'],
        volunteers.map(v => [
          v.id, v.name, v.email || '', v.phone || '', v.cpf || '', v.address || '',
          v.join_date ? new Date(v.join_date).toLocaleDateString('pt-BR') : '', v.status
        ]),
        'voluntarios.csv'
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
