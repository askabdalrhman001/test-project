// Main JavaScript for Natural Care Website
// Handles all interactions, animations, and dynamic content

// Global variables
let currentTheme = localStorage.getItem('naturalcare_theme') || 'light';
let currentLanguage = localStorage.getItem('naturalcare_language') || 'en';
let isLoading = true;
let authManager;
let languageManager;
let commentsSystem;

// Immediately hide loading screen when script loads
function hideLoadingScreen() {
    console.log('Attempting to hide loading screen...');
    
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        console.log('Loading screen found, hiding it...');
        loadingScreen.classList.add('hidden');
        loadingScreen.style.display = 'none';
        console.log('Loading screen completely hidden');
    } else {
        console.warn('Loading screen element not found');
    }
    
    isLoading = false;
    
    // Also ensure the body is scrollable
    document.body.style.overflow = 'auto';
    
    console.log('Loading screen hidden successfully');
}

// Hide loading screen immediately
hideLoadingScreen();

// Also hide it on every possible event
['DOMContentLoaded', 'load', 'readystatechange'].forEach(event => {
    document.addEventListener(event, hideLoadingScreen);
});

// And hide it multiple times to ensure it's hidden
setTimeout(hideLoadingScreen, 0);
setTimeout(hideLoadingScreen, 10);
setTimeout(hideLoadingScreen, 50);
setTimeout(hideLoadingScreen, 100);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting initialization');
    
    // Hide loading screen immediately
    hideLoadingScreen();
    
    initializeWebsite().then(() => {
        console.log('Website initialization completed successfully');
    }).catch((error) => {
        console.error('Failed to initialize website:', error);
        hideLoadingScreen();
    });
});

// Additional fallback for window load event
window.addEventListener('load', () => {
    console.log('Window loaded');
    // Hide loading screen immediately
    hideLoadingScreen();
});

// Main initialization function
async function initializeWebsite() {
    try {
        console.log('Starting website initialization...');
        
        // Initialize managers with fallbacks
        try {
            authManager = window.authManager;
            console.log('Auth manager initialized');
        } catch (error) {
            console.warn('Auth manager not available:', error);
            authManager = null;
        }
        
        try {
            languageManager = new LanguageManager();
            console.log('Language manager initialized');
        } catch (error) {
            console.warn('Language manager not available:', error);
            languageManager = null;
        }
        
        // Set initial theme and language
        setTheme(currentTheme);
        if (languageManager) {
            languageManager.setLanguage(currentLanguage);
        }
        console.log('Theme and language set');
        
        // Initialize animations
        try {
            initializeAnimations();
            console.log('Animations initialized');
        } catch (error) {
            console.warn('Animation initialization failed:', error);
        }
        
        // Setup event listeners
        try {
            setupEventListeners();
            console.log('Event listeners setup');
        } catch (error) {
            console.warn('Event listener setup failed:', error);
        }
        
        // Initialize components
        try {
            initializeComponents();
            console.log('Components initialized');
        } catch (error) {
            console.warn('Component initialization failed:', error);
        }
        
        // Load initial data (don't wait for it to complete)
        try {
            loadInitialData().catch(error => {
                console.error('Error loading initial data:', error);
            });
            console.log('Initial data loading started');
        } catch (error) {
            console.warn('Initial data loading failed:', error);
        }
        
        // Initialize comments system
        try {
            commentsSystem = new CommentsSystem();
            commentsSystem.init();
            console.log('Comments system initialized');
        } catch (error) {
            console.warn('Comments system initialization failed:', error);
        }
        
        console.log('Website initialization completed');
        
        // Hide loading screen after a short delay
        setTimeout(() => {
            hideLoadingScreen();
        }, 0);
    } catch (error) {
        console.error('Error initializing website:', error);
        // Always hide loading screen even if there's an error
        setTimeout(() => {
            hideLoadingScreen();
        }, 0);
    }
}

// Theme Management
function setTheme(theme) {
    try {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('naturalcare_theme', theme);
        currentTheme = theme;
        
        // Update theme toggle icon
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    } catch (error) {
        console.warn('Theme setting failed:', error);
    }
}

function toggleTheme() {
    try {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    } catch (error) {
        console.warn('Theme toggle failed:', error);
    }
}

// Animation initialization
function initializeAnimations() {
    try {
        // Initialize AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }
    } catch (error) {
        console.warn('Animation initialization failed:', error);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Language toggle
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            if (languageManager) {
                languageManager.toggleLanguage();
            }
        });
    }
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Admin toggle
    const adminToggle = document.getElementById('admin-toggle');
    const adminModal = document.getElementById('admin-modal');
    
    if (adminToggle && adminModal) {
        adminToggle.addEventListener('click', () => {
            if (authManager && authManager.isAuthenticated() && authManager.isUserAdmin()) {
                adminModal.classList.add('active');
                authManager.updateAdminContent();
            } else if (authManager && authManager.isAuthenticated()) {
                // Show user profile for non-admin users
                const adminContent = document.getElementById('admin-content');
                if (adminContent) {
                    adminContent.innerHTML = generateUserProfile();
                    setupUserProfileEvents();
                }
                adminModal.classList.add('active');
            } else {
                // Show login form for non-authenticated users
                const adminContent = document.getElementById('admin-content');
                if (adminContent) {
                    adminContent.innerHTML = authManager ? authManager.generateLoginForm() : '<p>Authentication not available</p>';
                    if (authManager) {
                        authManager.setupLoginEventListeners();
                    }
                }
                adminModal.classList.add('active');
            }
        });
    }

    // Back to Home button
    const backHomeBtn = document.getElementById('back-home');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', () => {
            // Scroll to top and close any modals
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
            
            // Hide back button after use
            backHomeBtn.style.display = 'none';
        });
    }
    
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Gallery lightbox
    setupGalleryLightbox();
    
    // FAQ search
    setupFAQSearch();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
}

