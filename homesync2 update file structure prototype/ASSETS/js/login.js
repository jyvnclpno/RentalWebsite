document.addEventListener('DOMContentLoaded', () => {
    const roleOptions = document.querySelectorAll('.role-opt');
    // Targets the <a> tag wrapping the "Sign in" button
    const signInLink = document.querySelector('.btn-green-full').parentElement;

    roleOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. UI Update: Toggle 'selected' class
            roleOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            // 2. Logic Update: Change destination based on selected role
            // We use trim() to handle any accidental whitespace in the HTML
            const selectedRole = option.textContent.trim();

            if (selectedRole.includes('Tenant')) {
                // Path for Tenant Dashboard
                signInLink.setAttribute('href', '../TENANT DASHBOARD/tenant-overview.html');
                console.log("Mode: Tenant");
            } else {
                // Path for Landlord Dashboard
                signInLink.setAttribute('href', '../LANDLORD DASHBOARD/landlord-overview.html');
                console.log("Mode: Landlord");
            }
        });
    });
});
