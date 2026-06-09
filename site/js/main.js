/* ═══════════════════════════════════════════
   BCL — Shared JavaScript
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Navbar scroll ───────────────────── */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLogo = document.querySelector('.nav-logo');

  let menuOpen = false;

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
    if (window.scrollY > 50) navbar.classList.add('scrolled');
  }

  /* ── Mobile menu ─────────────────────── */
  function openMenu() {
    menuOpen = true;
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Force hamburger lines white on dark overlay
    if (hamburger) {
      hamburger.querySelectorAll('span').forEach(s => { s.style.background = '#fff'; });
    }
    if (navLogo) navLogo.style.color = '#fff';
  }

  function closeMenu() {
    menuOpen = false;
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburger) {
      hamburger.querySelectorAll('span').forEach(s => { s.style.background = ''; });
    }
    if (navLogo) navLogo.style.color = '';
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      if (menuOpen) { closeMenu(); } else { openMenu(); }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    });
  }

  /* ── Active nav highlighting ─────────── */
  (function () {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html') || (current === 'index.html' && href === './')) {
        link.classList.add('active');
      }
    });
  })();

  /* ── Scroll animations (Intersection Observer) ── */
  (function () {
    if (!('IntersectionObserver' in window)) { return; }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) { observer.observe(el); });
  })();

  /* ── Counter animation ───────────────── */
  (function () {
    if (!('IntersectionObserver' in window)) { return; }

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.count-up').forEach(function (el) { counterObserver.observe(el); });

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 2000;
      var start = performance.now();

      function update(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - (1 - progress) * (1 - progress);
        var current = Math.floor(eased * target);
        el.textContent = current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
  })();

  /* ── Back to Top ─────────────────────── */
  (function () {
    var btn = document.querySelector('.back-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  /* ── Tabs (Services page) ────────────── */
  (function () {
    var tabBtns = document.querySelectorAll('.tab-btn');
    var tabContents = document.querySelectorAll('.tab-content');
    if (!tabBtns.length || !tabContents.length) return;

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabContents.forEach(function (c) { c.classList.remove('active'); });
        btn.classList.add('active');
        var content = document.querySelector('.tab-content[data-tab="' + target + '"]');
        if (content) {
          content.classList.add('active');
          // On mobile, scroll the tab content into view
          if (window.innerWidth < 768) {
            setTimeout(function () {
              content.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        }
      });
    });
  })();

  /* ── Contact form ────────────────────── */
  (function () {
    var form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      var orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#059669';
        btn.style.borderColor = '#059669';
        form.reset();

        setTimeout(function () {
          btn.textContent = orig;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 3000);
      }, 1200);
    });
  })();

})();
