function showToast(msg, type) {
  var wrap = document.getElementById('toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t); }, 3000);
}
// Clickable table rows
document.querySelectorAll('table tr').forEach(function(row) {
  row.style.cursor = 'pointer';
  row.addEventListener('mouseenter', function() {
    row.querySelectorAll('td').forEach(function(td){ td.style.background='#3d4a56'; });
  });
  row.addEventListener('mouseleave', function() {
    row.querySelectorAll('td').forEach(function(td){ td.style.background=''; });
  });
});