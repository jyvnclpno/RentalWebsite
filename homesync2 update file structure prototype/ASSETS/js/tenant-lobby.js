/* ============================================================
   tenant-lobby.js — HomeSync Tenant Lobby
   ============================================================ */

// ── Room Data ──────────────────────────────────────────────
const ROOM_DATA = {
  '3A': {
    title: 'Unit 3A — Your Room',
    unit: 'Unit 3A', floor: 'Floor 3', area: '42 sqm',
    type: '1-Bedroom', gender: '🌸 Girls Only', max: 2, occ: 1,
    rent: 8500, status: 'mine',
    beds: [
      { icon: '🛏️', name: 'Single Bed', diff: 'Standard', extra: 0, selected: false },
      { icon: '🛌', name: 'Twin Bed', diff: '+₱200/mo', extra: 200, selected: true },
      { icon: '👑', name: 'Queen Bed', diff: '+₱500/mo', extra: 500, selected: false },
    ],
    amenities: [
      { icon: '📶', label: 'WiFi Included', type: 'included' },
      { icon: '💧', label: 'Water Included', type: 'included' },
      { icon: '🧺', label: 'Laundry Area', type: 'included' },
      { icon: '❄️', label: 'AC-Ready', type: 'extra', note: 'tenant provides AC' },
      { icon: '🔒', label: 'CCTV Hallway', type: 'included' },
      { icon: '🚿', label: 'Private Bathroom', type: 'included' },
      { icon: '🚪', label: 'Smart Lock', type: 'included' },
      { icon: '📺', label: 'Cable TV', type: 'extra', note: 'not included' },
    ]
  },
  '1A': {
    title: 'Unit 1A', unit: 'Unit 1A', floor: 'Floor 1', area: '38 sqm',
    type: '1-Bedroom', gender: '🌸 Girls Only', max: 2, occ: 0,
    rent: 7200, status: 'available',
    beds: [
      { icon: '🛏️', name: 'Single Bed', diff: 'Standard', extra: 0, selected: true },
      { icon: '🛌', name: 'Twin Bed', diff: '+₱200/mo', extra: 200, selected: false },
    ],
    amenities: [
      { icon: '📶', label: 'WiFi Included', type: 'included' },
      { icon: '💧', label: 'Water Included', type: 'included' },
      { icon: '🔒', label: 'CCTV Hallway', type: 'included' },
      { icon: '🚿', label: 'Shared Bathroom', type: 'included' },
      { icon: '❄️', label: 'AC', type: 'extra', note: 'not included' },
      { icon: '🧺', label: 'Laundry', type: 'extra', note: 'shared, coin-operated' },
    ]
  },
  '2A': {
    title: 'Unit 2A', unit: 'Unit 2A', floor: 'Floor 2', area: '40 sqm',
    type: '1-Bedroom', gender: '🌸 Girls Only', max: 2, occ: 1,
    rent: 7800, status: 'reserved',
    beds: [
      { icon: '🛏️', name: 'Single Bed', diff: 'Standard', extra: 0, selected: false },
      { icon: '🛌', name: 'Twin Bed', diff: '+₱200/mo', extra: 200, selected: false },
      { icon: '👑', name: 'Queen Bed', diff: '+₱500/mo', extra: 500, selected: true },
    ],
    amenities: [
      { icon: '📶', label: 'WiFi Included', type: 'included' },
      { icon: '💧', label: 'Water Included', type: 'included' },
      { icon: '❄️', label: 'Air Conditioning', type: 'included' },
      { icon: '🧺', label: 'Laundry Area', type: 'included' },
      { icon: '🔒', label: 'CCTV', type: 'included' },
      { icon: '🚿', label: 'Private Bathroom', type: 'included' },
    ]
  },
  '4A': {
    title: 'Unit 4A', unit: 'Unit 4A', floor: 'Floor 4', area: '38 sqm',
    type: '1-Bedroom', gender: '🔵 Boys Only', max: 2, occ: 0,
    rent: 7200, status: 'available',
    beds: [
      { icon: '🛏️', name: 'Single Bed', diff: 'Standard', extra: 0, selected: true },
      { icon: '🪵', name: 'Bunk Bed', diff: '+₱150/mo', extra: 150, selected: false },
    ],
    amenities: [
      { icon: '📶', label: 'WiFi Included', type: 'included' },
      { icon: '💧', label: 'Water Included', type: 'included' },
      { icon: '🔒', label: 'CCTV Hallway', type: 'included' },
      { icon: '🚿', label: 'Shared Bathroom', type: 'included' },
    ]
  },
  '5A': {
    title: 'Unit 5A', unit: 'Unit 5A', floor: 'Floor 5', area: '42 sqm',
    type: '1-Bedroom', gender: '🔵 Boys Only', max: 1, occ: 0,
    rent: 8000, status: 'available',
    beds: [
      { icon: '👑', name: 'Queen Bed', diff: 'Standard', extra: 0, selected: true },
      { icon: '🛌', name: 'Twin Bed', diff: '-₱200/mo', extra: -200, selected: false },
    ],
    amenities: [
      { icon: '📶', label: 'WiFi Included', type: 'included' },
      { icon: '💧', label: 'Water Included', type: 'included' },
      { icon: '❄️', label: 'Air Conditioning', type: 'included' },
      { icon: '🧺', label: 'Laundry Area', type: 'included' },
      { icon: '🔒', label: 'CCTV', type: 'included' },
      { icon: '🚿', label: 'Private Bathroom', type: 'included' },
    ]
  },
  '6': {
    title: 'Unit 6 — Studio Apartment', unit: 'Unit 6', floor: 'Floor 6', area: '55 sqm',
    type: 'Studio Apartment (Full Unit)', gender: '🏢 No restriction', max: 2, occ: 0,
    rent: 12000, status: 'available',
    beds: [
      { icon: '👑', name: 'Queen Bed', diff: 'Standard', extra: 0, selected: true },
      { icon: '🛌', name: 'Twin Bed', diff: '-₱300/mo', extra: -300, selected: false },
    ],
    amenities: [
      { icon: '📶', label: 'WiFi Included', type: 'included' },
      { icon: '💧', label: 'Water Included', type: 'included' },
      { icon: '❄️', label: 'Air Conditioning', type: 'included' },
      { icon: '🧺', label: 'Washer/Dryer', type: 'included' },
      { icon: '🍳', label: 'Kitchenette', type: 'included' },
      { icon: '📺', label: 'Smart TV', type: 'included' },
      { icon: '🔒', label: 'CCTV + Smart Lock', type: 'included' },
      { icon: '🚿', label: 'Private Bathroom', type: 'included' },
    ]
  }
};

