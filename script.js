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
let categories = [];
let currentRating = 0;
let visibleFAQs = 5;

// Admin email configuration - replace with your specific email
const ADMIN_EMAIL = 'askacounts001@gmail.com'; // Change this to your admin email

// Comprehensive Category System
const PRODUCT_CATEGORIES = [
    { id: 'all', parent: null },
    // Skin Care
    { id: 'skincare', parent: null },
    { id: 'moisturizing_creams', parent: 'skincare' },
    { id: 'face_wash', parent: 'skincare' },
    { id: 'serums', parent: 'skincare' },
    { id: 'toner', parent: 'skincare' },
    { id: 'face_masks', parent: 'skincare' },
    { id: 'sunscreen', parent: 'skincare' },
    { id: 'makeup_remover', parent: 'skincare' },
    // Body Care
    { id: 'bodycare', parent: null },
    { id: 'body_oils', parent: 'bodycare' },
    { id: 'body_scrubs', parent: 'bodycare' },
    { id: 'body_lotion', parent: 'bodycare' },
    { id: 'whitening_creams', parent: 'bodycare' },
    { id: 'deodorants', parent: 'bodycare' },
    { id: 'hand_foot_creams', parent: 'bodycare' },
    // Hair Care
    { id: 'haircare', parent: null },
    { id: 'shampoo', parent: 'haircare' },
    { id: 'conditioner', parent: 'haircare' },
    { id: 'hair_mask', parent: 'haircare' },
    { id: 'hair_oils', parent: 'haircare' },
    { id: 'hair_serum', parent: 'haircare' },
    { id: 'hair_loss_treatments', parent: 'haircare' },
    // Oral Care
    { id: 'oralcare', parent: null },
    { id: 'natural_toothpaste', parent: 'oralcare' },
    { id: 'mouthwash', parent: 'oralcare' },
    { id: 'teeth_whitening', parent: 'oralcare' },
    // Natural Products
    { id: 'natural_products', parent: null },
    { id: 'organic_products', parent: 'natural_products' },
    { id: 'chemical_free', parent: 'natural_products' },
    { id: 'fragrance_free', parent: 'natural_products' },
    // Special Care
    { id: 'special_care', parent: null },
    { id: 'for_children', parent: 'special_care' },
    { id: 'for_men', parent: 'special_care' },
    { id: 'for_pregnant', parent: 'special_care' },
    // Fragrances
    { id: 'fragrances', parent: null },
    { id: 'body_perfumes', parent: 'fragrances' },
    { id: 'natural_perfumes', parent: 'fragrances' },
    { id: 'hair_perfumes', parent: 'fragrances' },
    // Soaps & Cleansers
    { id: 'soaps_cleansers', parent: null },
    { id: 'natural_soap', parent: 'soaps_cleansers' },
    { id: 'body_wash', parent: 'soaps_cleansers' },
    { id: 'natural_cleaners', parent: 'soaps_cleansers' },
    // Candles & Aromatherapy
    { id: 'candles_aromatherapy', parent: null },
    { id: 'scented_candles', parent: 'candles_aromatherapy' },
    { id: 'essential_oils', parent: 'candles_aromatherapy' },
    { id: 'natural_incense', parent: 'candles_aromatherapy' }
];

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
            selectCategory: "Select Category",
            all: "All Products",
            // Skin Care
            skincare: "Skin Care",
            moisturizing_creams: "Moisturizing Creams",
            face_wash: "Face Wash",
            serums: "Serums",
            toner: "Toner",
            face_masks: "Face Masks",
            sunscreen: "Sunscreen",
            makeup_remover: "Makeup Remover",
            // Body Care
            bodycare: "Body Care",
            body_oils: "Body Oils",
            body_scrubs: "Body Scrubs",
            body_lotion: "Body Lotion",
            whitening_creams: "Whitening Creams",
            deodorants: "Deodorants",
            hand_foot_creams: "Hand & Foot Creams",
            // Hair Care
            haircare: "Hair Care",
            shampoo: "Shampoo",
            conditioner: "Conditioner",
            hair_mask: "Hair Mask",
            hair_oils: "Hair Oils",
            hair_serum: "Hair Serum",
            hair_loss_treatments: "Hair Loss Treatments",
            // Oral Care
            oralcare: "Oral Care",
            natural_toothpaste: "Natural Toothpaste",
            mouthwash: "Mouthwash",
            teeth_whitening: "Teeth Whitening Products",
            // Natural Products
            natural_products: "Natural Products",
            organic_products: "Organic Products",
            chemical_free: "Chemical-Free",
            fragrance_free: "Fragrance-Free",
            // Special Care
            special_care: "Special Care",
            for_children: "For Children",
            for_men: "For Men",
            for_pregnant: "For Pregnant Women",
            // Fragrances
            fragrances: "Fragrances",
            body_perfumes: "Body Perfumes",
            natural_perfumes: "Natural Perfumes",
            hair_perfumes: "Hair Perfumes",
            // Soaps & Cleansers
            soaps_cleansers: "Soaps & Cleansers",
            natural_soap: "Natural Soap",
            body_wash: "Body Wash",
            natural_cleaners: "Natural Cleaners",
            // Candles & Aromatherapy
            candles_aromatherapy: "Candles & Aromatherapy",
            scented_candles: "Scented Candles",
            essential_oils: "Essential Oils",
            natural_incense: "Natural Incense"
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
        },
        modal: {
            confirm: "Confirm Action",
            alert: "Alert",
            yes: "Yes",
            no: "No",
            ok: "OK",
            cancel: "Cancel"
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
            selectCategory: "اختر الفئة",
            all: "جميع المنتجات",
            // Skin Care
            skincare: "العناية بالبشرة",
            moisturizing_creams: "كريمات الترطيب",
            face_wash: "غسول الوجه",
            serums: "السيروم",
            toner: "التونر",
            face_masks: "أقنعة الوجه",
            sunscreen: "واقي الشمس",
            makeup_remover: "مزيل المكياج",
            // Body Care
            bodycare: "العناية بالجسم",
            body_oils: "زيوت الجسم",
            body_scrubs: "مقشر الجسم",
            body_lotion: "لوشن الجسم",
            whitening_creams: "كريمات التبييض",
            deodorants: "مزيلات العرق",
            hand_foot_creams: "كريمات اليدين والقدمين",
            // Hair Care
            haircare: "العناية بالشعر",
            shampoo: "الشامبو",
            conditioner: "البلسم",
            hair_mask: "ماسك الشعر",
            hair_oils: "زيوت الشعر",
            hair_serum: "سيروم الشعر",
            hair_loss_treatments: "علاجات تساقط الشعر",
            // Oral Care
            oralcare: "العناية بالفم",
            natural_toothpaste: "معجون أسنان طبيعي",
            mouthwash: "غسول الفم",
            teeth_whitening: "منتجات تبييض الأسنان",
            // Natural Products
            natural_products: "المنتجات الطبيعية",
            organic_products: "المنتجات العضوية",
            chemical_free: "خالية من المواد الكيميائية",
            fragrance_free: "خالية من العطور",
            // Special Care
            special_care: "العناية الخاصة",
            for_children: "للأطفال",
            for_men: "للرجال",
            for_pregnant: "للحوامل",
            // Fragrances
            fragrances: "العطور",
            body_perfumes: "عطور الجسم",
            natural_perfumes: "العطور الطبيعية",
            hair_perfumes: "عطور الشعر",
            // Soaps & Cleansers
            soaps_cleansers: "الصابون والمنظفات",
            natural_soap: "الصابون الطبيعي",
            body_wash: "جل الاستحمام",
            natural_cleaners: "المنظفات الطبيعية",
            // Candles & Aromatherapy
            candles_aromatherapy: "الشموع والعلاج العطري",
            scented_candles: "الشموع المعطرة",
            essential_oils: "الزيوت العطرية",
            natural_incense: "البخور الطبيعي"
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
        },
        modal: {
            confirm: "تأكيد العملية",
            alert: "تنبيه",
            yes: "نعم",
            no: "لا",
            ok: "موافق",
            cancel: "إلغاء"
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

// Custom Modal Functions
function showConfirmModal(message, onConfirm, title = null) {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmModalTitle');
    const messageEl = document.getElementById('confirmModalMessage');
    const yesBtn = document.getElementById('confirmModalYes');
    
    titleEl.textContent = title || t('modal.confirm');
    messageEl.textContent = message;
    
    // Remove previous event listeners
    yesBtn.replaceWith(yesBtn.cloneNode(true));
    const newYesBtn = document.getElementById('confirmModalYes');
    
    newYesBtn.addEventListener('click', () => {
        closeConfirmModal();
        if (onConfirm) onConfirm();
    });
    
    modal.classList.add('active');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

function showAlertModal(message, type = 'info', title = null) {
    const modal = document.getElementById('alertModal');
    const titleEl = document.getElementById('alertModalTitle');
    const messageEl = document.getElementById('alertModalMessage');
    const iconEl = document.getElementById('alertIcon');
    
    titleEl.textContent = title || t('modal.alert');
    messageEl.textContent = message;
    
    // Set icon based on type
    const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    iconEl.textContent = icons[type] || icons.info;
    
    modal.classList.add('active');
}

function closeAlertModal() {
    document.getElementById('alertModal').classList.remove('active');
}

function closeProductDetailsModal() {
    document.getElementById('productDetailsModal').classList.remove('active');
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
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');
    
    if (lightIcon && darkIcon) {
        if (currentTheme === 'light') {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        } else {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        }
    }
}

// ===============================================
// Category Management
// ===============================================

function initCategories() {
    categories = PRODUCT_CATEGORIES;
    renderCategoryDropdown();
    renderCategoryFilter();
}

function renderCategoryDropdown() {
    const dropdown = document.getElementById('categoryDropdownMenu');
    if (!dropdown) return;
    
    const mainCategories = categories.filter(cat => cat.parent === null);
    
    dropdown.innerHTML = mainCategories.map(category => {
        const subCategories = categories.filter(cat => cat.parent === category.id);
        const categoryName = t(`categories.${category.id}`);
        
        let html = `<div class="dropdown-category" data-category="${category.id}">${categoryName}</div>`;
        
        if (subCategories.length > 0) {
            html += subCategories.map(sub => 
                `<div class="dropdown-category subcategory" data-category="${sub.id}">
                    &nbsp;&nbsp;• ${t(`categories.${sub.id}`)}
                </div>`
            ).join('');
        }
        
        return html;
    }).join('');
    
    // Add event listeners
    dropdown.querySelectorAll('.dropdown-category').forEach(item => {
        item.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            selectCategory(category);
        });
    });
}

