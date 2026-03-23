/**
 * Main JavaScript for Tao Wang's Personal Website
 */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // MOBILE NAVIGATION
  // ============================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // SCROLL REVEAL ANIMATION
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = function() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('visible');
      }
    });
  };

  // Run on load and scroll
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const navHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ============================================
  // PUBLICATION FILTER (Publications Page)
  // ============================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const publicationItems = document.querySelectorAll('.publication-item');

  if (filterButtons.length > 0 && publicationItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        publicationItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-type') === filterValue) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ============================================
  // ACTIVE NAV LINK HIGHLIGHT
  // ============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  // Add styles for back-to-top button
  const style = document.createElement('style');
  style.textContent = `
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: var(--primary, #7c2d2d);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .back-to-top:hover {
      background: var(--primary-dark, #5a1f1f);
      transform: translateY(-3px);
    }

    .back-to-top.visible {
      opacity: 1;
      visibility: visible;
    }

    @media (max-width: 768px) {
      .back-to-top {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
      }
    }
  `;
  document.head.appendChild(style);

  // Show/hide back-to-top button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ============================================
  // FORM VALIDATION (Contact Page)
  // ============================================
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const name = this.querySelector('input[name="name"]');
      const email = this.querySelector('input[name="email"]');
      const message = this.querySelector('textarea[name="message"]');

      let isValid = true;

      // Simple validation
      [name, email, message].forEach(field => {
        if (field && !field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          isValid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      // Email format validation
      if (email && email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          email.style.borderColor = '#e74c3c';
          isValid = false;
        }
      }

      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields correctly.');
      }
    });

    // Reset border color on input
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', function() {
        this.style.borderColor = '';
      });
    });
  }

  // ============================================
  // IMAGE LAZY LOADING FALLBACK
  // ============================================
  const images = document.querySelectorAll('img[onerror]');
  images.forEach(img => {
    img.addEventListener('error', function() {
      // The onerror attribute handles this, but we can add a class for styling
      this.classList.add('img-fallback');
    });
  });

  // ============================================
  // PRINT STYLES (for CV, etc.)
  // ============================================
  window.addEventListener('beforeprint', function() {
    document.body.classList.add('print-mode');
  });

  window.addEventListener('afterprint', function() {
    document.body.classList.remove('print-mode');
  });

});
