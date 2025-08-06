// Main JavaScript for Natural Care Website
// Handles all interactions, animations, and dynamic content

// Global variables
let currentTheme = localStorage.getItem('naturalcare_theme') || 'light';
let isLoading = true;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    // Set initial theme
    setTheme(currentTheme);
    
    // Initialize animations
    initializeAnimations();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize components
    initializeComponents();
    
    // Load initial data
    loadInitialData();
    
    // Hide loading screen
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);
}

// Theme Management
function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('naturalcare_theme', theme);
    
    // Update theme toggle icon
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Animation initialization
function initializeAnimations() {
    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
    
    // Setup scroll progress bar
    setupScrollProgress();
    
    // Setup back to top button
    setupBackToTop();
    
    // Setup header scroll effect
    setupHeaderScroll();
}

// Event Listeners Setup
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
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
            adminModal.classList.add('active');
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
    // Initialize category filters
    initializeCategoryFilters();
    
    // Initialize FAQ accordion
    initializeFAQAccordion();
    
    // Setup product card interactions
    setupProductInteractions();
}

// Data loading
async function loadInitialData() {
    try {
        // Load categories
        await loadCategories();
        
        // Load products
        await loadProducts();
        
        // Load testimonials
        await loadTestimonials();
        
        // Load FAQs
        await loadFAQs();
        
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

// Category Management
async function loadCategories() {
    try {
        // Try to load from Firebase first
        if (typeof dataManager !== 'undefined') {
            const result = await dataManager.read('categories');
            if (result.success && result.data.length > 0) {
                renderCategories(result.data);
                return;
            }
        }
        
        // Fallback to default categories
        const defaultCategories = [
            {
                id: 'skincare',
                name: 'Skincare',
                nameAr: 'العناية بالجلد',
                description: 'Natural skincare products for healthy glowing skin',
                descriptionAr: 'منتجات العناية الطبيعية بالجلد للحصول على بشرة صحية ونضرة',
                icon: 'fas fa-spa'
            },
            {
                id: 'bodycare',
                name: 'Body Care',
                nameAr: 'العناية بالجسم',
                description: 'Nourishing body care essentials',
                descriptionAr: 'أساسيات العناية المغذية للجسم',
                icon: 'fas fa-heart'
            },
            {
                id: 'haircare',
                name: 'Hair Care',
                nameAr: 'العناية بالشعر',
                description: 'Natural hair care products for healthy hair',
                descriptionAr: 'منتجات العناية الطبيعية بالشعر للحصول على شعر صحي',
                icon: 'fas fa-cut'
            },
            {
                id: 'aromatherapy',
                name: 'Aromatherapy',
                nameAr: 'العلاج العطري',
                description: 'Essential oils and aromatherapy products',
                descriptionAr: 'الزيوت الأساسية ومنتجات العلاج العطري',
                icon: 'fas fa-leaf'
            }
        ];
        
        renderCategories(defaultCategories);
        
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

function renderCategories(categories) {
    const categoriesGrid = document.getElementById('categories-grid');
    const categoryFilter = document.querySelector('.category-filter');
    
    if (categoriesGrid) {
        categoriesGrid.innerHTML = categories.map(category => `
            <div class="category-card" data-category="${category.id}" data-aos="fade-up">
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <h3 class="category-title">${getCurrentLanguage() === 'ar' ? category.nameAr : category.name}</h3>
                <p class="category-description">${getCurrentLanguage() === 'ar' ? category.descriptionAr : category.description}</p>
            </div>
        `).join('');
        
        // Add click handlers for category cards
        categoriesGrid.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const categoryId = card.getAttribute('data-category');
                filterProductsByCategory(categoryId);
                // Scroll to products section
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    // Add category filter buttons
    if (categoryFilter) {
        const filterButtons = categories.map(category => `
            <button class="filter-btn" data-category="${category.id}">
                ${getCurrentLanguage() === 'ar' ? category.nameAr : category.name}
            </button>
        `).join('');
        
        // Insert after "All Products" button
        categoryFilter.insertAdjacentHTML('beforeend', filterButtons);
        
        // Add event listeners to filter buttons
        categoryFilter.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const categoryId = btn.getAttribute('data-category');
                filterProductsByCategory(categoryId);
            });
        });
    }
}

// Product Management
async function loadProducts() {
    try {
        // Try to load from Firebase first
        if (typeof dataManager !== 'undefined') {
            const result = await dataManager.read('products');
            if (result.success && result.data.length > 0) {
                renderProducts(result.data);
                return;
            }
        }
        
        // Fallback to default products
        const defaultProducts = [
            {
                id: '1',
                title: 'Lavender Soap',
                titleAr: 'صابون اللافندر',
                description: 'Handmade lavender soap with organic ingredients. Perfect for sensitive skin.',
                descriptionAr: 'صابون اللافندر المصنوع يدوياً بمكونات عضوية. مثالي للبشرة الحساسة.',
                price: 85,
                discount: 0,
                category: 'skincare',
                image: 'https://images.unsplash.com/photo-1556909049-f4ba35d1c211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                deliveryAvailable: true,
                deliveryPrice: 25,
                inStock: true,
                quantity: 50,
                rating: 4.8,
                reviews: 124
            },
            {
                id: '2',
                title: 'Organic Hair Oil',
                titleAr: 'زيت الشعر العضوي',
                description: 'Nourishing hair oil blend with natural ingredients for healthy hair growth.',
                descriptionAr: 'خليط زيت الشعر المغذي بمكونات طبيعية لنمو الشعر الصحي.',
                price: 120,
                discount: 10,
                category: 'haircare',
                image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                deliveryAvailable: true,
                deliveryPrice: 25,
                inStock: true,
                quantity: 30,
                rating: 4.9,
                reviews: 89
            },
            {
                id: '3',
                title: 'Beeswax Candle',
                titleAr: 'شمعة شمع العسل',
                description: 'Pure beeswax candle with essential oils for aromatherapy and relaxation.',
                descriptionAr: 'شمعة شمع العسل النقي بالزيوت الأساسية للعلاج العطري والاسترخاء.',
                price: 65,
                discount: 0,
                category: 'aromatherapy',
                image: 'https://images.unsplash.com/photo-1605464315542-f6344c543d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                deliveryAvailable: true,
                deliveryPrice: 20,
                inStock: true,
                quantity: 25,
                rating: 4.7,
                reviews: 67
            },
            {
                id: '4',
                title: 'Body Lotion',
                titleAr: 'لوشن الجسم',
                description: 'Moisturizing body lotion with natural herbs and oils for soft, smooth skin.',
                descriptionAr: 'لوشن الجسم المرطب بالأعشاب والزيوت الطبيعية لبشرة ناعمة ونعومة.',
                price: 95,
                discount: 15,
                category: 'bodycare',
                image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                deliveryAvailable: true,
                deliveryPrice: 25,
                inStock: false,
                quantity: 0,
                rating: 4.6,
                reviews: 45
            }
        ];
        
        renderProducts(defaultProducts);
        
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function renderProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    
    if (productsGrid) {
        productsGrid.innerHTML = products.map(product => {
            const currentLang = getCurrentLanguage();
            const title = currentLang === 'ar' ? product.titleAr : product.title;
            const description = currentLang === 'ar' ? product.descriptionAr : product.description;
            const finalPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;
            
            return `
                <div class="product-card" data-category="${product.category}" data-aos="fade-up">
                    <div class="product-image">
                        <img src="${product.image}" alt="${title}" class="product-img">
                        ${product.discount > 0 ? `<div class="product-badge">-${product.discount}%</div>` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${title}</h3>
                        <p class="product-description">${description}</p>
                        
                        <div class="product-rating">
                            <div class="stars">
                                ${generateStars(product.rating)}
                            </div>
                            <span class="rating-text">${product.rating} (${product.reviews} ${languageManager.t('reviews')})</span>
                        </div>
                        
                        <div class="product-price">
                            ${product.discount > 0 ? `<span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.9em;">${languageManager.formatCurrency(product.price)}</span>` : ''}
                            ${languageManager.formatCurrency(finalPrice)}
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn btn-small btn-secondary translate-btn" onclick="toggleProductTranslation('${product.id}')">
                                <i class="fas fa-language"></i>
                                <span data-translate="translate_product">Translate</span>
                            </button>
                            <button class="btn btn-small btn-secondary details-btn" onclick="showProductDetails('${product.id}')">
                                <i class="fas fa-info-circle"></i>
                                <span data-translate="view_details">Details</span>
                            </button>
                            <button class="btn btn-small btn-primary whatsapp-btn" onclick="orderViaWhatsApp('${title}')">
                                <i class="fab fa-whatsapp"></i>
                                <span data-translate="order_whatsapp">Order</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Store products globally for filtering
    window.allProducts = products;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star star empty"></i>';
    }
    
    return starsHTML;
}

function filterProductsByCategory(categoryId) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (categoryId === 'all' || card.getAttribute('data-category') === categoryId) {
            card.style.display = 'block';
            // Re-trigger animation
            card.setAttribute('data-aos', 'fade-up');
        } else {
            card.style.display = 'none';
        }
    });
    
    // Refresh AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function toggleProductTranslation(productId) {
    // Find the product
    const product = window.allProducts?.find(p => p.id === productId);
    if (!product) return;
    
    const currentLang = getCurrentLanguage();
    const oppositeTitle = currentLang === 'ar' ? product.title : product.titleAr;
    const oppositeDesc = currentLang === 'ar' ? product.description : product.descriptionAr;
    
    if (oppositeTitle && oppositeDesc) {
        // Find the product card and update content
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const title = card.querySelector('.product-title');
            const description = card.querySelector('.product-description');
            
            if (title && description) {
                if (title.textContent.includes(currentLang === 'ar' ? product.titleAr : product.title)) {
                    title.textContent = oppositeTitle;
                    description.textContent = oppositeDesc;
                }
            }
        });
    } else {
        showToast(languageManager.t('translation_not_available'), 'warning');
    }
}

