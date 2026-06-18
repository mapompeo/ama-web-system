document.addEventListener('DOMContentLoaded', async () => {
  const match    = window.location.pathname.match(/\/historico\/(\d+)/);
  const params   = new URLSearchParams(window.location.search);
  const animalId = match ? match[1] : params.get('id');

  if (!animalId) { window.location.href = '/animais'; return; }

  const STATUS_LABEL = { disponivel: 'Disponível', adotado: 'Adotado', em_tratamento: 'Em tratamento', obito: 'Óbito' };

  async function loadData() {
    const { animal, records } = await api.get(`/animal-records?animal_id=${animalId}`);

    document.getElementById('crumb-name').textContent = animal.name;
    document.getElementById('page-title').textContent = `Histórico — ${animal.name}`;

    document.getElementById('animal-name').textContent = animal.name;
    document.getElementById('animal-details').textContent =
      [animal.species, animal.breed, animal.sex, animal.size, STATUS_LABEL[animal.status] || animal.status]
        .filter(Boolean).join(' · ');
    document.getElementById('edit-link').href = `/animais/${animalId}`;

    renderRecords(records);
  }

  function renderRecords(records) {
    const el = document.getElementById('records-list');
    if (!records.length) {
      el.innerHTML = `<div class="p-4 text-center" style="color:var(--text-muted);font-size:.88rem">
        <i class="bi bi-clock-history d-block mb-2" style="font-size:1.8rem;opacity:.3"></i>
        Nenhum registro ainda. Clique em "Adicionar" para começar.
      </div>`;
      return;
    }

    el.innerHTML = records.map(r => {
      const date = new Date(r.record_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
      return `<div class="d-flex gap-3 px-4 py-3 border-bottom">
        <div style="flex-shrink:0;text-align:center;min-width:44px">
          <div style="font-size:1.1rem;font-weight:700;line-height:1;color:var(--primary)">${new Date(r.record_date).getDate()}</div>
          <div style="font-size:.65rem;text-transform:uppercase;color:var(--text-muted);letter-spacing:.04em">${new Date(r.record_date).toLocaleDateString('pt-BR',{month:'short'}).replace('.','')}</div>
          <div style="font-size:.65rem;color:var(--text-subtle)">${new Date(r.record_date).getFullYear()}</div>
        </div>
        <div style="flex:1;min-width:0">
          <div class="fw-semibold" style="font-size:.88rem;color:var(--text-heading)">${r.title}</div>
          ${r.description ? `<div style="font-size:.82rem;color:var(--text-muted);margin-top:.15rem">${r.description}</div>` : ''}
        </div>
        <button class="btn btn-sm btn-outline-danger btn-delete-record align-self-start" data-id="${r.id}" title="Remover">
          <i class="bi bi-trash"></i>
        </button>
      </div>`;
    }).join('');

    el.querySelectorAll('.btn-delete-record').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Remover este registro?')) return;
        try {
          await api.delete(`/animal-records/${btn.dataset.id}`);
          showToast('success', 'Registro removido.');
          const { records: updated } = await api.get(`/animal-records?animal_id=${animalId}`);
          renderRecords(updated);
        } catch (err) { showAlert('danger', 'Erro ao remover: ' + err.message); }
      });
    });
  }

  const form = document.getElementById('record-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Salvando...';

    try {
      await api.post('/animal-records', {
        animal_id:   Number(animalId),
        title:       document.getElementById('r-title').value.trim(),
        description: document.getElementById('r-description').value.trim() || null,
        record_date: document.getElementById('r-date').value,
      });

      bootstrap.Collapse.getInstance(document.getElementById('addRecordForm'))?.hide();
      form.reset(); form.classList.remove('was-validated');

      showToast('success', 'Registro adicionado com sucesso!');
      const { records: updated } = await api.get(`/animal-records?animal_id=${animalId}`);
      renderRecords(updated);
    } catch (err) {
      showAlert('danger', 'Erro ao salvar: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Salvar registro';
    }
  });

  try {
    await loadData();
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = '';
  } catch (err) {
    document.getElementById('loading').innerHTML =
      `<div class="text-center p-5"><i class="bi bi-exclamation-circle text-danger d-block mb-2" style="font-size:2rem"></i><p style="color:var(--text-muted)">${err.message}</p></div>`;
  }
});
