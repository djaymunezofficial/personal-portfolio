
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollToTop();
    initScrollSpy();
    initScrollReveal();
});

/**
 * Toggles the mobile navigation menu.
 * Auto-closes menu when a link is clicked.
 */
function initMobileNav() {
    const nav = document.querySelector('nav');
    const navOpenBtn = document.getElementById('nav-toggle-open');
    const navCloseBtn = document.getElementById('nav-toggle-close');
    const navMenuLinks = document.querySelectorAll('.nav-links a');

    if (!nav || !navOpenBtn || !navCloseBtn) return;

    // Open menu
    navOpenBtn.addEventListener('click', () => {
        nav.classList.add('open');
    });

    // Close menu
    navCloseBtn.addEventListener('click', () => {
        nav.classList.remove('open');
    });

    // Close menu on link click
    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });
}

/**
 * Initializes the "Scroll to Top" button.
 * Shows/hides based on scroll position.
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top on click
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Highlights active navigation link based on scroll position.
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('.content-section, #hero');
    const navLinks = document.querySelectorAll('.nav-links a'); 

    if (sections.length === 0 || navLinks.length === 0) return;

    function changeNavOnScroll() {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 150px offset, highlights link just before section top hits
            if (window.pageYOffset >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update 'active' class on links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', changeNavOnScroll);
}

/**
 * Reveals elements as they are scrolled into view.
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    // Callback for Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                // Remove class to re-animate on every scroll
                entry.target.classList.remove('show');
            }
        });
    });

    // Observe all elements with the .reveal class
    revealElements.forEach((el) => observer.observe(el));
}