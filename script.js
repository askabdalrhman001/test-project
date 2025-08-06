// ===============================================
// Global Variables and Configuration
// ===============================================
let currentLanguage = 'en';
let currentTheme = 'light';
let currentUser = null;
let isAdmin = false;
let products = [];
let faqs = [];
let comments = [];
let currentRating = 0;
let visibleFAQs = 5;

// Admin email configuration - replace with your specific email
const ADMIN_EMAIL = 'admin@naturalessence.com'; // Change this to your admin email

// Translations object
const translations = {
    en: {
        brand: "Natural Essence",
        hero: {
            title: "Lavender Soap – Handmade & Pure",
            subtitle: "Nourish your skin naturally. No chemicals. No worries.",
            cta: "Order Now"
        },
        categories: {
            title: "Product Categories",
            all: "All Products",
            skincare: "Skincare",
            bodycare: "Body Care",
            haircare: "Hair Care"
        },
        products: {
            title: "Our Products",
            translate: "Translate",
            details: "Details",
            whatsapp: "WhatsApp Order",
            translationNotAvailable: "Translation not available",
            deliveryAvailable: "Delivery Available",
            deliveryNotAvailable: "Delivery Not Available",
            inStock: "In Stock",
            outOfStock: "Out of Stock",
            quantity: "Quantity Available"
        },
        about: {
            title: "About Our Products",
            description: "Our lavender soap is carefully handcrafted using traditional methods passed down through generations. Each bar is made with pure, natural ingredients sourced from local farms.",
            benefit1: "100% Natural Ingredients",
            benefit2: "No Harmful Chemicals",
            benefit3: "Calming Lavender Scent",
            benefit4: "Handmade with Love",
            ingredients: {
                title: "Key Ingredients",
                olive: "Olive Oil",
                honey: "Raw Honey",
                beeswax: "Beeswax",
                lavender: "Lavender Oil"
            }
        },
        gallery: {
            title: "Product Gallery"
        },
        testimonials: {
            title: "What Our Customers Say",
            review1: "This lavender soap is amazing! My skin feels so soft and the scent is incredibly relaxing.",
            author1: "Sarah Ahmed",
            location1: "Cairo, Egypt",
            review2: "Perfect for sensitive skin. No irritation at all and it lasts a long time.",
            author2: "Mohamed Hassan",
            location2: "Alexandria, Egypt",
            review3: "Best natural soap I've ever used. The lavender scent helps me relax after a long day.",
            author3: "Fatima Ali",
            location3: "Giza, Egypt"
        },
        faq: {
            title: "Frequently Asked Questions",
            loadMore: "View More Questions",
            translationNotAvailable: "Translation not available in this language."
        },
        pricing: {
            title: "Order Your Natural Soap",
            note: "Free delivery on orders over 3 items",
            whatsapp: "Order via WhatsApp",
            form: "Fill Order Form",
            formTitle: "Order Form",
            nameLabel: "Full Name",
            phoneLabel: "Phone Number",
            addressLabel: "Delivery Address",
            quantityLabel: "Quantity",
            submit: "Submit Order"
        },
        comments: {
            title: "Customer Reviews",
            addTitle: "Add Your Review",
            ratingLabel: "Rating",
            textLabel: "Your Review",
            submit: "Submit Review",
            edit: "Edit",
            delete: "Delete",
            loginToComment: "Please log in to add a review"
        },
        footer: {
            title: "Natural Essence",
            description: "Handmade natural products for your wellbeing",
            contactTitle: "Contact Us",
            email: "Email: info@naturalessence.com",
            phone: "Phone: +20 123 456 7890",
            socialTitle: "Follow Us",
            copyright: "© 2024 Natural Essence. All rights reserved.",
            privacy: "Privacy Policy",
            terms: "Terms of Service"
        },
        admin: {
            title: "Admin Dashboard",
            products: "Products",
            faqs: "FAQs",
            comments: "Comments",
            addProduct: "Add Product",
            addFAQ: "Add FAQ",
            edit: "Edit",
            delete: "Delete",
            save: "Save",
            cancel: "Cancel",
            confirmDelete: "Are you sure you want to delete this item?",
            yes: "Yes",
            no: "No"
        },
        notifications: {
            success: "Operation completed successfully!",
            error: "An error occurred. Please try again.",
            loginRequired: "Please log in to access this feature.",
            adminOnly: "Admin access required.",
            saved: "Changes saved successfully!",
            deleted: "Item deleted successfully!"
        }
    },
    ar: {
        brand: "الجوهر الطبيعي",
        hero: {
            title: "صابون اللافندر - مصنوع يدوياً ونقي",
            subtitle: "اعتني ببشرتك طبيعياً. بلا مواد كيميائية. بلا قلق.",
            cta: "اطلب الآن"
        },
        categories: {
            title: "فئات المنتجات",
            all: "جميع المنتجات",
            skincare: "العناية بالبشرة",
            bodycare: "العناية بالجسم",
            haircare: "العناية بالشعر"
        },
        products: {
            title: "منتجاتنا",
            translate: "ترجمة",
            details: "التفاصيل",
            whatsapp: "طلب عبر واتساب",
            translationNotAvailable: "الترجمة غير متوفرة",
            deliveryAvailable: "التوصيل متاح",
            deliveryNotAvailable: "التوصيل غير متاح",
            inStock: "متوفر",
            outOfStock: "غير متوفر",
            quantity: "الكمية المتاحة"
        },
        about: {
            title: "عن منتجاتنا",
            description: "يُصنع صابون اللافندر بعناية يدوياً باستخدام الطرق التقليدية الموروثة عبر الأجيال. كل قطعة مصنوعة بمكونات طبيعية نقية من مزارع محلية.",
            benefit1: "مكونات طبيعية 100%",
            benefit2: "بلا مواد كيميائية ضارة",
            benefit3: "رائحة اللافندر المهدئة",
            benefit4: "مصنوع يدوياً بحب",
            ingredients: {
                title: "المكونات الأساسية",
                olive: "زيت الزيتون",
                honey: "العسل الخام",
                beeswax: "شمع العسل",
                lavender: "زيت اللافندر"
            }
        },
        gallery: {
            title: "معرض المنتجات"
        },
        testimonials: {
            title: "آراء عملائنا",
            review1: "صابون اللافندر هذا رائع! بشرتي أصبحت ناعمة جداً والرائحة مريحة بشكل لا يصدق.",
            author1: "سارة أحمد",
            location1: "القاهرة، مصر",
            review2: "مثالي للبشرة الحساسة. لا يسبب أي تهيج ويدوم طويلاً.",
            author2: "محمد حسن",
            location2: "الإسكندرية، مصر",
            review3: "أفضل صابون طبيعي استخدمته. رائحة اللافندر تساعدني على الاسترخاء بعد يوم طويل.",
            author3: "فاطمة علي",
            location3: "الجيزة، مصر"
        },
        faq: {
            title: "الأسئلة الشائعة",
            loadMore: "عرض المزيد من الأسئلة",
            translationNotAvailable: "الترجمة غير متوفرة بهذه اللغة."
        },
        pricing: {
            title: "اطلب صابونك الطبيعي",
            note: "توصيل مجاني للطلبات أكثر من 3 قطع",
            whatsapp: "اطلب عبر واتساب",
            form: "املأ نموذج الطلب",
            formTitle: "نموذج الطلب",
            nameLabel: "الاسم الكامل",
            phoneLabel: "رقم الهاتف",
            addressLabel: "عنوان التوصيل",
            quantityLabel: "الكمية",
            submit: "إرسال الطلب"
        },
        comments: {
            title: "تقييمات العملاء",
            addTitle: "أضف تقييمك",
            ratingLabel: "التقييم",
            textLabel: "تقييمك",
            submit: "إرسال التقييم",
            edit: "تحرير",
            delete: "حذف",
            loginToComment: "يرجى تسجيل الدخول لإضافة تقييم"
        },
        footer: {
            title: "الجوهر الطبيعي",
            description: "منتجات طبيعية مصنوعة يدوياً لصحتك",
            contactTitle: "اتصل بنا",
            email: "البريد الإلكتروني: info@naturalessence.com",
            phone: "الهاتف: +20 123 456 7890",
            socialTitle: "تابعنا",
            copyright: "© 2024 الجوهر الطبيعي. جميع الحقوق محفوظة.",
            privacy: "سياسة الخصوصية",
            terms: "شروط الخدمة"
        },
        admin: {
            title: "لوحة التحكم",
            products: "المنتجات",
            faqs: "الأسئلة الشائعة",
            comments: "التعليقات",
            addProduct: "إضافة منتج",
            addFAQ: "إضافة سؤال",
            edit: "تحرير",
            delete: "حذف",
            save: "حفظ",
            cancel: "إلغاء",
            confirmDelete: "هل أنت متأكد من حذف هذا العنصر؟",
            yes: "نعم",
            no: "لا"
        },
        notifications: {
            success: "تمت العملية بنجاح!",
            error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
            loginRequired: "يرجى تسجيل الدخول للوصول لهذه الميزة.",
            adminOnly: "يتطلب صلاحية المدير.",
            saved: "تم حفظ التغييرات بنجاح!",
            deleted: "تم حذف العنصر بنجاح!"
        }
    }
};

