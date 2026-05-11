/* ============================================================
   tenant-overview.js — HomeSync Tenant Overview
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

// Greet with current time
(function setGreeting() {
  const greetEl = document.querySelector('.topbar p');
  if (!greetEl) return;
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
  else if (hour >= 18) greeting = 'Good evening';
  greetEl.textContent = greeting + ', Marco 👋';
})();
