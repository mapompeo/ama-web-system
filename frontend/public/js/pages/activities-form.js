document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  const form     = document.getElementById('main-form');
  const title    = document.getElementById('page-title');
  const crumb    = document.getElementById('crumb-action');
  const locInput = document.getElementById('f-location');
  const mapsBtn  = document.getElementById('maps-btn');

  function updateMapsBtn() {
    const v = locInput.value.trim();
    mapsBtn.style.display = v ? '' : 'none';
    mapsBtn.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(v + ', Blumenau, SC');
  }

  if (id) {
    try {
      const a = await api.get(`/activities/${id}`);
      title.textContent = crumb.textContent = 'Editar Atividade';
      document.getElementById('f-title').value    = a.title       || '';
      document.getElementById('f-desc').value     = a.description || '';
      document.getElementById('f-location').value = a.location    || '';
      document.getElementById('f-status').value   = a.status      || 'agendada';
      if (a.activity_date) document.getElementById('f-date').value = new Date(a.activity_date).toISOString().split('T')[0];
      updateMapsBtn();
    } catch (err) { showAlert('danger', 'Erro ao carregar: ' + err.message); }
  }

  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = '';

  locInput.addEventListener('input', updateMapsBtn);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Salvando...';

    const data = {
      title:         document.getElementById('f-title').value.trim(),
      description:   document.getElementById('f-desc').value.trim(),
      activity_date: document.getElementById('f-date').value,
      location:      document.getElementById('f-location').value.trim(),
      status:        document.getElementById('f-status').value,
    };

    try {
      if (id) { await api.put(`/activities/${id}`, data); }
      else    { await api.post('/activities', data); }
      const msg = id ? 'Atividade atualizada com sucesso!' : 'Atividade cadastrada com sucesso!';
      sessionStorage.setItem('pendingToast', JSON.stringify({ type: 'success', msg }));
      window.location.href = '/activities';
    } catch (err) {
      showAlert('danger', 'Erro ao salvar: ' + err.message);
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Salvar';
    }
  });
});
