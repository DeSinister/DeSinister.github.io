// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .education-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero title
document.addEventListener('DOMContentLoaded', function() {
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.2}s`;
    });
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Parallax effect for floating elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Skill tags hover effect
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project cards interaction
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });
});

// Timeline animation
const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        timelineObserver.observe(item);
    });
});

// Contact links animation
document.addEventListener('DOMContentLoaded', function() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Smooth reveal animation for page load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Scroll-controlled graduation video
function initializeGraduationAnimation() {
    const graduationAnimation = document.querySelector('.graduation-animation');
    const educationSection = document.querySelector('#education');
    const video = document.querySelector('.graduate-video');
    
    if (!graduationAnimation || !educationSection || !video) return;
    
    // Ensure video is loaded
    video.addEventListener('loadedmetadata', function() {
        // Mute the video to allow autoplay
        video.muted = true;
        
        // Set up scroll-based video control
        function updateVideoProgress() {
            const rect = educationSection.getBoundingClientRect();
            const sectionHeight = educationSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate progress based on scroll position
            const scrollProgress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (windowHeight + sectionHeight)
            ));
            
            // Update video time based on scroll progress
            const videoDuration = video.duration;
            if (videoDuration && !isNaN(videoDuration)) {
                video.currentTime = scrollProgress * videoDuration;
            }
            
            // Show animation when section is in view
            if (rect.top < windowHeight && rect.bottom > 0) {
                graduationAnimation.classList.add('animate');
            } else {
                graduationAnimation.classList.remove('animate');
            }
        }
        
        // Throttle scroll events for better performance
        let ticking = false;
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    updateVideoProgress();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        // Add scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial call
        updateVideoProgress();
    });
    
    // Load video metadata
    video.load();
}

// Scroll-controlled hero video
function initializeHeroAnimation() {
    const heroVideoAnimation = document.querySelector('.hero-video-animation');
    const heroSection = document.querySelector('#hero');
    const heroVideo = document.querySelector('.hero-video');
    
    if (!heroVideoAnimation || !heroSection || !heroVideo) return;
    
    // Ensure video is loaded
    heroVideo.addEventListener('loadedmetadata', function() {
        // Mute the video to allow autoplay
        heroVideo.muted = true;
        
        // Set up scroll-based video control
        function updateHeroVideoProgress() {
            const rect = heroSection.getBoundingClientRect();
            const sectionHeight = heroSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate progress based on scroll position
            const scrollProgress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (windowHeight + sectionHeight)
            ));
            
            // Update video time based on scroll progress
            const videoDuration = heroVideo.duration;
            if (videoDuration && !isNaN(videoDuration)) {
                heroVideo.currentTime = scrollProgress * videoDuration;
            }
            
            // Show animation when section is in view
            if (rect.top < windowHeight && rect.bottom > 0) {
                heroVideoAnimation.classList.add('animate');
            } else {
                heroVideoAnimation.classList.remove('animate');
            }
        }
        
        // Throttle scroll events for better performance
        let heroTicking = false;
        function handleHeroScroll() {
            if (!heroTicking) {
                requestAnimationFrame(function() {
                    updateHeroVideoProgress();
                    heroTicking = false;
                });
                heroTicking = true;
            }
        }
        
        // Add scroll listener
        window.addEventListener('scroll', handleHeroScroll, { passive: true });
        
        // Initial call
        updateHeroVideoProgress();
    });
    
    // Load video metadata
    heroVideo.load();
}

// Projects Carousel Functionality
function initializeProjectsCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || !cards.length) return;
    
    let currentIndex = 0;
    
    function getCardsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }
    
    function getTotalSlides() {
        const cardsPerView = getCardsPerView();
        return Math.max(1, cards.length - cardsPerView + 1);
    }
    
    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        
        // Calculate how much to move: each slide moves by one card width
        let movePercentage;
        if (cardsPerView === 1) {
            // Mobile: move by 100% per slide
            movePercentage = currentIndex * 100;
        } else if (cardsPerView === 2) {
            // Tablet: move by 50% per slide (each card is 50% wide)
            movePercentage = currentIndex * 50;
        } else {
            // Desktop: move by 33.333% per slide (each card is 33.333% wide)
            movePercentage = currentIndex * 33.333;
        }
        
        track.style.transform = `translateX(-${movePercentage}%)`;
        
        // Update indicators
        const totalSlides = getTotalSlides();
        indicators.forEach((indicator, index) => {
            if (index < totalSlides) {
                indicator.style.display = 'block';
                indicator.classList.toggle('active', index === currentIndex);
            } else {
                indicator.style.display = 'none';
            }
        });
        
        // Update button states
        if (prevBtn && nextBtn) {
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= totalSlides - 1 ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
            nextBtn.style.pointerEvents = currentIndex >= totalSlides - 1 ? 'none' : 'auto';
        }
    }
    
    function nextSlide() {
        const totalSlides = getTotalSlides();
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const totalSlides = getTotalSlides();
            if (index < totalSlides) {
                currentIndex = index;
                updateCarousel();
            }
        });
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const totalSlides = getTotalSlides();
            if (currentIndex >= totalSlides) {
                currentIndex = Math.max(0, totalSlides - 1);
            }
            updateCarousel();
        }, 250);
    });
    
    // Auto-play carousel (optional - can be removed if not wanted)
    let autoPlayInterval = setInterval(() => {
        const totalSlides = getTotalSlides();
        if (currentIndex < totalSlides - 1) {
            nextSlide();
        } else {
            currentIndex = 0;
            updateCarousel();
        }
    }, 5000);
    
    // Pause auto-play on hover
    const carousel = document.querySelector('.projects-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                const totalSlides = getTotalSlides();
                if (currentIndex < totalSlides - 1) {
                    nextSlide();
                } else {
                    currentIndex = 0;
                    updateCarousel();
                }
            }, 5000);
        });
    }
    
    // Initial update
    updateCarousel();
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    // Initialize hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Initialize animations
    initializeGraduationAnimation();
    initializeHeroAnimation();
    initializeProjectsCarousel();
    
    // Trigger initial animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 
