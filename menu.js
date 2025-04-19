document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeButton = document.getElementById('mobile-menu-close');
    const desktopNav = document.getElementById('desktop-nav');
    const body = document.body;
    
    // Function to check screen size and adjust menu visibility
    function checkScreenSize() {
        if (window.innerWidth <= 1300) {
            // Mobile view
            mobileMenuButton.style.display = 'block';
            desktopNav.style.display = 'none';
        } else {
            // Desktop view
            mobileMenuButton.style.display = 'none';
            desktopNav.style.display = 'flex';
            mobileMenu.style.display = 'none';
            body.style.overflow = '';
        }
    }
    
    // Run on page load
    checkScreenSize();
    
    // Open menu when hamburger is clicked
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.style.display = 'flex';
        body.style.overflow = 'hidden';
    });
    
    // Close menu when X is clicked
    closeButton.addEventListener('click', function() {
        mobileMenu.style.display = 'none';
        body.style.overflow = '';
    });
    
    // Close menu when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            body.style.overflow = '';
        });
    });
    
    // Check screen size on resize
    window.addEventListener('resize', checkScreenSize);
});
