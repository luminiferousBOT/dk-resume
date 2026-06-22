/* ═══════════════════════════════════════════════════════════
   DEVASHISH KAUSHIK — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── NAVBAR SCROLL EFFECT ───────────────────────────────
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavScroll() {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ─── MOBILE MENU ────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close on link click
        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ─── SMOOTH SCROLL FOR NAV LINKS ────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── INTERSECTION OBSERVER — SCROLL ANIMATIONS ──────────
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.08}s`;
        observer.observe(card);
    });

    // Observe detail rows
    document.querySelectorAll('.detail-row, .detail-row-link').forEach((row, index) => {
        row.classList.add('animate-on-scroll');
        row.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(row);
    });

    // Observe section headers
    document.querySelectorAll('.section-header-row').forEach(header => {
        header.classList.add('animate-on-scroll');
        observer.observe(header);
    });

    // Observe about content
    document.querySelectorAll('.about-content, .about-banner').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });




    // ─── CONTACT FORM HANDLER ───────────────────────────────
    window.handleSubmit = function (e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // Animate button
        btn.textContent = 'sending...';
        btn.style.pointerEvents = 'none';

        // Simulate send (replace with real endpoint)
        setTimeout(() => {
            btn.textContent = 'sent ✓';
            btn.style.background = '#1a7a3a';

            // Construct mailto as fallback
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            window.open(`mailto:doraplex123@gmail.com?subject=${subject}&body=${body}`, '_blank');

            setTimeout(() => {
                btn.textContent = 'submit';
                btn.style.background = '';
                btn.style.pointerEvents = '';
                document.getElementById('contactForm').reset();
            }, 3000);
        }, 800);

        return false;
    };

    // ─── PARALLAX HERO NAME (disabled to prevent overlap) ─────────────────
    // Previously, this section continuously translated the hero name while scrolling,
    // which caused it to overlap the next sections ("recent work" header + content).
    // Keeping it disabled for a stable layout.

    // ─── STAGGERED ICON HOVER RIPPLE ────────────────────────
    document.querySelectorAll('.hero-icon-cell').forEach(cell => {
        cell.addEventListener('mouseenter', function () {
            const siblings = [...this.parentElement.children];
            const myIndex = siblings.indexOf(this);

            siblings.forEach((sib, i) => {
                if (i !== myIndex) {
                    const distance = Math.abs(i - myIndex);
                    const delay = distance * 40;
                    const scale = Math.max(0.92, 1 - distance * 0.02);
                    sib.style.transition = `transform 0.3s ease ${delay}ms`;
                    sib.style.transform = `scale(${scale})`;
                }
            });
        });

        cell.addEventListener('mouseleave', function () {
            const siblings = [...this.parentElement.children];
            siblings.forEach(sib => {
                sib.style.transition = 'transform 0.4s ease';
                sib.style.transform = 'scale(1)';
            });
        });
    });

    // ─── PAGE LOAD ANIMATION ────────────────────────────────
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

    // ─── DETAIL ROW HOVER MOVEMENT DISABLED ─────────────────

})();
