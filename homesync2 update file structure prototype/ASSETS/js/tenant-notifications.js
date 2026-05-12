var unreadCount = 3;

function showToast(msg, type) {
  var wrap = document.getElementById('toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t); }, 3000);
}

function updateBadge() {
  var badge = document.getElementById('unread-badge');
  if (unreadCount <= 0) {
    badge.textContent = 'All read';
    badge.className = 'badge b-gray';
  } else {
    badge.textContent = unreadCount + ' unread';
    badge.className = 'badge b-blue';
  }
}

function markRead(el) {
  if (el.classList.contains('unread')) {
    el.classList.remove('unread');
    el.style.borderLeft = 'none';
    var newBadge = el.querySelector('.badge.b-blue');
    if (newBadge) newBadge.remove();
    unreadCount = Math.max(0, unreadCount - 1);
    updateBadge();
  }
}

function markAllRead() {
  document.querySelectorAll('.notif.unread').forEach(function(n) {
    n.classList.remove('unread');
    n.style.borderLeft = 'none';
    var nb = n.querySelector('.badge.b-blue');
    if (nb) nb.remove();
  });
  unreadCount = 0;
  updateBadge();
  showToast('All notifications marked as read.', 'success');
}