// Components initialization
function initializeComponents() {
    try {
        // Initialize AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }
        
        // Setup scroll progress
        setupScrollProgress();
        
        // Setup back to top button
        setupBackToTop();
        
        // Setup header scroll effects
        setupHeaderScroll();
        
        // Setup gallery lightbox
        setupGalleryLightbox();
        
        // Setup smooth scrolling
        setupSmoothScrolling();
        
        // Initialize category filters
        initializeCategoryFilters();
        
        // Setup product interactions
        setupProductInteractions();
        
        // Initialize FAQ accordion
        initializeFAQAccordion();
        
        // Setup FAQ search
        setupFAQSearch();
        
    } catch (error) {
        console.warn('Component initialization failed:', error);
    }
}

// Data loading
async function loadInitialData() {
    try {
        console.log('Starting to load initial data...');
        
        // Load categories
        try {
            await loadCategories();
            console.log('Categories loaded successfully');
        } catch (error) {
            console.error('Error loading categories:', error);
        }
        
        // Load products
        try {
            await loadProducts();
            console.log('Products loaded successfully');
        } catch (error) {
            console.error('Error loading products:', error);
        }
        
        // Load testimonials
        try {
            await loadTestimonials();
            console.log('Testimonials loaded successfully');
        } catch (error) {
            console.error('Error loading testimonials:', error);
        }
        
        // Load FAQs
        try {
            await loadFAQs();
            console.log('FAQs loaded successfully');
        } catch (error) {
            console.error('Error loading FAQs:', error);
        }
        
        console.log('Initial data loading completed');
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

// Category Management
async function loadCategories() {
    try {
        console.log('Loading categories...');
        
        // Try to load from Firebase first
        if (typeof dataManager !== 'undefined' && dataManager) {
            try {
                const result = await dataManager.read('categories');
                if (result.success && result.data.length > 0) {
                    console.log('Categories loaded from Firebase');
                    renderCategories(result.data);
                    return;
                }
            } catch (error) {
                console.warn('Failed to load categories from Firebase:', error);
            }
        }
        
        console.log('Using default categories');
        // Fallback to default categories - Updated comprehensive list
        const defaultCategories = [
            {
                id: 'skincare',
                name: 'Skin Care',
                nameAr: 'العناية بالبشرة',
                description: 'Moisturizing Creams, Face Wash, Serums, Toner, Face Masks, Sunscreen, Makeup Remover',
                descriptionAr: 'كريمات مرطبة، غسول وجه، سيروم، تونر، ماسكات، واقي شمس، مزيل مكياج',
                icon: 'fas fa-spa',
                subcategories: ['moisturizing-creams', 'face-wash', 'serums', 'toner', 'face-masks', 'sunscreen', 'makeup-remover']
            },
            {
                id: 'bodycare',
                name: 'Body Care',
                nameAr: 'العناية بالجسم',
                description: 'Body Oils, Body Scrubs, Body Lotion, Whitening Creams, Deodorants, Hand & Foot Creams',
                descriptionAr: 'زيوت الجسم، مقشرات، لوشن، كريمات تفتيح، مزيلات عرق، كريمات يد وقدم',
                icon: 'fas fa-heart',
                subcategories: ['body-oils', 'body-scrubs', 'body-lotion', 'whitening-creams', 'deodorants', 'hand-foot-creams']
            },
            {
                id: 'haircare',
                name: 'Hair Care',
                nameAr: 'العناية بالشعر',
                description: 'Shampoo, Conditioner, Hair Mask, Hair Oils, Hair Serum, Hair Loss Treatments',
                descriptionAr: 'شامبو، بلسم، ماسك شعر، زيوت شعر، سيروم، علاجات تساقط الشعر',
                icon: 'fas fa-cut',
                subcategories: ['shampoo', 'conditioner', 'hair-mask', 'hair-oils', 'hair-serum', 'hair-loss-treatments']
            },
            {
                id: 'oralcare',
                name: 'Oral Care',
                nameAr: 'العناية بالفم',
                description: 'Natural Toothpaste, Mouthwash, Teeth Whitening Products',
                descriptionAr: 'معجون أسنان طبيعي، غسول فم، منتجات تبييض الأسنان',
                icon: 'fas fa-tooth',
                subcategories: ['natural-toothpaste', 'mouthwash', 'teeth-whitening']
            },
            {
                id: 'natural-products',
                name: 'Natural Products',
                nameAr: 'المنتجات الطبيعية',
                description: 'Organic Products, Chemical-Free, Fragrance-Free',
                descriptionAr: 'منتجات عضوية، خالية من الكيماويات، خالية من العطور',
                icon: 'fas fa-leaf',
                subcategories: ['organic-products', 'chemical-free', 'fragrance-free']
            },
            {
                id: 'special-care',
                name: 'Special Care',
                nameAr: 'العناية الخاصة',
                description: 'For Children, For Men, For Pregnant Women',
                descriptionAr: 'للأطفال، للرجال، للحوامل',
                icon: 'fas fa-baby',
                subcategories: ['for-children', 'for-men', 'for-pregnant-women']
            },
            {
                id: 'fragrances',
                name: 'Fragrances',
                nameAr: 'العطور',
                description: 'Body Perfumes, Natural Perfumes, Hair Perfumes',
                descriptionAr: 'عطور الجسم، عطور طبيعية، عطور الشعر',
                icon: 'fas fa-spray-can',
                subcategories: ['body-perfumes', 'natural-perfumes', 'hair-perfumes']
            },
            {
                id: 'soaps-cleansers',
                name: 'Soaps & Cleansers',
                nameAr: 'الصابون والمنظفات',
                description: 'Natural Soap, Body Wash, Natural Cleaners',
                descriptionAr: 'صابون طبيعي، غسول جسم، منظفات طبيعية',
                icon: 'fas fa-soap',
                subcategories: ['natural-soap', 'body-wash', 'natural-cleaners']
            },
            {
                id: 'candles-aromatherapy',
                name: 'Candles & Aromatherapy',
                nameAr: 'الشموع والعلاج العطري',
                description: 'Scented Candles, Essential Oils, Natural Incense',
                descriptionAr: 'شموع معطرة، زيوت أساسية، بخور طبيعي',
                icon: 'fas fa-fire',
                subcategories: ['scented-candles', 'essential-oils', 'natural-incense']
            }
        ];
        
        renderCategories(defaultCategories);
        
    } catch (error) {
        console.error('Error loading categories:', error);
        // Use empty array as fallback
        renderCategories([]);
    }
}

// Product rendering
function renderProducts(products) {
    try {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;
        
        // Store products globally for access in other functions
        window.allProducts = products;
        
        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-box-open"></i>
                    <p data-translate="no_products">No products available at the moment.</p>
                </div>
            `;
            return;
        }
        
        productsGrid.innerHTML = products.map(product => {
            const currentLang = getCurrentLanguage();
            const title = currentLang === 'ar' ? product.titleAr : product.title;
            const description = currentLang === 'ar' ? product.descriptionAr : product.description;
            const categoryName = currentLang === 'ar' ? product.categoryNameAr : product.categoryName;
            
            return `
                <div class="product-card" data-aos="fade-up" data-category="${product.category}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${title}" class="product-img">
                        <div class="product-badge">
                            ${product.discount > 0 ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                            <span class="category-badge">${categoryName}</span>
                        </div>
                    </div>
                    
                    <div class="product-info">
                        <h3 class="product-title">${title}</h3>
                        <p class="product-description">${description}</p>
                        
                        <div class="product-rating">
                            <div class="stars">${generateStars(product.rating)}</div>
                            <span class="rating-text">${product.rating}/5 (${product.reviews} reviews)</span>
                        </div>
                        
                        <div class="product-price">
                            <span class="price">EGP ${product.price}</span>
                            ${product.discount > 0 ? `<span class="original-price">EGP ${Math.round(product.price / (1 - product.discount / 100))}</span>` : ''}
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn btn-primary whatsapp-btn" data-product="${title}" ${!product.inStock ? 'disabled' : ''}>
                                <i class="fab fa-whatsapp"></i> Order
                            </button>
                            <button class="btn btn-secondary details-btn" data-product-id="${product.id}">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                            <button class="btn btn-secondary product-inquiry" data-product-id="${product.id}">
                                <i class="fas fa-question-circle"></i> Ask
                            </button>
                        </div>
                        
                        <div class="product-stock">
                            <div class="stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                                <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                <span>${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                            </div>
                            ${product.inStock ? `<span class="stock-quantity">${product.quantity} available</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Setup product interactions after rendering
        setupProductInteractions();
        
    } catch (error) {
        console.warn('Error rendering products:', error);
    }
}

// Category rendering
function renderCategories(categories) {
    try {
        const categoriesGrid = document.getElementById('categories-grid');
        if (!categoriesGrid) return;
        
        if (categories.length === 0) {
            categoriesGrid.innerHTML = `
                <div class="no-categories">
                    <i class="fas fa-tags"></i>
                    <p data-translate="no_categories">No categories available.</p>
                </div>
            `;
            return;
        }
        
        categoriesGrid.innerHTML = categories.map(category => {
            const currentLang = getCurrentLanguage();
            const name = currentLang === 'ar' ? category.nameAr : category.name;
            const description = currentLang === 'ar' ? category.descriptionAr : category.description;
            
            return `
                <div class="category-card" data-aos="fade-up" data-category="${category.id}">
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <h3 class="category-title">${name}</h3>
                    <p class="category-description">${description}</p>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.warn('Error rendering categories:', error);
    }
}

// Testimonials rendering
function renderTestimonials(testimonials) {
    try {
        const testimonialsGrid = document.getElementById('testimonials-grid');
        if (!testimonialsGrid) return;
        
        if (testimonials.length === 0) {
            testimonialsGrid.innerHTML = `
                <div class="no-testimonials">
                    <i class="fas fa-comments"></i>
                    <p data-translate="no_testimonials">No testimonials available.</p>
                </div>
            `;
            return;
        }
        
        testimonialsGrid.innerHTML = testimonials.map(testimonial => {
            const currentLang = getCurrentLanguage();
            const text = currentLang === 'ar' ? testimonial.textAr : testimonial.text;
            
            return `
                <div class="testimonial-card" data-aos="fade-up">
                    <div class="testimonial-text">${text}</div>
                    <div class="testimonial-author">
                        <img src="${testimonial.avatar}" alt="${testimonial.author}" class="author-avatar">
                        <div class="author-info">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.location}</p>
                            <div class="stars">
                                ${generateStars(testimonial.rating)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.warn('Error rendering testimonials:', error);
    }
}

// FAQs rendering
function renderFAQs(faqs) {
    try {
        const faqAccordion = document.getElementById('faq-accordion');
        if (!faqAccordion) return;
        
        if (faqs.length === 0) {
            faqAccordion.innerHTML = `
                <div class="no-faqs">
                    <i class="fas fa-question-circle"></i>
                    <p data-translate="no_faqs">No FAQs available.</p>
                </div>
            `;
            return;
        }
        
        faqAccordion.innerHTML = faqs.map(faq => {
            const currentLang = getCurrentLanguage();
            const question = currentLang === 'ar' ? faq.questionAr : faq.question;
            const answer = currentLang === 'ar' ? faq.answerAr : faq.answer;
            
            return `
                <div class="faq-item" data-aos="fade-up">
                    <div class="faq-question">
                        <h4>${question}</h4>
                        <i class="fas fa-chevron-down faq-icon"></i>
                    </div>
                    <div class="faq-answer">
                        <div class="faq-answer-content">
                            ${answer}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Initialize FAQ accordion after rendering
        initializeFAQAccordion();
        
    } catch (error) {
        console.warn('Error rendering FAQs:', error);
    }
}

// Generate stars for ratings
function generateStars(rating) {
    try {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star star"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star star empty"></i>';
        }
        
        return stars;
    } catch (error) {
        console.warn('Error generating stars:', error);
        return '';
    }
}

// Product filtering
function filterProductsByCategory(categoryId) {
    try {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            if (categoryId === 'all' || card.dataset.category === categoryId) {
                card.style.display = 'block';
                card.setAttribute('data-aos', 'fade-up');
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update active filter button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === categoryId) {
                btn.classList.add('active');
            }
        });
        
    } catch (error) {
        console.warn('Product filtering failed:', error);
    }
}

// Product translation toggle
function toggleProductTranslation(productId) {
    try {
        const product = window.allProducts?.find(p => p.id === productId);
        if (!product) return;
        
        const currentLang = getCurrentLanguage();
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        
        // Update language for this specific product
        languageManager.setLanguage(newLang);
        
        // Re-render products to show translated content
        renderProducts(window.allProducts);
        
        // Show toast
        showToast(`Product translated to ${newLang === 'ar' ? 'Arabic' : 'English'}`, 'info');
        
    } catch (error) {
        console.warn('Product translation toggle failed:', error);
    }
}

// WhatsApp order function
function orderViaWhatsApp(productName) {
    try {
        const message = `Hi, I want to order ${productName}`;
        const whatsappUrl = `https://wa.me/201234567890?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        console.warn('WhatsApp order failed:', error);
        showToast('Error opening WhatsApp. Please try again.', 'error');
    }
}

// Testimonials Management
async function loadTestimonials() {
    try {
        console.log('Loading testimonials...');
        
        // Try to load from Firebase first
        if (typeof dataManager !== 'undefined' && dataManager) {
            try {
                const result = await dataManager.read('testimonials');
                if (result.success && result.data.length > 0) {
                    console.log('Testimonials loaded from Firebase');
                    renderTestimonials(result.data);
                    return;
                }
            } catch (error) {
                console.warn('Failed to load testimonials from Firebase:', error);
            }
        }
        
        console.log('Using default testimonials');
        // Fallback to default testimonials
        const defaultTestimonials = [
            {
                id: '1',
                text: 'Amazing natural products! My skin has never felt better. The lavender soap is absolutely wonderful.',
                textAr: 'منتجات طبيعية مذهلة! لم تشعر بشرتي بحالة أفضل من هذا. صابون اللافندر رائع تماماً.',
                author: 'Sarah Ahmed',
                location: 'Cairo, Egypt',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
                rating: 5
            },
            {
                id: '2',
                text: 'Excellent quality and fast delivery. I love how gentle these products are on my sensitive skin.',
                textAr: 'جودة ممتازة وتوصيل سريع. أحب كم هذه المنتجات لطيفة على بشرتي الحساسة.',
                author: 'Mohamed Hassan',
                location: 'Alexandria, Egypt',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
                rating: 5
            },
            {
                id: '3',
                text: 'The hair oil transformed my dry hair completely. Highly recommend to everyone!',
                textAr: 'زيت الشعر غيّر شعري الجاف تماماً. أنصح به بشدة للجميع!',
                author: 'Fatima Ali',
                location: 'Giza, Egypt',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
                rating: 5
            },
            {
                id: '4',
                text: 'Natural, handmade, and effective. Everything I was looking for in skincare products.',
                textAr: 'طبيعي ومصنوع يدوياً وفعال. كل ما كنت أبحث عنه في منتجات العناية بالبشرة.',
                author: 'Ahmed Mahmoud',
                location: 'Mansoura, Egypt',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
                rating: 4
            }
        ];
        
        renderTestimonials(defaultTestimonials);
        
    } catch (error) {
        console.error('Error loading testimonials:', error);
        // Use empty array as fallback
        renderTestimonials([]);
    }
}

function renderTestimonials(testimonials) {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    
    if (testimonialsGrid) {
        testimonialsGrid.innerHTML = testimonials.map(testimonial => {
            const currentLang = getCurrentLanguage();
            const text = currentLang === 'ar' ? testimonial.textAr : testimonial.text;
            
            return `
                <div class="testimonial-card" data-aos="fade-up">
                    <div class="testimonial-text">${text}</div>
                    <div class="testimonial-author">
                        <img src="${testimonial.avatar}" alt="${testimonial.author}" class="author-avatar">
                        <div class="author-info">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.location}</p>
                            <div class="stars">
                                ${generateStars(testimonial.rating)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// FAQ Management
async function loadFAQs() {
    try {
        console.log('Loading FAQs...');
        
        // Try to load from Firebase first
        if (typeof dataManager !== 'undefined' && dataManager) {
            try {
                const result = await dataManager.read('faqs');
                if (result.success && result.data.length > 0) {
                    console.log('FAQs loaded from Firebase');
                    renderFAQs(result.data);
                    return;
                }
            } catch (error) {
                console.warn('Failed to load FAQs from Firebase:', error);
            }
        }
        
        console.log('Using default FAQs');
        // Fallback to default FAQs from translations
        const defaultFAQs = languageManager ? languageManager.getDefaultFAQs() : [];
        renderFAQs(defaultFAQs);
        
    } catch (error) {
        console.error('Error loading FAQs:', error);
        // Use empty array as fallback
        renderFAQs([]);
    }
}

function renderFAQs(faqs) {
    const faqAccordion = document.getElementById('faq-accordion');
    const faqCategories = document.querySelector('.faq-categories');
    
    if (faqAccordion) {
        faqAccordion.innerHTML = faqs.map((faq, index) => `
            <div class="faq-item" data-category="${faq.category}">
                <button class="faq-question">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down faq-icon"></i>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer-content">${faq.answer}</div>
                </div>
            </div>
        `).join('');
        
        // Setup FAQ accordion functionality
        initializeFAQAccordion();
    }
    
    // Generate category filter buttons
    if (faqCategories) {
        const categories = [...new Set(faqs.map(faq => faq.category))];
        const categoryButtons = categories.map(category => `
            <button class="faq-category-btn" data-category="${category}">
                <span data-translate="faq_${category}">${category}</span>
            </button>
        `).join('');
        
        // Insert after "All" button
        faqCategories.insertAdjacentHTML('beforeend', categoryButtons);
        
        // Add event listeners
        faqCategories.querySelectorAll('.faq-category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                faqCategories.querySelectorAll('.faq-category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-category');
                filterFAQs(category);
            });
        });
    }
    
    // Store FAQs globally for search
    window.allFAQs = faqs;
}

// FAQ accordion initialization
function initializeFAQAccordion() {
    try {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
        
    } catch (error) {
        console.warn('FAQ accordion initialization failed:', error);
    }
}

// FAQ search setup
function setupFAQSearch() {
    try {
        const searchInput = document.getElementById('faq-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchFAQs(searchTerm);
        });
        
    } catch (error) {
        console.warn('FAQ search setup failed:', error);
    }
}

// FAQ search functionality
function searchFAQs(searchTerm) {
    try {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
    } catch (error) {
        console.warn('FAQ search failed:', error);
    }
}

// FAQ category filtering
function filterFAQs(category) {
    try {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
    } catch (error) {
        console.warn('FAQ filtering failed:', error);
    }
}

// UI Helper Functions
function setupScrollProgress() {
    try {
        const progressBar = document.getElementById('progress-bar');
        if (!progressBar) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    } catch (error) {
        console.warn('Scroll progress setup failed:', error);
    }
}

function setupBackToTop() {
    try {
        const backToTop = document.getElementById('back-to-top');
        if (!backToTop) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } catch (error) {
        console.warn('Back to top setup failed:', error);
    }
}

function setupHeaderScroll() {
    try {
        const header = document.getElementById('header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    } catch (error) {
        console.warn('Header scroll setup failed:', error);
    }
}

function setupGalleryLightbox() {
    try {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxClose = document.getElementById('lightbox-close');
        
        if (!lightbox || !lightboxImage || !lightboxClose) return;
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImage.src = img.src;
                    lightbox.classList.add('active');
                }
            });
        });
        
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    } catch (error) {
        console.warn('Gallery lightbox setup failed:', error);
    }
}

