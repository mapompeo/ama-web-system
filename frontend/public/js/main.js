document.addEventListener('DOMContentLoaded', () => {
  // Validação Bootstrap nos formulários
  document.querySelectorAll('.needs-validation').forEach(form => {
    form.addEventListener('submit', function (e) {
      if (!this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        const btn = this.querySelector('[type="submit"]');
        if (btn) {
          btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status"></span>Salvando...';
          btn.disabled = true;
        }
      }
      this.classList.add('was-validated');
    });
  });
});
