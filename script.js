// ASK FITNESS - Premium Futuristic Bodybuilding Coach Landing Page JavaScript
// Advanced animations, particle effects, and interactive features

// Global variables
let isLoading = true;
let particleSystem = null;
let statsAnimated = false;
let currentSection = 'home';

// Immediately hide loading screen
function hideLoadingScreen() {
    console.log('Hiding loading screen...');
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    isLoading = false;
    document.body.style.overflow = 'auto';
}

// Hide loading screen immediately and on events
hideLoadingScreen();
['DOMContentLoaded', 'load'].forEach(event => {
    document.addEventListener(event, hideLoadingScreen);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing ASK Fitness website...');
    
    initializeWebsite().then(() => {
        console.log('ASK Fitness website initialized successfully');
    }).catch((error) => {
        console.error('Failed to initialize website:', error);
    });
});

// Main initialization function
async function initializeWebsite() {
    try {
        // Initialize core systems
        setupEventListeners();
        initializeAnimations();
        initializeParticleSystem();
        setupScrollEffects();
        setupIntersectionObserver();
        setupVideoPlayer();
        setupFAQAccordion();
        setupContactForm();
        setupCounterAnimations();
        
        // Initialize advanced effects
        setupGlassmorphismEffects();
        setupNeonGlowEffects();
        setup3DEffects();
        
        console.log('All systems initialized successfully');
        
    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update current section
                currentSection = targetId.substring(1);
                updateActiveNavLink();
            }
        });
    });
    
    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Program card hover effects
    document.querySelectorAll('.program-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            createParticleExplosion(card);
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// Animation initialization
function initializeAnimations() {
    // Animate hero elements on load
    setTimeout(() => {
        animateHeroElements();
    }, 500);
    
    // Add scroll-triggered animations
    setupScrollAnimations();
}

// Hero elements animation
function animateHeroElements() {
    const heroElements = [
        '.hero-badge',
        '.hero-title .title-line',
        '.hero-subtitle',
        '.hero-stats',
        '.hero-buttons'
    ];
    
    heroElements.forEach((selector, index) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, elementIndex) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('animate-fade-in');
            }, (index * 200) + (elementIndex * 100));
        });
    });
}

// Particle System
function initializeParticleSystem() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    
    particleSystem = {
        container: particleContainer,
        particles: [],
        maxParticles: 50,
        
        create() {
            for (let i = 0; i < this.maxParticles; i++) {
                this.addParticle();
            }
            this.animate();
        },
        
        addParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            this.container.appendChild(particle);
            this.particles.push(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
                const index = this.particles.indexOf(particle);
                if (index > -1) {
                    this.particles.splice(index, 1);
                }
            }, 4000);
        },
        
        animate() {
            setInterval(() => {
                if (this.particles.length < this.maxParticles) {
                    this.addParticle();
                }
            }, 200);
        }
    };
    
    particleSystem.create();
}

// Create particle explosion effect
function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.zIndex = '9999';
        particle.style.pointerEvents = 'none';
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / 1000;
            
            if (progress < 1) {
                const x = centerX + vx * progress;
                const y = centerY + vy * progress + 0.5 * 500 * progress * progress;
                const opacity = 1 - progress;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.opacity = opacity;
                
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Scroll Effects
function setupScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Update progress bar
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const scrollHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollPercent = (scrollY / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
        
        // Update header
        const header = document.getElementById('header');
        if (header) {
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Update back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Parallax effects
        updateParallaxEffects(scrollY);
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Parallax effects
function updateParallaxEffects(scrollY) {
    // Hero background parallax
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        const speed = 0.5;
        heroVideo.style.transform = `translateY(${scrollY * speed}px)`;
    }
    
    // Floating icons parallax
    document.querySelectorAll('.floating-icon').forEach((icon, index) => {
        const speed = 0.2 + (index * 0.1);
        icon.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
    });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes
                if (element.classList.contains('program-card')) {
                    element.classList.add('animate-slide-up');
                } else if (element.classList.contains('stat-card')) {
                    element.classList.add('animate-slide-up');
                    // Trigger counter animation
                    if (!statsAnimated) {
                        animateCounters();
                        statsAnimated = true;
                    }
                } else if (element.classList.contains('achievement-item')) {
                    element.classList.add('animate-slide-left');
                } else if (element.classList.contains('contact-card')) {
                    element.classList.add('animate-slide-right');
                }
                
                // Update current section
                if (element.id) {
                    currentSection = element.id;
                    updateActiveNavLink();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('section, .program-card, .stat-card, .achievement-item, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

// Update active navigation link
function updateActiveNavLink() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Counter animations
function setupCounterAnimations() {
    // This will be triggered by intersection observer
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Video Player Setup
function setupVideoPlayer() {
    const playButton = document.getElementById('playButton');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoThumbnail = document.querySelector('.video-thumbnail');
    
    if (playButton && videoPlayer && videoThumbnail) {
        playButton.addEventListener('click', () => {
            videoThumbnail.style.display = 'none';
            videoPlayer.style.display = 'block';
            
            // Add glow effect
            videoPlayer.style.boxShadow = '0 0 50px rgba(255, 51, 51, 0.5)';
        });
    }
}

// FAQ Accordion
function setupFAQAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                
                // Add glow effect
                setTimeout(() => {
                    faqItem.style.boxShadow = '0 0 20px rgba(255, 51, 51, 0.3)';
                    setTimeout(() => {
                        faqItem.style.boxShadow = '';
                    }, 1000);
                }, 100);
            }
        });
    });
}

