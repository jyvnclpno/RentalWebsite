/* =============================================
   HOMESYNC — SHARED JAVASCRIPT (FIXED)
   ============================================= */

/* --- USERS STORE (localStorage, simulated backend) --- */
var HS = {
  USERS_KEY: 'hs_users',
  SESSION_KEY: 'hs_session',

  defaultUsers: [
    { id: 1, name: 'Marco Reyes',    email: 'tenant@homesync.ph',   password: 'tenant123',   role: 'tenant',   unit: 'Unit 3A', initials: 'MR' },
    { id: 2, name: 'Juan dela Cruz', email: 'landlord@homesync.ph', password: 'landlord123', role: 'landlord', initials: 'JD' },
    { id: 3, name: 'System Admin',   email: 'admin@homesync.ph',    password: 'admin123',    role: 'admin',    initials: 'SA' }
  ],

  getUsers: function() {
    try { var u = localStorage.getItem(this.USERS_KEY); return u ? JSON.parse(u) : this.defaultUsers; }
    catch(e) { return this.defaultUsers; }
  },

  saveUsers: function(users) { localStorage.setItem(this.USERS_KEY, JSON.stringify(users)); },

  getSession: function() {
    try { var s = sessionStorage.getItem(this.SESSION_KEY); return s ? JSON.parse(s) : null; }
    catch(e) { return null; }
  },

  setSession: function(user) {
    var initials = user.initials || user.name.split(' ').map(function(n){return n[0];}).join('').toUpperCase().slice(0,2);
    var s = { id: user.id, name: user.name, email: user.email, role: user.role, initials: initials, unit: user.unit || '' };
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(s));
  },

  clearSession: function() { sessionStorage.removeItem(this.SESSION_KEY); },

  requireAuth: function(allowedRoles) {
    var session = this.getSession();
    if (!session) { window.location.href = this._loginPath(); return null; }
    if (allowedRoles && allowedRoles.indexOf(session.role) === -1) { window.location.href = this._loginPath(); return null; }
    return session;
  },

  _loginPath: function() {
    var parts = window.location.pathname.replace(/\\/g, '/').split('/');
    var depth = parts.length - 2;
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    return prefix + 'LOGIN AND SIGN IN PAGE/login.html';
  }
};

function guardPage(role) { return HS.requireAuth(role ? [role] : null); }

/* --- LOGIN --- */
function doLogin() {
  var emailEl = document.getElementById('email');
  var passEl  = document.getElementById('password');
  var roleEl  = document.querySelector('.role-opt.selected');
  var email = emailEl ? emailEl.value.trim() : '';
  var pass  = passEl  ? passEl.value : '';
  var role  = roleEl  ? roleEl.dataset.role : 'tenant';

  if (!email) { showToast('Please enter your email address.', 'error'); return; }
  if (!pass)  { showToast('Please enter your password.', 'error'); return; }

  var users = HS.getUsers();
  var match = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === email.toLowerCase() && users[i].password === pass && users[i].role === role) {
      match = users[i]; break;
    }
  }

  if (!match) { showToast('Invalid credentials. Please try again.', 'error'); return; }

  HS.setSession(match);
  var redirects = { tenant: '../TENANT DASHBOARD/tenant-overview.html', landlord: '../LANDLORD DASHBOARD/landlord-overview.html', admin: '../ADMIN DASHBOARD/admin-overview.html' };
  window.location.href = redirects[match.role];
}

/* --- REGISTER --- */
function doRegister() {
  var name  = (document.getElementById('reg-name')  || {}).value || '';
  var email = (document.getElementById('reg-email') || {}).value || '';
  var phone = (document.getElementById('reg-phone') || {}).value || '';
  var pass  = (document.getElementById('reg-pass')  || {}).value || '';
  var pass2 = (document.getElementById('reg-pass2') || {}).value || '';
  var roleEl = document.querySelector('.role-opt.selected');
  var role  = roleEl ? roleEl.dataset.role : 'tenant';
  var agree = document.getElementById('reg-agree');

  if (!name.trim())  { showToast('Please enter your full name.', 'error'); return; }
  if (!email.trim() || !email.includes('@')) { showToast('Please enter a valid email address.', 'error'); return; }
  if (!phone.trim()) { showToast('Please enter your phone number.', 'error'); return; }
  if (pass.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
  if (pass !== pass2) { showToast('Passwords do not match.', 'error'); return; }
  if (agree && !agree.checked) { showToast('Please agree to the Terms and Privacy Policy.', 'error'); return; }

  var users = HS.getUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === email.trim().toLowerCase()) {
      showToast('An account with this email already exists.', 'error'); return;
    }
  }

  var newUser = {
    id: Date.now(), name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(),
    password: pass, role: role,
    initials: name.trim().split(' ').map(function(n){return n[0];}).join('').toUpperCase().slice(0,2),
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  HS.saveUsers(users);
  HS.setSession(newUser);
  showToast('Account created! Redirecting\u2026', 'success');
  setTimeout(function() {
    var redirects = { tenant: '../TENANT DASHBOARD/tenant-overview.html', landlord: '../LANDLORD DASHBOARD/landlord-overview.html' };
    window.location.href = redirects[role] || '../TENANT DASHBOARD/tenant-overview.html';
  }, 1200);
}