let currentRoom = null;
let currentReservationStep = 1;
let selectedReportType = '🔧 Maintenance';

// ── Filters ────────────────────────────────────────────────
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', function () {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    filterRooms();
  });
});

document.getElementById('room-search').addEventListener('input', filterRooms);

function filterRooms() {
  const activeFilter = document.querySelector('.filter-chip.active')?.dataset.filter || 'all';
  const searchVal = document.getElementById('room-search').value.toLowerCase();
  document.querySelectorAll('.room-card').forEach(card => {
    const type = card.dataset.type || '';
    const status = card.dataset.status || '';
    const text = card.textContent.toLowerCase();

    let show = true;
    if (activeFilter === 'available') show = status === 'available';
    else if (activeFilter === 'girls') show = type === 'girls';
    else if (activeFilter === 'boys') show = type === 'boys';
    else if (activeFilter === 'apartment') show = type === 'apartment';
    else if (activeFilter === 'mine') show = status === 'mine';

    if (searchVal && !text.includes(searchVal)) show = false;
    card.style.display = show ? '' : 'none';
  });
}

// ── Modals ─────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  if (id === 'modal-room-detail') {
    // Reset reservation view
    document.getElementById('view-details').style.display = '';
    document.getElementById('view-reserve').style.display = 'none';
    document.getElementById('reserve-steps-indicator').style.display = 'none';
    currentReservationStep = 1;
    ['res-step-1','res-step-2','res-step-3'].forEach((s,i) => {
      document.getElementById(s).classList.toggle('active', i === 0);
    });
    updateStepDots(1);
  }
}

// Close modals when clicking overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal(this.id);
  });
});

