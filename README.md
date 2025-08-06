# NaturalCare - Natural Handmade Products Website

A modern, responsive one-page website for natural handmade products with full admin dashboard, multilingual support (Arabic/English), and PWA capabilities.

## 🌟 Features

### Frontend Features
- **Modern Design**: Clean, natural color palette with soft beige, olive green, and off-white tones
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Multilingual Support**: Complete Arabic and English support with RTL layout
- **Theme Switching**: Light and Dark mode with smooth transitions
- **Smooth Animations**: AOS.js powered fade/slide animations
- **Product Showcase**: Dynamic product grid with categories and ratings
- **Interactive Gallery**: Lightbox image gallery with keyboard navigation
- **FAQ System**: Accordion-style FAQ with search and category filtering
- **Contact Form**: Integrated contact form with Formspree support
- **WhatsApp Integration**: Direct ordering via WhatsApp with pre-filled messages
- **PWA Support**: Offline functionality and app installation

### Admin Dashboard Features
- **Secure Authentication**: Google OAuth with specific admin email access
- **Product Management**: Add, edit, delete products with image upload
- **Category Management**: Dynamic category system with multilingual support
- **FAQ Management**: Complete FAQ system with search and categories
- **Testimonial Management**: Customer review system with ratings
- **Real-time Updates**: Changes reflect immediately on the frontend
- **Image Upload**: Firebase Storage integration for product images
- **Translation Support**: Separate fields for Arabic and English content

### Technical Features
- **Firebase Integration**: Authentication, Firestore database, and Storage
- **Service Worker**: Comprehensive caching and offline functionality
- **Performance Optimized**: Lazy loading, image optimization, and caching
- **SEO Friendly**: Semantic HTML, meta tags, and structured data
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Text editor or IDE
- Firebase account (for admin features)
- Web server (for local development)

### Installation

1. **Clone or download the project files**
   ```bash
   git clone <repository-url>
   cd naturalcare-website
   ```

2. **Set up Firebase (Optional - for admin features)**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Google Sign-in)
   - Enable Firestore Database
   - Enable Storage
   - Copy your Firebase config to `firebase-config.js`

3. **Configure Admin Access**
   - Edit `firebase-config.js`
   - Update the `ADMIN_EMAILS` array with authorized admin email addresses

4. **Update Contact Information**
   - Edit WhatsApp number in `script.js` (search for `201234567890`)
   - Update contact form action URL in `index.html` (Formspree)
   - Update social media links in `index.html`

5. **Serve the website**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

6. **Open in browser**
   Navigate to `http://localhost:8000`

## 📁 Project Structure

```
naturalcare-website/
├── index.html              # Main HTML file
├── styles.css              # Complete CSS with themes and responsive design
├── script.js               # Main JavaScript functionality
├── translations.js         # Multilingual support system
├── firebase-config.js      # Firebase configuration and authentication
├── manifest.json           # PWA manifest
├── sw.js                  # Service Worker for offline functionality
├── README.md              # This file
└── icons/                 # PWA icons (create this folder)
    ├── icon-192x192.png
    ├── icon-512x512.png
    └── ...
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable required services:
   - Authentication (Google provider)
   - Firestore Database
   - Storage
3. Update `firebase-config.js` with your project credentials:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### Admin Access
Update the admin emails in `firebase-config.js`:

```javascript
const ADMIN_EMAILS = [
    'admin@yourcompany.com',
    'owner@yourcompany.com'
];
```

### WhatsApp Integration
Update the phone number in `script.js`:

```javascript
const phoneNumber = '201234567890'; // Replace with your WhatsApp number
```

### Contact Form
Update the Formspree action URL in `index.html`:

```html
<form id="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
```

## 🎨 Customization

### Colors and Themes
The website uses CSS custom properties for easy theme customization. Edit the `:root` section in `styles.css`:

```css
:root {
  --primary-color: #8B7355;
  --secondary-color: #A67C52;
  --accent-color: #B8860B;
  /* ... more colors */
}
```

### Content Translation
Add or modify translations in `translations.js`:

```javascript
const translations = {
    en: {
        hero_title: "Your Product Title",
        // ... more translations
    },
    ar: {
        hero_title: "عنوان منتجك",
        // ... more translations
    }
};
```

### Product Categories
Default categories can be modified in `script.js` in the `loadCategories()` function.

## 📱 Mobile Optimization

The website is built with a mobile-first approach:
- Responsive grid layouts
- Touch-friendly buttons and interactions
- Optimized images for different screen sizes
- Fast loading times
- PWA support for app-like experience

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your Git repository to Netlify
2. Set build command: (none needed for static site)
3. Set publish directory: `/`
4. Deploy automatically on git push

### Vercel
1. Import your project to Vercel
2. Configure as a static site
3. Deploy with automatic deployments

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🔒 Security

- Admin access is restricted to specific email addresses
- Firebase security rules should be configured
- Sensitive data is stored in environment variables
- Form submissions are protected by Formspree

## 🐛 Troubleshooting

### Common Issues

1. **Admin panel not accessible**
   - Check if your email is in the `ADMIN_EMAILS` array
   - Verify Firebase authentication is working
   - Check browser console for errors

2. **Images not loading**
   - Verify image URLs are correct
   - Check Firebase Storage permissions
   - Ensure images are properly uploaded

3. **Translations not working**
   - Check if translation keys exist in `translations.js`
   - Verify language switching functionality
   - Check for JavaScript errors

4. **WhatsApp links not working**
   - Verify phone number format (include country code)
   - Check URL encoding
   - Test on mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@yourcompany.com
- WhatsApp: +20 123 456 7890

## 🙏 Acknowledgments

- **Unsplash** for beautiful product images
- **Font Awesome** for icons
- **AOS.js** for animations
- **Firebase** for backend services
- **Inter & Cairo** fonts for typography

---

Made with ❤️ for natural product businesses