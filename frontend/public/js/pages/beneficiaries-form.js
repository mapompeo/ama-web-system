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
      const b = await api.get(`/beneficiaries/${id}`);
      title.textContent = crumb.textContent = 'Editar Atendido';
      document.getElementById('f-name').value             = b.name             || '';
      document.getElementById('f-cpf').value              = b.cpf              || '';
      document.getElementById('f-phone').value            = b.phone            || '';
      document.getElementById('f-address').value          = b.address          || '';
      document.getElementById('f-responsible').value      = b.responsible_name || '';
      document.getElementById('f-status').value           = b.status           || 'ativo';
      if (b.birth_date) document.getElementById('f-birth-date').value = new Date(b.birth_date).toISOString().split('T')[0];
      updateMapsBtn();
    } catch (err) { showAlert('danger', 'Erro ao carregar: ' + err.message); }
  }

  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = '';

  addrInput.addEventListener('input', updateMapsBtn);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Salvando...';

    const data = {
      name:             document.getElementById('f-name').value.trim(),
      cpf:              document.getElementById('f-cpf').value.trim(),
      phone:            document.getElementById('f-phone').value.trim(),
      address:          document.getElementById('f-address').value.trim(),
      responsible_name: document.getElementById('f-responsible').value.trim(),
      birth_date:       document.getElementById('f-birth-date').value || null,
      status:           document.getElementById('f-status').value,
    };

    try {
      if (id) { await api.put(`/beneficiaries/${id}`, data); }
      else    { await api.post('/beneficiaries', data); }
      window.location.href = '/beneficiaries';
    } catch (err) {
      showAlert('danger', 'Erro ao salvar: ' + err.message);
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Salvar';
    }
  });

  initMasks();
});
