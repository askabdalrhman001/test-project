# Natural Essence Website - Deployment Guide

## 🚀 Quick Deployment

### Option 1: Deploy to Netlify (Recommended for beginners)
1. **Drag & Drop Deployment:**
   - Zip all files in the project folder
   - Go to [netlify.com](https://netlify.com)
   - Drag the zip file to the deployment area
   - Your site will be live instantly!

2. **Custom Domain (Optional):**
   - Go to Site Settings > Domain Management
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Deploy to Vercel
1. **GitHub Integration:**
   - Push code to GitHub repository
   - Connect your GitHub account to [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy automatically

2. **Direct Upload:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in project directory
   - Follow the prompts

### Option 3: GitHub Pages
1. **Repository Setup:**
   - Create a GitHub repository
   - Upload all files to the repository
   - Go to Settings > Pages
   - Select "Deploy from a branch" > main branch
   - Your site will be available at `https://username.github.io/repository-name`

## 🔧 Firebase Configuration (Required for Full Functionality)

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: "natural-essence-website"
4. Enable Google Analytics (optional)
5. Create project

### Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Google" provider
5. Add your domain to authorized domains

### Step 3: Create Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select your preferred location
5. Create database

### Step 4: Enable Storage
1. Go to "Storage"
2. Click "Get started"
3. Accept default security rules
4. Choose storage location

### Step 5: Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (`</>`)
4. Register app name: "Natural Essence"
5. Copy the configuration object

### Step 6: Update Website Configuration
1. Open `index.html`
2. Find the Firebase configuration section (around line 400)
3. Replace the empty `firebaseConfig` object with your configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Step 7: Configure Admin Access
1. Open `script.js`
2. Find line 15: `const ADMIN_EMAIL = 'askacounts001@gmail.com';`
3. Replace with your Google account email
4. Save the file

### Step 8: Set Firestore Security Rules
In Firebase Console > Firestore Database > Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection - read for all, write for admin only
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "your-admin-email@gmail.com";
    }
    
    // FAQs collection - read for all, write for admin only
    match /faqs/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "your-admin-email@gmail.com";
    }
    
    // Comments collection - read for all, write for authenticated users
    match /comments/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         request.auth.token.email == "your-admin-email@gmail.com");
    }
  }
}
```

### Step 9: Set Storage Security Rules
In Firebase Console > Storage > Rules, replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "your-admin-email@gmail.com";
    }
  }
}
```

## ⚙️ Customization Guide

### 1. Update Contact Information
**WhatsApp Number:**
- In `script.js`, find `orderViaWhatsApp` function (line ~650)
- Replace `201234567890` with your WhatsApp number (include country code)
- In `index.html`, find WhatsApp links and update the number

**Email & Phone:**
- In `index.html`, find the footer section
- Update email and phone number in the contact information

### 2. Update Business Information
**Brand Name:**
- In translations object in `script.js`, change `brand: "Natural Essence"` to your business name
- Update both English and Arabic translations

**Business Description:**
- Update meta description in `index.html` head section
- Update footer description
- Update hero section text

### 3. Add Your Products
**Using Admin Dashboard:**
1. Deploy the website with Firebase configured
2. Login with your admin Google account
3. Click the admin button in the header
4. Use the "Add Product" form to add your products

**Manual Method:**
1. In `script.js`, find `loadMockProducts` function (line ~500)
2. Replace the sample products with your products
3. Follow the same structure for each product

### 4. Customize Colors and Themes
**Main Colors:**
- In `styles.css`, find the `:root` section (line 1-50)
- Update CSS custom properties:
  - `--color-primary`: Main brand color
  - `--color-secondary`: Secondary brand color
  - `--color-accent`: Accent color

**Dark Theme:**
- Find `[data-theme="dark"]` section
- Update colors to match your dark theme preferences

### 5. Update Social Media Links
**In Hero Section and Footer:**
- Find social media links in `index.html`
- Replace `#` with your actual social media URLs
- Add/remove social platforms as needed

### 6. Add Your Logo
**Replace Text Logo:**
1. Create a logo image (PNG/SVG recommended)
2. Upload to your hosting service
3. In `index.html`, replace the emoji logo with:
```html
<img src="path-to-your-logo.png" alt="Your Business Name" class="nav__logo-icon">
```

### 7. Update Favicon
1. Create a favicon (32x32 PNG or ICO file)
2. Replace the emoji favicon in `index.html` head section
3. Upload your favicon file to the root directory

## 📱 PWA Configuration

### Update App Information
1. **In `manifest.json`:**
   - Change `name` and `short_name` to your business name
   - Update `description`
   - Replace icon URLs with your app icons

2. **Create App Icons:**
   - Generate icons in multiple sizes (72x72 to 512x512)
   - Use tools like [RealFaviconGenerator](https://realfavicongenerator.net/)
   - Update icon paths in `manifest.json`

## 🔒 Security Checklist

### Before Going Live:
- [ ] Update admin email in `script.js`
- [ ] Configure Firebase security rules
- [ ] Update Firebase configuration
- [ ] Test admin login functionality
- [ ] Test product management
- [ ] Test form submissions
- [ ] Verify WhatsApp integration
- [ ] Test on mobile devices
- [ ] Check all translations work
- [ ] Verify theme switching
- [ ] Test offline functionality

## 📊 Analytics Setup (Optional)

### Google Analytics:
1. Create Google Analytics account
2. Get tracking ID
3. Add tracking code to `index.html` before closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Alternative: Plausible Analytics (Privacy-focused)
1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Add tracking script to `index.html`

## 🚨 Troubleshooting

### Common Issues:

**1. Admin Dashboard Not Accessible:**
- Verify admin email is correct in `script.js`
- Check Firebase authentication is enabled
- Ensure you're logged in with the correct Google account

**2. Products Not Loading:**
- Check Firebase Firestore is enabled
- Verify security rules are set correctly
- Check browser console for errors

**3. Images Not Loading:**
- Verify image URLs are accessible
- Check CORS settings if using external images
- Ensure images are optimized for web

**4. WhatsApp Integration Not Working:**
- Verify phone number format (include country code)
- Test WhatsApp link manually
- Check URL encoding

**5. Styling Issues:**
- Clear browser cache
- Check CSS file is loading correctly
- Verify no CSS conflicts

## 📞 Support

For technical issues:
1. Check browser console for error messages
2. Verify all configuration steps were followed
3. Test in incognito/private browsing mode
4. Try different browsers

## 🔄 Updates and Maintenance

### Regular Tasks:
1. **Update Product Information:**
   - Use admin dashboard to manage products
   - Update prices and availability
   - Add new product images

2. **Content Updates:**
   - Update testimonials
   - Refresh FAQ section
   - Update contact information

3. **Performance Monitoring:**
   - Check website speed regularly
   - Monitor Firebase usage
   - Update dependencies as needed

---

**🌿 Natural Essence Website** - Ready to grow your natural products business online!