/* --- FORGOT PASSWORD (simulated OTP flow) --- */
function doForgotSend() {
  var email = (document.getElementById('fp-email') || {}).value || '';
  if (!email.trim() || !email.includes('@')) { showToast('Enter a valid email address.', 'error'); return; }
  var code = Math.floor(100000 + Math.random() * 900000).toString();
  localStorage.setItem('hs_reset_code', code);
  localStorage.setItem('hs_reset_email', email.trim().toLowerCase());
  localStorage.setItem('hs_reset_exp', (Date.now() + 600000).toString());
  document.getElementById('fp-step1').style.display = 'none';
  document.getElementById('fp-step2').style.display = 'block';
  var demoEl = document.getElementById('fp-demo-code');
  if (demoEl) demoEl.textContent = code;
}

function doForgotVerify() {
  var entered = (document.getElementById('fp-code') || {}).value || '';
  var stored  = localStorage.getItem('hs_reset_code');
  var exp     = parseInt(localStorage.getItem('hs_reset_exp') || '0');
  if (Date.now() > exp) { showToast('Code expired. Request a new one.', 'error'); return; }
  if (entered.trim() !== stored) { showToast('Incorrect code. Try again.', 'error'); return; }
  document.getElementById('fp-step2').style.display = 'none';
  document.getElementById('fp-step3').style.display = 'block';
}

function doForgotReset() {
  var pass  = (document.getElementById('fp-newpass')  || {}).value || '';
  var pass2 = (document.getElementById('fp-newpass2') || {}).value || '';
  var email = localStorage.getItem('hs_reset_email');
  if (pass.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
  if (pass !== pass2)  { showToast('Passwords do not match.', 'error'); return; }
  var users = HS.getUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) { users[i].password = pass; break; }
  }
  HS.saveUsers(users);
  localStorage.removeItem('hs_reset_code');
  localStorage.removeItem('hs_reset_email');
  localStorage.removeItem('hs_reset_exp');
  showToast('Password reset! Redirecting to login\u2026', 'success');
  setTimeout(function() { window.location.href = 'login.html'; }, 1500);
}

/* --- LOGOUT --- */
function doLogout() {
  HS.clearSession();
  var parts = window.location.pathname.replace(/\\/g, '/').split('/');
  var depth = parts.length - 2;
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';
  window.location.href = prefix + 'LOGIN AND SIGN IN PAGE/login.html';
}

/* --- ROLE SELECT --- */
function selectRole(el) {
  document.querySelectorAll('.role-opt').forEach(function(o) { o.classList.remove('selected'); });
  el.classList.add('selected');
}

/* --- TOAST --- */
function showToast(msg, type) {
  type = type || 'success';
  var colors = { success: '#22c55e', error: '#f87171', warning: '#f59e0b', info: '#60a5fa' };
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#2e3840;border:1px solid ' + colors[type] + ';color:white;padding:12px 20px;border-radius:10px;font-size:13px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.4);max-width:320px;line-height:1.5;';
  document.body.appendChild(t);
  setTimeout(function() { t.style.opacity='0'; t.style.transition='opacity 0.4s'; setTimeout(function(){t.remove();},400); }, 3000);
}

