var activeContact = 'jd';
var conversations = {
  jd: {
    name: 'Juan dela Cruz',
    status: '● Online · Your landlord',
    avatarBg: '#22c55e',
    avatarText: 'JD',
    messages: []
  },
  hs: {
    name: 'HomeSync Support',
    status: '● Away',
    avatarBg: '#4a5568',
    avatarText: 'HS',
    messages: [
      { type:'recv', text:'Your ticket #1031 has been resolved. Is there anything else we can help with?', time:'Mar 15, 10:00 AM' }
    ]
  }
};

function showToast(msg, type) {
  var wrap = document.getElementById('toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t); }, 3000);
}

function getTime() {
  var now = new Date();
  var h = now.getHours(), m = now.getMinutes();
  var ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
}

function switchContact(id) {
  activeContact = id;
  document.querySelectorAll('.chat-contact').forEach(function(c) { c.classList.remove('active'); });
  document.getElementById('contact-' + id).classList.add('active');
  var con = conversations[id];
  document.getElementById('chat-name').textContent = con.name;
  document.getElementById('chat-status').textContent = con.status;
  var avatarEl = document.querySelector('.chat-top .avatar');
  avatarEl.style.background = con.avatarBg;
  avatarEl.textContent = con.avatarText;
  // Render messages for hs
  if (id === 'hs') {
    var msgsEl = document.getElementById('chat-msgs');
    msgsEl.innerHTML = '';
    con.messages.forEach(function(msg) {
      var div = document.createElement('div');
      div.className = 'msg ' + msg.type;
      div.innerHTML = '<div class="avatar" style="width:26px;height:26px;font-size:9px;background:' + con.avatarBg + '">' + con.avatarText + '</div>' +
        '<div><div class="msg-bubble">' + msg.text + '</div><div class="msg-time">' + msg.time + '</div></div>';
      msgsEl.appendChild(div);
    });
  } else {
    // Restore JD messages (original)
    document.getElementById('chat-msgs').innerHTML =
      '<div class="msg sent"><div class="avatar purple" style="width:26px;height:26px;font-size:9px">MR</div><div><div class="msg-bubble">Good morning po! Yung faucet sa kitchen namin ay tumutulo talaga.</div><div class="msg-time" style="text-align:right">9:12 AM</div></div></div>' +
      '<div class="msg recv"><div class="avatar" style="width:26px;height:26px;font-size:9px">JD</div><div><div class="msg-bubble">Good morning Marco! Mag-file ka lang ng maintenance ticket sa app.</div><div class="msg-time">9:15 AM</div></div></div>' +
      '<div class="msg sent"><div class="avatar purple" style="width:26px;height:26px;font-size:9px">MR</div><div><div class="msg-bubble">Na-submit na po! Salamat po!</div><div class="msg-time" style="text-align:right">9:18 AM</div></div></div>' +
      '<div class="msg recv"><div class="avatar" style="width:26px;height:26px;font-size:9px">JD</div><div><div class="msg-bubble">Papuntahin namin ang plumber around 2 PM.</div><div class="msg-time">9:21 AM</div></div></div>';
  }
  // Remove unread dot
  var dot = document.getElementById(id + '-dot');
  if (dot) dot.style.display = 'none';
  scrollToBottom();
}

function sendMessage() {
  var input = document.getElementById('msg-input');
  var text = input.value.trim();
  if (!text) return;
  var msgsEl = document.getElementById('chat-msgs');
  var time = getTime();
  var div = document.createElement('div');
  div.className = 'msg sent';
  div.innerHTML = '<div class="avatar purple" style="width:26px;height:26px;font-size:9px">MR</div>' +
    '<div><div class="msg-bubble">' + escHtml(text) + '</div><div class="msg-time" style="text-align:right">' + time + '</div></div>';
  msgsEl.appendChild(div);
  // Update preview
  var prev = document.getElementById(activeContact + '-preview');
  if (prev) prev.textContent = text.length > 30 ? text.slice(0,30)+'…' : text;
  input.value = '';
  scrollToBottom();
  // Auto-reply after delay
  if (activeContact === 'jd') {
    setTimeout(function() {
      var replies = ['Got it! Thank you for letting me know.','Ok, I\'ll take care of that.','Noted, Marco. I\'ll follow up ASAP.'];
      var reply = replies[Math.floor(Math.random()*replies.length)];
      var d = document.createElement('div');
      d.className = 'msg recv';
      d.innerHTML = '<div class="avatar" style="width:26px;height:26px;font-size:9px">JD</div>' +
        '<div><div class="msg-bubble">' + reply + '</div><div class="msg-time">' + getTime() + '</div></div>';
      msgsEl.appendChild(d);
      scrollToBottom();
    }, 1500);
  }
}

function scrollToBottom() {
  var msgs = document.getElementById('chat-msgs');
  msgs.scrollTop = msgs.scrollHeight;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

scrollToBottom();