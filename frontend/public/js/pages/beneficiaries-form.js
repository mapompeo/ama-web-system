document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  const form   = document.getElementById('main-form');
  const title  = document.getElementById('page-title');
  const crumb  = document.getElementById('crumb-action');

  if (id) {
    try {
      const b = await api.get(`/beneficiaries/${id}`);
      title.textContent = crumb.textContent = 'Editar Animal';

      document.getElementById('f-name').value             = b.name              || '';
      document.getElementById('f-species').value          = b.species           || 'Cachorro';
      document.getElementById('f-breed').value            = b.breed             || '';
      document.getElementById('f-sex').value              = b.sex               || 'Não identificado';
      document.getElementById('f-size').value             = b.size              || '';
      document.getElementById('f-status').value           = b.status            || 'disponivel';
      document.getElementById('f-responsible').value      = b.responsible_name  || '';
      document.getElementById('f-responsible-phone').value= b.responsible_phone || '';
      document.getElementById('f-notes').value            = b.notes             || '';
      if (b.birth_date) {
        document.getElementById('f-birth-date').value = new Date(b.birth_date).toISOString().split('T')[0];
      }
      // Mostrar foto atual
      if (b.photo_url) {
        const preview = document.getElementById('photo-preview');
        if (preview) { preview.src = b.photo_url; preview.style.display = ''; }
      }
    } catch (err) { showAlert('danger', 'Erro ao carregar: ' + err.message); }
  }

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

      // Upload foto se selecionada
      const photoInput = document.getElementById('f-photo');
      if (photoInput?.files?.length) {
        const fd = new FormData();
        fd.append('photo', photoInput.files[0]);
        const r = await fetch(`/api/beneficiaries/${animalId}/photo`, {
          method: 'POST', body: fd, credentials: 'include'
        });
        if (!r.ok) {
          const body = await r.json().catch(() => ({}));
          throw new Error(body.error || `Falha no upload (HTTP ${r.status})`);
        }
      }

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
