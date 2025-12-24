/**
 * ORKA ASP - "The Void" Cinematic Core
 * Features: Spotlight Tracking, Parallax, Grain Animation
 */

document.addEventListener('DOMContentLoaded', () => {
    initSpotlight();
    initCinematicScroll();
    initHeaderLogic();
    initUI();

    // AOS Init
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1500,
            easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
            once: true,
            offset: 100
        });
    }
});

/* ------------------------------------------------------------------
   SPOTLIGHT CURSOR
------------------------------------------------------------------ */
function initSpotlight() {
    const spotlight = document.querySelector('.spotlight-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Update CSS variable for the spotlight gradient center
        if (spotlight) {
            spotlight.style.setProperty('--x', `${x}px`);
            spotlight.style.setProperty('--y', `${y}px`);
        }

        // Custom Cursor movement
        if (cursorDot) {
            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;
        }
        if (cursorOutline) {
            cursorOutline.animate({
                left: `${x}px`,
                top: `${y}px`
            }, { duration: 500, fill: "forwards" });
        }
    });

    // Hover states (Scale cursor)
    const interactables = document.querySelectorAll('a, button, .btn, .faq-question');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) cursorOutline.style.transform = 'translate(-50%, -50%) scale(2)';
            if (cursorDot) cursorDot.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline) cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            if (cursorDot) cursorDot.style.opacity = '1';
        });
    });
}

/* ------------------------------------------------------------------
   CINEMATIC SCROLL PARALLAX
------------------------------------------------------------------ */
function initCinematicScroll() {
    const parallaxElements = document.querySelectorAll('.hero-content, .feature-card, .plan-card, .story-card, .about-image');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxElements.forEach((el, index) => {
            const speed = 0.05 + (index % 3) * 0.02; // Varied speeds
            const yPos = -(scrolled * speed);

            // Apply subtle parallax translation
            // Use requestAnimationFrame for performance optimization in real production
            el.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Fade in elements on scroll (Intersection Observer already handled by AOS, 
    // but we add manual reveal for smooth luxury feel if needed)
}

/* ------------------------------------------------------------------
   HEADER LOGIC
------------------------------------------------------------------ */
function initHeaderLogic() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            header.style.background = 'rgba(0,0,0,0.8)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.classList.remove('scrolled');
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });
}

/* ------------------------------------------------------------------
   UI INTERACTIONS
------------------------------------------------------------------ */
function initUI() {
    // FAQ Accordion
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('active');

            // Close all first
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.display = 'none';
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });

    // Mobile Menu Toggle
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isVisible = menu.style.display === 'flex';
            menu.style.display = isVisible ? 'none' : 'flex';

            if (!isVisible) {
                // Quick mobile style injection
                menu.style.flexDirection = 'column';
                menu.style.position = 'fixed';
                menu.style.top = '0';
                menu.style.left = '0';
                menu.style.width = '100vw';
                menu.style.height = '100vh';
                menu.style.background = '#000';
                menu.style.justifyContent = 'center';
                menu.style.alignItems = 'center';
                menu.style.zIndex = '999';
            }
        });
    }
}