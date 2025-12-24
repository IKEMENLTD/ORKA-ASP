document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Initialize AOS (Animate On Scroll) ---
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });


    // --- 2. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close others
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });


    // --- 3. Mobile Menu Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Ensure we don't break if elements are missing
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            // Toggle active state
            const isActive = navMenu.classList.contains('active');

            if (isActive) {
                navMenu.classList.remove('active');
                navMenu.style.display = 'none'; // Or handle via CSS
                navToggle.classList.remove('open');
            } else {
                navMenu.classList.add('active');
                navMenu.style.display = 'flex'; // Force flex
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'fixed';
                navMenu.style.top = '70px'; // Below header
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = '#fffef8';
                navMenu.style.borderBottom = '3px solid #111';
                navMenu.style.padding = '2rem';
                navMenu.style.zIndex = '999';
                navToggle.classList.add('open');
            }
        });
    }


    // --- 4. Chart.js Initialization (Growth Chart) ---
    const ctx = document.getElementById('growthChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: '流通総額 (億円)',
                    data: [10, 25, 50, 90, 120, 150],
                    borderColor: '#2c67ff', // Pop Blue
                    backgroundColor: 'rgba(44, 103, 255, 0.1)',
                    borderWidth: 4,
                    pointBackgroundColor: '#ffcb05', // Pop Yellow
                    pointBorderColor: '#111',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    tension: 0, // Sharp lines for retro feel
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#111',
                        titleFont: { family: 'Outfit' },
                        bodyFont: { family: 'Outfit' },
                        padding: 10,
                        cornerRadius: 4,
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { family: 'Dela Gothic One' },
                            color: '#111'
                        }
                    },
                    y: {
                        border: { dash: [4, 4] },
                        grid: {
                            color: '#e5e5e5',
                            tickLength: 0
                        },
                        ticks: {
                            font: { family: 'Outfit' },
                            color: '#666'
                        }
                    }
                }
            }
        });
    }


    // --- 5. Ticker / Marquee Interaction (Optional) ---
    // If we want to clone the ticker for infinite loop without gaps
    const tickerWrap = document.querySelector('.ticker-wrap');
    if (tickerWrap) {
        // Implementation handled in CSS mostly
    }

});