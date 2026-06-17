document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  const form      = document.getElementById('main-form');
  const title     = document.getElementById('page-title');
  const crumb     = document.getElementById('crumb-action');
  const addrInput = document.getElementById('f-address');
  const mapsBtn   = document.getElementById('maps-btn');

  function updateMapsBtn() {
    const v = addrInput.value.trim();
    mapsBtn.style.display = v ? '' : 'none';
    mapsBtn.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(v);
  }

  if (id) {
    try {
      const v = await api.get(`/volunteers/${id}`);
      title.textContent = crumb.textContent = 'Editar Voluntário';
      document.getElementById('f-name').value    = v.name    || '';
      document.getElementById('f-email').value   = v.email   || '';
      document.getElementById('f-phone').value   = v.phone   || '';
      document.getElementById('f-cpf').value     = v.cpf     || '';
      document.getElementById('f-address').value = v.address || '';
      document.getElementById('f-status').value  = v.status  || 'ativo';
      if (v.join_date) document.getElementById('f-join-date').value = new Date(v.join_date).toISOString().split('T')[0];
      updateMapsBtn();
    } catch (err) {
      showAlert('danger', 'Erro ao carregar: ' + err.message);
    }
  }

  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = '';

  addrInput.addEventListener('input', updateMapsBtn);

  // Submit
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Salvando...';

    const data = {
      name:       document.getElementById('f-name').value.trim(),
      email:      document.getElementById('f-email').value.trim(),
      phone:      document.getElementById('f-phone').value.trim(),
      cpf:        document.getElementById('f-cpf').value.trim(),
      address:    document.getElementById('f-address').value.trim(),
      join_date:  document.getElementById('f-join-date').value || null,
      status:     document.getElementById('f-status').value,
    };

    try {
      if (id) { await api.put(`/volunteers/${id}`, data); }
      else    { await api.post('/volunteers', data); }
      const msg = id ? 'Voluntário atualizado com sucesso!' : 'Voluntário cadastrado com sucesso!';
      sessionStorage.setItem('pendingToast', JSON.stringify({ type: 'success', msg }));
      window.location.href = '/volunteers';
    } catch (err) {
      showAlert('danger', 'Erro ao salvar: ' + err.message);
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Salvar';
    }
  });

  initMasks();
});
