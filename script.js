function syncExperienceContent() {
  const desktopItems = document.querySelectorAll('[class*="desktop-experience-"]');
  desktopItems.forEach((desktopItem) => {
    const match = desktopItem.className.match(/desktop-experience-(\d+)/);
    if (match) {
      const itemNumber = match[1];
      const mobileItem = document.querySelector(`.mobile-experience-${itemNumber}`);
      if (mobileItem) {
        mobileItem.innerHTML = desktopItem.innerHTML;
        mobileItem.classList.add('p-4');
        mobileItem.classList.remove('p-6');
      }
    }
  });
}

// Enhanced Portfolio JavaScript - Consistent Content Across All Screens
document.addEventListener('DOMContentLoaded', function () {
  // Cache DOM elements
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');
  const body = document.body;
  const navLinks = document.querySelectorAll('#mobile-menu a, #nav-menu a');

  // Ensure required elements exist
  if (!navbar) {
    console.error('Navbar element not found');
    return;
  }

  // Initialize all functionality
  initializeHomeAnimations();
  initializeProjectToggle();
  syncExperienceContent();

  // Add sticky class to navbar
  navbar.classList.add('navbar-sticky');

  // Mobile menu functionality
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  // Navigation link handlers
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Close mobile menu
      closeMobileMenu();

      // Handle anchor links
      if (href && href.startsWith('#')) {
        e.preventDefault();
        scrollToSection(href.substring(1));
      }
    });
  });

  // Optimized scroll handler
  let scrollTimeout;
  window.addEventListener('scroll', function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 10);
  });

  // Button click handlers
  initializeButtonHandlers();

  // Initialize animations with delay
  setTimeout(initializeAnimations, 100);

  // Handle viewport changes
  handleViewportChanges();
});

// Mobile menu functions
function toggleMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  const body = document.body;

  if (hamburger && mobileMenu && overlay) {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('hidden');
    body.classList.toggle('menu-open');
  }
}

function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  const body = document.body;

  if (hamburger && mobileMenu && overlay) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    overlay.classList.add('hidden');
    body.classList.remove('menu-open');
  }
}

// Scroll handling
function handleScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 20) {
    navbar.classList.add('navbar-scrolled');
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.classList.remove('navbar-scrolled');
    navbar.style.backgroundColor = 'rgb(255, 255, 255)';
    navbar.style.boxShadow = 'none';
  }
}

// Initialize button handlers
function initializeButtonHandlers() {
  const viewWorkBtn = document.getElementById('get-in-touch-btn');
  if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', function () {
      scrollToSection('projects');
    });
  }

  // Project card interactions
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const codeBtn = card.querySelector('.project-code-btn');
    const demoBtn = card.querySelector('.project-demo-btn');

    if (codeBtn) {
      codeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const projectUrl = this.getAttribute('data-url') || 'https://github.com/varshiths/project-repo';
        window.open(projectUrl, '_blank');
      });
    }

    if (demoBtn) {
      demoBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const demoUrl = this.getAttribute('data-url') || 'https://your-project-demo.com';
        window.open(demoUrl, '_blank');
      });
    }
  });
}

// Initialize home section animations
function initializeHomeAnimations() {
  const homeSection = document.getElementById('home');
  if (!homeSection) return;

  // Animate hero content elements
  const heroContent = homeSection.querySelector('.text-center');
  const profileImage = homeSection.querySelector('.flex.justify-center');

  if (heroContent) {
    const elements = heroContent.querySelectorAll('h1, h2, p, .flex');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `all 0.6s ease ${index * 0.1}s`;

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50 + (index * 100));
    });
  }

  if (profileImage) {
    profileImage.style.opacity = '0';
    profileImage.style.transform = 'translateY(30px) scale(0.9)';
    profileImage.style.transition = 'all 0.8s ease 0.3s';

    setTimeout(() => {
      profileImage.style.opacity = '1';
      profileImage.style.transform = 'translateY(0) scale(1)';
    }, 100);
  }
}