// Contact Form
function setupContactForm() {
    // Form validation and styling
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Add particle effect
    createSubmitParticleEffect(submitBtn);
    
    // Simulate form submission
    setTimeout(() => {
        // Success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #39ff14, #00ff00)';
        
        // Show success notification
        showNotification('Message sent successfully! ASK will get back to you soon.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
    }, 2000);
}

// Create submit particle effect
function createSubmitParticleEffect(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#ff3333';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / 1000;
            
            if (progress < 1) {
                const x = centerX + vx * progress;
                const y = centerY + vy * progress;
                const opacity = 1 - progress;
                const scale = 1 - progress * 0.5;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.opacity = opacity;
                particle.style.transform = `scale(${scale})`;
                
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 51, 51, 0.1)'};
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(57, 255, 20, 0.3)' : 'rgba(255, 51, 51, 0.3)'};
        color: ${type === 'success' ? '#39ff14' : '#ff3333'};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Glassmorphism Effects
function setupGlassmorphismEffects() {
    // Add dynamic blur effects based on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const blurAmount = Math.min(scrollY / 100, 20);
        
        document.querySelectorAll('.glass-effect').forEach(element => {
            element.style.backdropFilter = `blur(${blurAmount}px)`;
        });
    });
}

// Neon Glow Effects
function setupNeonGlowEffects() {
    // Dynamic glow intensity based on time
    setInterval(() => {
        const intensity = 0.5 + Math.sin(Date.now() / 1000) * 0.3;
        
        document.querySelectorAll('.neon-glow').forEach(element => {
            element.style.boxShadow = `0 0 ${20 * intensity}px rgba(255, 51, 51, ${intensity})`;
        });
    }, 100);
    
    // Mouse proximity glow effect
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.program-card, .stat-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
            );
            
            const maxDistance = 200;
            const glowIntensity = Math.max(0, 1 - distance / maxDistance);
            
            if (glowIntensity > 0) {
                card.style.boxShadow = `0 0 ${30 * glowIntensity}px rgba(255, 51, 51, ${glowIntensity * 0.5})`;
            } else {
                card.style.boxShadow = '';
            }
        });
    });
}

// 3D Effects
function setup3DEffects() {
    // Card tilt effect on mouse move
    document.querySelectorAll('.program-card, .stat-card, .contact-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const rotateX = (e.clientY - centerY) / 10;
            const rotateY = (centerX - e.clientX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const animateOnScroll = () => {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Animate elements as they come into view
        document.querySelectorAll('[data-animate]').forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            if (scrollY + windowHeight > elementTop + elementHeight / 4) {
                const animationType = element.getAttribute('data-animate');
                element.classList.add(`animate-${animationType}`);
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
}

// Advanced hover effects for buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            createButtonRipple(button);
        });
    });
});

function createButtonRipple(button) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    window.onscroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    };
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Graceful degradation - ensure basic functionality still works
});

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

console.log('ASK Fitness JavaScript loaded successfully! 💪');