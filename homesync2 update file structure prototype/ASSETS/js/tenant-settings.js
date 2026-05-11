/* ============================================================
   tenant-settings.js — HomeSync Tenant Settings
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

// Tab navigation
(function initTabs() {
  const menuItems = document.querySelectorAll('.sm-item');
  const panels = document.querySelectorAll('.settings-panel');

  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      menuItems.forEach(m => m.classList.remove('active'));
      this.classList.add('active');
      panels.forEach(p => p.classList.remove('tab-default'));
      const panel = document.querySelector(target);
      if (panel) {
        panels.forEach(p => p.style.display = 'none');
        panel.style.display = 'block';
      }
    });
  });

  // Init: show first panel
  panels.forEach((p, i) => { p.style.display = i === 0 ? 'block' : 'none'; });
  if (menuItems[0]) menuItems[0].classList.add('active');
})();

// Save profile
(function initSaveProfile() {
  const saveBtn = document.querySelector('#tab-profile .btn-green');
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      showToast('✅ Profile updated successfully!', 'success');
    });
  }
})();

// Update password
(function initUpdatePassword() {
  const pwBtn = document.querySelector('#tab-security .btn-green');
  if (pwBtn) {
    pwBtn.addEventListener('click', function() {
      const inputs = document.querySelectorAll('#tab-security input[type="password"]');
      const vals = Array.from(inputs).map(i => i.value);
      if (!vals[0]) { showToast('⚠️ Please enter your current password.', 'error'); return; }
      if (!vals[1] || vals[1].length < 8) { showToast('⚠️ New password must be at least 8 characters.', 'error'); return; }
      if (vals[1] !== vals[2]) { showToast('⚠️ Passwords do not match.', 'error'); return; }
      showToast('🔒 Password updated successfully!', 'success');
      inputs.forEach(i => i.value = '');
    });
  }
})();

// Delete account confirmation
(function initDeleteAccount() {
  const delBtn = document.querySelector('.btn-red');
  if (delBtn) {
    delBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        showToast('Account deletion request submitted.', 'error');
      }
    });
  }
})();
