/* ============================================================
   tenant-utilities.js — HomeSync Tenant Utilities
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

// ── Electricity Calculator ─────────────────────────────────
(function initElecCalc() {
  const btn = document.getElementById('btn-calc-elec');
  if (!btn) return;
  btn.addEventListener('click', function() {
    const kwh = parseFloat(document.getElementById('calc-kwh').value);
    if (!kwh || kwh < 0) { showToast('⚠️ Please enter a valid kWh value.', 'error'); return; }
    const total = kwh * 11.50;
    document.getElementById('calc-result').textContent = '₱' + total.toFixed(2);
  });
})();

// ── Water Calculator ───────────────────────────────────────
(function initWaterCalc() {
  const btn = document.getElementById('btn-calc-water');
  if (!btn) return;
  btn.addEventListener('click', function() {
    const cbm = parseFloat(document.getElementById('calc-cbm').value);
    if (!cbm || cbm < 0) { showToast('⚠️ Please enter a valid cubic meter value.', 'error'); return; }
    let total = 121.50;
    if (cbm > 10) total += (cbm - 10) * 23.84;
    total *= 1.10; // environmental charge 10%
    document.getElementById('water-result').textContent = '₱' + total.toFixed(2);
  });
})();

// ── Payment grids ──────────────────────────────────────────
(function initPayGrids() {
  ['elec-pay-grid', 'water-pay-grid'].forEach(function(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.querySelectorAll('.pay-opt').forEach(function(opt) {
      opt.addEventListener('click', function() {
        grid.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  });
})();

// ── Pay buttons ────────────────────────────────────────────
(function initPayButtons() {
  const btnElec = document.getElementById('btn-pay-elec');
  const btnWater = document.getElementById('btn-pay-water');

  if (btnElec) {
    btnElec.addEventListener('click', function() {
      showToast('✅ Electricity payment submitted! Awaiting approval.', 'success');
    });
  }
  if (btnWater) {
    btnWater.addEventListener('click', function() {
      showToast('✅ Water payment submitted! Awaiting approval.', 'success');
    });
  }
})();
