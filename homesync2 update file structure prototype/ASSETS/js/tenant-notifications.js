/* ============================================================
   tenant-notifications.js — HomeSync Tenant Notifications
   ============================================================ */

(function initNotifications() {
  // Mark unread as read on click
  document.querySelectorAll('.notif.unread').forEach(function(notif) {
    notif.addEventListener('click', function() {
      this.classList.remove('unread');
      const badge = this.querySelector('.badge.b-blue');
      if (badge) badge.style.display = 'none';
      // Update sidebar badge count
      const sbBadge = document.querySelector('.sb-item.active .sb-badge');
      if (sbBadge) {
        let count = parseInt(sbBadge.textContent) - 1;
        sbBadge.textContent = count;
        if (count <= 0) sbBadge.style.display = 'none';
      }
    });
  });
})();

function showToast(msg, type = '') {
  const wrap = document.getElementById('toast-wrap');
  if (!wrap) return;
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