// ===============================================
// Utility Functions
// ===============================================

// Get translation for current language
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        value = value?.[k];
    }
    
    return value || key;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Generate unique ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// ===============================================
// Theme Management
// ===============================================

function initTheme() {
    // Load saved theme
    const savedTheme = localStorage.getItem('naturalEssence_theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('naturalEssence_theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// ===============================================
// Language Management
// ===============================================

function initLanguage() {
    // Load saved language
    const savedLang = localStorage.getItem('naturalEssence_language') || 'en';
    currentLanguage = savedLang;
    updateLanguage();
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('naturalEssence_language', currentLanguage);
    updateLanguage();
}

function updateLanguage() {
    // Update document direction
    document.documentElement.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLanguage);
    
    // Update language toggle button
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = currentLanguage === 'en' ? 'عربي' : 'English';
    }
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Reload dynamic content with new language
    loadProducts();
    loadFAQs();
    loadComments();
}

// ===============================================
// Firebase Authentication
// ===============================================

function initAuth() {
    if (typeof window.auth === 'undefined') {
        console.warn('Firebase not initialized. Some features may not work.');
        return;
    }
    
    window.onAuthStateChanged(window.auth, (user) => {
        currentUser = user;
        updateAuthUI(user);
        
        if (user) {
            // Check if user is admin
            isAdmin = user.email === ADMIN_EMAIL;
            updateAdminUI();
        } else {
            isAdmin = false;
            updateAdminUI();
        }
    });
}

