// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});

// Navbar scroll effect
const nav = document.querySelector('.main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        // Scroll Down
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        // Scroll Up
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Enhanced animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.tokenomics-card, .mission-box, .roadmap-card, .step-card, .community-card, .whitepaper-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.85;
        
        if(elementPosition < screenPosition) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Improved mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

function toggleMobileMenu() {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
}

mobileMenuButton.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenuButton.contains(e.target)) {
        toggleMobileMenu();
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Smooth scrolling with keyboard accessibility
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            target.focus();
        }
    });
});

// Add loading states to interactive elements
function addLoadingState(element) {
    element.classList.add('loading');
    element.setAttribute('aria-busy', 'true');
}

function removeLoadingState(element) {
    element.classList.remove('loading');
    element.setAttribute('aria-busy', 'false');
}

// Handle form submissions with accessibility
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        addLoadingState(form);
        
        try {
            // Form submission logic here
            await submitForm(form);
            
            // Success message
            const successMessage = document.createElement('div');
            successMessage.setAttribute('role', 'alert');
            successMessage.textContent = 'Form submitted successfully!';
            form.appendChild(successMessage);
        } catch (error) {
            // Error message
            const errorMessage = document.createElement('div');
            errorMessage.setAttribute('role', 'alert');
            errorMessage.setAttribute('aria-live', 'assertive');
            errorMessage.textContent = 'An error occurred. Please try again.';
            form.appendChild(errorMessage);
        } finally {
            removeLoadingState(form);
        }
    });
});

// Detect user preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');

function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
        // Disable animations
        document.body.classList.add('reduce-motion');
    } else {
        document.body.classList.remove('reduce-motion');
    }
}

function handleHighContrast() {
    if (prefersHighContrast.matches) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
}

prefersReducedMotion.addListener(handleReducedMotion);
prefersHighContrast.addListener(handleHighContrast);

// Initialize
handleReducedMotion();
handleHighContrast();

// Copy contract address to clipboard with improved feedback
const contractAddressElement = document.querySelector('.contract-address');
const copyHint = document.querySelector('.copy-hint');

if (contractAddressElement && copyHint) {
    contractAddressElement.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(contractAddressElement.textContent);
            copyHint.textContent = 'Copied!';
            copyHint.classList.add('success');
            
            setTimeout(() => {
                copyHint.textContent = 'Click to copy';
                copyHint.classList.remove('success');
            }, 2000);
        } catch (err) {
            copyHint.textContent = 'Failed to copy';
            copyHint.classList.add('error');
            
            setTimeout(() => {
                copyHint.textContent = 'Click to copy';
                copyHint.classList.remove('error');
            }, 2000);
        }
    });
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Smooth reveal animation for sections
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
});

// Animated Counter
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-value').forEach(stat => {
                const value = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                animateValue(stat, 0, value, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const liveStats = document.querySelector('.live-stats');
if (liveStats) {
    statsObserver.observe(liveStats);
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add floating animation to elements
document.querySelectorAll('.floating').forEach(element => {
    element.style.animationDelay = `${Math.random() * 2}s`;
});

// Optimize scroll behavior
let scrollTimeout = null;

window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            scrollTimeout = null;
        }, 100);
    }
});

// Reveal sections on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Particle effect interaction
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const speed = particle.dataset.speed || 1;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        particle.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Initialize AOS with optimized settings
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        disable: window.innerWidth < 768
    });
} 