document.addEventListener('DOMContentLoaded', () => {
    const roleOptions = document.querySelectorAll('.role-opt');
    const signInLink = document.querySelector('a[href="landlord-overview.html"]');

    roleOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            // Prevent the link from refreshing the page
            e.preventDefault();

            // 1. Remove 'selected' class from all options
            roleOptions.forEach(opt => opt.classList.remove('selected'));

            // 2. Add 'selected' class to the clicked option
            option.classList.add('selected');

            // 3. Update the button destination based on the text content
            if (option.textContent.includes('Tenant')) {
                // Point to the Tenant Dashboard
                signInLink.setAttribute('href', '../TENANT DASHBOARD/tenant-overview.html');
            } else {
                // Point to the Landlord Dashboard
                signInLink.setAttribute('href', '../LANDLORD DASHBOARD/landlord-overview.html');
            }
        });
    });
});