function setupSmoothScrolling() {
    try {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    } catch (error) {
        console.warn('Smooth scrolling setup failed:', error);
    }
}

// Category filter initialization
function initializeCategoryFilters() {
    try {
        const categoryFilter = document.querySelector('.category-filter');
        if (!categoryFilter) return;
        
        // Add "All Products" button
        const allButton = document.createElement('button');
        allButton.className = 'filter-btn active';
        allButton.dataset.category = 'all';
        allButton.textContent = 'All Products';
        categoryFilter.appendChild(allButton);
        
        // Add event listeners
        categoryFilter.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const categoryId = e.target.dataset.category;
                filterProductsByCategory(categoryId);
            }
        });
        
    } catch (error) {
        console.warn('Category filter initialization failed:', error);
    }
}

// Product interactions
function setupProductInteractions() {
    try {
        // WhatsApp order buttons
        const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
        whatsappButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productName = button.dataset.product;
                orderViaWhatsApp(productName);
            });
        });
        
        // Product detail buttons
        const detailButtons = document.querySelectorAll('.details-btn');
        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.dataset.productId;
                showProductDetails(productId);
            });
        });
        
        // Product inquiry buttons
        const inquiryButtons = document.querySelectorAll('.product-inquiry');
        inquiryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.dataset.productId;
                showProductInquiryModal(productId);
            });
        });
        
    } catch (error) {
        console.warn('Product interactions setup failed:', error);
    }
}

