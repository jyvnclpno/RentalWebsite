function showToast(msg, type) {
  var wrap = document.getElementById('toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t); }, 3500);
}

function showTab(id) {
  document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.sm-item').forEach(function(m) { m.classList.remove('active'); });
  document.getElementById('tab-' + id).classList.add('active');
  event.target.classList.add('active');
}

function saveProfile() {
  var fn = document.getElementById('fn').value.trim();
  var ln = document.getElementById('ln').value.trim();
  if (!fn || !ln) { showToast('Please fill in your name.', 'error'); return; }
  showToast('Profile updated successfully!', 'success');
}

function saveNotifs() {
  showToast('Notification preferences saved!', 'success');
}

function changePassword() {
  var old = document.getElementById('pw-old').value;
  var nw = document.getElementById('pw-new').value;
  var conf = document.getElementById('pw-confirm').value;
  if (!old) { showToast('Please enter your current password.', 'error'); return; }
  if (nw.length < 8) { showToast('New password must be at least 8 characters.', 'error'); return; }
  if (nw !== conf) { showToast('Passwords do not match.', 'error'); return; }
  document.getElementById('pw-old').value = '';
  document.getElementById('pw-new').value = '';
  document.getElementById('pw-confirm').value = '';
  showToast('Password updated successfully!', 'success');
}

function confirmDelete() {
  if (confirm('Are you sure you want to permanently delete your account? This cannot be undone.')) {
    showToast('Account deletion requested. You will be logged out.', 'error');
    setTimeout(function() { window.location.href = '../index.html'; }, 2500);
  }
}