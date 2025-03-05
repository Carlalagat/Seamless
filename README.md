# ✨ Seamless ✨

### Custom Tailoring Platform - Connecting Clients with Tailors for Bespoke Clothing Solutions

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" alt="Status: Active">
  <img src="https://img.shields.io/badge/Version-1.0-blue" alt="Version: 1.0">
  <img src="https://img.shields.io/badge/License-MIT-purple" alt="License: MIT">
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-component-architecture">Component Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-development-guide">Development Guide</a>
</p>

## 🌟 Stargazers
[![Stargazers](https://reporoster.com/stars/Carlalagat/Seamless)](https://github.com/Carlalagat/Seamless/stargazers)

## 📊 Contributions Dashboard
![Alt](https://repobeats.axiom.co/api/embed/87eeeb98a7656791ebceae8a59fd693eccd252ee.svg "Repobeats analytics image")

## 📚 Table of Contents

1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Project Structure](#-project-structure)
4. [Component Architecture](#-component-architecture)
5. [Getting Started](#-getting-started)
6. [Development Guide](#-development-guide)
7. [State Management](#-state-management)
8. [Routing](#-routing)
9. [API Integration](#-api-integration)
10. [Testing](#-testing)
11. [Deployment](#-deployment)
12. [Troubleshooting](#-troubleshooting)

## 🌟 Project Overview

Seamless is a comprehensive tailoring platform that connects clients with professional tailors. Built with Vue.js 3 and modern web technologies, it provides a robust solution for custom clothing orders and management.

## 📋 Features

- User Authentication (Client, Tailor, Admin)
- Tailor Portfolio Management
- Custom Order Placement
- Real-time Order Tracking
- Secure Payment Integration
- Responsive Design
- Role-based Access Control

## 📁 Detailed Project Structure

```text
seamless/
├── app/                           # Vue application root
│   ├── public/                    # Public assets
│   │   ├── favicon.ico
│   │   └── index.html
│   │
│   └── src/
│       ├── assets/               # Static assets
│       │   ├── images/          
│       │   │   ├── auth/        # Authentication-related images
│       │   │   ├── landing/     # Landing page images
│       │   │   └── dashboard/   # Dashboard images
│       │   ├── styles/
│       │   │   ├── main.scss    # Global styles
│       │   │   ├── variables.scss
│       │   │   └── tailwind.css
│       │   └── icons/
│       │
│       ├── components/           # Reusable components
│       │   ├── common/          # Shared components
│       │   │   ├── layout/
│       │   │   │   ├── Header.vue
│       │   │   │   ├── Footer.vue
│       │   │   │   ├── Sidebar.vue
│       │   │   │   └── Navigation.vue
│       │   │   ├── ui/
│       │   │   │   ├── Button.vue
│       │   │   │   ├── Input.vue
│       │   │   │   ├── Modal.vue
│       │   │   │   └── Card.vue
│       │   │   └── misc/
│       │   │       ├── LoadingSpinner.vue
│       │   │       └── Alert.vue
│       │   │
│       │   ├── public/          # Public page components
│       │   │   ├── home/
│       │   │   │   ├── HeroSection.vue
│       │   │   │   ├── FeaturedTailors.vue
│       │   │   │   └── TestimonialsSection.vue
│       │   │   ├── about/
│       │   │   └── contact/
│       │   │
│       │   ├── client/          # Client-specific components
│       │   │   ├── dashboard/
│       │   │   │   ├── OrdersList.vue
│       │   │   │   └── Statistics.vue
│       │   │   ├── orders/
│       │   │   └── profile/
│       │   │
│       │   ├── tailor/          # Tailor-specific components
│       │   │   ├── dashboard/
│       │   │   ├── portfolio/
│       │   │   └── services/
│       │   │
│       │   └── admin/           # Admin-specific components
│       │       ├── dashboard/
│       │       ├── users/
│       │       └── reports/
│       │
│       ├── pages/               # Page components
│       │   ├── public/
│       │   │   ├── HomePage.vue
│       │   │   ├── AboutPage.vue
│       │   │   ├── ContactPage.vue
│       │   │   ├── FindGarmentsPage.vue
│       │   │   └── FindTailorsPage.vue
│       │   ├── auth/
│       │   │   ├── LoginPage.vue
│       │   │   ├── RegisterPage.vue
│       │   │   └── ResetPasswordPage.vue
│       │   ├── client/
│       │   │   ├── DashboardPage.vue
│       │   │   ├── OrdersPage.vue
│       │   │   └── ProfilePage.vue
│       │   ├── tailor/
│       │   │   ├── DashboardPage.vue
│       │   │   ├── OrdersPage.vue
│       │   │   └── PortfolioPage.vue
│       │   └── admin/
│       │       ├── DashboardPage.vue
│       │       ├── UsersPage.vue
│       │       └── ReportsPage.vue
│       │
│       ├── views/               # View components
│       │   ├── public/
│       │   │   ├── HomeView.vue
│       │   │   ├── AboutView.vue
│       │   │   └── ContactView.vue
│       │   ├── auth/
│       │   │   └── LoginView.vue
│       │   ├── client/
│       │   │   └── DashboardView.vue
│       │   └── tailor/
│       │       └── DashboardView.vue
│       │
│       ├── layouts/             # Layout components
│       │   ├── MainLayout.vue   # Public pages layout
│       │   ├── AuthLayout.vue   # Authentication pages layout
│       │   └── DashboardLayout.vue
│       │
│       ├── router/              # Vue Router configuration
│       │   ├── index.js         # Router setup
│       │   ├── guards.js        # Navigation guards
│       │   └── routes/          # Route definitions
│       │       ├── public.js
│       │       ├── auth.js
│       │       ├── client.js
│       │       ├── tailor.js
│       │       └── admin.js
│       │
│       ├── store/               # Pinia stores
│       │   ├── modules/
│       │   │   ├── auth.js
│       │   │   ├── user.js
│       │   │   └── orders.js
│       │   └── index.js
│       │
│       ├── services/           # API services
│       │   ├── api/
│       │   │   ├── auth.js
│       │   │   ├── users.js
│       │   │   └── orders.js
│       │   ├── http.js        # Axios instance
│       │   └── websocket.js   # WebSocket service
│       │
│       ├── utils/             # Utility functions
│       │   ├── validators.js
│       │   ├── formatters.js
│       │   └── helpers.js
│       │
│       ├── composables/       # Vue composables
│       │   ├── useAuth.js
│       │   ├── useForm.js
│       │   └── useNotification.js
│       │
│       ├── constants/         # Constants and enums
│       │   ├── routes.js
│       │   └── api.js
│       │
│       └── App.vue           # Root component
│
├── tests/                    # Test files
│   ├── unit/
│   └── e2e/
│
├── docs/                     # Documentation
│   ├── SRS.md
│   └── api-docs.md
│
└── package.json             # Project dependencies
```

## 🔄 Component Architecture and Relationships

### View-Page-Component Pattern

We implement a three-layer component architecture:

1. **Views (`/views`)**: Container components that:
   - Handle routing logic
   - Manage state
   - Coordinate between pages and components
   
   Example:
   ```vue
   <!-- HomeView.vue -->
   <template>
     <MainLayout>
       <HomePage />
     </MainLayout>
   </template>

   <script setup>
   import MainLayout from '@/layouts/MainLayout.vue'
   import HomePage from '@/pages/public/HomePage.vue'
   </script>
   ```

2. **Pages (`/pages`)**: Page-specific components that:
   - Compose the page layout
   - Integrate multiple components
   - Handle page-level state

   Example:
   ```vue
   <!-- HomePage.vue -->
   <template>
     <div class="home-page">
       <HeroSection />
       <FeaturedTailors :tailors="tailors" />
       <TestimonialsSection />
     </div>
   </template>

   <script setup>
   import { ref, onMounted } from 'vue'
   import { useTailorsStore } from '@/store/modules/tailors'
   import HeroSection from '@/components/public/home/HeroSection.vue'
   import FeaturedTailors from '@/components/public/home/FeaturedTailors.vue'
   import TestimonialsSection from '@/components/public/home/TestimonialsSection.vue'

   const tailorsStore = useTailorsStore()
   const tailors = ref([])

   onMounted(async () => {
     tailors.value = await tailorsStore.getFeaturedTailors()
   })
   </script>
   ```

3. **Components (`/components`)**: Reusable UI components that:
   - Handle specific functionality
   - Are highly reusable
   - Maintain single responsibility

   Example:
   ```vue
   <!-- components/common/ui/Button.vue -->
   <template>
     <button 
       :class="[
         'btn',
         `btn-${variant}`,
         { 'btn-loading': loading }
       ]"
       :disabled="disabled || loading"
       @click="$emit('click')"
     >
       <LoadingSpinner v-if="loading" />
       <slot></slot>
     </button>
   </template>

   <script setup>
   import LoadingSpinner from '@/components/common/misc/LoadingSpinner.vue'

   defineProps({
     variant: {
       type: String,
       default: 'primary'
     },
     loading: {
       type: Boolean,
       default: false
     },
     disabled: {
       type: Boolean,
       default: false
     }
   })

   defineEmits(['click'])
   </script>
   ```

## 📡 State Management with Pinia

### Store Structure Example

```javascript
// store/modules/auth.js
import { defineStore } from 'pinia'
import { authService } from '@/services/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false
  }),
  actions: {
    async login(credentials) {
      this.loading = true
      try {
        const response = await authService.login(credentials)
        this.user = response.user
        this.token = response.token
      } finally {
        this.loading = false
      }
    }
  }
})
```

## 🛣️ Routing Structure

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import publicRoutes from './routes/public'
import authRoutes from './routes/auth'
import clientRoutes from './routes/client'
import tailorRoutes from './routes/tailor'
import adminRoutes from './routes/admin'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...publicRoutes,
    ...authRoutes,
    ...clientRoutes,
    ...tailorRoutes,
    ...adminRoutes
  ]
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Vue CLI

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/seamless.git

# Navigate to project directory
cd seamless

# Install dependencies
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Run unit tests
npm run test:unit

# Run end-to-end tests
npm run test:e2e
```

## 🌐 Deployment

### Production Deployment
- Ensure all environment variables are configured
- Build the application
- Deploy to your preferred hosting platform (Netlify, Vercel, AWS)

## 🔧 Troubleshooting

- Check console for specific error messages
- Verify API endpoints in `.env` files
- Ensure correct permissions and access tokens

## 📄 License

MIT License

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Project Maintainer: [Your Name]
Email: contact@seamless.com

---

<div align="center">
  © 2025 Seamless - All Rights Reserved

  Built with ❤️ using Vue.js
</div>
