const api = {
  async request(method, endpoint, data) {
    const opts = { method, credentials: 'include', headers: {} };
    if (data) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(data);
    }
    const res = await fetch('/api' + endpoint, opts);
    if (res.status === 401) { window.location.href = '/login.html'; return; }
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || 'Erro desconhecido');
    return json;
  },
  get:    (ep)       => api.request('GET',    ep),
  post:   (ep, data) => api.request('POST',   ep, data),
  put:    (ep, data) => api.request('PUT',    ep, data),
  delete: (ep)       => api.request('DELETE', ep),
};
