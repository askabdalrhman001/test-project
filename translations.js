// Translation System for Natural Care Website
// Supports English and Arabic with RTL support

const translations = {
    en: {
        // Header & Navigation
        brand_name: "NaturalCare",
        nav_home: "Home",
        nav_products: "Products",
        nav_about: "About",
        nav_testimonials: "Reviews",
        nav_faq: "FAQ",
        nav_contact: "Contact",
        admin_dashboard: "Admin Dashboard",

        // Loading
        loading: "Loading...",

        // Hero Section
        hero_title: "Lavender Soap – Handmade & Pure",
        hero_subtitle: "Nourish your skin naturally. No chemicals. No worries.",
        order_now: "Order Now",
        learn_more: "Learn More",
        follow_us: "Follow us on social media",

        // Categories
        categories_title: "Product Categories",
        
        // Products
        products_title: "Our Natural Products",
        filter_all: "All Products",
        filter_skincare: "Skincare",
        filter_bodycare: "Body Care",
        filter_haircare: "Hair Care",
        filter_aromatherapy: "Aromatherapy",
        
        // Product Actions
        translate_product: "Translate",
        view_details: "Details",
        order_whatsapp: "Order via WhatsApp",
        translation_not_available: "Translation not available",
        write_review: "Write a Review",
        product_inquiry: "Product Inquiry",
        
        // Product Details
        delivery_price: "Delivery Price",
        delivery_available: "Delivery Available",
        delivery_not_available: "Delivery Not Available",
        in_stock: "In Stock",
        out_of_stock: "Out of Stock",
        quantity_available: "Quantity Available",
        
        // About Section
        about_title: "About Our Products",
        about_description: "Our handmade natural products are crafted with love and care using the finest organic ingredients. Each product is made in small batches to ensure quality and freshness, bringing you the pure essence of nature.",
        
        benefit_natural_title: "100% Natural",
        benefit_natural_desc: "No harmful chemicals or artificial additives",
        benefit_handmade_title: "Handmade",
        benefit_handmade_desc: "Crafted with traditional methods and care",
        benefit_gentle_title: "Gentle & Safe",
        benefit_gentle_desc: "Suitable for all skin types, even sensitive skin",

        // Gallery
        gallery_title: "Product Gallery",

        // Testimonials
        testimonials_title: "What Our Customers Say",
        rating: "Rating",
        reviews: "reviews",

        // Comments Section
        comments_title: "Customer Comments",
        write_comment: "Write a comment",
        select_product: "Select Product:",
        choose_product: "Choose a product...",
        your_comment: "Your Comment:",
        comment_placeholder: "Share your experience...",
        post_comment: "Post Comment",
        login_to_comment: "Login to post comments",
        login_comment_desc: "Sign in with your Google account to share your experience with our products.",
        sign_in_google: "Sign in with Google",
        load_more_comments: "Load More Comments",
        edit_comment: "Edit Comment",
        save_changes: "Save Changes",

        // FAQ
        faq_title: "Frequently Asked Questions",
        faq_search_placeholder: "Search FAQs...",
        faq_all: "All",
        faq_delivery: "Delivery",
        faq_products: "Products",
        faq_payment: "Payment",
        faq_general: "General",
        load_more_faq: "View More FAQs",

        // Contact
        contact_title: "Get In Touch",
        contact_phone: "Phone",
        contact_email: "Email", 
        contact_whatsapp: "WhatsApp",
        contact_whatsapp_text: "Chat with us",

        // Contact Form
        form_name: "Your Name",
        form_email: "Your Email",
        form_phone: "Your Phone",
        form_message: "Your Message",
        form_submit: "Send Message",

        // Footer
        footer_description: "Bringing you the finest natural handmade products for a healthier lifestyle.",
        footer_quick_links: "Quick Links",
        footer_connect: "Connect With Us",
        footer_copyright: "© 2024 NaturalCare. All rights reserved.",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",

        // Authentication
        login_title: "Sign In",
        login_description: "Sign in with your Google account to access your profile and post comments.",
        admin_note: "Only authorized admin accounts can access the dashboard.",
        sign_out: "Sign Out",

        // Admin Dashboard
        admin_welcome: "Welcome, Admin!",
        admin_description: "Manage your products, categories, FAQs, and customer interactions.",
        total_products: "Total Products",
        total_inquiries: "Total Inquiries",
        pending_inquiries: "Pending Inquiries",
        all_comments: "All Comments",
        all_users: "All Users",
        
        // Admin Tabs
        admin_products: "Products",
        admin_categories: "Categories",
        admin_faqs: "FAQs",
        admin_testimonials: "Testimonials",
        admin_inquiries: "Product Inquiries",
        admin_comments: "Comments",
        admin_users: "Users",
        admin_gallery: "Gallery",
        
        // Admin Actions
        manage_products: "Manage Products",
        manage_categories: "Manage Categories",
        manage_faqs: "Manage FAQs",
        manage_testimonials: "Manage Testimonials",
        manage_inquiries: "Product Inquiries",
        manage_comments: "Manage Comments",
        manage_users: "Manage Users",
        manage_gallery: "Manage Gallery",
        
        add_product: "Add Product",
        add_category: "Add Category",
        add_faq: "Add FAQ",
        add_testimonial: "Add Testimonial",
        add_gallery_item: "Add Image",
        
        // No Data Messages
        no_products: "No products found.",
        no_categories: "No categories found.",
        no_faqs: "No FAQs found.",
        no_testimonials: "No testimonials found.",
        no_inquiries: "No inquiries found.",
        no_comments: "No comments found.",
        no_users: "No users found.",
        no_gallery: "No gallery items found.",

        // Modal Actions
        confirm: "Confirm",
        cancel: "Cancel",
        delete: "Delete",
        save: "Save",
        edit: "Edit",
        close: "Close",

        // Toast Messages
        login_success: "Login successful!",
        login_failed: "Login failed. Please try again.",
        logout_success: "Signed out successfully.",
        item_deleted: "Item deleted successfully.",
        item_saved: "Item saved successfully.",
        error_occurred: "An error occurred. Please try again.",

        // User Profile
        profile_title: "User Profile",
        manage_account: "Manage your account information and preferences",
        profile_photo: "Profile Photo",
        upload_photo: "Upload Photo",
        display_name: "Display Name",
        nickname: "Nickname",
        title: "Title",
        account_created: "Account Created",
        last_login: "Last Login",

        // Product Categories (Final List)
        category_skincare: "Skin Care",
        category_bodycare: "Body Care",
        category_haircare: "Hair Care",
        category_oralcare: "Oral Care",
        category_natural: "Natural Products",
        category_special: "Special Care",
        category_fragrances: "Fragrances",
        category_soaps: "Soaps & Cleansers",
        category_candles: "Candles & Aromatherapy",

        // Subcategories
        subcategory_moisturizing: "Moisturizing Creams",
        subcategory_facewash: "Face Wash",
        subcategory_serums: "Serums",
        subcategory_toner: "Toner",
        subcategory_facemasks: "Face Masks",
        subcategory_sunscreen: "Sunscreen",
        subcategory_makeup_remover: "Makeup Remover",
        subcategory_body_oils: "Body Oils",
        subcategory_body_scrubs: "Body Scrubs",
        subcategory_body_lotion: "Body Lotion",
        subcategory_whitening: "Whitening Creams",
        subcategory_deodorants: "Deodorants",
        subcategory_hand_foot: "Hand & Foot Creams",
        subcategory_shampoo: "Shampoo",
        subcategory_conditioner: "Conditioner",
        subcategory_hair_mask: "Hair Mask",
        subcategory_hair_oils: "Hair Oils",
        subcategory_hair_serum: "Hair Serum",
        subcategory_hair_loss: "Hair Loss Treatments",
        subcategory_toothpaste: "Natural Toothpaste",
        subcategory_mouthwash: "Mouthwash",
        subcategory_teeth_whitening: "Teeth Whitening Products",
        subcategory_organic: "Organic Products",
        subcategory_chemical_free: "Chemical-Free",
        subcategory_fragrance_free: "Fragrance-Free",
        subcategory_children: "For Children",
        subcategory_men: "For Men",
        subcategory_pregnant: "For Pregnant Women",
        subcategory_body_perfumes: "Body Perfumes",
        subcategory_natural_perfumes: "Natural Perfumes",
        subcategory_hair_perfumes: "Hair Perfumes",
        subcategory_natural_soap: "Natural Soap",
        subcategory_body_wash: "Body Wash",
        subcategory_natural_cleaners: "Natural Cleaners",
        subcategory_scented_candles: "Scented Candles",
        subcategory_essential_oils: "Essential Oils",
        subcategory_natural_incense: "Natural Incense"
    },
    
    ar: {
        // Header & Navigation
        brand_name: "العناية الطبيعية",
        nav_home: "الرئيسية",
        nav_products: "المنتجات",
        nav_about: "حول",
        nav_testimonials: "التقييمات",
        nav_faq: "الأسئلة الشائعة",
        nav_contact: "اتصل بنا",
        admin_dashboard: "لوحة التحكم",

        // Loading
        loading: "جاري التحميل...",

        // Hero Section
        hero_title: "صابون اللافندر – مصنوع يدوياً ونقي",
        hero_subtitle: "اعتن ببشرتك بشكل طبيعي. لا مواد كيميائية. لا قلق.",
        order_now: "اطلب الآن",
        learn_more: "اعرف المزيد",
        follow_us: "تابعنا على وسائل التواصل الاجتماعي",

        // Categories
        categories_title: "فئات المنتجات",
        
        // Products
        products_title: "منتجاتنا الطبيعية",
        filter_all: "جميع المنتجات",
        filter_skincare: "العناية بالبشرة",
        filter_bodycare: "العناية بالجسم",
        filter_haircare: "العناية بالشعر",
        filter_aromatherapy: "العلاج بالروائح",
        
        // Product Actions
        translate_product: "ترجمة",
        view_details: "التفاصيل",
        order_whatsapp: "اطلب عبر واتساب",
        translation_not_available: "الترجمة غير متوفرة",
        write_review: "اكتب تقييماً",
        product_inquiry: "استفسار عن المنتج",
        
        // Product Details
        delivery_price: "سعر التوصيل",
        delivery_available: "التوصيل متوفر",
        delivery_not_available: "التوصيل غير متوفر",
        in_stock: "متوفر",
        out_of_stock: "غير متوفر",
        quantity_available: "الكمية المتوفرة",
        
        // About Section
        about_title: "حول منتجاتنا",
        about_description: "منتجاتنا الطبيعية المصنوعة يدوياً مصنوعة بحب وعناية باستخدام أفضل المكونات العضوية. كل منتج مصنوع بكميات صغيرة لضمان الجودة والنضارة، مما يجلب لك الجوهر النقي للطبيعة.",
        
        benefit_natural_title: "100% طبيعي",
        benefit_natural_desc: "لا مواد كيميائية ضارة أو إضافات صناعية",
        benefit_handmade_title: "مصنوع يدوياً",
        benefit_handmade_desc: "مصنوع بطرق تقليدية وعناية",
        benefit_gentle_title: "لطيف وآمن",
        benefit_gentle_desc: "مناسب لجميع أنواع البشرة، حتى البشرة الحساسة",

        // Gallery
        gallery_title: "معرض المنتجات",

        // Testimonials
        testimonials_title: "ماذا يقول عملاؤنا",
        rating: "التقييم",
        reviews: "تقييمات",

        // Comments Section
        comments_title: "تعليقات العملاء",
        write_comment: "اكتب تعليقاً",
        select_product: "اختر المنتج:",
        choose_product: "اختر منتجاً...",
        your_comment: "تعليقك:",
        comment_placeholder: "شارك تجربتك...",
        post_comment: "نشر التعليق",
        login_to_comment: "سجل دخول لنشر التعليقات",
        login_comment_desc: "سجل دخول بحساب جوجل لمشاركة تجربتك مع منتجاتنا.",
        sign_in_google: "سجل دخول بجوجل",
        load_more_comments: "تحميل المزيد من التعليقات",
        edit_comment: "تعديل التعليق",
        save_changes: "حفظ التغييرات",

        // FAQ
        faq_title: "الأسئلة الشائعة",
        faq_search_placeholder: "البحث في الأسئلة الشائعة...",
        faq_all: "الكل",
        faq_delivery: "التوصيل",
        faq_products: "المنتجات",
        faq_payment: "الدفع",
        faq_general: "عام",
        load_more_faq: "عرض المزيد من الأسئلة",

        // Contact
        contact_title: "تواصل معنا",
        contact_phone: "الهاتف",
        contact_email: "البريد الإلكتروني", 
        contact_whatsapp: "واتساب",
        contact_whatsapp_text: "تحدث معنا",

        // Contact Form
        form_name: "اسمك",
        form_email: "بريدك الإلكتروني",
        form_phone: "هاتفك",
        form_message: "رسالتك",
        form_submit: "إرسال الرسالة",

        // Footer
        footer_description: "نقدم لك أفضل المنتجات الطبيعية المصنوعة يدوياً لحياة صحية أفضل.",
        footer_quick_links: "روابط سريعة",
        footer_connect: "تواصل معنا",
        footer_copyright: "© 2024 العناية الطبيعية. جميع الحقوق محفوظة.",
        footer_privacy: "سياسة الخصوصية",
        footer_terms: "شروط الخدمة",

        // Authentication
        login_title: "تسجيل الدخول",
        login_description: "سجل دخول بحساب جوجل للوصول إلى ملفك الشخصي ونشر التعليقات.",
        admin_note: "فقط الحسابات المصرح لها يمكنها الوصول إلى لوحة التحكم.",
        sign_out: "تسجيل الخروج",

        // Admin Dashboard
        admin_welcome: "مرحباً بك، المدير!",
        admin_description: "إدارة منتجاتك وفئاتك والأسئلة الشائعة وتفاعلات العملاء.",
        total_products: "إجمالي المنتجات",
        total_inquiries: "إجمالي الاستفسارات",
        pending_inquiries: "الاستفسارات المعلقة",
        all_comments: "جميع التعليقات",
        all_users: "جميع المستخدمين",
        
        // Admin Tabs
        admin_products: "المنتجات",
        admin_categories: "الفئات",
        admin_faqs: "الأسئلة الشائعة",
        admin_testimonials: "التقييمات",
        admin_inquiries: "استفسارات المنتجات",
        admin_comments: "التعليقات",
        admin_users: "المستخدمين",
        admin_gallery: "المعرض",
        
        // Admin Actions
        manage_products: "إدارة المنتجات",
        manage_categories: "إدارة الفئات",
        manage_faqs: "إدارة الأسئلة الشائعة",
        manage_testimonials: "إدارة التقييمات",
        manage_inquiries: "استفسارات المنتجات",
        manage_comments: "إدارة التعليقات",
        manage_users: "إدارة المستخدمين",
        manage_gallery: "إدارة المعرض",
        
        add_product: "إضافة منتج",
        add_category: "إضافة فئة",
        add_faq: "إضافة سؤال",
        add_testimonial: "إضافة تقييم",
        add_gallery_item: "إضافة صورة",
        
        // No Data Messages
        no_products: "لم يتم العثور على منتجات.",
        no_categories: "لم يتم العثور على فئات.",
        no_faqs: "لم يتم العثور على أسئلة شائعة.",
        no_testimonials: "لم يتم العثور على تقييمات.",
        no_inquiries: "لم يتم العثور على استفسارات.",
        no_comments: "لم يتم العثور على تعليقات.",
        no_users: "لم يتم العثور على مستخدمين.",
        no_gallery: "لم يتم العثور على صور في المعرض.",

        // Modal Actions
        confirm: "تأكيد",
        cancel: "إلغاء",
        delete: "حذف",
        save: "حفظ",
        edit: "تعديل",
        close: "إغلاق",

        // Toast Messages
        login_success: "تم تسجيل الدخول بنجاح!",
        login_failed: "فشل تسجيل الدخول. حاول مرة أخرى.",
        logout_success: "تم تسجيل الخروج بنجاح.",
        item_deleted: "تم حذف العنصر بنجاح.",
        item_saved: "تم حفظ العنصر بنجاح.",
        error_occurred: "حدث خطأ. حاول مرة أخرى.",

        // User Profile
        profile_title: "الملف الشخصي",
        manage_account: "إدارة معلومات حسابك وتفضيلاتك",
        profile_photo: "صورة الملف الشخصي",
        upload_photo: "رفع صورة",
        display_name: "اسم العرض",
        nickname: "الاسم المستعار",
        title: "اللقب",
        account_created: "تاريخ إنشاء الحساب",
        last_login: "آخر تسجيل دخول",

        // Product Categories (Final List)
        category_skincare: "العناية بالبشرة",
        category_bodycare: "العناية بالجسم",
        category_haircare: "العناية بالشعر",
        category_oralcare: "العناية بالفم",
        category_natural: "المنتجات الطبيعية",
        category_special: "العناية الخاصة",
        category_fragrances: "العطور",
        category_soaps: "الصابون والمنظفات",
        category_candles: "الشموع والعلاج بالروائح",

        // Subcategories
        subcategory_moisturizing: "كريمات الترطيب",
        subcategory_facewash: "غسول الوجه",
        subcategory_serums: "السيروم",
        subcategory_toner: "التونر",
        subcategory_facemasks: "أقنعة الوجه",
        subcategory_sunscreen: "واقي الشمس",
        subcategory_makeup_remover: "مزيل المكياج",
        subcategory_body_oils: "زيوت الجسم",
        subcategory_body_scrubs: "مقشرات الجسم",
        subcategory_body_lotion: "لوشن الجسم",
        subcategory_whitening: "كريمات التفتيح",
        subcategory_deodorants: "مزيلات العرق",
        subcategory_hand_foot: "كريمات اليدين والقدمين",
        subcategory_shampoo: "الشامبو",
        subcategory_conditioner: "البلسم",
        subcategory_hair_mask: "قناع الشعر",
        subcategory_hair_oils: "زيوت الشعر",
        subcategory_hair_serum: "سيروم الشعر",
        subcategory_hair_loss: "علاجات تساقط الشعر",
        subcategory_toothpaste: "معجون أسنان طبيعي",
        subcategory_mouthwash: "غسول الفم",
        subcategory_teeth_whitening: "منتجات تبييض الأسنان",
        subcategory_organic: "المنتجات العضوية",
        subcategory_chemical_free: "خالية من المواد الكيميائية",
        subcategory_fragrance_free: "خالية من العطور",
        subcategory_children: "للأطفال",
        subcategory_men: "للرجال",
        subcategory_pregnant: "للنساء الحوامل",
        subcategory_body_perfumes: "عطور الجسم",
        subcategory_natural_perfumes: "العطور الطبيعية",
        subcategory_hair_perfumes: "عطور الشعر",
        subcategory_natural_soap: "صابون طبيعي",
        subcategory_body_wash: "غسول الجسم",
        subcategory_natural_cleaners: "المنظفات الطبيعية",
        subcategory_scented_candles: "الشموع المعطرة",
        subcategory_essential_oils: "الزيوت الأساسية",
        subcategory_natural_incense: "البخور الطبيعي"
    }
};