/* --- MISC UTILS --- */
function confirmAction(msg, onConfirm) { if (confirm(msg)) onConfirm(); }
function pillSelect(el, group) {
  document.querySelectorAll('[data-group="' + group + '"]').forEach(function(p){p.className=p.className.replace(/\bactive\S*/g,'').trim();});
  el.classList.add('active');
}
function switchTab(tabId, groupId) {
  var group = groupId || 'default';
  document.querySelectorAll('[data-tabgroup="' + group + '"] .tab-content').forEach(function(c){c.classList.remove('active');});
  document.querySelectorAll('[data-tabgroup="' + group + '"] .page-tab').forEach(function(t){t.classList.remove('active');});
  var tc = document.getElementById(tabId); if (tc) tc.classList.add('active');
  var bt = document.querySelector('[onclick*="' + tabId + '"]'); if (bt) bt.classList.add('active');
}
function openModal(id)  { var m = document.getElementById(id); if (m) m.classList.remove('hidden'); }
function closeModal(id) { var m = document.getElementById(id); if (m) m.classList.add('hidden'); }
function calcDiscount(base, pct) { return Math.round(base * (1 - pct/100)); }
function formatPeso(n) { return '\u20b1' + Number(n).toLocaleString('en-PH'); }
function toggleOccRow(el) { var r = el.closest('.room-occ-row'); if (r) r.classList.toggle('open'); }
function toggleAmenity(el) { el.classList.toggle('selected'); }
function toggleSwitch(btn) {
  btn.classList.toggle('on');
  var l = btn.nextElementSibling;
  if (l) l.textContent = btn.classList.contains('on') ? 'Enabled' : 'Disabled';
}
function filterTable(inputId, tableId) {
  var val = document.getElementById(inputId).value.toLowerCase();
  document.querySelectorAll('#' + tableId + ' tbody tr').forEach(function(r){
    r.style.display = r.textContent.toLowerCase().includes(val) ? '' : 'none';
  });
}
function startCountdown(elementId, seconds) {
  var iv = setInterval(function(){
    seconds = Math.max(0, seconds - 1);
    var h = Math.floor(seconds/3600).toString().padStart(2,'0');
    var m = Math.floor((seconds%3600)/60).toString().padStart(2,'0');
    var s = (seconds%60).toString().padStart(2,'0');
    var el = document.getElementById(elementId);
    if (el) el.textContent = h+':'+m+':'+s; else clearInterval(iv);
    if (seconds===0) { clearInterval(iv); showToast('Your hold has expired!','warning'); }
  }, 1000);
}

/* --- TICKETS (localStorage) --- */
function getTickets() { try { var t = localStorage.getItem('hs_tickets'); return t ? JSON.parse(t) : []; } catch(e) { return []; } }
function saveTickets(t) { localStorage.setItem('hs_tickets', JSON.stringify(t)); }
function submitTicket(title, category, desc, urgency) {
  var s = HS.getSession();
  var t = getTickets();
  var ticket = { id:'TKT-'+Date.now(), title:title, category:category, description:desc, urgency:urgency||'normal', status:'open', tenantName:s?s.name:'Unknown', unit:s?(s.unit||'N/A'):'N/A', createdAt:new Date().toISOString() };
  t.unshift(ticket); saveTickets(t); return ticket;
}

/* --- PAYMENTS (localStorage) --- */
function getPayments() { try { var p = localStorage.getItem('hs_payments'); return p ? JSON.parse(p) : []; } catch(e) { return []; } }
function savePayment(payment) { var p = getPayments(); p.unshift(payment); localStorage.setItem('hs_payments', JSON.stringify(p)); }

/* --- MESSAGES (localStorage) --- */
function getMessages() { try { var m = localStorage.getItem('hs_messages'); return m ? JSON.parse(m) : []; } catch(e) { return []; } }
function sendMessage(toRole, toName, subject, body) {
  var s = HS.getSession();
  var msgs = getMessages();
  var msg = { id:'MSG-'+Date.now(), from:s?s.name:'Unknown', fromRole:s?s.role:'', to:toName, toRole:toRole, subject:subject, body:body, read:false, sentAt:new Date().toISOString() };
  msgs.unshift(msg); localStorage.setItem('hs_messages', JSON.stringify(msgs)); return msg;
}

/* --- DOCUMENTS (localStorage) --- */
function getDocuments() { try { var d = localStorage.getItem('hs_documents'); return d ? JSON.parse(d) : []; } catch(e) { return []; } }
function addDocument(name, type, size) {
  var s = HS.getSession();
  var docs = getDocuments();
  var doc = { id:'DOC-'+Date.now(), name:name, type:type, size:size, uploadedBy:s?s.name:'Unknown', uploadedAt:new Date().toISOString() };
  docs.unshift(doc); localStorage.setItem('hs_documents', JSON.stringify(docs)); return doc;
}

/* --- POPULATE SIDEBAR USER INFO --- */
function populateSidebarUser() {
  var s = HS.getSession(); if (!s) return;
  document.querySelectorAll('.sb-foot .av-name').forEach(function(el){el.textContent=s.name;});
  document.querySelectorAll('.sb-foot .av-role').forEach(function(el){
    var r=s.role.charAt(0).toUpperCase()+s.role.slice(1);
    el.textContent=r+(s.unit?' \u00b7 '+s.unit:'');
  });
  document.querySelectorAll('.sb-foot .avatar').forEach(function(el){el.textContent=s.initials;});
  document.querySelectorAll('.topbar-r .avatar').forEach(function(el){el.textContent=s.initials;});
  document.querySelectorAll('.topbar p').forEach(function(el){
    if (/morning|afternoon|evening/.test(el.textContent)) {
      var h=new Date().getHours();
      var greet=h<12?'morning':h<18?'afternoon':'evening';
      el.textContent='Good '+greet+', '+s.name.split(' ')[0]+' \ud83d\udc4b';
    }
  });
}

document.addEventListener('DOMContentLoaded', populateSidebarUser);