// Contact form handler
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    try {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual Formspree or other service)
        setTimeout(() => {
            showToast('Message sent successfully! We will get back to you soon.', 'success');
            e.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    } catch (error) {
        console.warn('Contact form submission failed:', error);
        showToast('Error sending message. Please try again.', 'error');
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    try {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        const toastContainer = document.getElementById('toast-container');
        if (toastContainer) {
            toastContainer.appendChild(toast);
            
            // Remove toast after 5 seconds
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 5000);
        }
    } catch (error) {
        console.warn('Toast notification failed:', error);
        // Fallback to console log
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

// Helper function to get current language
function getCurrentLanguage() {
    return languageManager ? languageManager.getCurrentLanguage() : 'en';
}

// Custom Modal System
class CustomModal {
    constructor() {
        this.modal = document.getElementById('custom-modal');
        this.modalIcon = document.getElementById('modal-icon');
        this.modalTitle = document.getElementById('modal-title');
        this.modalMessage = document.getElementById('modal-message');
        this.modalCancel = document.getElementById('modal-cancel');
        this.modalConfirm = document.getElementById('modal-confirm');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        try {
            this.modalCancel?.addEventListener('click', () => this.hide());
            this.modal?.addEventListener('click', (e) => {
                if (e.target === this.modal) this.hide();
            });
        } catch (error) {
            console.warn('Modal event listeners setup failed:', error);
        }
    }
    
    show(options) {
        try {
            const {
                type = 'warning',
                title = 'Confirmation',
                message = 'Are you sure?',
                confirmText = 'Confirm',
                cancelText = 'Cancel',
                onConfirm = () => {},
                onCancel = () => {}
            } = options;
            
            // Update icon
            if (this.modalIcon) {
                this.modalIcon.className = `modal-icon ${type}`;
                const iconMap = {
                    warning: 'fas fa-exclamation-triangle',
                    danger: 'fas fa-trash-alt',
                    success: 'fas fa-check-circle',
                    info: 'fas fa-info-circle'
                };
                const icon = this.modalIcon.querySelector('i');
                if (icon) {
                    icon.className = iconMap[type] || iconMap.warning;
                }
            }
            
            // Update content
            if (this.modalTitle) this.modalTitle.textContent = title;
            if (this.modalMessage) this.modalMessage.textContent = message;
            if (this.modalConfirm) {
                const span = this.modalConfirm.querySelector('span');
                if (span) span.textContent = confirmText;
            }
            if (this.modalCancel) {
                const span = this.modalCancel.querySelector('span');
                if (span) span.textContent = cancelText;
            }
            
            // Setup handlers
            this.onConfirm = onConfirm;
            this.onCancel = onCancel;
            
            // Show modal
            if (this.modal) {
                this.modal.classList.add('active');
            }
            
            // Return promise
            return new Promise((resolve) => {
                this.resolve = resolve;
            });
        } catch (error) {
            console.warn('Modal show failed:', error);
            return Promise.resolve(false);
        }
    }
    
    hide() {
        try {
            if (this.modal) {
                this.modal.classList.remove('active');
            }
            if (this.resolve) {
                this.resolve(false);
            }
        } catch (error) {
            console.warn('Modal hide failed:', error);
        }
    }
}

// Comments System
class CommentsSystem {
    constructor() {
        this.comments = [];
        this.currentUser = null;
    }
    
    init() {
        try {
            this.setupEventListeners();
            this.loadComments();
            this.updateCommentsUI();
        } catch (error) {
            console.warn('Comments system initialization failed:', error);
        }
    }
    
    setupEventListeners() {
        try {
            // Comment form submission
            const commentForm = document.getElementById('comment-form');
            if (commentForm) {
                commentForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.submitComment(new FormData(commentForm));
                });
            }
            
            // Rating input
            const ratingInputs = document.querySelectorAll('.rating-input input');
            ratingInputs.forEach(input => {
                input.addEventListener('change', () => {
                    const stars = input.parentElement.querySelectorAll('label');
                    const rating = parseInt(input.value);
                    stars.forEach((star, index) => {
                        star.classList.toggle('active', index < rating);
                    });
                });
            });
        } catch (error) {
            console.warn('Comments event listeners setup failed:', error);
        }
    }
    
    async submitComment(formData) {
        try {
            const commentData = {
                text: formData.get('comment'),
                rating: parseInt(formData.get('rating')),
                productId: formData.get('productId'),
                timestamp: new Date().toISOString()
            };
            
            // Add to local comments array
            this.comments.push(commentData);
            
            // Clear form
            const commentForm = document.getElementById('comment-form');
            if (commentForm) {
                commentForm.reset();
            }
            
            // Update UI
            this.renderComments();
            this.updateCommentsUI();
            
            showToast('Comment submitted successfully!', 'success');
        } catch (error) {
            console.error('Error submitting comment:', error);
            showToast('Error submitting comment. Please try again.', 'error');
        }
    }
    
    async loadComments() {
        try {
            // For now, just use local comments
            this.comments = [];
            this.renderComments();
        } catch (error) {
            console.warn('Error loading comments:', error);
        }
    }
    
    renderComments() {
        try {
            const commentsList = document.getElementById('comments-list');
            if (!commentsList) return;
            
            if (this.comments.length === 0) {
                commentsList.innerHTML = `
                    <div class="no-comments">
                        <i class="fas fa-comments"></i>
                        <p data-translate="no_comments">No comments yet. Be the first to share your experience!</p>
                    </div>
                `;
                return;
            }
            
            commentsList.innerHTML = this.comments.map(comment => this.renderCommentCard(comment)).join('');
        } catch (error) {
            console.warn('Error rendering comments:', error);
        }
    }
    
    renderCommentCard(comment) {
        try {
            return `
                <div class="comment-card" data-aos="fade-up">
                    <div class="comment-header">
                        <div class="comment-user-info">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" class="user-avatar">
                            <div class="comment-meta">
                                <h5>Anonymous User</h5>
                                <span class="comment-date">${new Date(comment.timestamp).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="comment-rating">
                            <div class="stars">
                                ${generateStars(comment.rating)}
                            </div>
                        </div>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                </div>
            `;
        } catch (error) {
            console.warn('Error rendering comment card:', error);
            return '';
        }
    }
    
    updateCommentsUI() {
        try {
            const addCommentSection = document.getElementById('add-comment-section');
            const loginPrompt = document.getElementById('login-prompt');
            
            if (addCommentSection && loginPrompt) {
                // For now, always show login prompt
                addCommentSection.style.display = 'none';
                loginPrompt.style.display = 'block';
            }
        } catch (error) {
            console.warn('Error updating comments UI:', error);
        }
    }
}

