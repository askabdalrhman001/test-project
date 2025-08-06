// Firebase Configuration for Natural Care Website
// Handles authentication, Firestore database, and Storage

// Firebase Configuration
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Admin Configuration - Only this specific account has admin access
const ADMIN_EMAILS = [
    'askacounts001@gmail.com'  // Only this account has admin privileges
];

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
        return ADMIN_EMAILS.includes(email);
    }

    async signInWithGoogle() {
        try {
            const result = await auth.signInWithPopup(this.googleProvider);
            const user = result.user;
            
            if (this.checkAdminAccess(user.email)) {
                this.showToast('Admin login successful!', 'success');
                return { success: true, user: user };
            } else {
                // Sign out if not admin
                await this.signOut();
                this.showToast('Access denied. Admin privileges required.', 'error');
                return { success: false, error: 'Access denied' };
            }
        } catch (error) {
            console.error('Error signing in:', error);
            this.showToast('Login failed. Please try again.', 'error');
            return { success: false, error: error.message };
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
        
        if (adminToggle) {
            adminToggle.style.display = this.isAdmin ? 'block' : 'none';
        }

        // Close admin modal if user loses admin access
        if (!this.isAdmin && adminModal && adminModal.classList.contains('active')) {
            adminModal.classList.remove('active');
        }

        // Update admin content based on auth state
        this.updateAdminContent();
    }

    updateAdminContent() {
        const adminContent = document.getElementById('admin-content');
        if (!adminContent) return;

        if (this.isAdmin) {
            adminContent.innerHTML = this.generateAdminDashboard();
            this.setupAdminEventListeners();
        } else {
            adminContent.innerHTML = this.generateLoginForm();
            this.setupLoginEventListeners();
        }
    }

    generateLoginForm() {
        return `
            <div class="admin-login">
                <div class="login-header">
                    <i class="fas fa-shield-alt"></i>
                    <h3 data-translate="admin_login">Admin Login</h3>
                    <p>Please sign in with your authorized Google account</p>
                </div>
                <button id="google-sign-in" class="btn btn-primary">
                    <i class="fab fa-google"></i>
                    <span>Sign in with Google</span>
                </button>
            </div>
        `;
    }

    generateAdminDashboard() {
        const userName = this.currentUser?.displayName || 'Admin';
        const userEmail = this.currentUser?.email || '';
        
        return `
            <div class="admin-dashboard">
                <div class="admin-header">
                    <div class="admin-user-info">
                        <img src="${this.currentUser?.photoURL || '/default-avatar.png'}" alt="Admin Avatar" class="admin-avatar">
                        <div class="admin-details">
                            <h3>Welcome, ${userName}</h3>
                            <p>${userEmail}</p>
                        </div>
                    </div>
                    <button id="admin-logout" class="btn btn-secondary">
                        <i class="fas fa-sign-out-alt"></i>
                        <span data-translate="admin_logout">Logout</span>
                    </button>
                </div>
                
                <div class="admin-tabs">
                    <button class="admin-tab-btn active" data-tab="products">
                        <i class="fas fa-box"></i>
                        <span data-translate="admin_products">Manage Products</span>
                    </button>
                    <button class="admin-tab-btn" data-tab="categories">
                        <i class="fas fa-tags"></i>
                        <span data-translate="admin_categories">Manage Categories</span>
                    </button>
                    <button class="admin-tab-btn" data-tab="faqs">
                        <i class="fas fa-question-circle"></i>
                        <span data-translate="admin_faqs">Manage FAQs</span>
                    </button>
                    <button class="admin-tab-btn" data-tab="testimonials">
                        <i class="fas fa-star"></i>
                        <span data-translate="admin_testimonials">Manage Testimonials</span>
                    </button>
                </div>
                
                <div class="admin-tab-content">
                    <div id="admin-products" class="admin-tab-panel active">
                        <div class="admin-section-header">
                            <h3 data-translate="admin_products">Manage Products</h3>
                            <button id="add-product-btn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                <span data-translate="add_product">Add New Product</span>
                            </button>
                        </div>
                        <div id="products-list" class="admin-list">
                            <!-- Products will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="admin-categories" class="admin-tab-panel">
                        <div class="admin-section-header">
                            <h3 data-translate="admin_categories">Manage Categories</h3>
                            <button id="add-category-btn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                <span data-translate="add_category">Add New Category</span>
                            </button>
                        </div>
                        <div id="categories-list" class="admin-list">
                            <!-- Categories will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="admin-faqs" class="admin-tab-panel">
                        <div class="admin-section-header">
                            <h3 data-translate="admin_faqs">Manage FAQs</h3>
                            <button id="add-faq-btn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                <span data-translate="add_faq">Add New FAQ</span>
                            </button>
                        </div>
                        <div id="faqs-list" class="admin-list">
                            <!-- FAQs will be loaded here -->
                        </div>
                    </div>
                    
                    <div id="admin-testimonials" class="admin-tab-panel">
                        <div class="admin-section-header">
                            <h3 data-translate="admin_testimonials">Manage Testimonials</h3>
                            <button id="add-testimonial-btn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                <span data-translate="add_testimonial">Add New Testimonial</span>
                            </button>
                        </div>
                        <div id="testimonials-list" class="admin-list">
                            <!-- Testimonials will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupLoginEventListeners() {
        const googleSignInBtn = document.getElementById('google-sign-in');
        if (googleSignInBtn) {
            googleSignInBtn.addEventListener('click', () => {
                this.signInWithGoogle();
            });
        }
    }

    setupAdminEventListeners() {
        // Logout button
        const logoutBtn = document.getElementById('admin-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.signOut();
            });
        }

        // Tab navigation
        const tabBtns = document.querySelectorAll('.admin-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });

        // Add buttons
        this.setupAddButtonListeners();
    }

    setupAddButtonListeners() {
        const addProductBtn = document.getElementById('add-product-btn');
        const addCategoryBtn = document.getElementById('add-category-btn');
        const addFaqBtn = document.getElementById('add-faq-btn');
        const addTestimonialBtn = document.getElementById('add-testimonial-btn');

        if (addProductBtn) {
            addProductBtn.addEventListener('click', () => dataManager.showProductForm());
        }
        if (addCategoryBtn) {
            addCategoryBtn.addEventListener('click', () => dataManager.showCategoryForm());
        }
        if (addFaqBtn) {
            addFaqBtn.addEventListener('click', () => dataManager.showFAQForm());
        }
        if (addTestimonialBtn) {
            addTestimonialBtn.addEventListener('click', () => dataManager.showTestimonialForm());
        }
    }

    switchTab(tabId) {
        // Remove active class from all tabs and panels
        document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.admin-tab-panel').forEach(panel => panel.classList.remove('active'));

        // Add active class to selected tab and panel
        const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedPanel = document.getElementById(`admin-${tabId}`);

        if (selectedTab) selectedTab.classList.add('active');
        if (selectedPanel) selectedPanel.classList.add('active');

        // Load data for the selected tab
        this.loadTabData(tabId);
    }

    loadTabData(tabId) {
        switch (tabId) {
            case 'products':
                dataManager.loadProducts();
                break;
            case 'categories':
                dataManager.loadCategories();
                break;
            case 'faqs':
                dataManager.loadFAQs();
                break;
            case 'testimonials':
                dataManager.loadTestimonials();
                break;
        }
    }

    showToast(message, type = 'info') {
        // Create toast notification
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

    // Check if user is authenticated and is admin
    isAuthenticated() {
        return this.currentUser !== null && this.isAdmin;
    }

    // Get current user info
    getCurrentUser() {
        return this.currentUser;
    }
}

// Data Manager Class for Firestore operations
class DataManager {
    constructor() {
        this.collections = {
            products: 'products',
            categories: 'categories',
            faqs: 'faqs',
            testimonials: 'testimonials'
        };
    }

    // Generic CRUD operations
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
            const snapshot = await db.collection(collection)
                .orderBy(orderBy, order)
                .get();
            
            const data = [];
            snapshot.forEach(doc => {
                data.push({ id: doc.id, ...doc.data() });
            });
            
            return { success: true, data: data };
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

    // Image upload to Firebase Storage
    async uploadImage(file, path) {
        try {
            const storageRef = storage.ref();
            const imageRef = storageRef.child(`${path}/${Date.now()}_${file.name}`);
            
            const snapshot = await imageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            
            return { success: true, url: downloadURL };
        } catch (error) {
            console.error('Error uploading image:', error);
            return { success: false, error: error.message };
        }
    }

    // Load data for admin panels
    async loadProducts() {
        const result = await this.read(this.collections.products);
        if (result.success) {
            this.renderProductsList(result.data);
        }
    }

    async loadCategories() {
        const result = await this.read(this.collections.categories);
        if (result.success) {
            this.renderCategoriesList(result.data);
        }
    }

    async loadFAQs() {
        const result = await this.read(this.collections.faqs);
        if (result.success) {
            this.renderFAQsList(result.data);
        }
    }

    async loadTestimonials() {
        const result = await this.read(this.collections.testimonials);
        if (result.success) {
            this.renderTestimonialsList(result.data);
        }
    }

    // Render methods (to be implemented in main script)
    renderProductsList(products) {
        // Implementation in main script
        console.log('Products loaded:', products);
    }

    renderCategoriesList(categories) {
        // Implementation in main script
        console.log('Categories loaded:', categories);
    }

    renderFAQsList(faqs) {
        // Implementation in main script
        console.log('FAQs loaded:', faqs);
    }

    renderTestimonialsList(testimonials) {
        // Implementation in main script
        console.log('Testimonials loaded:', testimonials);
    }

    // Form methods (to be implemented in main script)
    showProductForm(product = null) {
        // Implementation in main script
        console.log('Show product form:', product);
    }

    showCategoryForm(category = null) {
        // Implementation in main script
        console.log('Show category form:', category);
    }

    showFAQForm(faq = null) {
        // Implementation in main script
        console.log('Show FAQ form:', faq);
    }

    showTestimonialForm(testimonial = null) {
        // Implementation in main script
        console.log('Show testimonial form:', testimonial);
    }
}

// Initialize managers
let authManager;
let dataManager;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
    dataManager = new DataManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthManager, DataManager, auth, db, storage };
}