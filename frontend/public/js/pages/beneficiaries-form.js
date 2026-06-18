document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  const form   = document.getElementById('main-form');
  const title  = document.getElementById('page-title');
  const crumb  = document.getElementById('crumb-action');

  const contractSection = document.getElementById('contract-section');
  const contractCurrent = document.getElementById('contract-current');
  const contractEmpty   = document.getElementById('contract-empty');
  const contractName    = document.getElementById('contract-name');
  const contractDownload = document.getElementById('contract-download');
  const contractDelete  = document.getElementById('contract-delete');
  const contractInput   = document.getElementById('f-contract');

  async function loadContract(animalId) {
    try {
      const c = await api.get(`/beneficiaries/${animalId}/contract`);
      contractCurrent.style.display = 'flex';
      contractEmpty.style.display = 'none';
      contractName.textContent = c.original_name;
      contractDownload.href = `/uploads/contracts/${c.filename}`;
    } catch {
      contractCurrent.style.display = 'none';
      contractEmpty.style.display = '';
    }
  }

  if (id) {
    try {
      const b = await api.get(`/beneficiaries/${id}`);
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
      await loadContract(id);
    } catch (err) { showAlert('danger', 'Erro ao carregar: ' + err.message); }
  }

  contractDelete?.addEventListener('click', async () => {
    if (!confirm('Remover contrato de adoção?')) return;
    try {
      await api.delete(`/beneficiaries/${id}/contract`);
      showToast('success', 'Contrato removido.');
      await loadContract(id);
    } catch (err) { showAlert('danger', 'Erro ao remover: ' + err.message); }
  });

  contractInput?.addEventListener('change', async function () {
    const file = this.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('contract', file);
    try {
      await fetch(`/api/beneficiaries/${id}/contract`, {
        method: 'POST', body: fd, credentials: 'include'
      });
      showToast('success', 'Contrato enviado com sucesso!');
      await loadContract(id);
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
      if (id) { await api.put(`/beneficiaries/${id}`, data); }
      else    { const saved = await api.post('/beneficiaries', data); animalId = saved.id; }

      const msg = id ? 'Animal atualizado com sucesso!' : 'Animal cadastrado com sucesso!';
      sessionStorage.setItem('pendingToast', JSON.stringify({ type: 'success', msg }));
      window.location.href = '/beneficiaries';
    } catch (err) {
      showAlert('danger', 'Erro ao salvar: ' + err.message);
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Salvar';
    }
  });
});
