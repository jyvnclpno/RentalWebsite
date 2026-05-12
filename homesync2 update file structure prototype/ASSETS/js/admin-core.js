/**
 * HOMESYNC ADMIN - UNIFIED SYSTEM CORE
 * Merged Features:
 * - Dynamic View/Review Engine
 * - Global Status Updater (Pending/Approve/Cancel)
 * - User Security (Password Reset)
 * - Search & Filter Logic
 */

const HomeSyncMaster = {
    activeRow: null,

    init() {
        this.injectGlobalStyles();
        this.createModal();
        this.createToastContainer();
        this.bindGlobalEvents();
        console.log("HomeSync Unified Core: Online");
    },

    // 1. DYNAMIC UI INJECTION
    injectGlobalStyles() {
        if (document.getElementById('hs-core-styles')) return;
        const style = document.createElement('style');
        style.id = 'hs-core-styles';
        style.innerHTML = `
            .hs-modal-bg { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:9999; align-items:center; justify-content:center; padding:20px; }
            .hs-modal-card { background:#1e293b; width:100%; max-width:500px; border-radius:12px; padding:24px; border:1px solid #334155; color:#cbd5e1; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); }
            .hs-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; color:white; font-size:1.1rem; font-weight:bold; }
            .hs-close { cursor:pointer; color:#64748b; font-size:24px; transition:0.2s; }
            .hs-close:hover { color:white; }
            .hs-detail-list { margin-bottom:20px; font-size:14px; }
            .hs-detail-item { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #2d3748; }
            .hs-detail-label { color:#64748b; font-weight:bold; text-transform:uppercase; font-size:11px; }
            .hs-actions { display:flex; gap:10px; margin-top:20px; flex-wrap:wrap; }
            #hs-toast-wrap { position:fixed; bottom:20px; right:20px; z-index:10000; }
            .hs-toast { background:#22c55e; color:white; padding:12px 24px; border-radius:8px; margin-top:10px; font-weight:bold; box-shadow:0 10px 15px -3px rgba(0,0,0,0.3); animation: hsSlideIn 0.3s ease; }
            @keyframes hsSlideIn { from { transform:translateX(50px); opacity:0; } to { transform:translateX(0); opacity:1; } }
        `;
        document.head.appendChild(style);
    },

    createModal() {
        if (document.getElementById('hs-master-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'hs-master-modal';
        modal.className = 'hs-modal-bg';
        modal.innerHTML = `
            <div class="hs-modal-card">
                <div class="hs-header"><span id="hs-m-title">Action Menu</span><span class="hs-close" onclick="HomeSyncMaster.closeModal()">&times;</span></div>
                <div id="hs-m-body" class="hs-detail-list"></div>
                <div id="hs-m-footer" class="hs-actions"></div>
            </div>`;
        document.body.appendChild(modal);
    },

    createToastContainer() {
        if (!document.getElementById('hs-toast-wrap')) {
            const wrap = document.createElement('div');
            wrap.id = 'hs-toast-wrap';
            document.body.appendChild(wrap);
        }
    },

    // 2. EVENT SYSTEM
    bindGlobalEvents() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const text = btn.innerText.toLowerCase();
            this.activeRow = btn.closest('tr');

            // View/Review Function
            if (text.includes('view') || text.includes('review')) {
                this.handleReviewFlow();
            } 
            // Reset Password Function
            else if (text.includes('reset pw')) {
                this.handleResetFlow();
            }
            // Direct Ban/Delete Function
            else if (text.includes('ban') || text.includes('suspend') || text.includes('🗑')) {
                if(confirm("Are you sure? This list will be updated immediately.")) {
                    this.updateRowStatus('Canceled', 'b-red');
                }
            }
        });

        // Universal Search Filter
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                document.querySelectorAll('tbody tr').forEach(row => {
                    row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
                });
            });
        }
    },

    // 3. CORE LOGIC ENGINES
    handleReviewFlow() {
        if (!this.activeRow) return;
        const headers = Array.from(document.querySelectorAll('thead th')).map(th => th.innerText);
        const cells = Array.from(this.activeRow.cells);
        
        document.getElementById('hs-m-title').innerText = "Detailed Review";
        let contentHtml = "";
        
        headers.forEach((h, i) => {
            if (h === "Actions" || h === "#" || h === "") return;
            contentHtml += `
                <div class="hs-detail-item">
                    <span class="hs-detail-label">${h}</span>
                    <span style="color:white;text-align:right">${cells[i].innerHTML}</span>
                </div>`;
        });

        document.getElementById('hs-m-body').innerHTML = contentHtml;
        document.getElementById('hs-m-footer').innerHTML = `
            <button class="btn-green" onclick="HomeSyncMaster.updateRowStatus('Approved', 'b-green')">✅ Approve</button>
            <button class="btn-outline-green" style="color:#fb923c; border-color:#fb923c" onclick="HomeSyncMaster.updateRowStatus('Pending', 'b-yellow')">⏳ Set Pending</button>
            <button class="btn-red" onclick="HomeSyncMaster.updateRowStatus('Canceled', 'b-red')">❌ Cancel</button>
        `;
        this.openModal();
    },

    handleResetFlow() {
        const userName = this.activeRow.cells[0].innerText.split('\n')[0];
        document.getElementById('hs-m-title').innerText = "Security: Reset Password";
        document.getElementById('hs-m-body').innerHTML = `<p>Generate and send a temporary login credential to <strong>${userName}</strong>?</p>`;
        document.getElementById('hs-m-footer').innerHTML = `
            <button class="btn-green" onclick="HomeSyncMaster.confirmReset()">Confirm Reset</button>
            <button class="btn-red" onclick="HomeSyncMaster.closeModal()">Close</button>
        `;
        this.openModal();
    },

    // 4. UPDATER & UI UTILS
    updateRowStatus(newStatus, cssClass) {
        if (!this.activeRow) return;
        const badge = this.activeRow.querySelector('.badge');
        if (badge) {
            badge.innerText = newStatus;
            badge.className = `badge ${cssClass}`;
            this.toast(`Status changed to ${newStatus}`);
        }
        this.closeModal();
    },

    confirmReset() {
        this.toast("🔑 Temporary password sent to user email.");
        this.closeModal();
    },

    openModal() { document.getElementById('hs-master-modal').style.display = 'flex'; },
    closeModal() { document.getElementById('hs-master-modal').style.display = 'none'; },

    toast(msg) {
        const t = document.createElement('div');
        t.className = 'hs-toast';
        t.innerText = msg;
        document.getElementById('hs-toast-wrap').appendChild(t);
        setTimeout(() => {
            t.style.opacity = '0';
            setTimeout(() => t.remove(), 500);
        }, 3000);
    }
};

// Start
document.addEventListener('DOMContentLoaded', () => HomeSyncMaster.init());