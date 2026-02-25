/* ============================================
   BLOCKBAY — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ----- Navbar: scroll handling ----- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('glass');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('glass');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ----- Mobile menu ----- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navOverlay.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  /* ----- Scroll reveal (Intersection Observer) ----- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ----- Stat counter animation ----- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '+';
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + (progress >= 1 ? suffix : '');
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ----- Contact form handling ----- */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name');
      var company = document.getElementById('company');
      var email = document.getElementById('email');
      var phone = document.getElementById('phone');
      var message = document.getElementById('message');
      var consent = document.getElementById('consent');
      var valid = true;

      // Reset styles
      [name, company, email, phone, message].forEach(function (input) {
        input.style.borderColor = '';
      });

      // Validate required fields
      [name, company, email, phone, message].forEach(function (input) {
        if (!input.value.trim()) {
          input.style.borderColor = '#EF4444';
          valid = false;
        }
      });

      // Validate email format
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#EF4444';
        valid = false;
      }

      // Validate consent
      if (!consent.checked) {
        consent.parentElement.style.color = '#EF4444';
        valid = false;
      } else {
        consent.parentElement.style.color = '';
      }

      if (!valid) return;

      // Simulate submission
      var btn = contactForm.querySelector('.btn-submit');
      var originalText = btn.textContent;
      btn.textContent = '전송 중...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = '신청이 완료되었습니다 ✓';
        btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1200);
    });
  }

  /* ----- Touch support for flip cards on mobile ----- */
  if ('ontouchstart' in window) {
    var flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(function (card) {
      card.addEventListener('click', function () {
        // Toggle flipped state for touch devices
        var inner = card.querySelector('.flip-card-inner');
        if (inner.style.transform === 'rotateY(180deg)') {
          inner.style.transform = '';
        } else {
          inner.style.transform = 'rotateY(180deg)';
        }
      });
    });
  }
})();
