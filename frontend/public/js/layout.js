/* Injeta sidebar + checa auth em todas as páginas protegidas */
(async function () {
  if (window.location.pathname === '/login.html' || window.location.pathname === '/login' || window.location.pathname === '/') return;

  let user;
  try {
    const data = await fetch('/api/auth/me', { credentials: 'include' }).then(r => {
      if (!r.ok) throw new Error();
      return r.json();
    });
    user = data.user;
  } catch {
    window.location.href = '/login';
    return;
  }

  const p = window.location.pathname;
  const active = (...keywords) => keywords.some(k => p.includes(k)) ? 'active' : '';

  const html = `
    <!-- Navbar mobile -->
    <nav class="navbar d-lg-none fixed-top px-3" style="background:var(--sidebar-bg);height:56px;z-index:400">
      <a class="navbar-brand d-flex align-items-center gap-2 text-white text-decoration-none" href="/dashboard">
        <img src="/images/logo.svg" alt="AMA ONG" class="navbar-brand-logo" />
        <span style="font-size:.9rem;font-weight:700">AMA ONG</span>
      </a>
      <div class="d-flex align-items-center gap-2">
        <button id="themeToggleMobile" class="sidebar-theme border-0 bg-transparent p-1" title="Alternar tema">
          <i id="themeIconMobile" class="bi bi-moon" style="font-size:1.1rem"></i>
        </button>
        <button class="navbar-toggler border-0 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
          <i class="bi bi-list fs-4"></i>
        </button>
      </div>
    </nav>

    <!-- Offcanvas mobile -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu" style="width:var(--sidebar-w)">
      <div class="offcanvas-header" style="border-bottom:1px solid rgba(255,255,255,.06)">
        <div class="sidebar-brand p-0 border-0">
          <img src="/images/logo.svg" alt="AMA ONG" class="sidebar-logo" />
          <div><div class="sidebar-brand-text">AMA ONG</div><div class="sidebar-brand-sub">Palmira Gobbi</div></div>
        </div>
        <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column p-0" style="background:var(--sidebar-bg)">
        <div class="sidebar-section flex-grow-1">
          <span class="sidebar-section-label">Menu</span>
          <ul class="nav flex-column">
            <li><a href="/dashboard"    class="nav-link ${active('dashboard')}"><i class="bi bi-speedometer2"></i><span class="nav-text">Dashboard</span></a></li>
            <li><a href="/animais"      class="nav-link ${active('animai')}"><i class="bi bi-hearts"></i><span class="nav-text">Animais</span></a></li>
            <li><a href="/atividades"   class="nav-link ${active('atividad')}"><i class="bi bi-calendar-event"></i><span class="nav-text">Atividades</span></a></li>
          </ul>
        </div>
        <div class="sidebar-footer">
          <div class="sidebar-avatar"><i class="bi bi-person-fill"></i></div>
          <span class="sidebar-user-name">${user.name}</span>
          <button onclick="doLogout()" class="sidebar-logout border-0 bg-transparent" title="Sair"><i class="bi bi-box-arrow-right"></i></button>
        </div>
      </div>
    </div>

    <!-- Sidebar desktop -->
    <nav id="sidebar" class="d-none d-lg-flex">
      <a href="/dashboard" class="sidebar-brand">
        <img src="/images/logo.svg" alt="AMA ONG" class="sidebar-logo" />
        <div><div class="sidebar-brand-text">AMA ONG</div><div class="sidebar-brand-sub">Palmira Gobbi</div></div>
        <button class="sidebar-pin" id="sidebarPin" type="button" title="Fixar menu">
          <i class="bi bi-chevron-right" id="sidebarPinIcon"></i>
        </button>
      </a>
      <div class="sidebar-section">
        <span class="sidebar-section-label">Menu</span>
        <ul class="nav flex-column">
          <li><a href="/dashboard"   class="nav-link ${active('dashboard')}" title="Dashboard"><i class="bi bi-speedometer2"></i><span class="nav-text">Dashboard</span></a></li>
          <li><a href="/animais"     class="nav-link ${active('animai')}" title="Animais"><i class="bi bi-hearts"></i><span class="nav-text">Animais</span></a></li>
          <li><a href="/atividades"  class="nav-link ${active('atividad')}" title="Atividades"><i class="bi bi-calendar-event"></i><span class="nav-text">Atividades</span></a></li>
        </ul>
      </div>
      <div class="sidebar-footer">
        <div class="sidebar-avatar"><i class="bi bi-person-fill"></i></div>
        <span class="sidebar-user-name">${user.name}</span>
        <button id="themeToggle" class="sidebar-theme border-0 bg-transparent" title="Alternar tema"><i id="themeIcon" class="bi bi-moon"></i></button>
        <button onclick="doLogout()" class="sidebar-logout border-0 bg-transparent" title="Sair"><i class="bi bi-box-arrow-right"></i></button>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', html);

  // ── Sidebar pin ──────────────────────────────────────────────
  const STORAGE_KEY = 'ama-sidebar-pinned';
  if (localStorage.getItem(STORAGE_KEY) === '1') document.body.classList.add('sidebar-pinned');

  function updatePinIcon() {
    const pinned = document.body.classList.contains('sidebar-pinned');
    const icon = document.getElementById('sidebarPinIcon');
    const btn  = document.getElementById('sidebarPin');
    if (icon) icon.className = pinned ? 'bi bi-chevron-left' : 'bi bi-chevron-right';
    if (btn)  btn.title      = pinned ? 'Desafixar menu' : 'Fixar menu';
  }
  updatePinIcon();

  document.getElementById('sidebarPin')?.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    const pinned = document.body.classList.toggle('sidebar-pinned');
    localStorage.setItem(STORAGE_KEY, pinned ? '1' : '0');
    updatePinIcon();
  });

  // ── Theme toggle ──────────────────────────────────────────────
  syncThemeIcons();

  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
  document.getElementById('themeToggleMobile')?.addEventListener('click', toggleTheme);
})();

// ── Funções globais ───────────────────────────────────────────────

async function doLogout() {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  window.location.href = '/login';
}

function applyTheme(theme) {
  // Adiciona classe de transição apenas durante a troca
  document.documentElement.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ama-theme', theme);
  syncThemeIcons();
  setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 300);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function syncThemeIcons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const cls = isDark ? 'bi bi-sun' : 'bi bi-moon';
  const desktopIcon = document.getElementById('themeIcon');
  const mobileIcon  = document.getElementById('themeIconMobile');
  if (desktopIcon) desktopIcon.className = cls;
  if (mobileIcon)  mobileIcon.className  = cls + ' ';
}
