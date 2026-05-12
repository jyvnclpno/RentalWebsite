
function showToast(msg, type) {
  var wrap = document.getElementById('toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t); }, 3000);
}
function downloadLease() {
  showToast('Downloading: Lease Agreement — Marco Reyes (Unit 3A).pdf', 'success');
}