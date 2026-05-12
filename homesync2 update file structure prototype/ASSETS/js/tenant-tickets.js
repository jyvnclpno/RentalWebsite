var ticketCounter = 1043;
var openTickets = 1;

function showToast(msg, type) {
  var wrap = document.getElementById('toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t); }, 3500);
}

function photoSelected(input) {
  if (input.files && input.files[0]) {
    document.getElementById('photo-preview').style.display = 'block';
    document.getElementById('photo-preview').textContent = '📷 ' + input.files[0].name + ' attached';
  }
}

function submitTicket() {
  var title = document.getElementById('ticket-title').value.trim();
  var desc = document.getElementById('ticket-desc').value.trim();
  if (!title) { showToast('Please enter an issue title.', 'error'); return; }
  if (!desc) { showToast('Please describe the problem.', 'error'); return; }
  var cat = document.getElementById('ticket-category').value;
  var pri = document.getElementById('ticket-priority').value;
  var priColors = { Low: 'b-gray', Medium: 'b-orange', High: 'b-red', Urgent: 'b-red' };
  var now = new Date();
  var dateStr = now.toLocaleDateString('en-PH',{month:'short',day:'numeric'});
  var tbody = document.getElementById('tickets-body');
  var row = document.createElement('tr');
  row.innerHTML = '<td style="color:#64748b">#' + ticketCounter + '</td>' +
    '<td><strong style="color:white">' + escHtml(title) + '</strong></td>' +
    '<td>' + cat + '</td>' +
    '<td><span class="badge ' + (priColors[pri]||'b-gray') + '">' + pri + '</span></td>' +
    '<td>' + dateStr + '</td>' +
    '<td><span class="badge b-blue">New</span></td>';
  tbody.insertBefore(row, tbody.firstChild);
  ticketCounter++;
  openTickets++;
  document.getElementById('open-count').textContent = openTickets;
  // Clear form
  document.getElementById('ticket-title').value = '';
  document.getElementById('ticket-desc').value = '';
  document.getElementById('ticket-photo').value = '';
  document.getElementById('photo-preview').style.display = 'none';
  showToast('Ticket #' + (ticketCounter-1) + ' submitted successfully!', 'success');
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}