// ── Room Detail ────────────────────────────────────────────
function openRoomDetail(roomId) {
  const room = ROOM_DATA[roomId];
  if (!room) return;
  currentRoom = room;

  document.getElementById('md-title').textContent = room.title;
  document.getElementById('md-unit').textContent = room.unit;
  document.getElementById('md-floor').textContent = room.floor;
  document.getElementById('md-area').textContent = room.area;
  document.getElementById('md-type').textContent = room.type;
  document.getElementById('md-gender').textContent = room.gender;
  document.getElementById('md-max').textContent = room.max + ' person(s)';
  document.getElementById('md-occ').textContent = room.occ + ' / ' + room.max;

  // Rent & fees
  const rent = room.rent;
  const deposit = rent * 2;
  const advance = rent;
  const holdFee = 500;
  document.getElementById('md-rent').textContent = '₱' + rent.toLocaleString();
  document.getElementById('md-deposit').textContent = '₱' + deposit.toLocaleString();
  document.getElementById('md-advance').textContent = '₱' + advance.toLocaleString();
  document.getElementById('md-movein').textContent = '₱' + (deposit + advance + holdFee).toLocaleString() + ' (inc. hold fee)';

  // Beds
  const bedsEl = document.getElementById('md-beds');
  bedsEl.innerHTML = '';
  room.beds.forEach(bed => {
    const div = document.createElement('div');
    div.className = 'bed-opt' + (bed.selected ? ' selected' : '');
    div.innerHTML = `<div class="bed-icon">${bed.icon}</div><div>${bed.name}</div><div class="bed-price-diff">${bed.diff}</div>`;
    div.onclick = () => {
      bedsEl.querySelectorAll('.bed-opt').forEach(b => b.classList.remove('selected'));
      div.classList.add('selected');
    };
    bedsEl.appendChild(div);
  });

  // Amenities
  const amenEl = document.getElementById('md-amenities');
  amenEl.innerHTML = '';
  room.amenities.forEach(a => {
    const div = document.createElement('div');
    const cls = a.type === 'included' ? 'included' : 'extra';
    const note = a.note ? ` <span style="color:#64748b">(${a.note})</span>` : '';
    const icon = a.type === 'included' ? '✅' : '➕';
    div.className = `amenity-item ${cls}`;
    div.innerHTML = `${icon} ${a.label}${note}`;
    amenEl.appendChild(div);
  });

  // Show/hide reserve button
  document.getElementById('btn-reserve').style.display = (room.status === 'mine') ? 'none' : '';

  // Reset promo
  document.getElementById('promo-code').value = '';
  document.getElementById('promo-result').style.display = 'none';

  openModal('modal-room-detail');
}

// ── Promo Code ─────────────────────────────────────────────
function applyPromo() {
  const code = document.getElementById('promo-code').value.trim().toUpperCase();
  const resultEl = document.getElementById('promo-result');
  const promos = {
    'WELCOME10': '✅ Promo applied! 10% off your first month.',
    'REFERRAL200': '✅ Referral promo applied! ₱200 off first month.'
  };
  if (promos[code]) {
    resultEl.textContent = promos[code];
    resultEl.style.display = 'block';
    showToast('🎉 Promo code applied!', 'success');
  } else {
    resultEl.textContent = '❌ Invalid or expired promo code.';
    resultEl.style.color = '#f87171';
    resultEl.style.display = 'block';
  }
}

// ── Reservation Flow ───────────────────────────────────────
function startReservation() {
  document.getElementById('view-details').style.display = 'none';
  document.getElementById('view-reserve').style.display = '';
  document.getElementById('reserve-steps-indicator').style.display = 'flex';
  currentReservationStep = 1;
  showResStep(1);
}

function startHoldReservation() {
  if (!currentRoom) return;
  showToast('⏳ Hold reservation started for ' + currentRoom.unit + '. You have 7 days.', 'success');
  setTimeout(() => closeModal('modal-room-detail'), 1800);
}

function nextResStep(step) {
  // Basic validation for step 2
  if (step === 3) {
    const ref = document.getElementById('res-ref').value.trim();
    if (!ref) { showToast('⚠️ Please enter a reference number.', 'error'); return; }
    // Populate confirmation
    document.getElementById('conf-room').textContent = currentRoom ? currentRoom.unit : '—';
    document.getElementById('conf-date').textContent = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  showResStep(step);
}

function showResStep(step) {
  currentReservationStep = step;
  ['res-step-1','res-step-2','res-step-3'].forEach((s,i) => {
    document.getElementById(s).classList.toggle('active', i === step - 1);
  });
  updateStepDots(step);
  document.getElementById('step-label-text').textContent = `Step ${step} of 3`;
}

function updateStepDots(step) {
  for (let i = 1; i <= 3; i++) {
    document.getElementById('sdot-' + i).classList.toggle('active', i <= step);
  }
}

// Payment method selection in reservation modal
document.addEventListener('click', function(e) {
  const opt = e.target.closest('#res-pay-grid .pay-opt');
  if (opt) {
    document.querySelectorAll('#res-pay-grid .pay-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  }
});

// ── Report System ──────────────────────────────────────────
function selectReportType(el, type) {
  document.querySelectorAll('.report-type-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedReportType = type;
}

function submitReport() {
  showToast('🚩 Report submitted! Ticket created.', 'success');
  setTimeout(() => {
    closeModal('modal-report');
    // Reset form
    document.querySelectorAll('#modal-report input, #modal-report textarea').forEach(el => {
      if (el.type !== 'file') el.value = '';
    });
    document.getElementById('report-photo-preview').textContent = '';
  }, 1500);
}

// ── File previews ──────────────────────────────────────────
function previewReceipt(input) {
  const file = input.files[0];
  if (file) {
    document.getElementById('res-receipt-preview').textContent = '📎 Attached: ' + file.name;
  }
}

function previewReportPhoto(input) {
  const file = input.files[0];
  if (file) {
    document.getElementById('report-photo-preview').textContent = '📷 Attached: ' + file.name;
  }
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
