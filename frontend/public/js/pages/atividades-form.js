document.addEventListener('DOMContentLoaded', async () => {
  const match = window.location.pathname.match(/\/atividades\/(\d+)/);
  const id     = match ? match[1] : null;
  const form     = document.getElementById('main-form');
  const title    = document.getElementById('page-title');
  const crumb    = document.getElementById('crumb-action');
  const locInput = document.getElementById('f-location');
  const mapsBtn  = document.getElementById('maps-btn');
  let selectedCoords = null;

  function updateMapsBtn() {
    const v = locInput.value.trim();
    mapsBtn.style.display = v ? '' : 'none';
    mapsBtn.href = selectedCoords
      ? `https://www.google.com/maps/search/?api=1&query=${selectedCoords.lat},${selectedCoords.lon}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`;
  }

  // ── Autocomplete (Nominatim / OpenStreetMap) ──────────────────
  const inputGroup = locInput.closest('.input-group');
  const suggestions = document.createElement('ul');
  suggestions.className = 'location-suggestions';
  inputGroup.appendChild(suggestions);

  function hideSuggestions() { suggestions.innerHTML = ''; suggestions.hidden = true; }
  hideSuggestions();

  let acTimer;
  locInput.addEventListener('input', () => {
    selectedCoords = null;
    updateMapsBtn();
    clearTimeout(acTimer);
    const q = locInput.value.trim();
    if (q.length < 3) { hideSuggestions(); return; }

    acTimer = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&addressdetails=1&countrycodes=br&accept-language=pt-BR`;
        const data = await (await fetch(url, { headers: { 'Accept-Language': 'pt-BR' } })).json();
        if (!data.length) { hideSuggestions(); return; }

        suggestions.innerHTML = '';
        data.forEach(place => {
          const parts  = place.display_name.split(',');
          const name   = parts[0].trim();
          const detail = parts.slice(1, 3).join(',').trim();
          const li = document.createElement('li');
          li.innerHTML = `<strong>${name}</strong>${detail ? `<span>${detail}</span>` : ''}`;
          li.addEventListener('mousedown', e => {
            e.preventDefault();
            locInput.value = name;
            selectedCoords = { lat: place.lat, lon: place.lon };
            updateMapsBtn();
            hideSuggestions();
          });
          suggestions.appendChild(li);
        });
        suggestions.hidden = false;
      } catch { hideSuggestions(); }
    }, 380);
  });

  locInput.addEventListener('blur', () => setTimeout(hideSuggestions, 150));

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
      window.location.href = '/atividades';
    } catch (err) {
      showAlert('danger', 'Erro ao salvar: ' + err.message);
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Salvar';
    }
  });
});