// Initialize systems
let customModal;
let commentsSystem;

// Add to initialization
document.addEventListener('DOMContentLoaded', () => {
    customModal = new CustomModal();
    commentsSystem = new CommentsSystem();
});

// Language change event listener
document.addEventListener('languageChanged', (e) => {
    // Reload dynamic content when language changes
    if (!isLoading) {
        loadCategories();
        loadProducts();
        loadTestimonials();
        loadFAQs();
    }
});

// Extend DataManager with render methods for admin panel
if (typeof dataManager !== 'undefined') {
    // Products list rendering
            dataManager.renderProductsList = function(products) {
            const productsList = document.getElementById('products-list');
            if (!productsList) return;
            
            productsList.innerHTML = products.map(product => {
                const categoryName = getCurrentLanguage() === 'ar' ? 
                    (product.categoryNameAr || product.category) : 
                    (product.categoryName || product.category);
                
                return `
                    <div class="admin-item">
                        <div class="admin-item-content">
                            <img src="${product.image || '/placeholder.jpg'}" alt="${product.title}" class="admin-item-image">
                            <div class="admin-item-details">
                                <h4>${product.title}</h4>
                                <p class="admin-item-meta">
                                    ${languageManager.formatCurrency(product.price)} | 
                                    ${categoryName} | 
                                    <span class="stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                                        <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                        ${product.inStock ? languageManager.t('available') : languageManager.t('out_of_stock')}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="admin-item-actions">
                            <button class="btn btn-small btn-secondary" onclick="editProduct('${product.id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-small btn-danger" onclick="deleteProductWithConfirm('${product.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };

        // Enhanced delete function with custom modal
        window.deleteProductWithConfirm = function(productId) {
            const product = window.allProducts?.find(p => p.id === productId);
            const productName = product ? product.title : 'this product';
            
            customModal.show({
                type: 'danger',
                title: languageManager.t('delete_product'),
                message: `${languageManager.t('delete_product_confirm')} "${productName}"?`,
                confirmText: languageManager.t('yes'),
                cancelText: languageManager.t('no'),
                onConfirm: async () => {
                    try {
                        if (dataManager) {
                            const result = await dataManager.delete('products', productId);
                            if (result.success) {
                                showToast(languageManager.t('product_deleted'), 'success');
                                loadProducts();
                            }
                        }
                    } catch (error) {
                        console.error('Error deleting product:', error);
                        showToast(languageManager.t('error_general'), 'error');
                    }
                }
            });
        };

        // Enhanced delete FAQ function
        window.deleteFAQWithConfirm = function(faqId) {
            customModal.show({
                type: 'danger',
                title: languageManager.t('delete_faq'),
                message: languageManager.t('delete_faq_confirm'),
                confirmText: languageManager.t('yes'),
                cancelText: languageManager.t('no'),
                onConfirm: async () => {
                    try {
                        if (dataManager) {
                            const result = await dataManager.delete('faqs', faqId);
                            if (result.success) {
                                showToast(languageManager.t('faq_deleted'), 'success');
                                loadFAQs();
                            }
                        }
                    } catch (error) {
                        console.error('Error deleting FAQ:', error);
                        showToast(languageManager.t('error_general'), 'error');
                    }
                }
            });
        };
    
    // Similar methods for categories, FAQs, and testimonials...
    // (Implementation continues in the same pattern)
}

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// User Profile Functions
function generateUserProfile() {
    try {
        const user = authManager ? authManager.getCurrentUser() : null;
        if (!user) {
            return '<p>User not found</p>';
        }
        
        return `
            <div class="user-profile">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <img src="${user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'}" alt="${user.displayName || 'User'}" id="profile-avatar">
                        <div class="avatar-upload">
                            <label for="avatar-upload-input" class="btn btn-secondary">
                                <i class="fas fa-camera"></i> Change Photo
                            </label>
                            <input type="file" id="avatar-upload-input" accept="image/*" style="display: none;">
                        </div>
                    </div>
                    <div class="profile-info">
                        <h3>${user.displayName || 'Anonymous User'}</h3>
                        <p>${user.email || 'No email'}</p>
                    </div>
                </div>
                
                <form id="profile-form" class="profile-form">
                    <div class="form-group">
                        <label for="profile-name">Display Name</label>
                        <input type="text" id="profile-name" name="displayName" value="${user.displayName || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="profile-nickname">Nickname</label>
                        <input type="text" id="profile-nickname" name="nickname" value="${user.nickname || ''}">
                    </div>
                    <div class="form-group">
                        <label for="profile-title">Title</label>
                        <input type="text" id="profile-title" name="title" value="${user.title || 'Customer'}">
                    </div>
                    
                    <div class="profile-meta">
                        <div class="meta-item">
                            <span class="meta-label">Account Created:</span>
                            <span class="meta-value">${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Last Login:</span>
                            <span class="meta-value">${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Unknown'}</span>
                        </div>
                    </div>
                    
                    <div class="profile-actions">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="authManager.signOut()">
                            <i class="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                    </div>
                </form>
            </div>
        `;
    } catch (error) {
        console.warn('Generate user profile failed:', error);
        return '<p>Error loading user profile</p>';
    }
}

function setupUserProfileEvents() {
    try {
        const profileForm = document.getElementById('profile-form');
        const avatarUpload = document.getElementById('avatar-upload-input');
        
        if (profileForm) {
            profileForm.addEventListener('submit', handleProfileSubmit);
        }
        
        if (avatarUpload) {
            avatarUpload.addEventListener('change', handleAvatarUpload);
        }
    } catch (error) {
        console.warn('Setup user profile events failed:', error);
    }
}

async function handleProfileSubmit(e) {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const userData = {
            displayName: formData.get('displayName'),
            nickname: formData.get('nickname'),
            title: formData.get('title')
        };
        
        if (authManager) {
            const result = await authManager.updateUserProfile(userData);
            if (result.success) {
                showToast('Profile updated successfully!', 'success');
            } else {
                showToast('Error updating profile.', 'error');
            }
        } else {
            showToast('Authentication not available.', 'error');
        }
    } catch (error) {
        console.warn('Profile submit failed:', error);
        showToast('Error updating profile.', 'error');
    }
}

async function handleAvatarUpload(e) {
    try {
        const file = e.target.files[0];
        if (!file) return;
        
        if (authManager) {
            const result = await authManager.uploadAvatar(file);
            if (result.success) {
                const avatarImg = document.getElementById('profile-avatar');
                if (avatarImg) {
                    avatarImg.src = result.url;
                }
                showToast('Avatar updated successfully!', 'success');
            } else {
                showToast('Error uploading avatar.', 'error');
            }
        } else {
            showToast('Authentication not available.', 'error');
        }
    } catch (error) {
        console.warn('Avatar upload failed:', error);
        showToast('Error uploading avatar.', 'error');
    }
}

// Product Inquiry Functions
function showProductInquiryModal(productId) {
    try {
        const product = window.allProducts?.find(p => p.id === productId);
        if (!product) {
            showToast('Product not found.', 'error');
            return;
        }
        
        const modal = document.getElementById('product-inquiry-modal');
        const modalContent = document.getElementById('product-inquiry-content');
        
        if (modal && modalContent) {
            const currentLang = getCurrentLanguage();
            const title = currentLang === 'ar' ? product.titleAr : product.title;
            
            modalContent.innerHTML = `
                <div class="inquiry-header">
                    <h3>Ask about ${title}</h3>
                    <p>Send us a message and we'll get back to you as soon as possible.</p>
                </div>
                <form id="inquiry-form" class="inquiry-form">
                    <input type="hidden" name="productId" value="${productId}">
                    <div class="form-group">
                        <label for="inquiry-name">Your Name *</label>
                        <input type="text" id="inquiry-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="inquiry-email">Your Email *</label>
                        <input type="email" id="inquiry-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="inquiry-message">Your Message *</label>
                        <textarea id="inquiry-message" name="message" rows="4" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i> Send Message
                        </button>
                        <button type="button" class="btn btn-secondary close-modal">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div>
                </form>
            `;
            
            modal.classList.add('active');
            
            // Setup form submission
            const form = document.getElementById('inquiry-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(form);
                    
                    // Simulate sending inquiry
                    showToast('Inquiry sent successfully! We will get back to you soon.', 'success');
                    modal.classList.remove('active');
                    form.reset();
                });
            }
            
            // Setup close button
            const closeBtn = modalContent.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            }
        }
    } catch (error) {
        console.warn('Product inquiry modal failed:', error);
        showToast('Error showing inquiry form.', 'error');
    }
}

// Product details modal
function showProductDetails(productId) {
    try {
        // Find product by ID
        const product = window.allProducts?.find(p => p.id === productId);
        if (!product) {
            showToast('Product not found.', 'error');
            return;
        }
        
        const modal = document.getElementById('product-details-modal');
        const modalContent = document.getElementById('product-details-content');
        
        if (modal && modalContent) {
            const currentLang = getCurrentLanguage();
            const title = currentLang === 'ar' ? product.titleAr : product.title;
            const description = currentLang === 'ar' ? product.descriptionAr : product.description;
            const categoryName = currentLang === 'ar' ? product.categoryNameAr : product.categoryName;
            
            modalContent.innerHTML = `
                <div class="product-details-header">
                    <img src="${product.image}" alt="${title}" class="product-details-image">
                    <div class="product-details-info">
                        <h3>${title}</h3>
                        <p class="product-category">${categoryName}</p>
                        <div class="product-rating">
                            <div class="stars">${generateStars(product.rating)}</div>
                            <span class="rating-text">${product.rating}/5 (${product.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
                <div class="product-details-body">
                    <p class="product-description">${description}</p>
                    <div class="product-details-grid">
                        <div class="detail-item">
                            <strong>Price:</strong> EGP ${product.price}
                            ${product.discount > 0 ? `<span class="discount">-${product.discount}%</span>` : ''}
                        </div>
                        <div class="detail-item">
                            <strong>Delivery:</strong> 
                            ${product.deliveryAvailable ? `Available (EGP ${product.deliveryPrice})` : 'Not available'}
                        </div>
                        <div class="detail-item">
                            <strong>Stock:</strong> 
                            ${product.inStock ? `${product.quantity} available` : 'Out of stock'}
                        </div>
                    </div>
                </div>
                <div class="product-details-actions">
                    <button class="btn btn-primary whatsapp-order" data-product="${title}">
                        <i class="fab fa-whatsapp"></i> Order via WhatsApp
                    </button>
                    <button class="btn btn-secondary product-inquiry" data-product-id="${productId}">
                        <i class="fas fa-question-circle"></i> Ask about this product
                    </button>
                </div>
            `;
            
            modal.classList.add('active');
            
            // Setup event listeners for new buttons
            const whatsappBtn = modalContent.querySelector('.whatsapp-order');
            const inquiryBtn = modalContent.querySelector('.product-inquiry');
            
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', () => orderViaWhatsApp(title));
            }
            
            if (inquiryBtn) {
                inquiryBtn.addEventListener('click', () => showProductInquiryModal(productId));
            }
        }
    } catch (error) {
        console.warn('Product details modal failed:', error);
        showToast('Error showing product details.', 'error');
    }
}

// Initialize auth state change listener
document.addEventListener('authStateChanged', (e) => {
    try {
        const { user, isAdmin } = e.detail;
        
        // Update admin toggle visibility
        const adminToggle = document.getElementById('admin-toggle');
        if (adminToggle) {
            adminToggle.style.display = user ? 'flex' : 'none';
        }
        
        // Update login prompt visibility
        const loginPrompt = document.getElementById('login-prompt');
        if (loginPrompt) {
            loginPrompt.style.display = user ? 'none' : 'block';
        }
        
        // Update comment section visibility
        const addCommentSection = document.getElementById('add-comment-section');
        if (addCommentSection) {
            addCommentSection.style.display = user ? 'block' : 'none';
        }
        
        // Update comment form user info
        updateCommentFormUserInfo();
        
        // Update comments UI
        if (commentsSystem) {
            commentsSystem.updateCommentsUI();
        }
        
    } catch (error) {
        console.warn('Auth state change listener failed:', error);
    }
});

// Update comment form user info
function updateCommentFormUserInfo() {
    try {
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('user-name');
        
        if (authManager && authManager.getCurrentUser()) {
            const user = authManager.getCurrentUser();
            
            if (userAvatar) {
                userAvatar.src = user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80';
            }
            
            if (userName) {
                userName.textContent = user.displayName || 'Anonymous User';
            }
        }
    } catch (error) {
        console.warn('Update comment form user info failed:', error);
    }
}