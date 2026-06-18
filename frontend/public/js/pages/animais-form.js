document.addEventListener('DOMContentLoaded', async () => {
  const match = window.location.pathname.match(/\/animais\/(\d+)/);
  const id     = match ? match[1] : null;
  const form   = document.getElementById('main-form');
  const title  = document.getElementById('page-title');
  const crumb  = document.getElementById('crumb-action');

  const contractSection = document.getElementById('contract-section');
  const contractList    = document.getElementById('contract-list');
  const contractEmpty   = document.getElementById('contract-empty');
  const contractInput   = document.getElementById('f-contract');
  const pdfFrame        = document.getElementById('pdf-frame');
  const pdfModal        = new bootstrap.Modal(document.getElementById('pdfModal'));

  function renderContractRow(c) {
    const url = `/uploads/contracts/${c.filename}`;
    const row = document.createElement('div');
    row.className = 'd-flex align-items-center gap-2';
    row.innerHTML = `
      <i class="bi bi-file-earmark-pdf text-danger fs-5"></i>
      <span class="text-muted" style="font-size:.85rem;flex:1">${c.original_name}</span>
      <button type="button" class="btn btn-sm btn-outline-secondary view-btn"><i class="bi bi-eye me-1"></i>Visualizar</button>
      <a href="${url}" class="btn btn-sm btn-outline-primary"><i class="bi bi-download me-1"></i>Baixar</a>
      <button type="button" class="btn btn-sm btn-outline-danger delete-btn"><i class="bi bi-trash"></i></button>
    `;
    row.querySelector('.view-btn').addEventListener('click', () => {
      pdfFrame.src = url;
      pdfModal.show();
    });
    row.querySelector('.delete-btn').addEventListener('click', async () => {
      if (!confirm('Remover este contrato?')) return;
      try {
        await api.delete(`/animais/${id}/contract/${c.id}`);
        showToast('success', 'Contrato removido.');
        await loadContracts(id);
      } catch (err) {
        showAlert('danger', 'Erro ao remover: ' + err.message);
      }
    });
    return row;
  }

  async function loadContracts(animalId) {
    try {
      const list = await api.get(`/animais/${animalId}/contract`);
      contractList.innerHTML = '';
      if (list.length === 0) {
        contractList.style.display = 'none';
        contractEmpty.style.display = '';
      } else {
        contractEmpty.style.display = 'none';
        contractList.style.display = '';
        list.forEach(c => contractList.appendChild(renderContractRow(c)));
      }
    } catch {
      contractList.style.display = 'none';
      contractEmpty.style.display = '';
    }
  }

  document.getElementById('pdfModal')?.addEventListener('hidden.bs.modal', () => {
    pdfFrame.src = '';
  });

  if (id) {
    try {
      const b = await api.get(`/animais/${id}`);
      title.textContent = crumb.textContent = 'Editar Animal';

      document.getElementById('f-name').value              = b.name              || '';
      document.getElementById('f-species').value           = b.species           || 'Cachorro';
      document.getElementById('f-breed').value             = b.breed             || '';
      document.getElementById('f-sex').value               = b.sex               || 'Não identificado';
      document.getElementById('f-size').value              = b.size              || '';
      document.getElementById('f-status').value            = b.status            || 'disponivel';
      document.getElementById('f-responsible').value       = b.responsible_name  || '';
      document.getElementById('f-responsible-phone').value = b.responsible_phone || '';
      document.getElementById('f-notes').value             = b.notes             || '';
      if (b.birth_date) {
        document.getElementById('f-birth-date').value = new Date(b.birth_date).toISOString().split('T')[0];
      }

      contractSection.style.display = '';
      await loadContracts(id);
    } catch (err) { showAlert('danger', 'Erro ao carregar: ' + err.message); }
  }

  contractInput?.addEventListener('change', async function () {
    const file = this.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('contract', file);
    try {
      await fetch(`/api/animais/${id}/contract`, {
        method: 'POST', body: fd, credentials: 'include'
      });
      showToast('success', 'Contrato enviado com sucesso!');
      await loadContracts(id);
    } catch (err) {
      showAlert('danger', 'Erro ao enviar contrato: ' + err.message);
    }
    this.value = '';
  });

  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = '';

  initMasks();

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Salvando...';

    const data = {
      name:              document.getElementById('f-name').value.trim(),
      species:           document.getElementById('f-species').value,
      breed:             document.getElementById('f-breed').value.trim() || null,
      sex:               document.getElementById('f-sex').value,
      size:              document.getElementById('f-size').value || null,
      birth_date:        document.getElementById('f-birth-date').value || null,
      status:            document.getElementById('f-status').value,
      responsible_name:  document.getElementById('f-responsible').value.trim() || null,
      responsible_phone: document.getElementById('f-responsible-phone').value.trim() || null,
      notes:             document.getElementById('f-notes').value.trim() || null,
    };

    try {
      let animalId = id;
      if (id) { await api.put(`/animais/${id}`, data); }
      else    { const saved = await api.post('/animais', data); animalId = saved.id; }

      const msg = id ? 'Animal atualizado com sucesso!' : 'Animal cadastrado com sucesso!';
      sessionStorage.setItem('pendingToast', JSON.stringify({ type: 'success', msg }));
      window.location.href = '/animais';
    } catch (err) {
      showAlert('danger', 'Erro ao salvar: ' + err.message);
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Salvar';
    }
  });
});
