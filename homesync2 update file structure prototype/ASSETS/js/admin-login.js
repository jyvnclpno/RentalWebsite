document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('admin-login-form');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const submitBtn = document.getElementById('admin-submit-btn');
    const instruction = document.getElementById('admin-instruction');

    let currentStep = 1;

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (currentStep === 1) {
            // Logic after entering Email and Password
            const email = document.getElementById('admin-email').value;
            const pass = document.getElementById('admin-pass').value;

            if (email && pass) {
                // Transition to OTP step
                step1.style.display = 'none';
                step2.style.display = 'block';
                instruction.textContent = "Enter verification code";
                submitBtn.textContent = "Verify & Access";
                
                // Set the OTP field to required now that it's visible
                document.getElementById('admin-otp').required = true;
                
                currentStep = 2;
                console.log("Credentials accepted. Proceeding to OTP step.");
            }
        } else if (currentStep === 2) {
            // Logic after entering OTP
            const otpValue = document.getElementById('admin-otp').value;

            if (otpValue.length === 6) {
                console.log("OTP Verified. Redirecting to Admin Dashboard...");
                // Redirect to the dashboard
                window.location.href = '../ADMIN DASHBOARD/admin-overview.html';
            } else {
                alert("Please enter a valid 6-digit OTP.");
            }
        }
    });
});