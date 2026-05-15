document.addEventListener('DOMContentLoaded', () => {
  const TOTAL = 6;
  let cur = 1;

  // Initialize UI
  renderDots();

  function renderDots() {
    const c = document.getElementById('stepDots');
    if (!c) return; 
    
    c.innerHTML = '';
    for (let i = 1; i < TOTAL; i++) {
      const d = document.createElement('div');
      d.className = 'step-dot' + (i < cur ? ' done' : i === cur ? ' active' : '');
      c.appendChild(d);
    }
  }

  window.showStep = function(n) {
    const panels = document.querySelectorAll('.step-panel');
    if (panels.length === 0) return;

    panels.forEach(p => p.classList.remove('active'));
    
    const targetStep = document.getElementById('step' + n);
    if (targetStep) targetStep.classList.add('active');

    const btnBack = document.getElementById('btnBack');
    if (btnBack) {
      btnBack.style.display = (n > 1 && n < TOTAL) ? 'inline-block' : 'none';
    }

    const footer = document.getElementById('modalFooter');
    if (footer) {
      footer.style.display = n === TOTAL ? 'none' : 'flex';
    }

    renderDots();
  };

  window.nextStep = function() {
    // Step 5 Validation (Confirmation Check)
    if (cur === 5) {
      const cb = document.getElementById('confirmCheck');
      if (cb && !cb.checked) {
        const row = document.getElementById('confirmRow');
        row.style.borderColor = '#f87171';
        row.style.borderWidth = '2px';
        row.style.borderStyle = 'solid';
        setTimeout(() => { row.style.borderColor = ''; }, 1500);
        return;
      }
      
      // LOGIC TO ADD ROOM TO UI
      addNewRoomToUI();
    }

    if (cur < TOTAL) {
      cur++;
      showStep(cur);
    }
  };

  function addNewRoomToUI() {
    const grid = document.querySelector('.room-grid');
    const addCard = document.querySelector('.add-card');
    
    // Get values from Step 1
    const roomName = document.querySelector('#step1 input[type="text"]').value || "New Room";
    const property = document.querySelector('#step1 select').value;
    const price = document.querySelector('#step2 input[type="number"]').value || "0";
    const beds = document.querySelectorAll('#bedList .bed-row').length;
    
    // Create the new card
    const newCard = document.createElement('div');
    newCard.className = 'room-card';
    newCard.innerHTML = `
      <span class="gbadge gb-mixed">New</span>
      <div style="height:18px"></div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div><div class="rc-name">${roomName}</div><div class="rc-loc">${property}</div></div>
        <div style="text-align:right"><div class="rc-price">₱${price}</div><div class="rc-unit">/bed·mo</div></div>
      </div>
      <div class="rc-tags">
        <span class="rc-tag">Listed Recently</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin:6px 0;font-size:11px">
        <span style="color:#22c55e;font-weight:bold">● ${beds} beds available</span>
      </div>
      <div class="btn-row" style="margin-top:8px">
        <button class="btn-outline-green" style="font-size:11px;padding:5px 11px">✏️ Edit</button>
        <button class="qa-btn" style="padding:5px 11px">👁 Preview</button>
      </div>
    `;
    
    // Insert before the "Add New Room" card
    grid.insertBefore(newCard, addCard);
    showToast('Listing published successfully!', 'success');
  }

  window.prevStep = function() {
    if (cur > 1) {
      cur--;
      showStep(cur);
    }
  };

  window.openModal = function(mode) {
    cur = 1;
    showStep(1);
    
    const cb = document.getElementById('confirmCheck');
    if (cb) cb.checked = false;
    
    const row = document.getElementById('confirmRow');
    if (row) row.classList.remove('checked');

    const title = document.getElementById('modalTitle');
    if (title) title.textContent = mode === 'edit' ? 'Edit Listing: Room 2B' : 'Add Room Listing';

    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  window.handleOverlayClick = function(e) {
    if (e.target.id === 'modalOverlay') closeModal();
  };

  window.selectOpt = function(el) {
    const grid = el.closest('.opt-grid');
    if (grid) {
      grid.querySelectorAll('.opt-card').forEach(c => c.classList.remove('selected'));
      el.classList.add('selected');
    }
  };

  window.toggleConfirm = function() {
    const cb = document.getElementById('confirmCheck');
    const row = document.getElementById('confirmRow');
    if (cb && row) {
      cb.checked = !cb.checked;
      row.classList.toggle('checked', cb.checked);
    }
  };

  window.addBed = function() {
    const list = document.getElementById('bedList');
    const currentBeds = list.querySelectorAll('.bed-row').length;
    const newCount = currentBeds + 1;

    const row = document.createElement('div');
    row.className = 'bed-row';
    row.innerHTML = `
      <span class="bed-num">${newCount}</span>
      <select>
        <option>Single</option>
        <option>Single Bunk (Bottom)</option>
        <option>Single Bunk (Top)</option>
        <option>Double</option>
        <option>Queen</option>
        <option>Foam / Floor</option>
      </select>
      <select class="status-sel">
        <option>Available</option>
        <option>Taken</option>
      </select>
      <button type="button" class="del-bed-btn" onclick="removeBed(this)">🗑</button>`;
    list.appendChild(row);
  };

  window.removeBed = function(btn) {
    btn.closest('.bed-row').remove();
    document.querySelectorAll('#bedList .bed-row').forEach((r, i) => {
      r.querySelector('.bed-num').textContent = i + 1;
    });
  };

  window.showToast = function(msg, type) {
    const wrap = document.getElementById('toast-wrap');
    if (!wrap) return;
    const t = document.createElement('div');
    t.className = 'toast ' + (type || '');
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 500);
    }, 3000);
  };
});
