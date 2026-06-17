document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { stats, recentActivities, monthlyChart, chartYear, upcomingActivities, activityStatus } =
      await api.get('/dashboard/stats');

    // ── Stat cards ────────────────────────────────────────────────
    document.getElementById('stat-volunteers').textContent    = stats.volunteers;
    document.getElementById('stat-beneficiaries').textContent = stats.beneficiaries;
    document.getElementById('stat-upcoming').textContent      = stats.upcoming;
    document.getElementById('stat-total').textContent         = monthlyChart.reduce((a, b) => a + b, 0);
    document.getElementById('chart-year').textContent         = chartYear;
    document.getElementById('chart-year-label').textContent   = chartYear;

    // ── Gráfico mensal ────────────────────────────────────────────
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor  = isDark ? 'rgba(255,255,255,.06)' : '#f1f5f9';
    const tickColor  = isDark ? '#484f58' : '#94a3b8';

    new Chart(document.getElementById('activityChart'), {
      type: 'bar',
      data: {
        labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        datasets: [{
          label: 'Atividades',
          data: monthlyChart,
          backgroundColor: isDark ? 'rgba(22,163,74,.2)' : 'rgba(22,163,74,.15)',
          borderColor: 'rgba(22,163,74,.9)',
          borderWidth: 2, borderRadius: 6, borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1, color: tickColor, font: { size: 11 } }, grid: { color: gridColor }, border: { display: false } },
          x: { ticks: { color: tickColor, font: { size: 11 } }, grid: { display: false }, border: { display: false } }
        }
      }
    });

    // ── Atividades recentes ───────────────────────────────────────
    const recentList = document.getElementById('recent-list');
    if (!recentActivities.length) {
      recentList.innerHTML = '<li class="list-group-item text-muted p-4" style="font-size:.85rem">Nenhuma atividade cadastrada.</li>';
    } else {
      recentList.innerHTML = recentActivities.map(a => {
        const badge = a.status === 'realizada' ? 'bg-success' : a.status === 'cancelada' ? 'bg-danger' : 'bg-warning text-dark';
        const date  = new Date(a.activity_date).toLocaleDateString('pt-BR');
        return `<li class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center">
          <div style="min-width:0">
            <div class="fw-semibold text-truncate" style="font-size:.85rem;max-width:200px;color:var(--text-body)">${a.title}</div>
            <div class="d-flex align-items-center gap-1" style="font-size:.75rem;color:var(--text-muted)">
              <i class="bi bi-calendar3"></i>${date}
              ${a.location ? `&nbsp;·&nbsp;<i class="bi bi-geo-alt"></i>${a.location}` : ''}
            </div>
          </div>
          <span class="badge ms-2 flex-shrink-0 ${badge}">${a.status}</span>
        </li>`;
      }).join('');
    }

    // ── Próximas atividades ───────────────────────────────────────
    const upcomingList = document.getElementById('upcoming-list');
    if (!upcomingActivities.length) {
      upcomingList.innerHTML = `<li class="list-group-item p-4 text-center" style="font-size:.85rem;color:var(--text-muted)">
        <i class="bi bi-calendar-x d-block mb-2" style="font-size:1.8rem;opacity:.3"></i>
        Nenhuma atividade agendada
      </li>`;
    } else {
      upcomingList.innerHTML = upcomingActivities.map(a => {
        const date    = new Date(a.activity_date);
        const today   = new Date(); today.setHours(0,0,0,0);
        const diff    = Math.round((date - today) / 86400000);
        const dayLabel = diff === 0 ? '<span class="badge bg-success">Hoje</span>'
                       : diff === 1 ? '<span class="badge bg-primary">Amanhã</span>'
                       : `<span class="badge bg-secondary bg-opacity-25" style="color:var(--text-muted)">Em ${diff} dias</span>`;
        const dateStr = date.toLocaleDateString('pt-BR', { day:'2-digit', month:'short' });
        return `<li class="list-group-item border-0 px-4 py-3 d-flex align-items-center gap-3">
          <div style="text-align:center;min-width:42px">
            <div style="font-size:1.2rem;font-weight:700;line-height:1;color:var(--primary)">${date.getDate()}</div>
            <div style="font-size:.65rem;text-transform:uppercase;color:var(--text-muted);letter-spacing:.06em">${date.toLocaleDateString('pt-BR',{month:'short'}).replace('.','')}</div>
          </div>
          <div style="flex:1;min-width:0">
            <div class="fw-semibold text-truncate" style="font-size:.85rem;color:var(--text-body)">${a.title}</div>
            <div style="font-size:.75rem;color:var(--text-muted)">${a.location || 'Local não definido'}</div>
          </div>
          <div class="flex-shrink-0">${dayLabel}</div>
        </li>`;
      }).join('');
    }

    // ── Distribuição de status ────────────────────────────────────
    const statusEl  = document.getElementById('status-breakdown');
    const totalAct  = (activityStatus.agendada || 0) + (activityStatus.realizada || 0) + (activityStatus.cancelada || 0);
    const statusCfg = [
      { key: 'realizada', label: 'Realizada', color: '#16a34a' },
      { key: 'agendada',  label: 'Agendada',  color: '#d97706' },
      { key: 'cancelada', label: 'Cancelada', color: '#ef4444' },
    ];
    statusEl.innerHTML = statusCfg.map(s => {
      const count = activityStatus[s.key] || 0;
      const pct   = totalAct > 0 ? Math.round(count / totalAct * 100) : 0;
      return `<div class="status-bar-row">
        <span class="sb-label">${s.label}</span>
        <div class="sb-track"><div class="sb-fill" style="width:${pct}%;background:${s.color}"></div></div>
        <span class="sb-count">${count}</span>
      </div>`;
    }).join('');

    // ── Revelar conteúdo ──────────────────────────────────────────
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = '';

  } catch (err) {
    document.getElementById('loading').innerHTML =
      `<div class="text-center p-5"><i class="bi bi-exclamation-circle text-danger d-block mb-2" style="font-size:2rem"></i><p style="color:var(--text-muted)">Erro ao carregar dashboard: ${err.message}</p></div>`;
  }
});
