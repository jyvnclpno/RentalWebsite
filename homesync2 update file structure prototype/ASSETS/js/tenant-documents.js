function showToast(msg, type) {
  var wrap = document.getElementById('toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t); }, 3000);
}
function downloadDoc(name) {
  showToast('Downloading: ' + name, 'success');
}
function filterDocs(type) {
  var items = document.querySelectorAll('.doc-item');
  items.forEach(function(item) {
    if (type === 'all' || item.getAttribute('data-type') === type) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
  var labels = { all:'Recent files', lease:'Lease Documents', receipt:'Payment Receipts', id:'Submitted IDs' };
  showToast('Showing: ' + (labels[type] || 'All files'));
}