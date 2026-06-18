document.addEventListener('DOMContentLoaded', async () => {
  const match    = window.location.pathname.match(/\/historico\/(\d+)/);
  const animalId = match ? match[1] : null;

  if (!animalId) { window.location.href = '/animais'; return; }

  let editingRecordId = null;
  let cachedRecords  = [];

  const STATUS_LABEL = { disponivel: 'Disponível', adotado: 'Adotado', em_tratamento: 'Em tratamento', obito: 'Óbito' };

  const form      = document.getElementById('record-form');
  const submitBtn = form.querySelector('[type=submit]');
  const cancelBtn = document.getElementById('record-cancel');

  function resetEditForm() {
    editingRecordId = null;
    form.reset();
    form.classList.remove('was-validated');
    submitBtn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Salvar registro';
  }

  cancelBtn.addEventListener('click', resetEditForm);
  document.getElementById('addRecordForm').addEventListener('hidden.bs.collapse', resetEditForm);

  async function loadData() {
    const { animal, records } = await api.get(`/animal-records?animal_id=${animalId}`);
    cachedRecords = records;

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
        <div class="d-flex gap-1 align-self-start">
          <button class="btn btn-sm btn-outline-secondary btn-edit-record" data-id="${r.id}" title="Editar">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger btn-delete-record" data-id="${r.id}" title="Remover">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>`;
    }).join('');

    el.querySelectorAll('.btn-edit-record').forEach(btn => {
      btn.addEventListener('click', () => {
        const rec = cachedRecords.find(r => r.id == btn.dataset.id);
        if (!rec) return;
        editingRecordId = rec.id;
        document.getElementById('r-title').value = rec.title;
        document.getElementById('r-description').value = rec.description || '';
        document.getElementById('r-date').value = rec.record_date.split('T')[0];
        submitBtn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Atualizar';
        new bootstrap.Collapse(document.getElementById('addRecordForm'), { toggle: true }).show();
      });
    });

    el.querySelectorAll('.btn-delete-record').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Remover este registro?')) return;
        try {
          await api.delete(`/animal-records/${btn.dataset.id}`);
          showToast('success', 'Registro removido.');
          const { records: updated } = await api.get(`/animal-records?animal_id=${animalId}`);
          cachedRecords = updated;
          renderRecords(updated);
        } catch (err) { showAlert('danger', 'Erro ao remover: ' + err.message); }
      });
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Salvando...';

    const payload = {
      title:       document.getElementById('r-title').value.trim(),
      description: document.getElementById('r-description').value.trim() || null,
      record_date: document.getElementById('r-date').value,
    };

    try {
      if (editingRecordId) {
        await api.put(`/animal-records/${editingRecordId}`, payload);
        showToast('success', 'Registro atualizado com sucesso!');
      } else {
        await api.post('/animal-records', { ...payload, animal_id: Number(animalId) });
        showToast('success', 'Registro adicionado com sucesso!');
      }

      bootstrap.Collapse.getInstance(document.getElementById('addRecordForm'))?.hide();
      resetEditForm();

      const { records: updated } = await api.get(`/animal-records?animal_id=${animalId}`);
      cachedRecords = updated;
      renderRecords(updated);
    } catch (err) {
      showAlert('danger', 'Erro ao salvar: ' + err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = editingRecordId
        ? '<i class="bi bi-check-lg me-1"></i>Atualizar'
        : '<i class="bi bi-check-lg me-1"></i>Salvar registro';
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
