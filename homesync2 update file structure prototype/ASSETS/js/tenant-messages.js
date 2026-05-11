/* ============================================================
   tenant-messages.js — HomeSync Tenant Messages
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

(function initChat() {
  const input = document.querySelector('.chat-input input');
  const sendBtn = document.querySelector('.chat-input .btn-green');
  const msgs = document.querySelector('.chat-msgs');

  if (!input || !sendBtn || !msgs) return;

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Add sent message
    const now = new Date();
    const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg sent';
    msgDiv.innerHTML = `
      <div class="avatar purple" style="width:26px;height:26px;font-size:9px">MR</div>
      <div>
        <div class="msg-bubble">${escapeHtml(text)}</div>
        <div class="msg-time" style="text-align:right">${time}</div>
      </div>`;
    msgs.appendChild(msgDiv);
    msgs.scrollTop = msgs.scrollHeight;
    input.value = '';
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
})();

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
