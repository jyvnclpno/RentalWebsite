/* ============================================================
   tenant-lease.js — HomeSync Tenant Lease
   ============================================================ */

function showToast(msg, type = '') {
  const wrap = document.getElementById('toast-wrap');
  if (!wrap) return;
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

(function initLease() {
  // Download lease button
  const dlBtn = document.querySelector('.btn-outline-green');
  if (dlBtn && dlBtn.textContent.includes('Download')) {
    dlBtn.addEventListener('click', function() {
      showToast('📄 Lease Agreement download started.', 'success');
    });
  }
})();
