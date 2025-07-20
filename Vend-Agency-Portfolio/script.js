// ===== PRELOADER =====
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader');
  
  // Minimum display time (1.5s) + wait for full load
  setTimeout(function() {
      function hidePreloader() {
          preloader.style.opacity = '0';
          preloader.style.pointerEvents = 'none';
          
          // Remove after transition completes
          setTimeout(function() {
              preloader.style.display = 'none';
          }, 500);
      }

      // Try to wait for window load first
      if (document.readyState === 'complete') {
          hidePreloader();
      } else {
          window.addEventListener('load', hidePreloader);
          
          // Fallback in case load event never fires
          setTimeout(hidePreloader, 3000);
      }
  }, 1500); // Minimum show time

  // ===== DARK/LIGHT MODE TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');
  
  // Check for saved user preference
  if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
  }
  
  themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      
      if (body.classList.contains('dark-mode')) {
          localStorage.setItem('darkMode', 'enabled');
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
      } else {
          localStorage.setItem('darkMode', 'disabled');
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
      }
  });

  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
      });
  });

  // ===== FUNCTIONAL BUTTONS =====
  document.getElementById('viewWorkBtn')?.addEventListener('click', function(e) {
      e.preventDefault();
      // Smooth scroll to portfolio
      document.querySelector('#portfolio')?.scrollIntoView({
          behavior: 'smooth'
      });
  });

  document.getElementById('getMockupBtn')?.addEventListener('click', function(e) {
      e.preventDefault();
      // Smooth scroll to contact
      document.querySelector('#contact')?.scrollIntoView({
          behavior: 'smooth'
      });
      
      // Show confirmation message
      const message = document.createElement('div');
      message.textContent = 'Redirecting to WhatsApp...';
      message.style.position = 'fixed';
      message.style.bottom = '20px';
      message.style.left = '50%';
      message.style.transform = 'translateX(-50%)';
      message.style.backgroundColor = 'var(--accent)';
      message.style.color = 'white';
      message.style.padding = '10px 20px';
      message.style.borderRadius = '50px';
      message.style.zIndex = '1000';
      message.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
      document.body.appendChild(message);
      
      setTimeout(() => {
          message.style.opacity = '0';
          setTimeout(() => {
              message.remove();
              // Actual WhatsApp redirect (replace with your number)
              window.location.href = 'https://wa.me/234YOURNUMBER';
          }, 500);
      }, 2000);
  });

  // ===== LOGO INTERACTION =====
  const logoPlaceholder = document.querySelector('.logo-placeholder-inner');
  if (logoPlaceholder) {
      logoPlaceholder.addEventListener('click', function() {
          this.style.animation = 'none';
          this.offsetHeight; // Trigger reflow
          this.style.animation = 'logoPulse 2s infinite alternate';
          
          // Scroll to top
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
          const item = question.parentElement;
          const answer = question.nextElementSibling;
          
          if (item.classList.contains('active')) {
              answer.style.maxHeight = null;
              item.classList.remove('active');
          } else {
              answer.style.maxHeight = answer.scrollHeight + 'px';
              item.classList.add('active');
          }
      });
  });

  // ===== SCROLL ANIMATIONS =====
  const animateOnScroll = () => {
      document.querySelectorAll('.animate').forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
              element.classList.add('animate');
          }
      });
  };
  
  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);

  // ===== INTERACTIVE HERO SHAPES (MOBILE) =====
  if (window.innerWidth <= 768) {
      const heroShapes = document.querySelectorAll('.hero-shape');
      let touchStartX, touchStartY;

      document.addEventListener('touchstart', (e) => {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
      }, { passive: true });

      document.addEventListener('touchmove', (e) => {
          if (!touchStartX || !touchStartY) return;
          
          const touchX = e.touches[0].clientX;
          const touchY = e.touches[0].clientY;
          
          const diffX = touchX - touchStartX;
          const diffY = touchY - touchStartY;
          
          heroShapes.forEach((shape, index) => {
              const factorX = (index % 2 === 0) ? 0.3 : -0.3;
              const factorY = (index % 3 === 0) ? 0.2 : -0.2;
              shape.style.transform = `translate(${diffX * factorX}px, ${diffY * factorY}px)`;
          });
      }, { passive: true });

      document.addEventListener('touchend', () => {
          heroShapes.forEach(shape => {
              shape.style.transform = 'translate(0, 0)';
          });
      }, { passive: true });
  }

  // ===== PRICING TABS =====
  document.querySelectorAll('.pricing-tab').forEach(tab => {
      tab.addEventListener('click', () => {
          document.querySelectorAll('.pricing-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
      });
  });
});