function updateAuthUI(user) {
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const commentForm = document.getElementById('commentForm');
    
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) {
            userInfo.style.display = 'block';
            userInfo.textContent = `Welcome, ${user.displayName || user.email}`;
        }
        if (commentForm) commentForm.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
        if (commentForm) commentForm.style.display = 'none';
    }
}

function updateAdminUI() {
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
        adminBtn.style.display = isAdmin ? 'block' : 'none';
    }
}

async function signInWithGoogle() {
    if (typeof window.auth === 'undefined') {
        showNotification(t('notifications.error'), 'error');
        return;
    }
    
    try {
        const provider = new window.GoogleAuthProvider();
        await window.signInWithPopup(window.auth, provider);
        showNotification(t('notifications.success'));
    } catch (error) {
        console.error('Sign in error:', error);
        showNotification(t('notifications.error'), 'error');
    }
}

async function signOutUser() {
    if (typeof window.auth === 'undefined') return;
    
    try {
        await window.signOut(window.auth);
        showNotification('Signed out successfully');
    } catch (error) {
        console.error('Sign out error:', error);
        showNotification(t('notifications.error'), 'error');
    }
}

// ===============================================
// Product Management
// ===============================================

async function loadProducts() {
    if (typeof window.db === 'undefined') {
        loadMockProducts();
        return;
    }
    
    try {
        const querySnapshot = await window.getDocs(window.collection(window.db, 'products'));
        products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        loadMockProducts();
    }
}

