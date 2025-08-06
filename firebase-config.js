// Firebase Configuration for Natural Care Website
// Handles authentication, Firestore database, and Storage

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "naturalcare-website.firebaseapp.com",
    projectId: "naturalcare-website",
    storageBucket: "naturalcare-website.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdefghijklmnop"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Admin Configuration - Only this specific account has admin access
const ADMIN_EMAIL = 'askacounts001@gmail.com';

// Authentication Manager Class
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAdmin = false;
        this.initAuth();
    }

    initAuth() {
        // Set up authentication state listener
        auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            this.isAdmin = user ? this.checkAdminAccess(user.email) : false;
            this.updateUIBasedOnAuth();
            
            // Trigger custom event
            document.dispatchEvent(new CustomEvent('authStateChanged', {
                detail: { user: user, isAdmin: this.isAdmin }
            }));
        });

        // Set up Google Auth Provider
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
        this.googleProvider.addScope('email');
        this.googleProvider.addScope('profile');
    }

    checkAdminAccess(email) {
        return email === ADMIN_EMAIL;
    }

    async signInWithGoogle() {
        try {
            const result = await auth.signInWithPopup(this.googleProvider);
            const user = result.user;
            
            // Create or update user profile in Firestore
            await this.createOrUpdateUserProfile(user);
            
            if (this.checkAdminAccess(user.email)) {
                this.showToast('Admin login successful! Welcome to the dashboard.', 'success');
                return { success: true, user: user, isAdmin: true };
            } else {
                this.showToast('Login successful! You can now post comments and reviews.', 'success');
                return { success: true, user: user, isAdmin: false };
            }
        } catch (error) {
            console.error('Error signing in:', error);
            this.showToast('Login failed. Please try again.', 'error');
            return { success: false, error: error.message };
        }
    }

    async createOrUpdateUserProfile(user) {
        try {
            const userRef = db.collection('users').doc(user.uid);
            const userDoc = await userRef.get();
            
            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || user.email.split('@')[0],
                photoURL: user.photoURL || '',
                nickname: user.displayName || user.email.split('@')[0],
                title: 'Customer',
                createdAt: userDoc.exists ? userDoc.data().createdAt : firebase.firestore.FieldValue.serverTimestamp(),
                lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                isAdmin: this.checkAdminAccess(user.email)
            };

            await userRef.set(userData, { merge: true });
        } catch (error) {
            console.error('Error creating/updating user profile:', error);
        }
    }

    async signOut() {
        try {
            await auth.signOut();
            this.showToast('Signed out successfully.', 'success');
            return { success: true };
        } catch (error) {
            console.error('Error signing out:', error);
            this.showToast('Error signing out.', 'error');
            return { success: false, error: error.message };
        }
    }

    updateUIBasedOnAuth() {
        const adminToggle = document.getElementById('admin-toggle');
        const adminModal = document.getElementById('admin-modal');
        const loginPrompt = document.getElementById('login-prompt');
        const addCommentSection = document.getElementById('add-comment-section');
        
        if (this.currentUser) {
            // User is logged in
            if (adminToggle) {
                adminToggle.style.display = this.isAdmin ? 'block' : 'none';
            }
            
            if (loginPrompt) {
                loginPrompt.style.display = 'none';
            }
            
            if (addCommentSection) {
                addCommentSection.style.display = 'block';
                this.updateCommentFormUserInfo();
            }
        } else {
            // User is not logged in
            if (adminToggle) {
                adminToggle.style.display = 'none';
            }
            
            if (loginPrompt) {
                loginPrompt.style.display = 'block';
            }
            
            if (addCommentSection) {
                addCommentSection.style.display = 'none';
            }

            // Close admin modal if open
            if (adminModal && adminModal.classList.contains('active')) {
                this.closeAdminModal();
            }
        }

        // Update comments UI
        this.updateCommentsUI();
    }

    updateCommentFormUserInfo() {
        if (!this.currentUser) return;
        
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('user-name');
        
        if (userAvatar) {
            userAvatar.src = this.currentUser.photoURL || 'https://via.placeholder.com/40x40/8B7355/FFFFFF?text=' + (this.currentUser.displayName ? this.currentUser.displayName.charAt(0) : 'U');
            userAvatar.alt = this.currentUser.displayName || 'User';
        }
        
        if (userName) {
            userName.textContent = this.currentUser.displayName || this.currentUser.email.split('@')[0];
        }
    }

    updateCommentsUI() {
        // This will be called when comments are loaded
        const commentsList = document.getElementById('comments-list');
        if (commentsList) {
            // Trigger comments reload to update edit/delete buttons
            document.dispatchEvent(new CustomEvent('updateCommentsUI'));
        }
    }

    closeAdminModal() {
        const adminModal = document.getElementById('admin-modal');
        if (adminModal) {
            adminModal.classList.remove('active');
        }
    }

    updateAdminContent() {
        if (!this.isAdmin) return;
        
        const adminContent = document.getElementById('admin-content');
        if (adminContent) {
            adminContent.innerHTML = this.generateAdminDashboard();
            this.setupAdminEventListeners();
        }
    }

    generateLoginForm() {
        return `
            <div class="login-form">
                <div class="login-header">
                    <i class="fas fa-user-circle"></i>
                    <h3 data-translate="login_title">Sign In</h3>
                    <p data-translate="login_description">Sign in with your Google account to access your profile and post comments.</p>
                </div>
                <button id="google-signin-btn" class="btn btn-primary btn-full">
                    <i class="fab fa-google"></i>
                    <span data-translate="sign_in_google">Sign in with Google</span>
                </button>
                <div class="login-note">
                    <p><i class="fas fa-info-circle"></i> <span data-translate="admin_note">Only authorized admin accounts can access the dashboard.</span></p>
                </div>
            </div>
        `;
    }

    generateAdminDashboard() {
        return `
            <div class="admin-dashboard">
                <div class="admin-header">
                    <div class="admin-welcome">
                        <h3 data-translate="admin_welcome">Welcome, Admin!</h3>
                        <p data-translate="admin_description">Manage your products, categories, FAQs, and customer interactions.</p>
                    </div>
                    <div class="admin-stats">
                        <div class="stat-card">
                            <i class="fas fa-box"></i>
                            <div class="stat-info">
                                <span class="stat-number" id="total-products">0</span>
                                <span class="stat-label" data-translate="total_products">Total Products</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-check-circle"></i>
                            <div class="stat-info">
                                <span class="stat-number" id="in-stock">0</span>
                                <span class="stat-label" data-translate="in_stock">In Stock</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-envelope"></i>
                            <div class="stat-info">
                                <span class="stat-number" id="total-inquiries">0</span>
                                <span class="stat-label" data-translate="total_inquiries">Total Inquiries</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-clock"></i>
                            <div class="stat-info">
                                <span class="stat-number" id="pending-inquiries">0</span>
                                <span class="stat-label" data-translate="pending_inquiries">Pending Inquiries</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-comments"></i>
                            <div class="stat-info">
                                <span class="stat-number" id="all-comments">0</span>
                                <span class="stat-label" data-translate="all_comments">All Comments</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-users"></i>
                            <div class="stat-info">
                                <span class="stat-number" id="all-users">0</span>
                                <span class="stat-label" data-translate="all_users">All Users</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="admin-tabs">
                    <button class="tab-btn active" data-tab="products" data-translate="admin_products">Products</button>
                    <button class="tab-btn" data-tab="categories" data-translate="admin_categories">Categories</button>
                    <button class="tab-btn" data-tab="faqs" data-translate="admin_faqs">FAQs</button>
                    <button class="tab-btn" data-tab="testimonials" data-translate="admin_testimonials">Testimonials</button>
                    <button class="tab-btn" data-tab="inquiries" data-translate="admin_inquiries">Product Inquiries</button>
                    <button class="tab-btn" data-tab="comments" data-translate="admin_comments">Comments</button>
                    <button class="tab-btn" data-tab="users" data-translate="admin_users">Users</button>
                    <button class="tab-btn" data-tab="gallery" data-translate="admin_gallery">Gallery</button>
                </div>
                
                <div class="tab-content">
                    <div id="products-tab" class="tab-pane active">
                        <div class="tab-header">
                            <h4 data-translate="manage_products">Manage Products</h4>
                            <button id="add-product-btn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                <span data-translate="add_product">Add Product</span>
                            </button>
                        </div>
                        <div id="products-list" class="admin-list">
                            <!-- Products will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="categories-tab" class="tab-pane">
                        <div class="tab-header">
                            <h4 data-translate="manage_categories">Manage Categories</h4>
                            <button id="add-category-btn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                <span data-translate="add_category">Add Category</span>
                            </button>
                        </div>
                        <div id="categories-list" class="admin-list">
                            <!-- Categories will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="faqs-tab" class="tab-pane">
                        <div class="tab-header">
                            <h4 data-translate="manage_faqs">Manage FAQs</h4>
                            <button id="add-faq-btn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                <span data-translate="add_faq">Add FAQ</span>
                            </button>
                        </div>
                        <div id="faqs-list" class="admin-list">
                            <!-- FAQs will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="testimonials-tab" class="tab-pane">
                        <div class="tab-header">
                            <h4 data-translate="manage_testimonials">Manage Testimonials</h4>
                            <button id="add-testimonial-btn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                <span data-translate="add_testimonial">Add Testimonial</span>
                            </button>
                        </div>
                        <div id="testimonials-list" class="admin-list">
                            <!-- Testimonials will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="inquiries-tab" class="tab-pane">
                        <div class="tab-header">
                            <h4 data-translate="manage_inquiries">Product Inquiries</h4>
                        </div>
                        <div id="inquiries-list" class="admin-list">
                            <!-- Inquiries will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="comments-tab" class="tab-pane">
                        <div class="tab-header">
                            <h4 data-translate="manage_comments">Manage Comments</h4>
                        </div>
                        <div id="comments-admin-list" class="admin-list">
                            <!-- Comments will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="users-tab" class="tab-pane">
                        <div class="tab-header">
                            <h4 data-translate="manage_users">Manage Users</h4>
                        </div>
                        <div id="users-list" class="admin-list">
                            <!-- Users will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="gallery-tab" class="tab-pane">
                        <div class="tab-header">
                            <h4 data-translate="manage_gallery">Manage Gallery</h4>
                            <button id="add-gallery-item-btn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                <span data-translate="add_gallery_item">Add Image</span>
                            </button>
                        </div>
                        <div id="gallery-list" class="admin-list">
                            <!-- Gallery items will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupLoginEventListeners() {
        const googleSigninBtn = document.getElementById('google-signin-btn');
        if (googleSigninBtn) {
            googleSigninBtn.addEventListener('click', () => {
                this.signInWithGoogle();
            });
        }
    }

    setupAdminEventListeners() {
        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });

        // Add buttons
        this.setupAddButtonListeners();

        // Load initial data
        this.loadTabData('products');
    }

    setupAddButtonListeners() {
        const addProductBtn = document.getElementById('add-product-btn');
        const addCategoryBtn = document.getElementById('add-category-btn');
        const addFAQBtn = document.getElementById('add-faq-btn');
        const addTestimonialBtn = document.getElementById('add-testimonial-btn');
        const addGalleryItemBtn = document.getElementById('add-gallery-item-btn');

        if (addProductBtn) {
            addProductBtn.addEventListener('click', () => {
                this.showProductForm();
            });
        }

        if (addCategoryBtn) {
            addCategoryBtn.addEventListener('click', () => {
                this.showCategoryForm();
            });
        }

        if (addFAQBtn) {
            addFAQBtn.addEventListener('click', () => {
                this.showFAQForm();
            });
        }

        if (addTestimonialBtn) {
            addTestimonialBtn.addEventListener('click', () => {
                this.showTestimonialForm();
            });
        }

        if (addGalleryItemBtn) {
            addGalleryItemBtn.addEventListener('click', () => {
                this.showGalleryForm();
            });
        }
    }

    switchTab(tabId) {
        // Remove active class from all tabs and panes
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        // Add active class to selected tab and pane
        const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedPane = document.getElementById(`${tabId}-tab`);

        if (selectedTab) selectedTab.classList.add('active');
        if (selectedPane) selectedPane.classList.add('active');

        // Load data for the selected tab
        this.loadTabData(tabId);
    }

    async loadTabData(tabId) {
        const dataManager = new DataManager();
        
        switch (tabId) {
            case 'products':
                await dataManager.loadProducts();
                break;
            case 'categories':
                await dataManager.loadCategories();
                break;
            case 'faqs':
                await dataManager.loadFAQs();
                break;
            case 'testimonials':
                await dataManager.loadTestimonials();
                break;
            case 'inquiries':
                await dataManager.loadInquiries();
                break;
            case 'comments':
                await dataManager.loadComments();
                break;
            case 'users':
                await dataManager.loadUsers();
                break;
            case 'gallery':
                await dataManager.loadGallery();
                break;
        }
    }

    showToast(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        const container = document.getElementById('toast-container');
        if (container) {
            container.appendChild(toast);
            
            // Remove toast after 5 seconds
            setTimeout(() => {
                toast.remove();
            }, 5000);
        }
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isUserAdmin() {
        return this.isAdmin;
    }
}

// Data Manager Class for Firestore operations
class DataManager {
    constructor() {
        this.authManager = window.authManager;
    }

    // CRUD Operations
    async create(collection, data) {
        try {
            const docRef = await db.collection(collection).add({
                ...data,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error(`Error creating ${collection}:`, error);
            return { success: false, error: error.message };
        }
    }

    async read(collection, orderBy = 'createdAt', order = 'desc') {
        try {
            const snapshot = await db.collection(collection).orderBy(orderBy, order).get();
            const data = [];
            snapshot.forEach(doc => {
                data.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data };
        } catch (error) {
            console.error(`Error reading ${collection}:`, error);
            return { success: false, error: error.message };
        }
    }

    async update(collection, id, data) {
        try {
            await db.collection(collection).doc(id).update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error(`Error updating ${collection}:`, error);
            return { success: false, error: error.message };
        }
    }

    async delete(collection, id) {
        try {
            await db.collection(collection).doc(id).delete();
            return { success: true };
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            return { success: false, error: error.message };
        }
    }

    async uploadImage(file, path) {
        try {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(path);
            const snapshot = await fileRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            return { success: true, url: downloadURL };
        } catch (error) {
            console.error('Error uploading image:', error);
            return { success: false, error: error.message };
        }
    }

    // Load Data Methods
    async loadProducts() {
        const result = await this.read('products');
        if (result.success) {
            this.renderProductsList(result.data);
            this.updateStats('total-products', result.data.length);
            this.updateStats('in-stock', result.data.filter(p => p.inStock).length);
        }
    }

    async loadCategories() {
        const result = await this.read('categories');
        if (result.success) {
            this.renderCategoriesList(result.data);
        }
    }

    async loadFAQs() {
        const result = await this.read('faqs');
        if (result.success) {
            this.renderFAQsList(result.data);
        }
    }

    async loadTestimonials() {
        const result = await this.read('testimonials');
        if (result.success) {
            this.renderTestimonialsList(result.data);
        }
    }

    async loadInquiries() {
        const result = await this.read('inquiries');
        if (result.success) {
            this.renderInquiriesList(result.data);
            this.updateStats('total-inquiries', result.data.length);
            this.updateStats('pending-inquiries', result.data.filter(i => !i.read).length);
        }
    }

    async loadComments() {
        const result = await this.read('comments');
        if (result.success) {
            this.renderCommentsList(result.data);
            this.updateStats('all-comments', result.data.length);
        }
    }

    async loadUsers() {
        const result = await this.read('users');
        if (result.success) {
            this.renderUsersList(result.data);
            this.updateStats('all-users', result.data.length);
        }
    }

    async loadGallery() {
        const result = await this.read('gallery');
        if (result.success) {
            this.renderGalleryList(result.data);
        }
    }

    // Render Methods
    renderProductsList(products) {
        const container = document.getElementById('products-list');
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = '<p class="no-data" data-translate="no_products">No products found.</p>';
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="admin-item" data-id="${product.id}">
                <div class="admin-item-image">
                    <img src="${product.imageUrl || 'https://via.placeholder.com/80x80/8B7355/FFFFFF?text=No+Image'}" alt="${product.title}" />
                </div>
                <div class="admin-item-content">
                    <div class="admin-item-details">
                        <h4>${product.title}</h4>
                        <p>${product.description}</p>
                        <div class="admin-item-meta">
                            <span class="price">$${product.price}</span>
                            <span class="category">${product.category}</span>
                            <div class="stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                                <i class="fas fa-${product.inStock ? 'check' : 'times'}"></i>
                                <span>${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="btn btn-small btn-secondary edit-product" data-id="${product.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger delete-product" data-id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.setupProductActions();
    }

    renderCategoriesList(categories) {
        const container = document.getElementById('categories-list');
        if (!container) return;

        if (categories.length === 0) {
            container.innerHTML = '<p class="no-data" data-translate="no_categories">No categories found.</p>';
            return;
        }

        container.innerHTML = categories.map(category => `
            <div class="admin-item" data-id="${category.id}">
                <div class="admin-item-content">
                    <div class="admin-item-details">
                        <h4>${category.name}</h4>
                        <p>${category.description || ''}</p>
                        <div class="admin-item-meta">
                            <span class="product-count">${category.productCount || 0} products</span>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="btn btn-small btn-secondary edit-category" data-id="${category.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger delete-category" data-id="${category.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.setupCategoryActions();
    }

    renderFAQsList(faqs) {
        const container = document.getElementById('faqs-list');
        if (!container) return;

        if (faqs.length === 0) {
            container.innerHTML = '<p class="no-data" data-translate="no_faqs">No FAQs found.</p>';
            return;
        }

        container.innerHTML = faqs.map(faq => `
            <div class="admin-item" data-id="${faq.id}">
                <div class="admin-item-content">
                    <div class="admin-item-details">
                        <h4>${faq.question}</h4>
                        <p>${faq.answer}</p>
                        <div class="admin-item-meta">
                            <span class="category">${faq.category || 'General'}</span>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="btn btn-small btn-secondary edit-faq" data-id="${faq.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger delete-faq" data-id="${faq.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.setupFAQActions();
    }

    renderTestimonialsList(testimonials) {
        const container = document.getElementById('testimonials-list');
        if (!container) return;

        if (testimonials.length === 0) {
            container.innerHTML = '<p class="no-data" data-translate="no_testimonials">No testimonials found.</p>';
            return;
        }

        container.innerHTML = testimonials.map(testimonial => `
            <div class="admin-item" data-id="${testimonial.id}">
                <div class="admin-item-image">
                    <img src="${testimonial.avatarUrl || 'https://via.placeholder.com/80x80/8B7355/FFFFFF?text=User'}" alt="${testimonial.name}" />
                </div>
                <div class="admin-item-content">
                    <div class="admin-item-details">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.text}</p>
                        <div class="admin-item-meta">
                            <div class="rating">
                                ${this.generateStars(testimonial.rating)}
                            </div>
                            <span class="location">${testimonial.location || ''}</span>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="btn btn-small btn-secondary edit-testimonial" data-id="${testimonial.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger delete-testimonial" data-id="${testimonial.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.setupTestimonialActions();
    }

    renderInquiriesList(inquiries) {
        const container = document.getElementById('inquiries-list');
        if (!container) return;

        if (inquiries.length === 0) {
            container.innerHTML = '<p class="no-data" data-translate="no_inquiries">No inquiries found.</p>';
            return;
        }

        container.innerHTML = inquiries.map(inquiry => `
            <div class="admin-item ${inquiry.read ? 'read' : 'unread'}" data-id="${inquiry.id}">
                <div class="admin-item-content">
                    <div class="admin-item-details">
                        <h4>${inquiry.name}</h4>
                        <p><strong>Email:</strong> ${inquiry.email}</p>
                        <p><strong>Product:</strong> ${inquiry.productName || 'General Inquiry'}</p>
                        <p>${inquiry.message}</p>
                        <div class="admin-item-meta">
                            <span class="date">${this.formatDate(inquiry.createdAt)}</span>
                            <span class="status ${inquiry.read ? 'read' : 'unread'}">${inquiry.read ? 'Read' : 'Unread'}</span>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="btn btn-small btn-secondary mark-read" data-id="${inquiry.id}">
                            <i class="fas fa-${inquiry.read ? 'envelope-open' : 'envelope'}"></i>
                        </button>
                        <button class="btn btn-small btn-danger delete-inquiry" data-id="${inquiry.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.setupInquiryActions();
    }

    renderCommentsList(comments) {
        const container = document.getElementById('comments-admin-list');
        if (!container) return;

        if (comments.length === 0) {
            container.innerHTML = '<p class="no-data" data-translate="no_comments">No comments found.</p>';
            return;
        }

        container.innerHTML = comments.map(comment => `
            <div class="admin-item" data-id="${comment.id}">
                <div class="admin-item-image">
                    <img src="${comment.userAvatar || 'https://via.placeholder.com/80x80/8B7355/FFFFFF?text=User'}" alt="${comment.userName}" />
                </div>
                <div class="admin-item-content">
                    <div class="admin-item-details">
                        <h4>${comment.userName} ${comment.isAdmin ? '<i class="fas fa-crown admin-badge"></i>' : ''}</h4>
                        <p>${comment.text}</p>
                        <div class="admin-item-meta">
                            <div class="rating">
                                ${this.generateStars(comment.rating)}
                            </div>
                            <span class="product">${comment.productName}</span>
                            <span class="date">${this.formatDate(comment.createdAt)}</span>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="btn btn-small btn-danger delete-comment" data-id="${comment.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.setupCommentActions();
    }

    renderUsersList(users) {
        const container = document.getElementById('users-list');
        if (!container) return;

        if (users.length === 0) {
            container.innerHTML = '<p class="no-data" data-translate="no_users">No users found.</p>';
            return;
        }

        container.innerHTML = users.map(user => `
            <div class="admin-item" data-id="${user.id}">
                <div class="admin-item-image">
                    <img src="${user.photoURL || 'https://via.placeholder.com/80x80/8B7355/FFFFFF?text=User'}" alt="${user.displayName}" />
                </div>
                <div class="admin-item-content">
                    <div class="admin-item-details">
                        <h4>${user.displayName} ${user.isAdmin ? '<i class="fas fa-crown admin-badge"></i>' : ''}</h4>
                        <p>${user.email}</p>
                        <div class="admin-item-meta">
                            <span class="title">${user.title || 'Customer'}</span>
                            <span class="date">Joined: ${this.formatDate(user.createdAt)}</span>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        ${!user.isAdmin ? `
                            <button class="btn btn-small btn-danger delete-user" data-id="${user.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        this.setupUserActions();
    }

    renderGalleryList(gallery) {
        const container = document.getElementById('gallery-list');
        if (!container) return;

        if (gallery.length === 0) {
            container.innerHTML = '<p class="no-data" data-translate="no_gallery">No gallery items found.</p>';
            return;
        }

        container.innerHTML = gallery.map(item => `
            <div class="admin-item" data-id="${item.id}">
                <div class="admin-item-image">
                    <img src="${item.imageUrl}" alt="${item.title || 'Gallery Image'}" />
                </div>
                <div class="admin-item-content">
                    <div class="admin-item-details">
                        <h4>${item.title || 'Gallery Image'}</h4>
                        <p>${item.description || ''}</p>
                    </div>
                    <div class="admin-item-actions">
                        <button class="btn btn-small btn-secondary edit-gallery" data-id="${item.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger delete-gallery" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.setupGalleryActions();
    }

    // Action Setup Methods
    setupProductActions() {
        document.querySelectorAll('.edit-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.admin-item').dataset.id;
                this.showProductForm(productId);
            });
        });

        document.querySelectorAll('.delete-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.admin-item').dataset.id;
                this.confirmDelete('product', productId);
            });
        });
    }

    setupCategoryActions() {
        document.querySelectorAll('.edit-category').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const categoryId = e.target.closest('.admin-item').dataset.id;
                this.showCategoryForm(categoryId);
            });
        });

        document.querySelectorAll('.delete-category').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const categoryId = e.target.closest('.admin-item').dataset.id;
                this.confirmDelete('category', categoryId);
            });
        });
    }

    setupFAQActions() {
        document.querySelectorAll('.edit-faq').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const faqId = e.target.closest('.admin-item').dataset.id;
                this.showFAQForm(faqId);
            });
        });

        document.querySelectorAll('.delete-faq').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const faqId = e.target.closest('.admin-item').dataset.id;
                this.confirmDelete('faq', faqId);
            });
        });
    }

    setupTestimonialActions() {
        document.querySelectorAll('.edit-testimonial').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const testimonialId = e.target.closest('.admin-item').dataset.id;
                this.showTestimonialForm(testimonialId);
            });
        });

        document.querySelectorAll('.delete-testimonial').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const testimonialId = e.target.closest('.admin-item').dataset.id;
                this.confirmDelete('testimonial', testimonialId);
            });
        });
    }

    setupInquiryActions() {
        document.querySelectorAll('.mark-read').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const inquiryId = e.target.closest('.admin-item').dataset.id;
                this.toggleInquiryRead(inquiryId);
            });
        });

        document.querySelectorAll('.delete-inquiry').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const inquiryId = e.target.closest('.admin-item').dataset.id;
                this.confirmDelete('inquiry', inquiryId);
            });
        });
    }

    setupCommentActions() {
        document.querySelectorAll('.delete-comment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const commentId = e.target.closest('.admin-item').dataset.id;
                this.confirmDelete('comment', commentId);
            });
        });
    }

    setupUserActions() {
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('.admin-item').dataset.id;
                this.confirmDelete('user', userId);
            });
        });
    }

    setupGalleryActions() {
        document.querySelectorAll('.edit-gallery').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const galleryId = e.target.closest('.admin-item').dataset.id;
                this.showGalleryForm(galleryId);
            });
        });

        document.querySelectorAll('.delete-gallery').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const galleryId = e.target.closest('.admin-item').dataset.id;
                this.confirmDelete('gallery', galleryId);
            });
        });
    }

    // Form Methods
    showProductForm(productId = null) {
        // Implementation for product form
        console.log('Show product form for:', productId);
    }

    showCategoryForm(categoryId = null) {
        // Implementation for category form
        console.log('Show category form for:', categoryId);
    }

    showFAQForm(faqId = null) {
        // Implementation for FAQ form
        console.log('Show FAQ form for:', faqId);
    }

    showTestimonialForm(testimonialId = null) {
        // Implementation for testimonial form
        console.log('Show testimonial form for:', testimonialId);
    }

    showGalleryForm(galleryId = null) {
        // Implementation for gallery form
        console.log('Show gallery form for:', galleryId);
    }

    // Utility Methods
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    formatDate(timestamp) {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString();
    }

    updateStats(elementId, count) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = count;
        }
    }

    async confirmDelete(type, id) {
        const customModal = new CustomModal();
        const result = await customModal.show({
            title: 'Confirm Delete',
            message: `Are you sure you want to delete this ${type}?`,
            type: 'warning',
            confirmText: 'Delete',
            cancelText: 'Cancel'
        });

        if (result) {
            const deleteResult = await this.delete(type + 's', id);
            if (deleteResult.success) {
                this.authManager.showToast(`${type} deleted successfully.`, 'success');
                // Reload the current tab
                const activeTab = document.querySelector('.tab-btn.active');
                if (activeTab) {
                    this.authManager.loadTabData(activeTab.dataset.tab);
                }
            } else {
                this.authManager.showToast(`Error deleting ${type}.`, 'error');
            }
        }
    }

    async toggleInquiryRead(inquiryId) {
        const inquiry = await db.collection('inquiries').doc(inquiryId).get();
        const currentRead = inquiry.data().read || false;
        
        const result = await this.update('inquiries', inquiryId, { read: !currentRead });
        if (result.success) {
            this.authManager.showToast(`Inquiry marked as ${!currentRead ? 'read' : 'unread'}.`, 'success');
            this.loadInquiries();
        } else {
            this.authManager.showToast('Error updating inquiry status.', 'error');
        }
    }
}

// Initialize Auth Manager
window.authManager = new AuthManager();

// Export for use in other files
window.DataManager = DataManager;