function showProductDetails(productId) {
    const product = window.allProducts?.find(p => p.id === productId);
    if (!product) return;
    
    const currentLang = getCurrentLanguage();
    const title = currentLang === 'ar' ? product.titleAr : product.title;
    
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('product-modal-title');
    const modalContent = document.getElementById('product-modal-content');
    
    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = title;
        modalContent.innerHTML = `
            <div class="product-details">
                <img src="${product.image}" alt="${title}" style="width: 100%; max-width: 400px; border-radius: var(--radius-lg); margin-bottom: var(--spacing-lg);">
                
                <div class="detail-item">
                    <strong data-translate="delivery_available">Delivery Available:</strong>
                    <span>${product.deliveryAvailable ? languageManager.t('delivery_available') : languageManager.t('delivery_not_available')}</span>
                </div>
                
                ${product.deliveryAvailable ? `
                <div class="detail-item">
                    <strong data-translate="delivery_price">Delivery Price:</strong>
                    <span>${languageManager.formatCurrency(product.deliveryPrice)}</span>
                </div>
                ` : ''}
                
                <div class="detail-item">
                    <strong data-translate="stock_status">Stock Status:</strong>
                    <span style="color: ${product.inStock ? 'var(--olive-green)' : 'var(--accent-color)'}">
                        ${product.inStock ? languageManager.t('in_stock') : languageManager.t('out_of_stock')}
                    </span>
                </div>
                
                <div class="detail-item">
                    <strong data-translate="quantity_available">Quantity Available:</strong>
                    <span>${languageManager.formatNumber(product.quantity)}</span>
                </div>
                
                <div class="detail-item">
                    <strong data-translate="rating">Rating:</strong>
                    <span>${product.rating}/5 (${product.reviews} ${languageManager.t('reviews')})</span>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Update translations
        if (languageManager) {
            languageManager.updateTranslations();
        }
    }
}

function orderViaWhatsApp(productName) {
    const message = languageManager.formatWhatsAppMessage(productName);
    const phoneNumber = '201234567890'; // ضع رقمك هنا بدون علامة +
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Testimonials Management
async function loadTestimonials() {
    try {
        // Try to load from Firebase first
        if (typeof dataManager !== 'undefined') {
            const result = await dataManager.read('testimonials');
            if (result.success && result.data.length > 0) {
                renderTestimonials(result.data);
                return;
            }
        }
        
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
        // Try to load from Firebase first
        if (typeof dataManager !== 'undefined') {
            const result = await dataManager.read('faqs');
            if (result.success && result.data.length > 0) {
                renderFAQs(result.data);
                return;
            }
        }
        
        // Fallback to default FAQs from translations
        const defaultFAQs = languageManager.getDefaultFAQs();
        renderFAQs(defaultFAQs);
        
    } catch (error) {
        console.error('Error loading FAQs:', error);
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

function initializeFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
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
            }
        });
    });
}

function setupFAQSearch() {
    const faqSearch = document.getElementById('faq-search');
    
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchFAQs(searchTerm);
        });
    }
}

function searchFAQs(searchTerm) {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterFAQs(category) {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// UI Helper Functions
function setupScrollProgress() {
    const progressBar = document.getElementById('progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function setupHeaderScroll() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

function setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (galleryItems && lightbox && lightboxImage) {
        const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
        let currentImageIndex = 0;
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentImageIndex = index;
                lightboxImage.src = images[currentImageIndex];
                lightbox.classList.add('active');
            });
        });
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        }
        
        // Navigation
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                lightboxImage.src = images[currentImageIndex];
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                lightboxImage.src = images[currentImageIndex];
            });
        }
        
        // Close on outside click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                lightboxImage.src = images[currentImageIndex];
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                lightboxImage.src = images[currentImageIndex];
            }
        });
    }
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

function initializeCategoryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const categoryId = btn.getAttribute('data-category');
            filterProductsByCategory(categoryId);
        });
    });
}

function setupProductInteractions() {
    // This will be called after products are loaded
    // Additional product interactions can be added here
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
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
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    isLoading = false;
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
        toastContainer.appendChild(toast);
        
        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }
}

// Helper function to get current language
function getCurrentLanguage() {
    return languageManager ? languageManager.getCurrentLanguage() : 'en';
}

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
        
        productsList.innerHTML = products.map(product => `
            <div class="admin-item">
                <div class="admin-item-content">
                    <img src="${product.image || '/placeholder.jpg'}" alt="${product.title}" class="admin-item-image">
                    <div class="admin-item-details">
                        <h4>${product.title}</h4>
                        <p class="admin-item-meta">
                            ${languageManager.formatCurrency(product.price)} | 
                            ${product.category} | 
                            ${product.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="btn btn-small btn-secondary" onclick="editProduct('${product.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-small btn-danger" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
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