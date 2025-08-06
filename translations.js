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

        // Admin Panel
        admin_login: "Admin Login",
        admin_logout: "Logout",
        admin_products: "Manage Products",
        admin_faqs: "Manage FAQs",
        admin_testimonials: "Manage Testimonials",
        admin_categories: "Manage Categories",
        
        // Product Management
        add_product: "Add New Product",
        edit_product: "Edit Product",
        delete_product: "Delete Product",
        product_title: "Product Title",
        product_title_ar: "Product Title (Arabic)",
        product_description: "Product Description",
        product_description_ar: "Product Description (Arabic)",
        product_price: "Price (EGP)",
        product_discount: "Discount (%)",
        product_category: "Category",
        product_image: "Product Image",
        upload_image: "Upload Image",
        delivery_available_label: "Delivery Available",
        delivery_price_label: "Delivery Price (EGP)",
        stock_status: "Stock Status",
        quantity_in_stock: "Quantity in Stock",
        save_product: "Save Product",
        cancel: "Cancel",
        confirm_delete: "Are you sure you want to delete this product?",
        yes: "Yes",
        no: "No",

        // FAQ Management
        add_faq: "Add New FAQ",
        edit_faq: "Edit FAQ",
        delete_faq: "Delete FAQ",
        faq_question: "Question",
        faq_question_ar: "Question (Arabic)",
        faq_answer: "Answer",
        faq_answer_ar: "Answer (Arabic)",
        faq_category: "FAQ Category",
        save_faq: "Save FAQ",
        confirm_delete_faq: "Are you sure you want to delete this FAQ?",

        // Testimonials Management
        add_testimonial: "Add New Testimonial",
        edit_testimonial: "Edit Testimonial",
        delete_testimonial: "Delete Testimonial",
        testimonial_text: "Testimonial Text",
        testimonial_text_ar: "Testimonial Text (Arabic)",
        author_name: "Author Name",
        author_location: "Author Location",
        author_avatar: "Author Avatar",
        testimonial_rating: "Rating (1-5)",
        save_testimonial: "Save Testimonial",

        // Categories Management
        add_category: "Add New Category",
        edit_category: "Edit Category",
        delete_category: "Delete Category",
        category_name: "Category Name",
        category_name_ar: "Category Name (Arabic)",
        category_description: "Category Description",
        category_description_ar: "Category Description (Arabic)",
        category_icon: "Category Icon",
        save_category: "Save Category",

        // Messages & Notifications
        success_product_added: "Product added successfully!",
        success_product_updated: "Product updated successfully!",
        success_product_deleted: "Product deleted successfully!",
        success_faq_added: "FAQ added successfully!",
        success_faq_updated: "FAQ updated successfully!",
        success_faq_deleted: "FAQ deleted successfully!",
        success_testimonial_added: "Testimonial added successfully!",
        success_testimonial_updated: "Testimonial updated successfully!",
        success_testimonial_deleted: "Testimonial deleted successfully!",
        success_category_added: "Category added successfully!",
        success_category_updated: "Category updated successfully!",
        success_category_deleted: "Category deleted successfully!",
        error_general: "An error occurred. Please try again.",
        error_auth: "Authentication failed. Please log in again.",
        error_upload: "Image upload failed. Please try again.",
        
        // General UI
        back_to_home: "Back to Home",
        close: "Close",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        required_field: "This field is required",
        optional: "Optional",
        
        // WhatsApp Messages
        whatsapp_product_message: "Hi, I'm interested in ordering: ",
        whatsapp_general_message: "Hi, I'd like to know more about your products.",

        // Default FAQ Content
        default_faqs: [
            {
                question: "Is the lavender soap suitable for sensitive skin?",
                answer: "Yes, our lavender soap is made with natural ingredients and is gentle enough for sensitive skin. We use organic oils and essential oils without any harsh chemicals.",
                category: "products"
            },
            {
                question: "Do you offer cash on delivery?",
                answer: "Yes, we offer cash on delivery for orders within Egypt. Payment can be made upon receiving your order.",
                category: "payment"
            },
            {
                question: "How long does delivery take?",
                answer: "Delivery typically takes 2-3 business days within Cairo and Giza, and 3-5 business days for other governorates.",
                category: "delivery"
            },
            {
                question: "What are the main ingredients in your products?",
                answer: "Our products are made with natural ingredients like organic olive oil, coconut oil, essential oils, and natural herbs. We avoid all synthetic chemicals and preservatives.",
                category: "products"
            },
            {
                question: "Can I return or exchange products?",
                answer: "We accept returns within 7 days of delivery if the product is unused and in its original packaging. Please contact us for return instructions.",
                category: "general"
            }
        ]
    },
    
    ar: {
        // Header & Navigation
        brand_name: "العناية الطبيعية",
        nav_home: "الرئيسية",
        nav_products: "المنتجات",
        nav_about: "من نحن",
        nav_testimonials: "التقييمات",
        nav_faq: "الأسئلة الشائعة",
        nav_contact: "تواصل معنا",
        admin_dashboard: "لوحة الإدارة",

        // Loading
        loading: "جاري التحميل...",

        // Hero Section
        hero_title: "صابون اللافندر - طبيعي ومصنوع يدوياً",
        hero_subtitle: "اعتني بجلدك بطريقة طبيعية. بدون مواد كيميائية. بدون قلق.",
        order_now: "اطلب الآن",
        learn_more: "اعرف المزيد",

        // Categories
        categories_title: "فئات المنتجات",
        
        // Products
        products_title: "منتجاتنا الطبيعية",
        filter_all: "جميع المنتجات",
        filter_skincare: "العناية بالجلد",
        filter_bodycare: "العناية بالجسم",
        filter_haircare: "العناية بالشعر",
        filter_aromatherapy: "العلاج العطري",
        
        // Product Actions
        translate_product: "ترجم",
        view_details: "التفاصيل",
        order_whatsapp: "اطلب عبر واتساب",
        translation_not_available: "الترجمة غير متوفرة",
        
        // Product Details
        delivery_price: "سعر التوصيل",
        delivery_available: "التوصيل متوفر",
        delivery_not_available: "التوصيل غير متوفر",
        in_stock: "متوفر",
        out_of_stock: "غير متوفر",
        quantity_available: "الكمية المتوفرة",
        
        // About Section
        about_title: "عن منتجاتنا",
        about_description: "منتجاتنا الطبيعية المصنوعة يدوياً يتم إعدادها بحب وعناية باستخدام أجود المكونات العضوية. كل منتج يُصنع في دفعات صغيرة لضمان الجودة والطازجة، نقدم لك جوهر الطبيعة النقي.",
        
        benefit_natural_title: "طبيعي 100%",
        benefit_natural_desc: "بدون مواد كيميائية ضارة أو إضافات صناعية",
        benefit_handmade_title: "مصنوع يدوياً",
        benefit_handmade_desc: "مصنوع بالطرق التقليدية وبعناية فائقة",
        benefit_gentle_title: "لطيف وآمن",
        benefit_gentle_desc: "مناسب لجميع أنواع البشرة، حتى الحساسة",

        // Gallery
        gallery_title: "معرض المنتجات",

        // Testimonials
        testimonials_title: "ماذا يقول عملاؤنا",
        rating: "التقييم",
        reviews: "تقييم",

        // FAQ
        faq_title: "الأسئلة الشائعة",
        faq_search_placeholder: "ابحث في الأسئلة الشائعة...",
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
        form_phone: "رقم هاتفك",
        form_message: "رسالتك",
        form_submit: "إرسال الرسالة",

        // Footer
        footer_description: "نقدم لك أجود المنتجات الطبيعية المصنوعة يدوياً لنمط حياة صحي.",
        footer_quick_links: "روابط سريعة",
        footer_connect: "تواصل معنا",
        footer_copyright: "© 2024 العناية الطبيعية. جميع الحقوق محفوظة.",
        footer_privacy: "سياسة الخصوصية",
        footer_terms: "شروط الخدمة",

        // Admin Panel
        admin_login: "دخول الإدارة",
        admin_logout: "تسجيل الخروج",
        admin_products: "إدارة المنتجات",
        admin_faqs: "إدارة الأسئلة الشائعة",
        admin_testimonials: "إدارة التقييمات",
        admin_categories: "إدارة الفئات",
        
        // Product Management
        add_product: "إضافة منتج جديد",
        edit_product: "تعديل المنتج",
        delete_product: "حذف المنتج",
        product_title: "اسم المنتج",
        product_title_ar: "اسم المنتج (عربي)",
        product_description: "وصف المنتج",
        product_description_ar: "وصف المنتج (عربي)",
        product_price: "السعر (جنيه)",
        product_discount: "الخصم (%)",
        product_category: "الفئة",
        product_image: "صورة المنتج",
        upload_image: "رفع صورة",
        delivery_available_label: "التوصيل متوفر",
        delivery_price_label: "سعر التوصيل (جنيه)",
        stock_status: "حالة المخزون",
        quantity_in_stock: "الكمية في المخزون",
        save_product: "حفظ المنتج",
        cancel: "إلغاء",
        confirm_delete: "هل أنت متأكد من حذف هذا المنتج؟",
        yes: "نعم",
        no: "لا",

        // FAQ Management
        add_faq: "إضافة سؤال جديد",
        edit_faq: "تعديل السؤال",
        delete_faq: "حذف السؤال",
        faq_question: "السؤال",
        faq_question_ar: "السؤال (عربي)",
        faq_answer: "الإجابة",
        faq_answer_ar: "الإجابة (عربي)",
        faq_category: "فئة السؤال",
        save_faq: "حفظ السؤال",
        confirm_delete_faq: "هل أنت متأكد من حذف هذا السؤال؟",

        // Testimonials Management
        add_testimonial: "إضافة تقييم جديد",
        edit_testimonial: "تعديل التقييم",
        delete_testimonial: "حذف التقييم",
        testimonial_text: "نص التقييم",
        testimonial_text_ar: "نص التقييم (عربي)",
        author_name: "اسم الكاتب",
        author_location: "موقع الكاتب",
        author_avatar: "صورة الكاتب",
        testimonial_rating: "التقييم (1-5)",
        save_testimonial: "حفظ التقييم",

        // Categories Management
        add_category: "إضافة فئة جديدة",
        edit_category: "تعديل الفئة",
        delete_category: "حذف الفئة",
        category_name: "اسم الفئة",
        category_name_ar: "اسم الفئة (عربي)",
        category_description: "وصف الفئة",
        category_description_ar: "وصف الفئة (عربي)",
        category_icon: "أيقونة الفئة",
        save_category: "حفظ الفئة",

        // Messages & Notifications
        success_product_added: "تم إضافة المنتج بنجاح!",
        success_product_updated: "تم تحديث المنتج بنجاح!",
        success_product_deleted: "تم حذف المنتج بنجاح!",
        success_faq_added: "تم إضافة السؤال بنجاح!",
        success_faq_updated: "تم تحديث السؤال بنجاح!",
        success_faq_deleted: "تم حذف السؤال بنجاح!",
        success_testimonial_added: "تم إضافة التقييم بنجاح!",
        success_testimonial_updated: "تم تحديث التقييم بنجاح!",
        success_testimonial_deleted: "تم حذف التقييم بنجاح!",
        success_category_added: "تم إضافة الفئة بنجاح!",
        success_category_updated: "تم تحديث الفئة بنجاح!",
        success_category_deleted: "تم حذف الفئة بنجاح!",
        error_general: "حدث خطأ. يرجى المحاولة مرة أخرى.",
        error_auth: "فشل في المصادقة. يرجى تسجيل الدخول مرة أخرى.",
        error_upload: "فشل في رفع الصورة. يرجى المحاولة مرة أخرى.",
        
        // General UI
        back_to_home: "العودة للرئيسية",
        close: "إغلاق",
        edit: "تعديل",
        delete: "حذف",
        save: "حفظ",
        required_field: "هذا الحقل مطلوب",
        optional: "اختياري",
        
        // WhatsApp Messages
        whatsapp_product_message: "مرحباً، أريد طلب المنتج: ",
        whatsapp_general_message: "مرحباً، أريد معرفة المزيد عن منتجاتكم.",

        // Default FAQ Content
        default_faqs: [
            {
                question: "هل صابون اللافندر مناسب للبشرة الحساسة؟",
                answer: "نعم، صابون اللافندر مصنوع من مكونات طبيعية ولطيف بما يكفي للبشرة الحساسة. نحن نستخدم الزيوت العضوية والزيوت الأساسية بدون أي مواد كيميائية قاسية.",
                category: "products"
            },
            {
                question: "هل تقدمون خدمة الدفع عند الاستلام؟",
                answer: "نعم، نحن نقدم خدمة الدفع عند الاستلام للطلبات داخل مصر. يمكن الدفع عند استلام طلبك.",
                category: "payment"
            },
            {
                question: "كم تستغرق مدة التوصيل؟",
                answer: "عادة ما يستغرق التوصيل 2-3 أيام عمل داخل القاهرة والجيزة، و 3-5 أيام عمل للمحافظات الأخرى.",
                category: "delivery"
            },
            {
                question: "ما هي المكونات الرئيسية في منتجاتكم؟",
                answer: "منتجاتنا مصنوعة من مكونات طبيعية مثل زيت الزيتون العضوي وزيت جوز الهند والزيوت الأساسية والأعشاب الطبيعية. نحن نتجنب جميع المواد الكيميائية الاصطناعية والمواد الحافظة.",
                category: "products"
            },
            {
                question: "هل يمكنني إرجاع أو استبدال المنتجات؟",
                answer: "نحن نقبل الإرجاع خلال 7 أيام من التوصيل إذا كان المنتج غير مستخدم وفي عبوته الأصلية. يرجى التواصل معنا للحصول على تعليمات الإرجاع.",
                category: "general"
            }
        ]
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
        const langText = languageToggle?.querySelector('.lang-text');
        
        if (langText) {
            langText.textContent = this.currentLanguage === 'en' ? 'عر' : 'EN';
        }
        
        if (languageToggle) {
            languageToggle.title = this.currentLanguage === 'en' ? 'التبديل إلى العربية' : 'Switch to English';
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