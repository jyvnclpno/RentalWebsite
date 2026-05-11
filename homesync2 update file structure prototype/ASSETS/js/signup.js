document.addEventListener('DOMContentLoaded', () => {
    const roleOptions = document.querySelectorAll('.role-opt');
    const landlordFields = document.getElementById('landlord-only-fields');
    const signupForm = document.getElementById('signup-form');
    const occSelect = document.getElementById('occupation-select');
    const incomeLabel = document.getElementById('income-label');
    const otherGroup = document.getElementById('other-occupation-group');

    let selectedRole = 'tenant'; // Default is now tenant

    // 1. Role Switching Logic
    roleOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            roleOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            selectedRole = option.getAttribute('data-role');

            // Show landlord fields only if 'landlord' is selected
            if (selectedRole === 'landlord') {
                landlordFields.style.display = 'block';
                document.getElementById('business-permit').required = true;
                document.getElementById('property-location').required = true;
            } else {
                landlordFields.style.display = 'none';
                document.getElementById('business-permit').required = false;
                document.getElementById('property-location').required = false;
            }
        });
    });

    // 2. Occupation Logic (same as before)
    occSelect.addEventListener('change', () => {
        if (occSelect.value === 'other') {
            otherGroup.style.display = 'block';
        } else {
            otherGroup.style.display = 'none';
        }

        incomeLabel.textContent = (occSelect.value === 'undergrad') ? 'Monthly Allowance' : 'Monthly Salary';
    });

    // 3. Form Submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const pass = signupForm.querySelectorAll('input[type="password"]');
        if (pass[0].value !== pass[1].value) {
            alert("Passwords do not match!");
            return;
        }

        alert(`Account created successfully as a ${selectedRole}!`);
        window.location.href = 'login.html';
    });
});