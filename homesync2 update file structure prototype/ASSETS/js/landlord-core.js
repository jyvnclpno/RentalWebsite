 const TOTAL = 6;
  let cur = 1;
  let bedCount = 2;
 
  function renderDots() {
    const c = document.getElementById('stepDots');
    c.innerHTML = '';
    for (let i = 1; i < TOTAL; i++) {
      const d = document.createElement('div');
      d.className = 'step-dot' + (i < cur ? ' done' : i === cur ? ' active' : '');
      c.appendChild(d);
    }
  }
 
  function showStep(n) {
    document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('step' + n).classList.add('active');
    document.getElementById('btnBack').style.display = (n > 1 && n < TOTAL) ? 'inline-block' : 'none';
    document.getElementById('modalFooter').style.display = n === TOTAL ? 'none' : 'flex';
    renderDots();
  }
 
  function nextStep() {
    if (cur === 5 && !document.getElementById('confirmCheck').checked) {
      const row = document.getElementById('confirmRow');
      row.style.borderColor = '#f87171';
      setTimeout(() => { row.style.borderColor = ''; }, 1500);
      return;
    }
    if (cur < TOTAL) { cur++; showStep(cur); }
  }
 
  function prevStep() {
    if (cur > 1) { cur--; showStep(cur); }
  }
 
  function openModal(mode) {
    cur = 1;
    showStep(1);
    document.getElementById('confirmCheck').checked = false;
    document.getElementById('confirmRow').classList.remove('checked');
    document.getElementById('modalTitle').textContent = mode === 'edit' ? 'Edit Listing: Room 2B' : 'Add Room Listing';
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
 
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }
 
  function handleOverlayClick(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  }
 
  function selectOpt(el) {
    el.closest('.opt-grid').querySelectorAll('.opt-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  }
 
  function toggleConfirm() {
    const cb = document.getElementById('confirmCheck');
    cb.checked = !cb.checked;
    document.getElementById('confirmRow').classList.toggle('checked', cb.checked);
  }
 
  function addBed() {
    bedCount++;
    const list = document.getElementById('bedList');
    const row = document.createElement('div');
    row.className = 'bed-row';
    row.innerHTML = `<span class="bed-num">${bedCount}</span>
      <select><option>Single</option><option>Single Bunk (Bottom)</option><option>Single Bunk (Top)</option><option>Double</option><option>Queen</option><option>Foam / Floor</option></select>
      <select class="status-sel"><option>Available</option><option>Taken</option></select>
      <button class="del-bed-btn" onclick="removeBed(this)">🗑</button>`;
    list.appendChild(row);
  }
 
  function removeBed(btn) {
    btn.closest('.bed-row').remove();
    document.querySelectorAll('#bedList .bed-row').forEach((r, i) => r.querySelector('.bed-num').textContent = i + 1);
    bedCount = document.querySelectorAll('#bedList .bed-row').length;
  }
 
  function showToast(msg, type) {
    const wrap = document.getElementById('toast-wrap');
    const t = document.createElement('div');
    t.className = 'toast ' + (type || '');
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }
 
  renderDots();