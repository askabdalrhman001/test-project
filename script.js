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
                icon: 'fas fa-candle-holder',
                subcategories: ['scented-candles', 'essential-oils', 'natural-incense']
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
        
        // Fallback to default products with updated categories
        const defaultProducts = [
            {
                id: '1',
                title: 'Lavender Soap',
                titleAr: 'صابون اللافندر',
                description: 'Handmade lavender soap with organic ingredients. Perfect for sensitive skin.',
                descriptionAr: 'صابون اللافندر المصنوع يدوياً بمكونات عضوية. مثالي للبشرة الحساسة.',
                price: 85,
                discount: 0,
                category: 'soaps-cleansers',
                categoryName: 'Soaps & Cleansers',
                categoryNameAr: 'الصابون والمنظفات',
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
                categoryName: 'Hair Care',
                categoryNameAr: 'العناية بالشعر',
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
                category: 'candles-aromatherapy',
                categoryName: 'Candles & Aromatherapy',
                categoryNameAr: 'الشموع والعلاج العطري',
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
                categoryName: 'Body Care',
                categoryNameAr: 'العناية بالجسم',
                image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                deliveryAvailable: true,
                deliveryPrice: 25,
                inStock: false,
                quantity: 0,
                rating: 4.6,
                reviews: 45
            },
            {
                id: '5',
                title: 'Face Moisturizer',
                titleAr: 'مرطب الوجه',
                description: 'Hydrating face cream with natural ingredients for all skin types.',
                descriptionAr: 'كريم الوجه المرطب بمكونات طبيعية لجميع أنواع البشرة.',
                price: 110,
                discount: 20,
                category: 'skincare',
                categoryName: 'Skin Care',
                categoryNameAr: 'العناية بالبشرة',
                image: 'https://images.unsplash.com/photo-1556228578-dd6c8c6d9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                deliveryAvailable: true,
                deliveryPrice: 25,
                inStock: true,
                quantity: 35,
                rating: 4.5,
                reviews: 78
            },
            {
                id: '6',
                title: 'Natural Toothpaste',
                titleAr: 'معجون الأسنان الطبيعي',
                description: 'Fluoride-free natural toothpaste with mint and herbs.',
                descriptionAr: 'معجون أسنان طبيعي خالي من الفلورايد بالنعناع والأعشاب.',
                price: 45,
                discount: 0,
                category: 'oralcare',
                categoryName: 'Oral Care',
                categoryNameAr: 'العناية بالفم',
                image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                deliveryAvailable: true,
                deliveryPrice: 20,
                inStock: true,
                quantity: 60,
                rating: 4.3,
                reviews: 92
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
            
            const categoryName = getCurrentLanguage() === 'ar' ? 
                (product.categoryNameAr || product.category) : 
                (product.categoryName || product.category);

            return `
                <div class="product-card" data-category="${product.category}" data-aos="fade-up">
                    <div class="product-image">
                        <img src="${product.image}" alt="${title}" class="product-img">
                        <div class="product-category">${categoryName}</div>
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

                        <div class="product-stock">
                            <div class="stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                                <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                <span>${product.inStock ? languageManager.t('available') : languageManager.t('out_of_stock')}</span>
                            </div>
                            ${product.inStock ? `<span class="stock-quantity">${languageManager.t('stock_quantity')}: ${languageManager.formatNumber(product.quantity)}</span>` : ''}
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
                            <button class="btn btn-small btn-primary whatsapp-btn" onclick="orderViaWhatsApp('${title}')" ${!product.inStock ? 'disabled' : ''}>
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
    const backHomeBtn = document.getElementById('back-home');
    
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
                    <div class="stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                        <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        <span>${product.inStock ? languageManager.t('available') : languageManager.t('out_of_stock')}</span>
                    </div>
                </div>
                
                <div class="detail-item">
                    <strong data-translate="quantity_available">Quantity Available:</strong>
                    <span>${languageManager.formatNumber(product.quantity)}</span>
                </div>
                
                <div class="detail-item">
                    <strong data-translate="rating">Rating:</strong>
                    <span>${product.rating}/5 (${product.reviews} ${languageManager.t('reviews')})</span>
                </div>

                <div class="detail-actions" style="margin-top: var(--spacing-lg); display: flex; gap: var(--spacing-md);">
                    <button class="btn btn-primary" onclick="orderViaWhatsApp('${title}')" ${!product.inStock ? 'disabled' : ''}>
                        <i class="fab fa-whatsapp"></i>
                        <span data-translate="order_whatsapp">Order via WhatsApp</span>
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Show back to home button
        if (backHomeBtn) {
            backHomeBtn.style.display = 'flex';
        }
        
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
        this.modalCancel?.addEventListener('click', () => this.hide());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hide();
        });
    }
    
    show(options) {
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
        this.modalIcon.className = `modal-icon ${type}`;
        const iconMap = {
            warning: 'fas fa-exclamation-triangle',
            danger: 'fas fa-trash-alt',
            success: 'fas fa-check-circle',
            info: 'fas fa-info-circle'
        };
        this.modalIcon.querySelector('i').className = iconMap[type] || iconMap.warning;
        
        // Update content
        this.modalTitle.textContent = title;
        this.modalMessage.textContent = message;
        this.modalConfirm.querySelector('span').textContent = confirmText;
        this.modalCancel.querySelector('span').textContent = cancelText;
        
        // Setup handlers
        this.modalConfirm.onclick = () => {
            onConfirm();
            this.hide();
        };
        
        this.modalCancel.onclick = () => {
            onCancel();
            this.hide();
        };
        
        // Show modal
        this.modal.classList.add('active');
    }
    
    hide() {
        this.modal?.classList.remove('active');
    }
}

// Comments System
class CommentsSystem {
    constructor() {
        this.comments = [];
        this.currentUser = null;
        this.isAdmin = false;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadComments();
        
        // Listen for auth changes
        document.addEventListener('authStateChanged', (e) => {
            this.currentUser = e.detail.user;
            this.isAdmin = e.detail.isAdmin;
            this.updateCommentsUI();
        });
    }
    
    setupEventListeners() {
        // Comment form submission
        const commentForm = document.getElementById('comment-form');
        commentForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitComment(new FormData(commentForm));
        });
        
        // Login to comment button
        const loginBtn = document.getElementById('login-to-comment-btn');
        loginBtn?.addEventListener('click', () => {
            if (authManager) {
                authManager.signInWithGoogle();
            }
        });
        
        // Load more comments
        const loadMoreBtn = document.querySelector('#load-more-comments button');
        loadMoreBtn?.addEventListener('click', () => {
            this.loadMoreComments();
        });
    }
    
    async submitComment(formData) {
        if (!this.currentUser) {
            showToast(languageManager.t('login_to_comment'), 'warning');
            return;
        }
        
        const commentData = {
            productId: formData.get('productId'),
            comment: formData.get('comment'),
            rating: parseInt(formData.get('rating')),
            userId: this.currentUser.uid,
            userEmail: this.currentUser.email,
            userName: this.currentUser.displayName,
            userAvatar: this.currentUser.photoURL,
            timestamp: new Date().toISOString()
        };
        
        try {
            if (dataManager) {
                const result = await dataManager.create('comments', commentData);
                if (result.success) {
                    showToast(languageManager.t('comment_posted'), 'success');
                    document.getElementById('comment-form').reset();
                    this.loadComments();
                }
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            showToast(languageManager.t('error_general'), 'error');
        }
    }
    
    async loadComments() {
        try {
            if (dataManager) {
                const result = await dataManager.read('comments', 'timestamp', 'desc');
                if (result.success) {
                    this.comments = result.data;
                    this.renderComments();
                }
            }
        } catch (error) {
            console.error('Error loading comments:', error);
        }
    }
    
    renderComments() {
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
    }
    
    renderCommentCard(comment) {
        const product = window.allProducts?.find(p => p.id === comment.productId);
        const canEdit = this.currentUser && (this.currentUser.uid === comment.userId || this.isAdmin);
        const commentDate = new Date(comment.timestamp).toLocaleDateString(
            getCurrentLanguage() === 'ar' ? 'ar-EG' : 'en-US'
        );
        
        return `
            <div class="comment-card" data-comment-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-user-info">
                        <img src="${comment.userAvatar || '/default-avatar.png'}" alt="${comment.userName}" class="user-avatar">
                        <div class="comment-meta">
                            <h5>${comment.userName}</h5>
                            <span class="comment-date">${commentDate}</span>
                        </div>
                    </div>
                    ${canEdit ? `
                        <div class="comment-actions">
                            <button class="btn btn-small btn-secondary" onclick="commentsSystem.editComment('${comment.id}')">
                                <i class="fas fa-edit"></i>
                                <span data-translate="edit_comment">Edit</span>
                            </button>
                            <button class="btn btn-small btn-danger" onclick="commentsSystem.deleteComment('${comment.id}')">
                                <i class="fas fa-trash"></i>
                                <span data-translate="delete_comment">Delete</span>
                            </button>
                        </div>
                    ` : ''}
                </div>
                
                ${product ? `
                    <div class="comment-product" onclick="showProductDetails('${product.id}')">
                        <img src="${product.image}" alt="${product.title}" class="comment-product-image">
                        <span class="comment-product-name">${getCurrentLanguage() === 'ar' ? product.titleAr : product.title}</span>
                    </div>
                ` : ''}
                
                <div class="comment-text">${comment.comment}</div>
                
                <div class="comment-rating">
                    <div class="stars">
                        ${generateStars(comment.rating)}
                    </div>
                    <span class="rating-text">${comment.rating}/5</span>
                </div>
            </div>
        `;
    }
    
    editComment(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (!comment) return;
        
        const modal = document.getElementById('edit-comment-modal');
        const form = document.getElementById('edit-comment-form');
        const textArea = document.getElementById('edit-comment-text');
        
        // Populate form
        textArea.value = comment.comment;
        document.querySelector(`input[name="editRating"][value="${comment.rating}"]`).checked = true;
        
        // Setup form submission
        form.onsubmit = async (e) => {
            e.preventDefault();
            const updatedComment = {
                comment: textArea.value,
                rating: parseInt(document.querySelector('input[name="editRating"]:checked').value),
                updatedAt: new Date().toISOString()
            };
            
            try {
                if (dataManager) {
                    const result = await dataManager.update('comments', commentId, updatedComment);
                    if (result.success) {
                        showToast(languageManager.t('comment_updated'), 'success');
                        modal.classList.remove('active');
                        this.loadComments();
                    }
                }
            } catch (error) {
                console.error('Error updating comment:', error);
                showToast(languageManager.t('error_general'), 'error');
            }
        };
        
        modal.classList.add('active');
    }
    
    deleteComment(commentId) {
        customModal.show({
            type: 'danger',
            title: languageManager.t('delete_comment'),
            message: languageManager.t('delete_comment_confirm'),
            confirmText: languageManager.t('yes'),
            cancelText: languageManager.t('no'),
            onConfirm: async () => {
                try {
                    if (dataManager) {
                        const result = await dataManager.delete('comments', commentId);
                        if (result.success) {
                            showToast(languageManager.t('comment_deleted'), 'success');
                            this.loadComments();
                        }
                    }
                } catch (error) {
                    console.error('Error deleting comment:', error);
                    showToast(languageManager.t('error_general'), 'error');
                }
            }
        });
    }
    
    updateCommentsUI() {
        const addCommentSection = document.getElementById('add-comment-section');
        const loginPrompt = document.getElementById('login-prompt');
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('user-name');
        const commentProductSelect = document.getElementById('comment-product');
        
        if (this.currentUser) {
            // Show comment form
            addCommentSection.style.display = 'block';
            loginPrompt.style.display = 'none';
            
            // Update user info
            userAvatar.src = this.currentUser.photoURL || '/default-avatar.png';
            userName.textContent = this.currentUser.displayName;
            
            // Populate product select
            if (window.allProducts && commentProductSelect) {
                commentProductSelect.innerHTML = '<option value="" data-translate="choose_product">Choose a product...</option>' +
                    window.allProducts.map(product => {
                        const title = getCurrentLanguage() === 'ar' ? product.titleAr : product.title;
                        return `<option value="${product.id}">${title}</option>`;
                    }).join('');
            }
        } else {
            // Show login prompt
            addCommentSection.style.display = 'none';
            loginPrompt.style.display = 'block';
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