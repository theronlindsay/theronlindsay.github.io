const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Hide menu when a nav link is clicked (for mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuIcon.classList.remove('active');
    }
  });
});

// Scroll animations for portfolio cards
const portfolioCards = document.querySelectorAll('.portfolio-card');

const observerOptions = {
  root: null, // relative to document viewport 
  rootMargin: '0px',
  threshold: 0.1 // 10% of item has to be visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
}, observerOptions);

portfolioCards.forEach(card => {
  observer.observe(card);
});

// Skills dropdown functionality
const skillHeaders = document.querySelectorAll('.skill-header');

skillHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const skillId = header.getAttribute('data-skill');
    const skillContent = document.getElementById(skillId);
    const dropdownArrow = header.querySelector('.dropdown-arrow');
    
    // Toggle active states
    header.classList.toggle('active');
    skillContent.classList.toggle('active');
    
    // Close other dropdowns (optional - uncomment for accordion behavior)
    // skillHeaders.forEach(otherHeader => {
    //   if (otherHeader !== header) {
    //     const otherSkillId = otherHeader.getAttribute('data-skill');
    //     const otherSkillContent = document.getElementById(otherSkillId);
    //     otherHeader.classList.remove('active');
    //     otherSkillContent.classList.remove('active');
    //   }
    // });
  });
});

// Video player functionality for portfolio cards
const videoToggleBtns = document.querySelectorAll('.video-toggle-btn');
const videoCloseBtns = document.querySelectorAll('.video-close-btn');

videoToggleBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent event bubbling
    
    const portfolioCard = btn.closest('.portfolio-card');
    const header = btn.closest('.portfolio-card-header');
    const dropdown = portfolioCard.querySelector('.portfolio-video-dropdown');
    const iframe = dropdown.querySelector('iframe');
    const videoUrl = header.getAttribute('data-video');
    
    // Close any other open video dropdowns
    document.querySelectorAll('.portfolio-video-dropdown.active').forEach(activeDropdown => {
      if (activeDropdown !== dropdown) {
        activeDropdown.classList.remove('active');
        activeDropdown.closest('.portfolio-card').querySelector('.video-toggle-btn').classList.remove('active');
        // Clear the iframe src to stop video
        activeDropdown.querySelector('iframe').src = '';
      }
    });
    
    // Toggle current dropdown
    const isActive = dropdown.classList.contains('active');
    
    if (isActive) {
      // Close dropdown
      dropdown.classList.remove('active');
      btn.classList.remove('active');
      iframe.src = ''; // Stop video by clearing src
    } else {
      // Open dropdown
      dropdown.classList.add('active');
      btn.classList.add('active');
      iframe.src = videoUrl; // Load video
    }
  }, { passive: false }); // Non-passive since we need preventDefault
});

videoCloseBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent event bubbling
    
    const portfolioCard = btn.closest('.portfolio-card');
    const dropdown = portfolioCard.querySelector('.portfolio-video-dropdown');
    const toggleBtn = portfolioCard.querySelector('.video-toggle-btn');
    const iframe = dropdown.querySelector('iframe');
    
    // Close dropdown
    dropdown.classList.remove('active');
    toggleBtn.classList.remove('active');
    iframe.src = ''; // Stop video by clearing src
  }, { passive: false }); // Non-passive since we need preventDefault
});

// Close video dropdowns when clicking outside
document.addEventListener('click', (e) => {
  // Only handle clicks, not scroll events or other pointer events
  if (e.type === 'click' && !e.target.closest('.portfolio-card')) {
    document.querySelectorAll('.portfolio-video-dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
      dropdown.closest('.portfolio-card').querySelector('.video-toggle-btn').classList.remove('active');
      dropdown.querySelector('iframe').src = '';
    });
  }
}, { passive: true }); // Use passive event listener to not block scrolling

// Close video dropdowns when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.portfolio-video-dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
      dropdown.closest('.portfolio-card').querySelector('.video-toggle-btn').classList.remove('active');
      dropdown.querySelector('iframe').src = '';
    });
  }
});
