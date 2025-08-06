// ========================================
// MAIN APPLICATION CLASS
// ========================================
class PureNatureApp {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || 'en';
    this.currentTheme = this.getStoredTheme() || 'light';
    this.isAdmin = false;
    this.currentUser = null;
    this.products = sampleData.products || [];
    this.testimonials = sampleData.testimonials || [];
    this.faqs = sampleData.faqs || [];
    this.filteredProducts = [...this.products];
    this.activeCategory = 'all';
    
    this.init();
  }

  async init() {
    try {
      // Show loading spinner
      this.showLoading();
      
      // Initialize core features
      this.initializeTheme();
      this.initializeLanguage();
      this.initializeNavigation();
      this.initializeAnimations();
      this.initializeModals();
      this.initializeForms();
      this.initializeScrollEffects();
      
      // Load content
      await this.loadContent();
      
      // Initialize Firebase if available
      if (typeof firebase !== 'undefined') {
        await this.initializeFirebase();
      }
      
      // Hide loading spinner
      this.hideLoading();
      
      console.log('Pure Nature App initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
      this.hideLoading();
    }
  }

  // ========================================
  // LOADING & UTILITIES
  // ========================================
  showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.remove('hidden');
    }
  }

  hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        loading.classList.add('hidden');
      }, 500);
    }
  }

  getStoredLanguage() {
    return localStorage.getItem('pureNature_language');
  }

  getStoredTheme() {
    return localStorage.getItem('pureNature_theme');
  }

  storeLanguage(language) {
    localStorage.setItem('pureNature_language', language);
  }

  storeTheme(theme) {
    localStorage.setItem('pureNature_theme', theme);
  }

  // ========================================
  // THEME MANAGEMENT
  // ========================================
  initializeTheme() {
    this.setTheme(this.currentTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.storeTheme(theme);
    
    document.body.className = document.body.className.replace(/\b(light|dark)-theme\b/g, '');
    document.body.classList.add(`${theme}-theme`);
    document.body.setAttribute('data-theme', theme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
      }
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  // ========================================
  // LANGUAGE MANAGEMENT
  // ========================================
  initializeLanguage() {
    this.setLanguage(this.currentLanguage);
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.addEventListener('click', () => this.toggleLanguage());
    }
  }

  setLanguage(language) {
    if (!translations[language]) {
      console.error(`Language '${language}' not found`);
      return;
    }

    this.currentLanguage = language;
    this.storeLanguage(language);
    
    // Update HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('data-lang', language);
    
    // Update translations
    this.updateTranslations();
    this.updateLanguageToggle();
    
    // Reload dynamic content
    this.loadProducts();
    this.loadTestimonials();
    this.loadFAQs();
  }

  toggleLanguage() {
    const newLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.setLanguage(newLanguage);
  }

  updateLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle?.querySelector('.lang-text');
    
    if (langText) {
      langText.textContent = this.currentLanguage === 'en' ? 'عربي' : 'English';
    }
    
    if (langToggle) {
      langToggle.title = this.currentLanguage === 'en' ? 'Switch to Arabic' : 'Switch to English';
    }
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

    // Update placeholder translations
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-translate-placeholder');
      const translation = this.getTranslation(key);
      
      if (translation) {
        element.placeholder = translation;
      }
    });
  }

  getTranslation(key) {
    const keys = key.split('.');
    let translation = translations[this.currentLanguage];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // Fallback to English
        translation = translations.en;
        for (const k of keys) {
          if (translation && translation[k]) {
            translation = translation[k];
          } else {
            return key;
          }
        }
        break;
      }
    }
    
    return translation || key;
  }

  // ========================================
  // NAVIGATION & SCROLL EFFECTS
  // ========================================
  initializeNavigation() {
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navToggle && navMenu) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  initializeScrollEffects() {
    // Scroll progress bar
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
      if (scrollProgress) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
      }

      // Header background on scroll
      const header = document.getElementById('header');
      if (header) {
        if (window.scrollY > 50) {
          header.style.background = this.currentTheme === 'dark' 
            ? 'rgba(26, 26, 26, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        } else {
          header.style.background = this.currentTheme === 'dark' 
            ? 'rgba(26, 26, 26, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        }
      }

      // Active navigation highlight
      this.updateActiveNavigation();
    });
  }

  updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ========================================
  // ANIMATIONS
  // ========================================
  initializeAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
      });
    }

    // Hero button animations
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // ========================================
  // MODALS
  // ========================================
  initializeModals() {
    // Order form modal
    const orderFormBtn = document.getElementById('order-form-btn');
    const orderModal = document.getElementById('order-modal');
    
    if (orderFormBtn && orderModal) {
      orderFormBtn.addEventListener('click', () => this.showModal('order-modal'));
    }

    // Admin modal
    const adminBtn = document.getElementById('admin-btn');
    const adminModal = document.getElementById('admin-modal');
    
    if (adminBtn && adminModal) {
      adminBtn.addEventListener('click', () => this.handleAdminAccess());
    }

    // Close modals
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) {
          this.hideModal(modal.id);
        }
      });
    });

    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hideModal(modal.id);
        }
      });
    });
  }

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  showConfirmModal(title, message, onConfirm) {
    const confirmModal = document.getElementById('confirm-modal');
    const confirmTitle = document.getElementById('confirm-title');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');
    
    if (confirmModal && confirmTitle && confirmMessage) {
      confirmTitle.textContent = title;
      confirmMessage.textContent = message;
      
      const handleConfirm = () => {
        onConfirm();
        this.hideModal('confirm-modal');
        confirmYes.removeEventListener('click', handleConfirm);
      };
      
      const handleCancel = () => {
        this.hideModal('confirm-modal');
        confirmNo.removeEventListener('click', handleCancel);
      };
      
      confirmYes.addEventListener('click', handleConfirm);
      confirmNo.addEventListener('click', handleCancel);
      
      this.showModal('confirm-modal');
    }
  }

  // ========================================
  // FORMS
  // ========================================
  initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
    }

    // Order form
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
      orderForm.addEventListener('submit', (e) => this.handleOrderForm(e));
    }

    // FAQ search
    const faqSearch = document.getElementById('faq-search');
    if (faqSearch) {
      faqSearch.addEventListener('input', (e) => this.handleFAQSearch(e));
    }
  }

  async handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      // Simulate form submission
      await this.simulateFormSubmission(data);
      this.showNotification(this.getTranslation('common.success'), 'Message sent successfully!', 'success');
      e.target.reset();
    } catch (error) {
      this.showNotification(this.getTranslation('common.error'), 'Failed to send message. Please try again.', 'error');
    }
  }

  async handleOrderForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      // Simulate order submission
      await this.simulateFormSubmission(data);
      this.showNotification(this.getTranslation('common.success'), 'Order placed successfully!', 'success');
      this.hideModal('order-modal');
      e.target.reset();
    } catch (error) {
      this.showNotification(this.getTranslation('common.error'), 'Failed to place order. Please try again.', 'error');
    }
  }

  simulateFormSubmission(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', data);
        resolve();
      }, 1000);
    });
  }

  // ========================================
  // CONTENT LOADING
  // ========================================
  async loadContent() {
    await Promise.all([
      this.loadProducts(),
      this.loadTestimonials(),
      this.loadFAQs(),
      this.loadCategoryFilter()
    ]);
  }

  async loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';
    
    this.filteredProducts.forEach(product => {
      const productCard = this.createProductCard(product);
      productsGrid.appendChild(productCard);
    });
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-aos', 'fade-up');

    const title = product.title[this.currentLanguage] || product.title.en;
    const description = product.description[this.currentLanguage] || product.description.en;
    const hasTranslation = product.title[this.currentLanguage] && product.description[this.currentLanguage];

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${title}" loading="lazy">
        <div class="product-category">${this.getTranslation(`categories.${product.category}`)}</div>
        <div class="stock-status ${product.inStock ? '' : 'out-of-stock'}"></div>
      </div>
      <div class="product-content">
        <h3 class="product-title">${title}</h3>
        <p class="product-description">${description}</p>
        <div class="product-price">
          ${product.currency} ${product.price}
          ${product.discount > 0 ? `<span class="discount">-${product.discount}%</span>` : ''}
        </div>
        <div class="product-rating">
          <div class="stars">
            ${this.generateStars(product.rating)}
          </div>
          <span class="rating-text">${product.rating} (${product.reviews} ${this.getTranslation('products.rating')})</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-secondary btn-translate" ${!hasTranslation ? 'disabled' : ''}>
            <i class="fas fa-language"></i>
            ${this.getTranslation('products.translate')}
          </button>
          <button class="btn btn-secondary btn-details">
            <i class="fas fa-info-circle"></i>
            ${this.getTranslation('products.details')}
          </button>
          <button class="btn btn-whatsapp btn-order">
            <i class="fab fa-whatsapp"></i>
            ${this.getTranslation('products.order')}
          </button>
        </div>
      </div>
    `;

    // Add event listeners
    const translateBtn = card.querySelector('.btn-translate');
    const detailsBtn = card.querySelector('.btn-details');
    const orderBtn = card.querySelector('.btn-order');

    if (translateBtn) {
      translateBtn.addEventListener('click', () => this.handleProductTranslate(product, card));
    }

    if (detailsBtn) {
      detailsBtn.addEventListener('click', () => this.showProductDetails(product));
    }

    if (orderBtn) {
      orderBtn.addEventListener('click', () => this.handleProductOrder(product));
    }

    return card;
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star star empty"></i>';
    }

    return starsHTML;
  }

  handleProductTranslate(product, card) {
    const oppositeLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    const title = product.title[oppositeLanguage];
    const description = product.description[oppositeLanguage];

    if (title && description) {
      const titleElement = card.querySelector('.product-title');
      const descElement = card.querySelector('.product-description');
      
      if (titleElement && descElement) {
        titleElement.textContent = title;
        descElement.textContent = description;
      }
    } else {
      this.showNotification(
        this.getTranslation('common.info'),
        this.getTranslation('products.translationNotAvailable'),
        'info'
      );
    }
  }

  showProductDetails(product) {
    const details = `
      <div class="product-details">
        <h3>${product.title[this.currentLanguage] || product.title.en}</h3>
        <p><strong>${this.getTranslation('products.instock')}:</strong> ${product.inStock ? this.getTranslation('common.yes') : this.getTranslation('common.no')}</p>
        <p><strong>Quantity:</strong> ${product.quantity}</p>
        <p><strong>Delivery Available:</strong> ${product.deliveryAvailable ? this.getTranslation('common.yes') : this.getTranslation('common.no')}</p>
        <p><strong>Delivery Price:</strong> ${product.currency} ${product.deliveryPrice}</p>
        <p><strong>${this.getTranslation('products.rating')}:</strong> ${product.rating}/5 (${product.reviews} reviews)</p>
      </div>
    `;
    
    this.showNotification('Product Details', details, 'info');
  }

  handleProductOrder(product) {
    const productName = product.title[this.currentLanguage] || product.title.en;
    const message = `Hi, I want to order ${productName}`;
    const whatsappUrl = `https://wa.me/201234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  async loadTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;

    testimonialsGrid.innerHTML = '';
    
    this.testimonials.forEach((testimonial, index) => {
      const testimonialCard = this.createTestimonialCard(testimonial, index);
      testimonialsGrid.appendChild(testimonialCard);
    });
  }

  createTestimonialCard(testimonial, index) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());

    const name = testimonial.name[this.currentLanguage] || testimonial.name.en;
    const location = testimonial.location[this.currentLanguage] || testimonial.location.en;
    const text = testimonial.text[this.currentLanguage] || testimonial.text.en;

    card.innerHTML = `
      <div class="testimonial-text">${text}</div>
      <div class="testimonial-author">
        <img src="${testimonial.avatar}" alt="${name}" class="author-avatar" loading="lazy">
        <div class="author-info">
          <h4>${name}</h4>
          <p class="author-location">${location}</p>
        </div>
      </div>
      <div class="testimonial-rating">
        <div class="stars">
          ${this.generateStars(testimonial.rating)}
        </div>
      </div>
    `;

    return card;
  }

  async loadFAQs() {
    const faqAccordion = document.getElementById('faq-accordion');
    if (!faqAccordion) return;

    faqAccordion.innerHTML = '';
    
    this.faqs.forEach((faq, index) => {
      const faqItem = this.createFAQItem(faq, index);
      faqAccordion.appendChild(faqItem);
    });
  }

  createFAQItem(faq, index) {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', (index * 50).toString());

    const question = faq.question[this.currentLanguage] || faq.question.en;
    const answer = faq.answer[this.currentLanguage] || faq.answer.en;

    item.innerHTML = `
      <button class="faq-question">
        <span>${question}</span>
        <i class="fas fa-plus faq-icon"></i>
      </button>
      <div class="faq-answer">
        <p>${answer}</p>
      </div>
    `;

    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
        }
      });
      
      // Toggle current FAQ
      item.classList.toggle('active', !isActive);
    });

    return item;
  }

  handleFAQSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question span').textContent.toLowerCase();
      const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
      
      if (question.includes(searchTerm) || answer.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  async loadCategoryFilter() {
    const filterTabs = document.getElementById('filter-tabs');
    if (!filterTabs) return;

    // Get unique categories from products
    const categories = ['all', ...new Set(this.products.map(p => p.category))];
    
    // Clear existing buttons (except "All")
    const existingButtons = filterTabs.querySelectorAll('.filter-btn:not([data-category="all"])');
    existingButtons.forEach(btn => btn.remove());

    categories.slice(1).forEach(category => {
      const button = document.createElement('button');
      button.className = 'filter-btn';
      button.setAttribute('data-category', category);
      button.textContent = this.getTranslation(`categories.${category}`);
      
      button.addEventListener('click', () => this.filterProducts(category));
      filterTabs.appendChild(button);
    });

    // Add event listener to "All" button
    const allBtn = filterTabs.querySelector('[data-category="all"]');
    if (allBtn) {
      allBtn.addEventListener('click', () => this.filterProducts('all'));
    }
  }

  filterProducts(category) {
    this.activeCategory = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    // Filter products
    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }

    // Reload products
    this.loadProducts();
  }

  // ========================================
  // ADMIN FUNCTIONALITY
  // ========================================
  async handleAdminAccess() {
    // Simulate admin check (in real app, this would be Firebase Auth)
    const userEmail = prompt('Enter admin email:');
    
    if (userEmail === 'askacounts001@gmail.com') {
      this.isAdmin = true;
      this.currentUser = { email: userEmail };
      this.showAdminDashboard();
    } else {
      this.showNotification(
        this.getTranslation('common.error'),
        'Access denied. Admin privileges required.',
        'error'
      );
    }
  }

  showAdminDashboard() {
    const adminDashboard = document.getElementById('admin-dashboard');
    if (!adminDashboard) return;

    adminDashboard.innerHTML = `
      <div class="admin-header">
        <h3>Welcome, Admin</h3>
        <button class="btn btn-secondary" id="admin-logout">
          <i class="fas fa-sign-out-alt"></i>
          ${this.getTranslation('admin.logout')}
        </button>
      </div>
      
      <div class="admin-tabs">
        <button class="admin-tab-btn active" data-tab="products">
          <i class="fas fa-box"></i>
          ${this.getTranslation('admin.products')}
        </button>
        <button class="admin-tab-btn" data-tab="faqs">
          <i class="fas fa-question-circle"></i>
          ${this.getTranslation('admin.faqs')}
        </button>
        <button class="admin-tab-btn" data-tab="comments">
          <i class="fas fa-comments"></i>
          ${this.getTranslation('admin.comments')}
        </button>
      </div>
      
      <div class="admin-content">
        <div class="admin-tab-content active" id="admin-products">
          <div class="admin-actions">
            <button class="btn btn-primary" id="add-product-btn">
              <i class="fas fa-plus"></i>
              ${this.getTranslation('admin.addProduct')}
            </button>
          </div>
          <div class="admin-products-list" id="admin-products-list">
            <!-- Products will be loaded here -->
          </div>
        </div>
        
        <div class="admin-tab-content" id="admin-faqs">
          <div class="admin-actions">
            <button class="btn btn-primary" id="add-faq-btn">
              <i class="fas fa-plus"></i>
              ${this.getTranslation('admin.addFaq')}
            </button>
          </div>
          <div class="admin-faqs-list" id="admin-faqs-list">
            <!-- FAQs will be loaded here -->
          </div>
        </div>
        
        <div class="admin-tab-content" id="admin-comments">
          <div class="admin-comments-list" id="admin-comments-list">
            <!-- Comments will be loaded here -->
          </div>
        </div>
      </div>
    `;

    // Add event listeners
    this.initializeAdminEventListeners();
    this.loadAdminProducts();
    this.loadAdminFAQs();
    
    this.showModal('admin-modal');
  }

  initializeAdminEventListeners() {
    // Logout
    const logoutBtn = document.getElementById('admin-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.isAdmin = false;
        this.currentUser = null;
        this.hideModal('admin-modal');
      });
    }

    // Tab switching
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabName = e.target.getAttribute('data-tab');
        this.switchAdminTab(tabName);
      });
    });

    // Add product
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
      addProductBtn.addEventListener('click', () => this.showProductForm());
    }

    // Add FAQ
    const addFaqBtn = document.getElementById('add-faq-btn');
    if (addFaqBtn) {
      addFaqBtn.addEventListener('click', () => this.showFAQForm());
    }
  }

  switchAdminTab(tabName) {
    // Update active tab button
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update active tab content
    document.querySelectorAll('.admin-tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`admin-${tabName}`).classList.add('active');
  }

  loadAdminProducts() {
    const productsList = document.getElementById('admin-products-list');
    if (!productsList) return;

    productsList.innerHTML = '';
    
    this.products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'admin-item';
      
      const title = product.title[this.currentLanguage] || product.title.en;
      
      productItem.innerHTML = `
        <div class="admin-item-info">
          <img src="${product.image}" alt="${title}" class="admin-item-image">
          <div class="admin-item-details">
            <h4>${title}</h4>
            <p>${product.currency} ${product.price}</p>
            <span class="admin-item-category">${this.getTranslation(`categories.${product.category}`)}</span>
          </div>
        </div>
        <div class="admin-item-actions">
          <button class="btn btn-secondary btn-edit" data-id="${product.id}">
            <i class="fas fa-edit"></i>
            ${this.getTranslation('common.edit')}
          </button>
          <button class="btn btn-danger btn-delete" data-id="${product.id}">
            <i class="fas fa-trash"></i>
            ${this.getTranslation('common.delete')}
          </button>
        </div>
      `;

      // Add event listeners
      const editBtn = productItem.querySelector('.btn-edit');
      const deleteBtn = productItem.querySelector('.btn-delete');

      if (editBtn) {
        editBtn.addEventListener('click', () => this.editProduct(product.id));
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => this.deleteProduct(product.id));
      }

      productsList.appendChild(productItem);
    });
  }

  loadAdminFAQs() {
    const faqsList = document.getElementById('admin-faqs-list');
    if (!faqsList) return;

    faqsList.innerHTML = '';
    
    this.faqs.forEach(faq => {
      const faqItem = document.createElement('div');
      faqItem.className = 'admin-item';
      
      const question = faq.question[this.currentLanguage] || faq.question.en;
      
      faqItem.innerHTML = `
        <div class="admin-item-info">
          <div class="admin-item-details">
            <h4>${question}</h4>
            <span class="admin-item-category">${faq.category}</span>
          </div>
        </div>
        <div class="admin-item-actions">
          <button class="btn btn-secondary btn-edit" data-id="${faq.id}">
            <i class="fas fa-edit"></i>
            ${this.getTranslation('common.edit')}
          </button>
          <button class="btn btn-danger btn-delete" data-id="${faq.id}">
            <i class="fas fa-trash"></i>
            ${this.getTranslation('common.delete')}
          </button>
        </div>
      `;

      // Add event listeners
      const editBtn = faqItem.querySelector('.btn-edit');
      const deleteBtn = faqItem.querySelector('.btn-delete');

      if (editBtn) {
        editBtn.addEventListener('click', () => this.editFAQ(faq.id));
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => this.deleteFAQ(faq.id));
      }

      faqsList.appendChild(faqItem);
    });
  }

  showProductForm(product = null) {
    const isEdit = product !== null;
    const title = isEdit ? this.getTranslation('admin.editProduct') : this.getTranslation('admin.addProduct');
    
    // Create form HTML (simplified for demo)
    const formHTML = `
      <div class="product-form">
        <h3>${title}</h3>
        <form id="product-form">
          <div class="form-group">
            <label>Title (English)</label>
            <input type="text" name="title_en" value="${isEdit ? product.title.en : ''}" required>
          </div>
          <div class="form-group">
            <label>Title (Arabic)</label>
            <input type="text" name="title_ar" value="${isEdit ? (product.title.ar || '') : ''}">
          </div>
          <div class="form-group">
            <label>Price (EGP)</label>
            <input type="number" name="price" value="${isEdit ? product.price : ''}" required>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">${this.getTranslation('common.save')}</button>
            <button type="button" class="btn btn-secondary" id="cancel-form">${this.getTranslation('common.cancel')}</button>
          </div>
        </form>
      </div>
    `;
    
    this.showNotification(title, formHTML, 'info');
  }

  editProduct(productId) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.showProductForm(product);
    }
  }

  deleteProduct(productId) {
    this.showConfirmModal(
      'Delete Product',
      'Are you sure you want to delete this product?',
      () => {
        this.products = this.products.filter(p => p.id !== productId);
        this.filteredProducts = this.filteredProducts.filter(p => p.id !== productId);
        this.loadProducts();
        this.loadAdminProducts();
        this.showNotification(this.getTranslation('common.success'), 'Product deleted successfully!', 'success');
      }
    );
  }

  showFAQForm(faq = null) {
    const isEdit = faq !== null;
    const title = isEdit ? this.getTranslation('admin.editFaq') : this.getTranslation('admin.addFaq');
    
    // Create form HTML (simplified for demo)
    const formHTML = `
      <div class="faq-form">
        <h3>${title}</h3>
        <form id="faq-form">
          <div class="form-group">
            <label>Question (English)</label>
            <input type="text" name="question_en" value="${isEdit ? faq.question.en : ''}" required>
          </div>
          <div class="form-group">
            <label>Question (Arabic)</label>
            <input type="text" name="question_ar" value="${isEdit ? (faq.question.ar || '') : ''}">
          </div>
          <div class="form-group">
            <label>Answer (English)</label>
            <textarea name="answer_en" required>${isEdit ? faq.answer.en : ''}</textarea>
          </div>
          <div class="form-group">
            <label>Answer (Arabic)</label>
            <textarea name="answer_ar">${isEdit ? (faq.answer.ar || '') : ''}</textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">${this.getTranslation('common.save')}</button>
            <button type="button" class="btn btn-secondary" id="cancel-form">${this.getTranslation('common.cancel')}</button>
          </div>
        </form>
      </div>
    `;
    
    this.showNotification(title, formHTML, 'info');
  }

  editFAQ(faqId) {
    const faq = this.faqs.find(f => f.id === faqId);
    if (faq) {
      this.showFAQForm(faq);
    }
  }

  deleteFAQ(faqId) {
    this.showConfirmModal(
      'Delete FAQ',
      'Are you sure you want to delete this FAQ?',
      () => {
        this.faqs = this.faqs.filter(f => f.id !== faqId);
        this.loadFAQs();
        this.loadAdminFAQs();
        this.showNotification(this.getTranslation('common.success'), 'FAQ deleted successfully!', 'success');
      }
    );
  }

  // ========================================
  // FIREBASE INTEGRATION
  // ========================================
  async initializeFirebase() {
    try {
      // Firebase configuration would go here
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  }

  // ========================================
  // NOTIFICATIONS
  // ========================================
  showNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-header">
        <h4>${title}</h4>
        <button class="notification-close">&times;</button>
      </div>
      <div class="notification-body">
        ${message}
      </div>
    `;

    // Add to page
    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.className = 'notification-container';
      document.body.appendChild(container);
    }

    container.appendChild(notification);

    // Add event listeners
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        notification.remove();
      });
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
}

// ========================================
// PWA FUNCTIONALITY
// ========================================
class PWAManager {
  constructor() {
    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.handleInstallPrompt();
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  handleInstallPrompt() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install button
      const installBtn = document.getElementById('install-btn');
      if (installBtn) {
        installBtn.style.display = 'block';
        installBtn.addEventListener('click', async () => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            const result = await deferredPrompt.userChoice;
            console.log('Install prompt result:', result);
            deferredPrompt = null;
            installBtn.style.display = 'none';
          }
        });
      }
    });
  }
}

// ========================================
// INITIALIZATION
// ========================================
let app;
let pwa;

document.addEventListener('DOMContentLoaded', () => {
  app = new PureNatureApp();
  pwa = new PWAManager();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Refresh data when page becomes visible
    if (app && typeof app.loadContent === 'function') {
      app.loadContent();
    }
  }
});

// Handle online/offline status
window.addEventListener('online', () => {
  if (app) {
    app.showNotification('Connection Restored', 'You are back online!', 'success');
  }
});

window.addEventListener('offline', () => {
  if (app) {
    app.showNotification('Connection Lost', 'You are currently offline. Some features may not work.', 'warning');
  }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PureNatureApp, PWAManager };
}