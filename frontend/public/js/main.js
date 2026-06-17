/* Máscaras, validação e helpers globais */

function maskCPF(v) {
  v = v.replace(/\D/g, '').slice(0, 11);
  if (v.length > 9) return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  if (v.length > 6) return v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  if (v.length > 3) return v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  return v;
}

function maskPhone(v) {
  v = v.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  if (v.length > 6)  return v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
  if (v.length > 2)  return v.replace(/(\d{2})(\d*)/, '($1) $2');
  return v;
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += parseInt(cpf[i]) * (10 - i);
  let r = (s * 10) % 11; if (r === 10 || r === 11) r = 0;
  if (r !== parseInt(cpf[9])) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += parseInt(cpf[i]) * (11 - i);
  r = (s * 10) % 11; if (r === 10 || r === 11) r = 0;
  return r === parseInt(cpf[10]);
}

function initMasks() {
  document.querySelectorAll('[data-mask="cpf"]').forEach(el => {
    el.placeholder = '000.000.000-00';
    el.maxLength = 14;
    el.addEventListener('input', () => {
      const pos = el.selectionStart, prev = el.value;
      el.value = maskCPF(el.value);
      const diff = el.value.length - prev.length;
      el.setSelectionRange(pos + diff, pos + diff);
    });
    el.addEventListener('blur', () => {
      if (el.value) el.setCustomValidity(validarCPF(el.value) ? '' : 'CPF inválido');
    });
    el.addEventListener('input', () => el.setCustomValidity(''));
  });

  document.querySelectorAll('[data-mask="phone"]').forEach(el => {
    el.placeholder = '(47) 99999-9999';
    el.maxLength = 15;
    el.addEventListener('input', () => {
      const pos = el.selectionStart, prev = el.value;
      el.value = maskPhone(el.value);
      const diff = el.value.length - prev.length;
      el.setSelectionRange(pos + diff, pos + diff);
    });
    el.addEventListener('blur', () => {
      if (el.value && el.value.replace(/\D/g, '').length < 10)
        el.setCustomValidity('Número de telefone inválido');
    });
    el.addEventListener('input', () => el.setCustomValidity(''));
  });
}

function showAlert(type, message) {
  const container = document.getElementById('alert-container');
  if (!container) return;
  const id = 'alert-' + Date.now();
  container.insertAdjacentHTML('beforeend', `
    <div id="${id}" class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`);
  setTimeout(() => document.getElementById(id)?.remove(), 5000);
}

function showToast(type, message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }
  const icons = { success: 'check-circle-fill', danger: 'x-circle-fill', warning: 'exclamation-triangle-fill', info: 'info-circle-fill' };
  const id   = 'toast-' + Date.now();
  const icon = icons[type] || 'info-circle-fill';
  container.insertAdjacentHTML('beforeend', `
    <div id="${id}" class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi bi-${icon}"></i>${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`);
  const el = document.getElementById(id);
  bootstrap.Toast.getOrCreateInstance(el).show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}

function checkPendingToast() {
  const raw = sessionStorage.getItem('pendingToast');
  if (!raw) return;
  sessionStorage.removeItem('pendingToast');
  try {
    const { type, msg } = JSON.parse(raw);
    setTimeout(() => showToast(type, msg), 300);
  } catch {}
}

function exportCSV(headers, rows, filename) {
  const esc   = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [headers.map(esc).join(','), ...rows.map(r => r.map(esc).join(','))];
  const blob  = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url   = URL.createObjectURL(blob);
  const a     = Object.assign(document.createElement('a'), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

function initTableUtils() {
  const searchInput = document.getElementById('tableSearch');
  const tableBody   = document.getElementById('tableBody');
  const paginEl     = document.getElementById('tablePagination');
  const wrapper     = document.querySelector('.table-responsive');
  if (!tableBody) return;

  const allRows = Array.from(tableBody.querySelectorAll('tr'));
  let filtered  = [...allRows];
  let page      = 1;

  function calcPerPage() {
    if (!wrapper) return 8;
    const thead = tableBody.closest('table')?.querySelector('thead');
    const available = wrapper.clientHeight - (thead?.offsetHeight || 45);
    return Math.max(5, Math.floor(available / 53));
  }

  function render() {
    const PER_PAGE = calcPerPage();
    const start = (page - 1) * PER_PAGE;
    allRows.forEach(r => r.style.display = 'none');
    filtered.slice(start, start + PER_PAGE).forEach(r => r.style.display = '');
    renderPagination(PER_PAGE);
  }

  function renderPagination(PER_PAGE) {
    if (!paginEl) return;
    const total = Math.ceil(filtered.length / PER_PAGE);
    paginEl.innerHTML = '';
    const start = filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1;
    const end   = Math.min(page * PER_PAGE, filtered.length);
    const wrap  = document.createElement('div');
    wrap.className = 'd-flex align-items-center justify-content-between px-3 py-2';

    const info = document.createElement('span');
    info.className = 'text-muted'; info.style.fontSize = '.78rem';
    info.textContent = `${start}–${end} de ${filtered.length}`;
    wrap.appendChild(info);

    if (total > 1) {
      const ul = document.createElement('ul');
      ul.className = 'pagination pagination-sm mb-0';
      const mk = (label, p, disabled, active) => {
        const li = document.createElement('li');
        li.className = `page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" data-p="${p}">${label}</a>`;
        return li;
      };
      ul.appendChild(mk('<i class="bi bi-chevron-left"></i>', page - 1, page === 1));
      const d = 2, left = Math.max(1, page - d), right = Math.min(total, page + d);
      if (left > 1) { ul.appendChild(mk('1', 1)); if (left > 2) ul.appendChild(mk('…', page - 3, true)); }
      for (let i = left; i <= right; i++) ul.appendChild(mk(i, i, false, i === page));
      if (right < total) { if (right < total - 1) ul.appendChild(mk('…', page + 3, true)); ul.appendChild(mk(total, total)); }
      ul.appendChild(mk('<i class="bi bi-chevron-right"></i>', page + 1, page === total));
      ul.querySelectorAll('[data-p]').forEach(a => a.addEventListener('click', e => {
        e.preventDefault();
        const p = +a.dataset.p;
        if (p >= 1 && p <= total) { page = p; render(); }
      }));
      wrap.appendChild(ul);
    }
    paginEl.appendChild(wrap);
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      filtered = q ? allRows.filter(r => r.textContent.toLowerCase().includes(q)) : [...allRows];
      page = 1; render();
    });
  }

  window.addEventListener('resize', render);
  render();
}