function loadMockProducts() {
    products = [
        {
            id: '1',
            title: { en: 'Lavender Soap', ar: 'صابون اللافندر' },
            description: { 
                en: 'Handmade lavender soap with natural ingredients',
                ar: 'صابون اللافندر المصنوع يدوياً بمكونات طبيعية'
            },
            price: 85,
            category: 'skincare',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            rating: 4.8,
            reviewCount: 24,
            deliveryAvailable: true,
            deliveryPrice: 15,
            inStock: true,
            quantity: 50,
            discount: 0
        },
        {
            id: '2',
            title: { en: 'Rose Hair Oil', ar: 'زيت الشعر بالورد' },
            description: { 
                en: 'Nourishing hair oil with rose essence',
                ar: 'زيت مغذي للشعر بخلاصة الورد'
            },
            price: 120,
            category: 'haircare',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            rating: 4.9,
            reviewCount: 18,
            deliveryAvailable: true,
            deliveryPrice: 20,
            inStock: true,
            quantity: 30,
            discount: 10
        }
    ];
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    const currentCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    grid.innerHTML = filteredProducts.map(product => {
        const title = product.title?.[currentLanguage] || product.title?.en || 'Product';
        const description = product.description?.[currentLanguage] || product.description?.en || '';
        const hasTranslation = product.title?.[currentLanguage] && product.description?.[currentLanguage];
        
        return `
            <div class="product-card" data-aos="fade-up">
                <div class="product-card__image">
                    <img src="${product.image}" alt="${title}" class="product-card__img">
                    ${product.discount > 0 ? `<div class="product-card__discount">-${product.discount}%</div>` : ''}
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title">${title}</h3>
                    <p class="product-card__description">${description}</p>
                    <div class="product-card__price">
                        ${product.discount > 0 ? 
                            `<span class="price-old">EGP ${product.price}</span>
                             <span class="price-new">EGP ${Math.round(product.price * (1 - product.discount / 100))}</span>` :
                            `EGP ${product.price}`
                        }
                    </div>
                    <div class="product-card__rating">
                        <span class="rating-stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                        <span class="rating-count">${product.rating}/5 (${product.reviewCount})</span>
                    </div>
                    <div class="product-card__actions">
                        <button class="product-card__btn btn-secondary" onclick="toggleProductTranslation('${product.id}')">
                            ${t('products.translate')}
                        </button>
                        <button class="product-card__btn btn-secondary" onclick="showProductDetails('${product.id}')">
                            ${t('products.details')}
                        </button>
                        <button class="product-card__btn btn-primary" onclick="orderViaWhatsApp('${product.id}')">
                            ${t('products.whatsapp')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Re-render products
    renderProducts();
}

function toggleProductTranslation(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const hasTranslation = product.title?.[currentLanguage] && product.description?.[currentLanguage];
    
    if (hasTranslation) {
        // Show translation
        renderProducts();
    } else {
        showNotification(t('products.translationNotAvailable'), 'error');
    }
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal__content">
            <div class="modal__header">
                <h2>${product.title?.[currentLanguage] || product.title?.en}</h2>
                <button class="modal__close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal__body">
                <div class="product-details">
                    <p><strong>${t('products.deliveryAvailable')}:</strong> ${product.deliveryAvailable ? t('products.deliveryAvailable') : t('products.deliveryNotAvailable')}</p>
                    ${product.deliveryAvailable ? `<p><strong>Delivery Price:</strong> EGP ${product.deliveryPrice}</p>` : ''}
                    <p><strong>Stock Status:</strong> ${product.inStock ? t('products.inStock') : t('products.outOfStock')}</p>
                    <p><strong>${t('products.quantity')}:</strong> ${product.quantity}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function orderViaWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const title = product.title?.[currentLanguage] || product.title?.en;
    const price = product.discount > 0 ? 
        Math.round(product.price * (1 - product.discount / 100)) : 
        product.price;
    
    const message = encodeURIComponent(
        `Hi! I want to order: ${title}\nPrice: EGP ${price}\nPlease confirm availability and delivery details.`
    );
    
    window.open(`https://wa.me/201234567890?text=${message}`, '_blank');
}

// ===============================================
// FAQ Management
// ===============================================

async function loadFAQs() {
    if (typeof window.db === 'undefined') {
        loadMockFAQs();
        return;
    }
    
    try {
        const querySnapshot = await window.getDocs(window.collection(window.db, 'faqs'));
        faqs = [];
        querySnapshot.forEach((doc) => {
            faqs.push({ id: doc.id, ...doc.data() });
        });
        renderFAQs();
    } catch (error) {
        console.error('Error loading FAQs:', error);
        loadMockFAQs();
    }
}

function loadMockFAQs() {
    faqs = [
        {
            id: '1',
            question: {
                en: 'Is the soap suitable for sensitive skin?',
                ar: 'هل الصابون مناسب للبشرة الحساسة؟'
            },
            answer: {
                en: 'Yes, our soap is made with 100% natural ingredients and is gentle on sensitive skin.',
                ar: 'نعم، صابوننا مصنوع من مكونات طبيعية 100% وهو لطيف على البشرة الحساسة.'
            },
            category: 'product'
        },
        {
            id: '2',
            question: {
                en: 'Do you offer cash on delivery?',
                ar: 'هل تقدمون خدمة الدفع عند الاستلام؟'
            },
            answer: {
                en: 'Yes, we accept cash on delivery for all orders within Egypt.',
                ar: 'نعم، نقبل الدفع عند الاستلام لجميع الطلبات داخل مصر.'
            },
            category: 'delivery'
        },
        {
            id: '3',
            question: {
                en: 'How long does the soap last?',
                ar: 'كم يدوم الصابون؟'
            },
            answer: {
                en: 'Each bar typically lasts 4-6 weeks with regular daily use.',
                ar: 'كل قطعة تدوم عادة 4-6 أسابيع مع الاستخدام اليومي العادي.'
            },
            category: 'product'
        },
        {
            id: '4',
            question: {
                en: 'What is your return policy?',
                ar: 'ما هي سياسة الإرجاع؟'
            },
            answer: {
                en: 'We offer a 30-day money-back guarantee if you\'re not satisfied with your purchase.',
                ar: 'نقدم ضمان استرداد الأموال لمدة 30 يوماً إذا لم تكن راضياً عن مشترياتك.'
            },
            category: 'policy'
        },
        {
            id: '5',
            question: {
                en: 'Can I order in bulk?',
                ar: 'هل يمكنني الطلب بكميات كبيرة؟'
            },
            answer: {
                en: 'Yes, we offer discounts for bulk orders. Contact us for special pricing.',
                ar: 'نعم، نقدم خصومات للطلبات بكميات كبيرة. اتصل بنا للحصول على أسعار خاصة.'
            },
            category: 'order'
        }
    ];
    renderFAQs();
}

function renderFAQs() {
    const container = document.getElementById('faqContainer');
    const loadMoreBtn = document.getElementById('faqLoadMore');
    if (!container) return;
    
    const visibleFaqList = faqs.slice(0, visibleFAQs);
    
    container.innerHTML = visibleFaqList.map(faq => {
        const question = faq.question?.[currentLanguage] || faq.question?.en || '';
        const answer = faq.answer?.[currentLanguage] || faq.answer?.en || '';
        
        if (!question || !answer) {
            return `
                <div class="faq-item">
                    <button class="faq-question">
                        <span>${faq.question?.en || 'Question'}</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer">
                        <p>${t('faq.translationNotAvailable')}</p>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFAQ(this)">
                    <span>${question}</span>
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>${answer}</p>
                </div>
            </div>
        `;
    }).join('');
    
    // Show/hide load more button
    if (loadMoreBtn) {
        loadMoreBtn.style.display = faqs.length > visibleFAQs ? 'block' : 'none';
    }
}

function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

function loadMoreFAQs() {
    visibleFAQs += 5;
    renderFAQs();
}

// ===============================================
// Comments Management
// ===============================================

async function loadComments() {
    if (typeof window.db === 'undefined') {
        loadMockComments();
        return;
    }
    
    try {
        const querySnapshot = await window.getDocs(
            window.query(
                window.collection(window.db, 'comments'),
                window.orderBy('timestamp', 'desc')
            )
        );
        comments = [];
        querySnapshot.forEach((doc) => {
            comments.push({ id: doc.id, ...doc.data() });
        });
        renderComments();
    } catch (error) {
        console.error('Error loading comments:', error);
        loadMockComments();
    }
}

function loadMockComments() {
    comments = [
        {
            id: '1',
            text: 'Great product! Love the natural scent.',
            rating: 5,
            author: 'Sarah A.',
            timestamp: new Date('2024-01-15'),
            userId: 'user1'
        },
        {
            id: '2',
            text: 'Perfect for my sensitive skin.',
            rating: 4,
            author: 'Ahmed M.',
            timestamp: new Date('2024-01-10'),
            userId: 'user2'
        }
    ];
    renderComments();
}

function renderComments() {
    const container = document.getElementById('commentsList');
    if (!container) return;
    
    container.innerHTML = comments.map(comment => `
        <div class="comment-item" data-aos="fade-up">
            <div class="comment-header">
                <div class="comment-author">
                    <div class="comment-avatar">${comment.author.charAt(0).toUpperCase()}</div>
                    <div>
                        <strong>${comment.author}</strong>
                        <div class="comment-rating">
                            ${'★'.repeat(comment.rating)}${'☆'.repeat(5 - comment.rating)}
                        </div>
                    </div>
                </div>
                <div class="comment-actions">
                    ${currentUser && (currentUser.uid === comment.userId || isAdmin) ? 
                        `<button class="comment-btn" onclick="editComment('${comment.id}')">${t('comments.edit')}</button>
                         <button class="comment-btn" onclick="deleteComment('${comment.id}')">${t('comments.delete')}</button>` 
                        : ''
                    }
                </div>
            </div>
            <p class="comment-text">${comment.text}</p>
        </div>
    `).join('');
}

async function submitComment(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showNotification(t('notifications.loginRequired'), 'error');
        return;
    }
    
    const form = event.target;
    const text = form.commentText.value.trim();
    
    if (!text || currentRating === 0) {
        showNotification('Please provide both rating and comment', 'error');
        return;
    }
    
    const comment = {
        text,
        rating: currentRating,
        author: currentUser.displayName || currentUser.email.split('@')[0],
        userId: currentUser.uid,
        timestamp: new Date()
    };
    
    try {
        if (typeof window.db !== 'undefined') {
            await window.addDoc(window.collection(window.db, 'comments'), comment);
        } else {
            comment.id = generateId();
            comments.unshift(comment);
        }
        
        form.reset();
        currentRating = 0;
        updateRatingDisplay();
        loadComments();
        showNotification(t('notifications.success'));
    } catch (error) {
        console.error('Error adding comment:', error);
        showNotification(t('notifications.error'), 'error');
    }
}

function setRating(rating) {
    currentRating = rating;
    updateRatingDisplay();
}

function updateRatingDisplay() {
    document.querySelectorAll('.star').forEach((star, index) => {
        star.classList.toggle('active', index < currentRating);
    });
}

async function deleteComment(commentId) {
    if (!confirm(t('admin.confirmDelete'))) return;
    
    try {
        if (typeof window.db !== 'undefined') {
            await window.deleteDoc(window.doc(window.db, 'comments', commentId));
        } else {
            comments = comments.filter(c => c.id !== commentId);
        }
        
        loadComments();
        showNotification(t('notifications.deleted'));
    } catch (error) {
        console.error('Error deleting comment:', error);
        showNotification(t('notifications.error'), 'error');
    }
}

// ===============================================
// Admin Dashboard
// ===============================================

function openAdminDashboard() {
    if (!isAdmin) {
        showNotification(t('notifications.adminOnly'), 'error');
        return;
    }
    
    const modal = document.getElementById('adminModal');
    const dashboard = document.getElementById('adminDashboard');
    
    dashboard.innerHTML = `
        <div class="admin-dashboard">
            <div class="admin-tabs">
                <button class="admin-tab active" onclick="showAdminTab('products')">${t('admin.products')}</button>
                <button class="admin-tab" onclick="showAdminTab('faqs')">${t('admin.faqs')}</button>
                <button class="admin-tab" onclick="showAdminTab('comments')">${t('admin.comments')}</button>
            </div>
            
            <div id="admin-products" class="admin-content active">
                <div class="admin-form">
                    <h3>${t('admin.addProduct')}</h3>
                    <form id="addProductForm" onsubmit="addProduct(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Title (English)</label>
                                <input type="text" name="titleEn" required>
                            </div>
                            <div class="form-group">
                                <label>Title (Arabic)</label>
                                <input type="text" name="titleAr">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Description (English)</label>
                                <textarea name="descEn" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Description (Arabic)</label>
                                <textarea name="descAr"></textarea>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Price (EGP)</label>
                                <input type="number" name="price" required>
                            </div>
                            <div class="form-group">
                                <label>Category</label>
                                <select name="category" required>
                                    <option value="skincare">Skincare</option>
                                    <option value="bodycare">Body Care</option>
                                    <option value="haircare">Hair Care</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Image</label>
                                <input type="file" name="image" accept="image/*">
                            </div>
                            <div class="form-group">
                                <label>Quantity</label>
                                <input type="number" name="quantity" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Discount (%)</label>
                                <input type="number" name="discount" min="0" max="100" value="0">
                            </div>
                            <div class="form-group">
                                <label>Delivery Price</label>
                                <input type="number" name="deliveryPrice" value="15">
                            </div>
                        </div>
                        <button type="submit" class="submit-btn">${t('admin.addProduct')}</button>
                    </form>
                </div>
                
                <div class="admin-list" id="productsList">
                    ${renderAdminProducts()}
                </div>
            </div>
            
            <div id="admin-faqs" class="admin-content">
                <div class="admin-form">
                    <h3>${t('admin.addFAQ')}</h3>
                    <form id="addFAQForm" onsubmit="addFAQ(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Question (English)</label>
                                <input type="text" name="questionEn" required>
                            </div>
                            <div class="form-group">
                                <label>Question (Arabic)</label>
                                <input type="text" name="questionAr">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Answer (English)</label>
                                <textarea name="answerEn" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Answer (Arabic)</label>
                                <textarea name="answerAr"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select name="category">
                                <option value="product">Product</option>
                                <option value="delivery">Delivery</option>
                                <option value="policy">Policy</option>
                                <option value="order">Order</option>
                            </select>
                        </div>
                        <button type="submit" class="submit-btn">${t('admin.addFAQ')}</button>
                    </form>
                </div>
                
                <div class="admin-list" id="faqsList">
                    ${renderAdminFAQs()}
                </div>
            </div>
            
            <div id="admin-comments" class="admin-content">
                <div class="admin-list" id="commentsList">
                    ${renderAdminComments()}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showAdminTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[onclick="showAdminTab('${tabName}')"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.admin-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`admin-${tabName}`).classList.add('active');
}

function renderAdminProducts() {
    return products.map(product => `
        <div class="admin-item">
            <div class="admin-item-content">
                <strong>${product.title?.en || 'Untitled'}</strong>
                <p>Price: EGP ${product.price} | Category: ${product.category}</p>
            </div>
            <div class="admin-item-actions">
                <button class="admin-btn-small btn-edit" onclick="editProduct('${product.id}')">${t('admin.edit')}</button>
                <button class="admin-btn-small btn-delete" onclick="deleteProduct('${product.id}')">${t('admin.delete')}</button>
            </div>
        </div>
    `).join('');
}

function renderAdminFAQs() {
    return faqs.map(faq => `
        <div class="admin-item">
            <div class="admin-item-content">
                <strong>${faq.question?.en || 'No question'}</strong>
                <p>Category: ${faq.category || 'general'}</p>
            </div>
            <div class="admin-item-actions">
                <button class="admin-btn-small btn-edit" onclick="editFAQ('${faq.id}')">${t('admin.edit')}</button>
                <button class="admin-btn-small btn-delete" onclick="deleteFAQ('${faq.id}')">${t('admin.delete')}</button>
            </div>
        </div>
    `).join('');
}

function renderAdminComments() {
    return comments.map(comment => `
        <div class="admin-item">
            <div class="admin-item-content">
                <strong>${comment.author}</strong>
                <p>${comment.text.substring(0, 100)}...</p>
                <small>Rating: ${'★'.repeat(comment.rating)}</small>
            </div>
            <div class="admin-item-actions">
                <button class="admin-btn-small btn-delete" onclick="deleteComment('${comment.id}')">${t('admin.delete')}</button>
            </div>
        </div>
    `).join('');
}

async function addProduct(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const product = {
        title: {
            en: formData.get('titleEn'),
            ar: formData.get('titleAr') || formData.get('titleEn')
        },
        description: {
            en: formData.get('descEn'),
            ar: formData.get('descAr') || formData.get('descEn')
        },
        price: parseInt(formData.get('price')),
        category: formData.get('category'),
        quantity: parseInt(formData.get('quantity')),
        discount: parseInt(formData.get('discount')) || 0,
        deliveryPrice: parseInt(formData.get('deliveryPrice')) || 15,
        deliveryAvailable: true,
        inStock: true,
        rating: 0,
        reviewCount: 0,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    };
    
    try {
        if (typeof window.db !== 'undefined') {
            await window.addDoc(window.collection(window.db, 'products'), product);
        } else {
            product.id = generateId();
            products.push(product);
        }
        
        form.reset();
        loadProducts();
        document.getElementById('productsList').innerHTML = renderAdminProducts();
        showNotification(t('notifications.saved'));
    } catch (error) {
        console.error('Error adding product:', error);
        showNotification(t('notifications.error'), 'error');
    }
}

async function deleteProduct(productId) {
    if (!confirm(t('admin.confirmDelete'))) return;
    
    try {
        if (typeof window.db !== 'undefined') {
            await window.deleteDoc(window.doc(window.db, 'products', productId));
        } else {
            products = products.filter(p => p.id !== productId);
        }
        
        loadProducts();
        document.getElementById('productsList').innerHTML = renderAdminProducts();
        showNotification(t('notifications.deleted'));
    } catch (error) {
        console.error('Error deleting product:', error);
        showNotification(t('notifications.error'), 'error');
    }
}

async function addFAQ(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const faq = {
        question: {
            en: formData.get('questionEn'),
            ar: formData.get('questionAr') || formData.get('questionEn')
        },
        answer: {
            en: formData.get('answerEn'),
            ar: formData.get('answerAr') || formData.get('answerEn')
        },
        category: formData.get('category') || 'general'
    };
    
    try {
        if (typeof window.db !== 'undefined') {
            await window.addDoc(window.collection(window.db, 'faqs'), faq);
        } else {
            faq.id = generateId();
            faqs.push(faq);
        }
        
        form.reset();
        loadFAQs();
        document.getElementById('faqsList').innerHTML = renderAdminFAQs();
        showNotification(t('notifications.saved'));
    } catch (error) {
        console.error('Error adding FAQ:', error);
        showNotification(t('notifications.error'), 'error');
    }
}

async function deleteFAQ(faqId) {
    if (!confirm(t('admin.confirmDelete'))) return;
    
    try {
        if (typeof window.db !== 'undefined') {
            await window.deleteDoc(window.doc(window.db, 'faqs', faqId));
        } else {
            faqs = faqs.filter(f => f.id !== faqId);
        }
        
        loadFAQs();
        document.getElementById('faqsList').innerHTML = renderAdminFAQs();
        showNotification(t('notifications.deleted'));
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        showNotification(t('notifications.error'), 'error');
    }
}

// ===============================================
// UI Interactions
// ===============================================

function toggleOrderForm() {
    const form = document.getElementById('orderForm');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}

function openLightbox(imageSrc, imageAlt) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageAlt;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.remove('active');
}

// ===============================================
// Event Listeners and Initialization
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize core features
    initTheme();
    initLanguage();
    initAuth();
    
    // Load content
    loadProducts();
    loadFAQs();
    loadComments();
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Event listeners
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('langToggle')?.addEventListener('click', toggleLanguage);
    document.getElementById('adminBtn')?.addEventListener('click', openAdminDashboard);
    document.getElementById('closeAdminModal')?.addEventListener('click', closeAdminModal);
    document.getElementById('closeLightbox')?.addEventListener('click', closeLightbox);
    document.getElementById('faqLoadMore')?.addEventListener('click', loadMoreFAQs);
    
    // Category filter buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterProducts(btn.dataset.category);
        });
    });
    
    // Rating input
    document.querySelectorAll('.star').forEach((star, index) => {
        star.addEventListener('click', () => setRating(index + 1));
        star.addEventListener('mouseover', () => {
            document.querySelectorAll('.star').forEach((s, i) => {
                s.style.color = i <= index ? '#FFD700' : '#E5E0DA';
            });
        });
    });
    
    // Comment form
    document.getElementById('addCommentForm')?.addEventListener('submit', submitComment);
    
    // Gallery lightbox
    document.querySelectorAll('.gallery__img').forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
        if (e.target.classList.contains('lightbox')) {
            e.target.classList.remove('active');
        }
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToSection(target.id);
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    console.log('Natural Essence Website Initialized Successfully!');
});

// ===============================================
// Service Worker Registration (PWA Support)
// ===============================================

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