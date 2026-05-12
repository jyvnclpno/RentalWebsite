/**
 * HOMESYNC ADMIN - VIEW/REVIEW MODULE
 * Dynamically handles the "Review" and "View" actions across all dashboard pages.
 */

const AdminViewSystem = {
    init() {
        this.injectStyles();
        this.createModal();
        this.bindEvents();
        console.log("View system initialized.");
    },

    // Inject required styles for the modal without touching CSS files
    injectStyles() {
        if (document.getElementById('view-styles')) return;
        const style = document.createElement('style');
        style.id = 'view-styles';
        style.innerHTML = `
            .hs-modal-overlay { 
                display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); 
                z-index: 9999; align-items: center; justify-content: center; padding: 20px; 
            }
            .hs-modal-card { 
                background: #1e293b; width: 100%; max-width: 550px; border-radius: 12px; 
                padding: 24px; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
            }
            .hs-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .hs-modal-title { color: white; font-size: 1.25rem; font-weight: bold; }
            .hs-modal-close { cursor: pointer; color: #94a3b8; font-size: 24px; }
            .hs-detail-group { margin-bottom: 15px; border-bottom: 1px solid #2d3748; padding-bottom: 10px; }
            .hs-label { color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold; }
            .hs-value { color: #cbd5e1; font-size: 14px; margin-top: 4px; }
            .hs-actions { display: flex; gap: 10px; margin-top: 25px; }
        `;
        document.head.appendChild(style);
    },

    createModal() {
        if (document.getElementById('hs-view-modal')) return;
        const modalHtml = `
            <div id="hs-view-modal" class="hs-modal-overlay">
                <div class="hs-modal-card">
                    <div class="hs-modal-header">
                        <div class="hs-modal-title" id="vm-title">Details</div>
                        <span class="hs-modal-close" onclick="AdminViewSystem.close()">&times;</span>
                    </div>
                    <div id="vm-content"></div>
                    <div class="hs-actions">
                        <button class="btn-green" onclick="AdminViewSystem.action('Resolved/Approved')">✅ Resolve / Approve</button>
                        <button class="btn-outline-green" style="color:#fb923c; border-color:#fb923c" onclick="AdminViewSystem.action('Standby')">⏳ Standby</button>
                        <button class="btn-red" onclick="AdminViewSystem.action('Declined/Suspended')">❌ Decline</button>
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    bindEvents() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const text = btn.innerText.toLowerCase();
            if (text.includes('review') || text.includes('view')) {
                const row = btn.closest('tr');
                if (row) this.open(row);
            }
        });
    },

    open(row) {
        this.activeRow = row;
        const content = document.getElementById('vm-content');
        const title = document.getElementById('vm-title');
        
        // Extract data from row columns dynamically
        const cells = Array.from(row.cells);
        const headers = Array.from(document.querySelectorAll('thead th')).map(th => th.innerText);
        
        title.innerText = `Reviewing: ${cells[0].innerText}`;
        content.innerHTML = '';

        headers.forEach((header, index) => {
            if (header === 'Actions' || header === '#') return;
            
            const group = document.createElement('div');
            group.className = 'hs-detail-group';
            group.innerHTML = `
                <div class="hs-label">${header}</div>
                <div class="hs-value">${cells[index].innerHTML}</div>
            `;
            content.appendChild(group);
        });

        document.getElementById('hs-view-modal').style.display = 'flex';
    },

    action(decision) {
        if (!this.activeRow) return;
        
        // Find the status badge in the row and update it
        const badge = this.activeRow.querySelector('.badge');
        if (badge) {
            badge.innerText = decision;
            badge.className = 'badge ' + (decision.includes('Approve') ? 'b-green' : decision === 'Standby' ? 'b-blue' : 'b-red');
        }

        alert(`System: Report has been set to ${decision}`);
        this.close();
    },

    close() {
        document.getElementById('hs-view-modal').style.display = 'none';
    }
};

// Start the module
document.addEventListener('DOMContentLoaded', () => AdminViewSystem.init());