var selectedMethod = 'gcash';

function showToast(msg, type) {
  var wrap = document.getElementById('toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t); }, 3500);
}

function copyText(txt) {
  navigator.clipboard.writeText(txt).then(function() {
    showToast('Copied: ' + txt, 'success');
  }).catch(function() {
    showToast('Copied to clipboard!', 'success');
  });
}

function selectPayMethod(el, method) {
  selectedMethod = method;
  document.querySelectorAll('.pay-method-card').forEach(function(c) { c.classList.remove('selected'); });
  el.classList.add('selected');
  var instr = document.getElementById('pay-instructions');
  var instructions = {
    gcash: '<h4>📱 GCash Instructions</h4>' +
      '<div class="instr-row"><span class="label">Send to</span><span class="value">0917-123-4567 <button class="copy-btn" onclick="copyText(\'0917-123-4567\')">Copy</button></span></div>' +
      '<div class="instr-row"><span class="label">Account Name</span><span class="value">Juan dela Cruz</span></div>' +
      '<div class="instr-row"><span class="label">Amount</span><span class="value">₱8,500.00</span></div>' +
      '<div class="instr-row"><span class="label">Remarks</span><span class="value">Unit 3A – May 2026 Rent</span></div>' +
      '<p style="font-size:11px;color:#94a3b8;margin-top:10px">📌 Attach your GCash screenshot on the next step.</p>',
    maya: '<h4>💜 Maya Instructions</h4>' +
      '<div class="instr-row"><span class="label">Send to</span><span class="value">0917-123-4567 <button class="copy-btn" onclick="copyText(\'0917-123-4567\')">Copy</button></span></div>' +
      '<div class="instr-row"><span class="label">Account Name</span><span class="value">Juan dela Cruz</span></div>' +
      '<div class="instr-row"><span class="label">Amount</span><span class="value">₱8,500.00</span></div>' +
      '<p style="font-size:11px;color:#94a3b8;margin-top:10px">📌 Attach your Maya receipt on the next step.</p>',
    bank: '<h4>🏦 Bank Transfer Instructions</h4>' +
      '<div class="instr-row"><span class="label">Bank</span><span class="value">BDO Savings</span></div>' +
      '<div class="instr-row"><span class="label">Account No.</span><span class="value">1234-5678-9012 <button class="copy-btn" onclick="copyText(\'1234567890120\')">Copy</button></span></div>' +
      '<div class="instr-row"><span class="label">Account Name</span><span class="value">Juan dela Cruz</span></div>' +
      '<div class="instr-row"><span class="label">Amount</span><span class="value">₱8,500.00</span></div>' +
      '<p style="font-size:11px;color:#94a3b8;margin-top:10px">📌 Attach your transfer confirmation on the next step.</p>',
    cash: '<h4>💵 Cash Payment Instructions</h4>' +
      '<div class="instr-row"><span class="label">Pay at</span><span class="value">Admin Office, Ground Floor</span></div>' +
      '<div class="instr-row"><span class="label">Office Hours</span><span class="value">Mon–Fri, 8AM–5PM</span></div>' +
      '<div class="instr-row"><span class="label">Amount</span><span class="value">₱8,500.00</span></div>' +
      '<p style="font-size:11px;color:#94a3b8;margin-top:10px">📌 Ask for an official receipt and attach it on the next step.</p>'
  };
  instr.innerHTML = instructions[method] || instructions.gcash;
}

function goToStep(n) {
  var steps = [1,2,3];
  steps.forEach(function(i) {
    document.getElementById('pay-step-' + i).classList.remove('active');
    var sb = document.getElementById('sbar-' + i);
    sb.classList.remove('active', 'done');
    if (i < n) sb.classList.add('done');
    else if (i === n) sb.classList.add('active');
  });
  document.getElementById('pay-step-' + n).classList.add('active');
}

function handleReceiptUpload(input) {
  if (input.files && input.files[0]) {
    var fn = input.files[0].name;
    document.getElementById('receipt-filename').textContent = fn;
    document.getElementById('receipt-preview').style.display = 'block';
    document.getElementById('upload-zone').classList.add('has-file');
    showToast('Receipt attached: ' + fn, 'success');
  }
}

function submitPayment() {
  var ref = document.getElementById('pay-ref-number').value.trim();
  if (!ref) { showToast('Please enter your reference number.', 'error'); return; }
  var methodNames = { gcash:'GCash', maya:'Maya', bank:'Bank Transfer', cash:'Cash' };
  var now = new Date();
  var dateStr = now.toLocaleDateString('en-PH', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
  document.getElementById('conf-method').textContent = methodNames[selectedMethod] || selectedMethod;
  document.getElementById('conf-ref').textContent = ref;
  document.getElementById('conf-date').textContent = dateStr;
  // Update history row
  document.getElementById('hist-may-date').textContent = now.toLocaleDateString('en-PH',{month:'short',day:'numeric'});
  document.getElementById('hist-may-method').textContent = methodNames[selectedMethod];
  document.getElementById('hist-may-status').innerHTML = '<span class="badge b-yellow">⏳ Pending</span>';
  goToStep(3);
  showToast('Payment submitted! Awaiting landlord approval.', 'success');
}

function resetPaymentFlow() {
  document.getElementById('pay-ref-number').value = '';
  document.getElementById('pay-notes').value = '';
  document.getElementById('receipt-preview').style.display = 'none';
  document.getElementById('upload-zone').classList.remove('has-file');
  goToStep(1);
}