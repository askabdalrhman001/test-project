# NaturalCare - Natural Handmade Products Website

A modern, responsive website for selling natural handmade products with comprehensive admin dashboard, multilingual support, and user management system.

## 🌟 Features

### 🎨 Design & User Experience
- **Modern, Clean Design**: Soft natural color palette with beige, olive green, and warm tones
- **Fully Responsive**: Mobile-first design optimized for all screen sizes (400px+)
- **Smooth Animations**: AOS.js integration for scroll animations
- **Theme Support**: Light and Dark mode with seamless switching
- **Multilingual**: Full English/Arabic support with RTL layout
- **PWA Ready**: Progressive Web App with offline support

### 🛍️ Product Management
- **Dynamic Categories**: 9 main categories with subcategories
- **Product Cards**: Rich product information with images, pricing, and stock status
- **WhatsApp Integration**: Direct ordering via WhatsApp with pre-filled messages
- **Product Inquiries**: Customer inquiry system for product questions
- **Rating System**: Star-based rating with average calculations
- **Image Gallery**: High-quality product images with lightbox

### 👥 User System
- **Google Authentication**: Secure login with Google accounts
- **User Profiles**: Customizable profiles with avatars and personal information
- **Comments & Reviews**: User-generated content with moderation
- **Admin Access**: Exclusive admin dashboard for authorized users

### 🔐 Admin Dashboard
- **Exclusive Access**: Only `askacounts001@gmail.com` has admin privileges
- **Comprehensive Management**: Products, categories, FAQs, testimonials, inquiries, users, gallery
- **Statistics Dashboard**: Real-time stats for products, users, inquiries, and comments
- **Content Management**: Add, edit, delete all website content
- **User Management**: View and manage all registered users
- **Inquiry Management**: Handle customer inquiries with read/unread status

### 📱 Mobile Optimization
- **Responsive Navigation**: Icon-based navigation for mobile devices
- **Touch-Friendly**: Optimized for touch interactions
- **Fast Loading**: Optimized images and lazy loading
- **Offline Support**: Service worker for offline functionality

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Firebase project setup
- Google Cloud account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd naturalcare-website
   ```

2. **Configure Firebase**
   - Create a new Firebase project
   - Enable Authentication (Google provider)
   - Enable Firestore Database
   - Enable Storage
   - Update `firebase-config.js` with your project credentials

3. **Update Configuration**
   ```javascript
   // In firebase-config.js
   const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "your-sender-id",
       appId: "your-app-id"
   };
   ```

4. **Set Admin Email**
   ```javascript
   // In firebase-config.js
   const ADMIN_EMAIL = 'askacounts001@gmail.com'; // Change to your admin email
   ```

5. **Deploy**
   - Upload files to your web server
   - Or deploy to Firebase Hosting, Netlify, or Vercel

## 📁 Project Structure

```
naturalcare-website/
├── index.html              # Main HTML file
├── styles.css              # Complete CSS styling
├── script.js               # Main JavaScript functionality
├── firebase-config.js      # Firebase configuration and admin logic
├── translations.js         # Multilingual translations
├── sw.js                   # Service worker for PWA
├── manifest.json           # PWA manifest
└── README.md              # This file
```

## 🔧 Configuration

### Firebase Setup
1. Create Firebase project
2. Enable services:
   - Authentication (Google)
   - Firestore Database
   - Storage
3. Set security rules for Firestore and Storage
4. Update configuration in `firebase-config.js`

### Admin Access
Only the email specified in `ADMIN_EMAIL` can access the admin dashboard:
- Full control over all website content
- User management capabilities
- Statistics and analytics
- Content moderation

### Customization
- **Colors**: Update CSS variables in `styles.css`
- **Content**: Modify translations in `translations.js`
- **Categories**: Update category lists in the admin dashboard
- **Contact Info**: Update phone, email, and WhatsApp in HTML

## 📊 Admin Dashboard Features

### Dashboard Overview
- **Total Products**: Count of all products
- **In Stock**: Products currently available
- **Total Inquiries**: Customer inquiries received
- **Pending Inquiries**: Unread inquiries
- **All Comments**: User comments count
- **All Users**: Registered users count

### Content Management
- **Products**: Add, edit, delete products with images
- **Categories**: Manage product categories
- **FAQs**: Create and manage frequently asked questions
- **Testimonials**: Manage customer testimonials
- **Gallery**: Upload and manage product images
- **Inquiries**: Handle customer inquiries
- **Comments**: Moderate user comments
- **Users**: View and manage user accounts

## 🌐 Multilingual Support

### Languages
- **English**: Default language
- **Arabic**: Full RTL support with Cairo font

### Translation Keys
All text content is translatable through the `translations.js` file:
- Navigation items
- Product information
- Admin dashboard
- User interface elements
- Error messages

## 📱 PWA Features

### Progressive Web App
- **Installable**: Add to home screen
- **Offline Support**: Service worker caching
- **Fast Loading**: Optimized assets
- **App-like Experience**: Full-screen mode

### Service Worker
- Caches static assets
- Provides offline functionality
- Handles background updates
- Manages push notifications

## 🔒 Security Features

### Authentication
- Google OAuth integration
- Secure user sessions
- Admin-only access control
- User profile protection

### Data Protection
- Firestore security rules
- Storage access control
- Input validation
- XSS protection

## 📈 Performance Optimization

### Loading Speed
- Optimized images
- Lazy loading
- Minified assets
- CDN integration

### SEO Optimization
- Meta tags
- Structured data
- Sitemap ready
- Social media integration

## 🛠️ Development

### Local Development
1. Set up local server (e.g., Live Server in VS Code)
2. Configure Firebase for development
3. Test all features locally
4. Use browser dev tools for debugging

### Testing
- Test on multiple devices
- Verify responsive design
- Check accessibility
- Validate forms and interactions

## 🚀 Deployment

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify
- Connect GitHub repository
- Set build settings
- Deploy automatically

### Vercel
- Import project
- Configure environment variables
- Deploy with one click

## 📞 Support

### Contact Information
- **Email**: info@naturalcare.com
- **WhatsApp**: +20 123 456 7890
- **Website**: https://naturalcare.com

### Documentation
- Inline code comments
- Comprehensive README
- Firebase documentation
- Web standards compliance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 🔄 Updates

### Version 2.0 (Current)
- Complete admin dashboard
- User management system
- Enhanced authentication
- Product inquiry system
- Improved mobile experience
- PWA implementation

### Future Enhancements
- Advanced analytics
- Email notifications
- Payment integration
- Inventory management
- Advanced search
- Social media integration

---

**Built with ❤️ for natural product enthusiasts**