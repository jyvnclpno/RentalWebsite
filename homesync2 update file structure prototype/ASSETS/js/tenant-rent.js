/* ============================================================
   tenant-rent.js — HomeSync Tenant Rent Page
   ============================================================ */

let currentPayMethod = 'gcash';
let receiptAttached = false;
let currentStep = 1;

// ── Payment Method Selection ───────────────────────────────
function selectPayMethod(el, method) {
  document.querySelectorAll('.pay-method-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  currentPayMethod = method;
  updateInstructions(method);
}

const METHOD_INSTRUCTIONS = {
  gcash: {
    title: '📱 GCash Instructions',
    rows: [
      { label: 'Send exact amount to', value: '0917-123-4567', copy: '0917-123-4567' },
      { label: 'Account Name', value: 'Juan dela Cruz' },
      { label: 'Amount', value: '₱8,500.00' },
      { label: 'Note / Remarks', value: 'Unit 3A – May 2026 Rent' }
    ],
    note: '📌 After sending, attach your GCash receipt screenshot on the next step and click <strong>Submit</strong>.'
  },
  maya: {
    title: '💜 Maya Instructions',
    rows: [
      { label: 'Send exact amount to', value: '0917-123-4567', copy: '0917-123-4567' },
      { label: 'Account Name', value: 'Juan dela Cruz' },
      { label: 'Amount', value: '₱8,500.00' },
      { label: 'Note / Remarks', value: 'Unit 3A – May 2026 Rent' }
    ],
    note: '📌 After sending via Maya, attach your receipt on the next step and click <strong>Submit</strong>.'
  },
  bank: {
    title: '🏦 Bank Transfer Instructions',
    rows: [
      { label: 'Bank', value: 'BDO Unibank' },
      { label: 'Account Number', value: '1234-5678-9012', copy: '1234567890120' },
      { label: 'Account Name', value: 'Juan dela Cruz' },
      { label: 'Amount', value: '₱8,500.00' },
      { label: 'Remarks', value: 'Unit 3A – May 2026 Rent' }
    ],
    note: '📌 After transferring, attach your bank transaction receipt on the next step and click <strong>Submit</strong>.'
  },
  cash: {
    title: '💵 Cash Payment Instructions',
    rows: [
      { label: 'Pay at', value: 'Admin Office, Ground Floor' },
      { label: 'Office Hours', value: 'Mon–Sat, 8 AM – 5 PM' },
      { label: 'Amount', value: '₱8,500.00' },
      { label: 'Ask for', value: 'Official Receipt from Landlord' }
    ],
    note: '📌 Bring the exact amount. Ask for an official receipt. Then enter your reference number and attach a photo of the receipt on the next step.'
  }
};

function updateInstructions(method) {
  const instr = METHOD_INSTRUCTIONS[method];
  if (!instr) return;
  const el = document.getElementById('pay-instructions');

  let rowsHtml = instr.rows.map(row => {
    const copyBtn = row.copy ? `<button class="copy-btn" onclick="copyText('${row.copy}')">Copy</button>` : '';
    return `<div class="instr-row"><span class="label">${row.label}</span><span class="value">${row.value}${copyBtn}</span></div>`;
  }).join('');

  el.innerHTML = `
    <h4>${instr.title}</h4>
    ${rowsHtml}
    <p style="font-size:11px;color:#94a3b8;margin-top:10px">${instr.note}</p>
  `;
}

// ── Step Navigation ────────────────────────────────────────
function goToStep(step) {
  if (step === 2) {
    // Nothing required to validate on step 1
  }
  if (step === 3) {
    // Validate step 2
    const ref = document.getElementById('pay-ref-number').value.trim();
    if (!ref) {
      showToast('⚠️ Please enter your reference number.', 'error');
      return;
    }
    if (!receiptAttached) {
      showToast('⚠️ Please attach your payment receipt.', 'error');
      return;
    }
    // Populate confirmation
    submitPayment();
    return;
  }

  currentStep = step;
  document.querySelectorAll('.pay-step').forEach(s => s.classList.remove('active'));
  document.getElementById('pay-step-' + step).classList.add('active');
  updateStepBar(step);
}

function submitPayment() {
  const ref = document.getElementById('pay-ref-number').value.trim();
  if (!ref) { showToast('⚠️ Please enter your reference number.', 'error'); return; }
  if (!receiptAttached) { showToast('⚠️ Please attach your payment receipt.', 'error'); return; }

  // Populate confirmation
  const methodLabels = { gcash: 'GCash', maya: 'Maya', bank: 'Bank Transfer', cash: 'Cash' };
  document.getElementById('conf-method').textContent = methodLabels[currentPayMethod] || currentPayMethod;
  document.getElementById('conf-ref').textContent = ref;
  document.getElementById('conf-date').textContent = new Date().toLocaleDateString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  // Update history row for May 2026
  const histDate = document.getElementById('hist-may-date');
  const histMethod = document.getElementById('hist-may-method');
  const histStatus = document.getElementById('hist-may-status');
  if (histDate) histDate.textContent = 'May ' + new Date().getDate();
  if (histMethod) histMethod.textContent = methodLabels[currentPayMethod];
  if (histStatus) histStatus.innerHTML = '<span class="badge b-yellow">⏳ Pending</span>';

  currentStep = 3;
  document.querySelectorAll('.pay-step').forEach(s => s.classList.remove('active'));
  document.getElementById('pay-step-3').classList.add('active');
  updateStepBar(3);
  showToast('✅ Payment submitted! Awaiting landlord approval.', 'success');
}

function updateStepBar(step) {
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('sbar-' + i);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i < step) el.classList.add('done');
    else if (i === step) el.classList.add('active');
  }
}

function resetPaymentFlow() {
  currentStep = 1;
  receiptAttached = false;
  currentPayMethod = 'gcash';

  document.getElementById('pay-ref-number').value = '';
  document.getElementById('pay-notes').value = '';
  document.getElementById('receipt-preview').style.display = 'none';
  document.getElementById('upload-zone').classList.remove('has-file');

  document.querySelectorAll('.pay-method-card').forEach(c => c.classList.remove('selected'));
  document.querySelector('.pay-method-card[data-method="gcash"]').classList.add('selected');
  updateInstructions('gcash');

  document.querySelectorAll('.pay-step').forEach(s => s.classList.remove('active'));
  document.getElementById('pay-step-1').classList.add('active');
  updateStepBar(1);
}

// ── Receipt Upload ─────────────────────────────────────────
function handleReceiptUpload(input) {
  const file = input.files[0];
  if (!file) return;
  receiptAttached = true;
  document.getElementById('receipt-filename').textContent = '📎 Attached: ' + file.name;
  document.getElementById('receipt-preview').style.display = 'block';
  document.getElementById('upload-zone').classList.add('has-file');
  document.getElementById('upload-zone').querySelector('.uz-text').innerHTML =
    '✅ Receipt attached: <strong>' + file.name + '</strong><br><span style="font-size:10px;color:#64748b">Click to change</span>';
}

// ── Copy to Clipboard ──────────────────────────────────────
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 Copied: ' + text, 'success');
  }).catch(() => {
    showToast('⚠️ Could not copy. Please copy manually.', 'error');
  });
}

// ── Toast ──────────────────────────────────────────────────
function showToast(msg, type = '') {
  const wrap = document.getElementById('toast-wrap');
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ── Init ───────────────────────────────────────────────────
updateInstructions('gcash');
