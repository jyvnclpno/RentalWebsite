/* ============================================================
   tenant-tickets.js — HomeSync Tenant Tickets
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

// Submit new ticket
(function initTicketForm() {
  const btn = document.querySelector('.btn-green[style*="Submit"]') || 
    Array.from(document.querySelectorAll('.btn-green')).find(b => b.textContent.includes('Submit'));
  if (!btn) return;

  btn.addEventListener('click', function () {
    const titleInput = document.querySelector('.form-group input[type="text"]');
    const descInput = document.querySelector('textarea');
    const categorySelect = document.querySelectorAll('select')[0];
    const prioritySelect = document.querySelectorAll('select')[1];
    const fileInput = document.getElementById('ticket-photo');
    const tableBody = document.querySelector('tbody');

    if (!titleInput || !titleInput.value.trim()) {
      showToast('⚠️ Please enter an issue title.', 'error');
      return;
    }
    if (!descInput || !descInput.value.trim()) {
      showToast('⚠️ Please describe the issue.', 'error');
      return;
    }

    // Logic to handle image preview
    let imgHtml = '';
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const imgUrl = URL.createObjectURL(fileInput.files[0]);
      imgHtml = `<img src="${imgUrl}" style="width:30px; height:30px; border-radius:4px; object-fit:cover; margin-right:8px; vertical-align:middle;">`;
    }

    // Create unique ID and current date
    const newId = Math.floor(1000 + Math.random() * 9000);
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Create new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td style="color:#64748b">#${newId}</td>
      <td>
        ${imgHtml}
        <strong style="color:white">${titleInput.value}</strong>
      </td>
      <td>${categorySelect.value}</td>
      <td><span class="badge b-gray">${prioritySelect.value}</span></td>
      <td>${date}</td>
      <td><span class="badge b-yellow">Pending</span></td>
    `;

    // Add to top of table
    if (tableBody) {
      tableBody.insertBefore(newRow, tableBody.firstChild);
    }

    showToast('🔧 Ticket submitted! We\'ll review it shortly.', 'success');
    
    // Reset fields
    titleInput.value = '';
    descInput.value = '';
    if(fileInput) fileInput.value = '';
  });
})();
