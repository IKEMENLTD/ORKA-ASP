document.addEventListener('DOMContentLoaded', () => {

    // --- 0. iOS Safari 100vh 問題対策 ---
    const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', () => {
        setTimeout(setVh, 100);
    });

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
            // Toggle active state - CSSで全てのスタイリングを管理
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('open');

            // body スクロール制御（メニュー開放時）
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // メニュー外クリックで閉じる
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        // メニューリンククリックで閉じる
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('open');
                document.body.style.overflow = '';
            });
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