// Initialize project toggle functionality - CONSISTENT CONTENT
function initializeProjectToggle() {
  const projectCards = document.querySelectorAll('#projects .project-card');
  const showMoreBtn = document.getElementById('show-more-btn');
  const showMoreContainer = document.getElementById('show-more-container');

  if (!showMoreBtn || !showMoreContainer || projectCards.length === 0) {
    return;
  }

  let isExpanded = false;

  // FIXED: Same visible count for all screen sizes
  const INITIAL_VISIBLE_COUNT = 3; // Consistent across all devices

  // Update project visibility - NO RESPONSIVE CHANGES
  function updateProjectVisibility() {
    projectCards.forEach((card, index) => {
      if (index >= INITIAL_VISIBLE_COUNT && !isExpanded) {
        card.style.display = 'none';
        card.classList.add('hidden-project');
      } else {
        card.style.display = 'block';
        card.classList.remove('hidden-project');

        // Animate newly visible cards
        if (isExpanded && index >= INITIAL_VISIBLE_COUNT) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(40px) scale(0.95)';
          card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, (index - INITIAL_VISIBLE_COUNT) * 150);
        }
      }
    });

    // Update button text
    showMoreBtn.innerHTML = isExpanded
      ? '<i class="fas fa-chevron-up mr-2"></i>Show Less Projects'
      : '<i class="fas fa-chevron-down mr-2"></i>Show More Projects';
  }

  // Show/hide button based on project count
  if (projectCards.length <= INITIAL_VISIBLE_COUNT) {
    showMoreContainer.style.display = 'none';
  } else {
    showMoreContainer.style.display = 'block';
    updateProjectVisibility();

    // Add click handler
    showMoreBtn.addEventListener('click', function () {
      isExpanded = !isExpanded;
      updateProjectVisibility();

      // Scroll to projects if collapsing
      if (!isExpanded) {
        setTimeout(() => scrollToSection('projects'), 300);
      }
    });
  }

  // REMOVED: Responsive resize handling - content stays consistent
  // No need to change visibility count on resize
}

// Initialize section animations - SAME FOR ALL SCREENS
function initializeAnimations() {
  // Intersection Observer for cards
  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Animate section headers - CONSISTENT TIMING
  const sectionHeaders = document.querySelectorAll(
    '#about h2, #about p, #skills h2, #skills p, #experience h2, #experience p, #projects h2, #projects p'
  );
  sectionHeaders.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.4s ease ${index * 0.1}s`;

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });

  // Animate cards - SAME TIMING FOR ALL SCREENS
  animateCards('#about .grid > div', 300, 150);
  animateCards('#skills .grid > div', 200, 100);

  // Observe experience and project cards - CONSISTENT BEHAVIOR
  observeCards('#experience .bg-white.rounded-2xl', cardObserver);
  observeCards('#projects .bg-white.rounded-2xl:not(.hidden-project)', cardObserver);
}

// Helper function to animate cards - NO SCREEN SIZE VARIATIONS
function animateCards(selector, initialDelay, staggerDelay) {
  const cards = document.querySelectorAll(selector);
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.4s ease ${index * 0.1}s`;

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, initialDelay + (index * staggerDelay));
  });
}

// Helper function to observe cards - CONSISTENT ACROSS DEVICES
function observeCards(selector, observer) {
  const cards = document.querySelectorAll(selector);
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
}

// Handle viewport changes - ONLY FOR MENU BEHAVIOR
function handleViewportChanges() {
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setVH();
  window.addEventListener('resize', () => {
    setVH();
    // Only handle menu closing, no content changes
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });
}

// Global utility functions - UNCHANGED
window.scrollToSection = function (sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerOffset = 80;
    const elementPosition = section.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

window.downloadResume = function () {
  try {
    const resumeURL = './documents/Varshith_S_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeURL;
    link.download = 'Varshith_S_Resume.pdf';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Resume download initiated');
  } catch (error) {
    console.error('Error downloading resume:', error);
    alert('Sorry, there was an error downloading the resume. Please try again.');
  }
};

window.openProjectCode = function (projectUrl) {
  if (projectUrl) {
    window.open(projectUrl, '_blank');
  }
};

window.openProjectDemo = function (demoUrl) {
  if (demoUrl) {
    window.open(demoUrl, '_blank');
  }
};

window.handleContactForm = function (event) {
  event.preventDefault();
  console.log('Contact form submitted');
  // Add your contact form logic here
};

console.log('Portfolio initialized successfully - Consistent content across all devices');