// Language Management Class
class LanguageManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.translations = translations;
        this.rtlLanguages = ['ar'];
        this.init();
    }

    init() {
        this.setLanguage(this.currentLanguage);
        this.setupLanguageToggle();
    }

    getStoredLanguage() {
        return localStorage.getItem('naturalcare_language');
    }

    storeLanguage(language) {
        localStorage.setItem('naturalcare_language', language);
    }

    setLanguage(language) {
        if (!this.translations[language]) {
            console.error(`Language '${language}' not found`);
            return;
        }

        this.currentLanguage = language;
        this.storeLanguage(language);
        
        // Update HTML attributes
        document.documentElement.lang = language;
        document.documentElement.dir = this.rtlLanguages.includes(language) ? 'rtl' : 'ltr';
        
        // Update font family for Arabic
        if (language === 'ar') {
            document.body.style.fontFamily = 'var(--font-family-arabic)';
        } else {
            document.body.style.fontFamily = 'var(--font-family-primary)';
        }

        // Update all translatable elements
        this.updateTranslations();
        
        // Update language toggle button
        this.updateLanguageToggle();

        // Trigger custom event for other components
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: language } 
        }));
    }

    updateTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || this.translations.en[key] || key;
    }

    setupLanguageToggle() {
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
        this.setLanguage(newLanguage);
    }

    updateLanguageToggle() {
        const languageToggle = document.getElementById('language-toggle');
        const langIndicator = languageToggle?.querySelector('.lang-indicator');
        
        if (langIndicator) {
            langIndicator.textContent = this.currentLanguage === 'en' ? 'EN' : 'عر';
        }
        
        if (languageToggle) {
            languageToggle.setAttribute('data-tooltip', this.currentLanguage === 'en' ? 'التبديل إلى العربية' : 'Switch to English');
        }
    }

    // Helper method to get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Helper method to check if current language is RTL
    isRTL() {
        return this.rtlLanguages.includes(this.currentLanguage);
    }

    // Get translation with fallback
    t(key, fallback = '') {
        return this.getTranslation(key) || fallback;
    }

    // Get translations for specific language
    getLanguageTranslations(language) {
        return this.translations[language] || this.translations.en;
    }

    // Update specific element's translation
    updateElementTranslation(element, key) {
        const translation = this.getTranslation(key);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    }

    // Add new translation dynamically
    addTranslation(language, key, value) {
        if (!this.translations[language]) {
            this.translations[language] = {};
        }
        this.translations[language][key] = value;
    }

    // Get default FAQs for current language
    getDefaultFAQs() {
        return this.translations[this.currentLanguage].default_faqs || this.translations.en.default_faqs;
    }

    // Format WhatsApp message with product info
    formatWhatsAppMessage(productName = '') {
        const messageKey = productName ? 'whatsapp_product_message' : 'whatsapp_general_message';
        const message = this.getTranslation(messageKey);
        return productName ? message + productName : message;
    }

    // Get localized number format
    formatNumber(number) {
        if (this.currentLanguage === 'ar') {
            // Convert to Arabic numerals
            const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            return number.toString().replace(/\d/g, digit => arabicNumerals[digit]);
        }
        return number.toString();
    }

    // Get localized currency format
    formatCurrency(amount) {
        const currency = this.currentLanguage === 'ar' ? 'جنيه' : 'EGP';
        const formattedAmount = this.formatNumber(amount);
        return this.currentLanguage === 'ar' ? `${formattedAmount} ${currency}` : `${formattedAmount} ${currency}`;
    }

    // Get localized date format
    formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const locale = this.currentLanguage === 'ar' ? 'ar-EG' : 'en-US';
        return new Intl.DateTimeFormat(locale, options).format(date);
    }
}

// Initialize language manager when DOM is loaded
let languageManager;

document.addEventListener('DOMContentLoaded', () => {
    languageManager = new LanguageManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LanguageManager, translations };
}