function renderCategoryFilter() {
    const filter = document.getElementById('categoryFilter');
    if (!filter) return;
    
    const mainCategories = categories.filter(cat => cat.parent === null && cat.id !== 'all');
    
    // Keep the "All Products" button and add main categories
    const allButton = filter.querySelector('[data-category="all"]');
    filter.innerHTML = '';
    filter.appendChild(allButton);
    
    mainCategories.slice(0, 6).forEach(category => { // Show only first 6 main categories
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.dataset.category = category.id;
        button.textContent = t(`categories.${category.id}`);
        button.addEventListener('click', () => filterProducts(category.id));
        filter.appendChild(button);
    });
}

function selectCategory(categoryId) {
    const dropdownBtn = document.getElementById('categoryDropdownBtn');
    const dropdown = document.querySelector('.categories__dropdown');
    
    // Update dropdown button text
    dropdownBtn.querySelector('span').textContent = t(`categories.${categoryId}`);
    
    // Close dropdown
    dropdown.classList.remove('active');
    
    // Filter products
    filterProducts(categoryId);
    
    // Update active states
    document.querySelectorAll('.dropdown-category').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-category="${categoryId}"]`).classList.add('active');
}

function toggleCategoryDropdown() {
    const dropdown = document.querySelector('.categories__dropdown');
    dropdown.classList.toggle('active');
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
    renderCategoryDropdown();
    renderCategoryFilter();
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
    const userProfile = document.getElementById('userProfile');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const commentForm = document.getElementById('commentForm');
    
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userProfile) {
            userProfile.style.display = 'flex';
            if (userAvatar) userAvatar.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=8B7355&color=fff`;
            if (userName) userName.textContent = user.displayName || user.email.split('@')[0];
        }
        if (commentForm) commentForm.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
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
    
    const currentCategory = document.querySelector('.category-btn.active')?.dataset.category || 
                           document.querySelector('.dropdown-category.active')?.dataset.category || 'all';
    
    let filteredProducts = products;
    if (currentCategory !== 'all') {
        // Check if it's a parent category or subcategory
        const categoryObj = categories.find(cat => cat.id === currentCategory);
        if (categoryObj) {
            if (categoryObj.parent === null) {
                // Parent category - show all products from this category and its subcategories
                const subcategories = categories.filter(cat => cat.parent === currentCategory).map(cat => cat.id);
                filteredProducts = products.filter(p => 
                    p.category === currentCategory || subcategories.includes(p.category)
                );
            } else {
                // Subcategory - show only products from this specific subcategory
                filteredProducts = products.filter(p => p.category === currentCategory);
            }
        }
    }
    
    grid.innerHTML = filteredProducts.map(product => {
        const title = product.title?.[currentLanguage] || product.title?.en || 'Product';
        const description = product.description?.[currentLanguage] || product.description?.en || '';
        const hasTranslation = product.title?.[currentLanguage] && product.description?.[currentLanguage];
        const categoryName = t(`categories.${product.category}`);
        
        return `
            <div class="product-card" data-aos="fade-up" data-category="${product.category}">
                <div class="product-card__category">${categoryName}</div>
                <div class="product-card__image">
                    <img src="${product.image}" alt="${title}" class="product-card__img">
                    ${product.discount > 0 ? `<div class="product-card__discount">-${product.discount}%</div>` : ''}
                    <div class="product-card__stock-indicator">
                        <div class="stock-toggle ${product.inStock ? 'in-stock' : 'out-of-stock'}" 
                             title="${product.inStock ? t('products.inStock') : t('products.outOfStock')}">
                            ${product.inStock ? '✓' : '✗'}
                        </div>
                    </div>
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
                    <div class="product-card__rating" onclick="showProductRating('${product.id}')">
                        <span class="rating-stars">${generateStars(product.rating || 0)}</span>
                        <span class="rating-count">${(product.rating || 0).toFixed(1)}/5 (${product.reviewCount || 0})</span>
                    </div>
                    <div class="product-card__actions">
                        <button class="product-card__btn btn-secondary" onclick="toggleProductTranslation('${product.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                            </svg>
                            ${t('products.translate')}
                        </button>
                        <button class="product-card__btn btn-secondary" onclick="showProductDetailsModal('${product.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                            </svg>
                            ${t('products.details')}
                        </button>
                        <button class="product-card__btn btn-primary" onclick="orderViaWhatsApp('${product.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                            </svg>
                            ${t('products.whatsapp')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
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

function showProductDetailsModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productDetailsModal');
    const title = document.getElementById('productDetailsTitle');
    const content = document.getElementById('productDetailsContent');
    
    const productTitle = product.title?.[currentLanguage] || product.title?.en;
    const productDescription = product.description?.[currentLanguage] || product.description?.en;
    
    title.textContent = productTitle;
    
    content.innerHTML = `
        <div class="product-details-content">
            <div class="product-details-image">
                <img src="${product.image}" alt="${productTitle}" style="width: 100%; max-width: 200px; border-radius: var(--radius-md);">
            </div>
            <div class="product-details-info">
                <h3>${productTitle}</h3>
                <p class="product-description">${productDescription}</p>
                
                <div class="detail-item">
                    <strong>${t('products.deliveryAvailable')}:</strong>
                    <span class="${product.deliveryAvailable ? 'text-success' : 'text-danger'}">
                        ${product.deliveryAvailable ? '✓ ' + t('products.deliveryAvailable') : '✗ ' + t('products.deliveryNotAvailable')}
                    </span>
                </div>
                
                ${product.deliveryAvailable ? `
                    <div class="detail-item">
                        <strong>Delivery Price:</strong>
                        <span>EGP ${product.deliveryPrice}</span>
                    </div>
                ` : ''}
                
                <div class="detail-item">
                    <strong>Stock Status:</strong>
                    <span class="${product.inStock ? 'text-success' : 'text-danger'}">
                        ${product.inStock ? '✓ ' + t('products.inStock') : '✗ ' + t('products.outOfStock')}
                    </span>
                </div>
                
                <div class="detail-item">
                    <strong>${t('products.quantity')}:</strong>
                    <span>${product.quantity} items</span>
                </div>
                
                <div class="detail-item">
                    <strong>Category:</strong>
                    <span>${t(`categories.${product.category}`)}</span>
                </div>
                
                <div class="detail-item">
                    <strong>Rating:</strong>
                    <span>${generateStars(product.rating || 0)} ${(product.rating || 0).toFixed(1)}/5 (${product.reviewCount || 0} reviews)</span>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="orderViaWhatsApp('${product.id}'); closeProductDetailsModal();">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                        </svg>
                        Order via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showProductRating(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    showAlertModal(
        `This product has a rating of ${(product.rating || 0).toFixed(1)}/5 stars based on ${product.reviewCount || 0} customer reviews.`,
        'info',
        'Product Rating'
    );
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
    showConfirmModal(
        t('admin.confirmDelete'),
        async () => {
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
    );
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
    showConfirmModal(
        t('admin.confirmDelete'),
        async () => {
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
    );
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
    showConfirmModal(
        t('admin.confirmDelete'),
        async () => {
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
    );
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
    initCategories();
    
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
    document.getElementById('categoryDropdownBtn')?.addEventListener('click', toggleCategoryDropdown);
    document.getElementById('loginBtn')?.addEventListener('click', signInWithGoogle);
    document.getElementById('signOutBtn')?.addEventListener('click', signOutUser);
    
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