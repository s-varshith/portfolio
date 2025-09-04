// Enhanced JavaScript with immediate home animations and responsive project functionality
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');
  const body = document.body;
  const navLinks = document.querySelectorAll('#mobile-menu a, #nav-menu a');

  // Initialize all functionality
  initializeHomeAnimations();
  initializeProjectToggle();

  // Add sticky class to navbar
  navbar.classList.add('navbar-sticky');

  // Toggle mobile menu
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Enhanced smooth scrolling for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.offsetTop;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Navbar background change on scroll
  let scrollTimeout;
  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 20) {
        navbar.classList.add('navbar-scrolled');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.style.backgroundColor = 'rgb(255, 255, 255)';
        navbar.style.boxShadow = 'none';
      }
    }, 10);
  });

  // Button click handlers
  const viewWorkBtn = document.getElementById('get-in-touch-btn');

  if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', function () {
      console.log('View My Work clicked');
      document.getElementById('projects')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
        window.open('https://github.com/varshiths/project-repo', '_blank');
      });
    }

    if (demoBtn) {
      demoBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.open('https://your-project-demo.com', '_blank');
      });
    }
  });

  // Card-level Intersection Observer for Experience and Projects
  const cardObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

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
  }, cardObserverOptions);

  // Observe complete cards instead of individual elements
  setTimeout(() => {
    // Section headers (keep text animations for headers)
    const sectionHeaders = document.querySelectorAll('#about h2, #about p, #skills h2, #skills p, #experience h2, #experience p, #projects h2, #projects p');
    sectionHeaders.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `all 0.4s ease ${index * 0.1}s`;

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + (index * 100));
    });

    // About section cards (keep existing)
    const aboutCards = document.querySelectorAll('#about .grid > div');
    aboutCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `all 0.4s ease ${index * 0.1}s`;

      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 300 + (index * 150));
    });

    // Skills section cards (keep existing)
    const skillsCards = document.querySelectorAll('#skills .grid > div');
    skillsCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `all 0.4s ease ${index * 0.1}s`;

      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 + (index * 100));
    });

    // Work Experience Cards - Whole card animations
    const experienceCards = document.querySelectorAll('#experience .bg-white.rounded-2xl');
    experienceCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px) scale(0.95)';
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      cardObserver.observe(card);
    });

    // Project Cards - Only observe visible ones initially
    const projectCards = document.querySelectorAll('#projects .bg-white.rounded-2xl:not(.hidden-project)');
    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px) scale(0.95)';
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      cardObserver.observe(card);
    });

  }, 100);

  // Handle viewport changes
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    if (window.innerWidth >= 768) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
});

// Initialize immediate home section animations
function initializeHomeAnimations() {
  const homeSection = document.getElementById('home');
  if (!homeSection) return;

  // Animate hero content elements immediately
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

// Function to handle show more/less projects functionality with responsive limits
function initializeProjectToggle() {
  const projectCards = document.querySelectorAll('#projects .project-card');
  const showMoreBtn = document.getElementById('show-more-btn');
  const showMoreContainer = document.getElementById('show-more-container');
  let isExpanded = false;

  // Function to get the appropriate limit based on screen size
  function getInitialVisibleCount() {
    const screenWidth = window.innerWidth;

    // Medium screen (640px - 1023px): Show 4 projects
    if (screenWidth >= 640 && screenWidth < 1024) {
      return 4;
    }
    // Small and Large screens: Show 3 projects
    else {
      return 3;
    }
  }

  let initialVisibleCount = getInitialVisibleCount();

  // Hide projects beyond the initial count
  function updateProjectVisibility() {
    projectCards.forEach((card, index) => {
      if (index >= initialVisibleCount && !isExpanded) {
        card.style.display = 'none';
        card.classList.add('hidden-project');
      } else {
        card.style.display = 'block';
        card.classList.remove('hidden-project');

        // Trigger animation for newly visible cards when expanding
        if (isExpanded && index >= initialVisibleCount) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(40px) scale(0.95)';
          card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, (index - initialVisibleCount) * 150);
        }
      }
    });

    // Update button text and icon
    if (isExpanded) {
      showMoreBtn.innerHTML = '<i class="fas fa-chevron-up mr-2"></i>Show Less Projects';
    } else {
      showMoreBtn.innerHTML = '<i class="fas fa-chevron-down mr-2"></i>Show More Projects';
    }
  }

  // Show/hide the button based on project count
  if (projectCards.length <= initialVisibleCount) {
    if (showMoreContainer) {
      showMoreContainer.style.display = 'none';
    }
  } else {
    if (showMoreContainer) {
      showMoreContainer.style.display = 'block';
      updateProjectVisibility();

      // Add click event listener
      showMoreBtn.addEventListener('click', function () {
        isExpanded = !isExpanded;
        updateProjectVisibility();

        // Smooth scroll to projects section if collapsing
        if (!isExpanded) {
          setTimeout(() => {
            document.getElementById('projects').scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 300);
        }
      });
    }
  }

  // Handle window resize - recalculate limits
  function handleResize() {
    const newLimit = getInitialVisibleCount();

    // If the limit changed, reset the display
    if (newLimit !== initialVisibleCount) {
      initialVisibleCount = newLimit;
      isExpanded = false; // Reset expanded state
      updateProjectVisibility();

      // Show/hide button based on new limit
      if (projectCards.length <= initialVisibleCount) {
        if (showMoreContainer) {
          showMoreContainer.style.display = 'none';
        }
      } else {
        if (showMoreContainer) {
          showMoreContainer.style.display = 'block';
        }
      }
    }
  }

  // Add resize event listener with debouncing
  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
  });
}

// Resume download function
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

// Global utility functions
window.scrollToSection = function (sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Project interaction handlers
window.openProjectCode = function (projectUrl) {
  window.open(projectUrl, '_blank');
};

window.openProjectDemo = function (demoUrl) {
  window.open(demoUrl, '_blank');
};

// Contact form handling (if you add a contact form later)
window.handleContactForm = function (event) {
  event.preventDefault();
  console.log('Contact form submitted');
  // Add your contact form logic here
};

// Utility function to debounce events for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced scroll handler with debouncing
const debouncedScrollHandler = debounce(() => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const navbar = document.getElementById('navbar');

  if (scrollTop > 20) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
}, 10);

// Apply debounced scroll handler
window.addEventListener('scroll', debouncedScrollHandler);

// Initialize page
console.log('Portfolio initialized successfully');
