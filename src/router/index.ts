import type { RouteRecordRaw, Router } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import About from "../pages/About.vue";
import Login from "../pages/auth/Login.vue";
import Contact from "../pages/Contact.vue";
import Dashboard from "../pages/Dashboard.vue";
import Home from "../pages/Home.vue";
import HomePageVue from "../pages/HomePage.vue";
import Profile from "../pages/Profile.vue";
import Setting from "../pages/Setting.vue";
import Work from "../pages/Work.vue";
import { useAuthStore } from "../stores/auth";

// Define custom meta interface for TypeScript
declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    roles?: string[];
    icon?: string;
    breadcrumb?: string[];
  }
}

// Vue 3 Router Configuration
const routes: RouteRecordRaw[] = [
  {
    path: "",
    name: "HomePage",
    component: HomePageVue,
    meta: {
      title: "HomePage",
      icon: "home",
      breadcrumb: ["HomePage"],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      icon: "login",
      breadcrumb: ["Login"],
    },
  },
  {
    path: "/admin",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: {
          title: "Home",
          icon: "home",
          breadcrumb: ["Home"],
          requiresAuth: true,
        },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          title: "Dashboard",
          icon: "dashboard",
          breadcrumb: ["Dashboard"],
          requiresAuth: true,
        },
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: {
          title: "Profile",
          icon: "profile",
          breadcrumb: ["Profile"],
          requiresAuth: true,
        },
      },
      {
        path: "work",
        name: "Work",
        component: Work,
        meta: {
          title: "Work",
          icon: "work",
          breadcrumb: ["Work"],
          requiresAuth: true,
        },
      },
      {
        path: "about",
        name: "About",
        component: About,
        meta: {
          title: "About",
          icon: "About",
          breadcrumb: ["About"],
          requiresAuth: true,
        },
      },
      {
        path: "contact",
        name: "Contact",
        component: Contact,
        meta: {
          title: "Contact",
          icon: "About",
          breadcrumb: ["Contact"],
          requiresAuth: true,
        },
      },
      {
        path: "settings",
        name: "Setting",
        component: Setting,
        meta: {
          title: "Setting",
          icon: "Setting",
          breadcrumb: ["Setting"],
          requiresAuth: true,
        },
      },
      // {
      //     path: 'dashboard',
      //     name: 'Dashboard',
      //     component: Dashboard,
      //     meta: {
      //         title: 'Dashboard',
      //         requiresAuth: true,
      //         icon: 'dashboard',
      //         breadcrumb: ['Home', 'Dashboard']
      //     }
      // },
      // {
      //     path: 'users',
      //     name: 'Users',
      //     component: Users,
      //     meta: {
      //         title: 'Users',
      //         requiresAuth: true,
      //         roles: ['admin', 'moderator'],
      //         icon: 'team',
      //         breadcrumb: ['Home', 'Users']
      //     }
      // },
      // {
      //     path: 'users/roles',
      //     name: 'UserRoles',
      //     component: UserRoles,
      //     meta: {
      //         title: 'User Roles',
      //         requiresAuth: true,
      //         roles: ['admin'],
      //         icon: 'user',
      //         breadcrumb: ['Home', 'Users', 'Roles']
      //     }
      // },
      // {
      //     path: 'products',
      //     name: 'Products',
      //     component: Products,
      //     meta: {
      //         title: 'Products',
      //         requiresAuth: true,
      //         icon: 'shopping',
      //         breadcrumb: ['Home', 'Products']
      //     }
      // },
      // {
      //     path: 'products/categories',
      //     name: 'ProductCategories',
      //     component: ProductCategories,
      //     meta: {
      //         title: 'Product Categories',
      //         requiresAuth: true,
      //         roles: ['admin', 'moderator'],
      //         icon: 'tags',
      //         breadcrumb: ['Home', 'Products', 'Categories']
      //     }
      // },
      // {
      //     path: 'reports',
      //     name: 'Reports',
      //     component: Reports,
      //     meta: {
      //         title: 'Reports',
      //         requiresAuth: true,
      //         roles: ['admin'],
      //         icon: 'bar-chart',
      //         breadcrumb: ['Home', 'Reports']
      //     }
      // },
      // {
      //     path: 'settings',
      //     name: 'Settings',
      //     component: Settings,
      //     meta: {
      //         title: 'Settings',
      //         requiresAuth: true,
      //         icon: 'setting',
      //         breadcrumb: ['Home', 'Settings']
      //     }
      // }
    ],
  },
  // 404 Not Found Route
  // {
  //     path: '/:pathMatch(.*)*',
  //     name: 'NotFound',
  //     component: NotFound,
  //     meta: {
  //         title: 'Page Not Found',
  //         breadcrumb: ['Home', '404']
  //     }
  // }
];

// Create Router Instance (Vue 3 way)
const router: Router = createRouter({
  // Use HTML5 History API (Vue 3 syntax)
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("/admin/"),
  routes,
  // Scroll behavior (Vue 3 enhanced)
  scrollBehavior(to, _, savedPosition) {
    // If user pressed back/forward buttons
    if (savedPosition) {
      return savedPosition;
    }

    // If route has hash, scroll to anchor
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    // Default: scroll to top
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();

  if (authStore.loading) {
    await authStore.fetchUser();
  }

  if (to.meta.requiresAuth && !authStore.user) {
    next("/login");
  } else if (to.path === "/login" && authStore.user) {
    return next("/dashboard"); // already logged in, skip login
  }

  next();
});

// Authentication helper (implement based on your auth system)
// const isAuthenticated = (): boolean => {
//     // Replace with your authentication logic
//     // Examples:
//     // - Check Pinia/Vuex store
//     // - Check localStorage/sessionStorage
//     // - Check JWT token validity
//     return localStorage.getItem('authToken') !== null
// }

// Role checking helper
// const hasRequiredRole = (requiredRoles: string[]): boolean => {
//     // Replace with your role checking logic
//     const userRole = localStorage.getItem('userRole') || 'user'
//     return requiredRoles.includes(userRole)
// }

// Global Navigation Guards (Vue 3 style)
// router.beforeEach(async (to, from, next) => {
//     // Start loading indicator if you have one
//     // Example: store.commit('setLoading', true)
//
//     // Set document title
//     const appName = 'My Vue 3 App'
//     document.title = to.meta.title ? `${to.meta.title} - ${appName}` : appName
//
//     // Authentication check
//     if (to.meta.requiresAuth) {
//         if (!isAuthenticated()) {
//             // Redirect to login (implement your login route)
//             console.warn('Authentication required for:', to.path)
//             // next({ name: 'Login', query: { redirect: to.fullPath } })
//             next() // Remove this line when you implement login
//             return
//         }
//     }
//
//     // Role-based access control
//     if (to.meta.roles && to.meta.roles.length > 0) {
//         if (!hasRequiredRole(to.meta.roles)) {
//             console.warn('Insufficient permissions for:', to.path)
//             // You could redirect to an unauthorized page or home
//             next({ name: 'Home' })
//             return
//         }
//     }
//
//     // Proceed with navigation
//     next()
// })

// Global after navigation hook
// router.afterEach((to, from) => {
//     // Stop loading indicator
//     // Example: store.commit('setLoading', false)
//
//     // Analytics tracking
//     // if (typeof gtag !== 'undefined') {
//     //     gtag('config', 'GA_MEASUREMENT_ID', {
//     //         page_title: to.meta.title,
//     //         page_location: window.location.href
//     //     })
//     // }
//     //
//     // // Log navigation for debugging
//     // if (import.meta.env.DEV) {
//     //     console.log(`🚀 Navigated from ${from.path} to ${to.path}`)
//     // }
// })

// Error handling for failed navigation
// router.onError((error) => {
//     console.error('Router error:', error)
//     // Handle navigation errors
//     // You might want to show a toast notification or redirect to error page
// })

export default router;

// Export additional utilities
export { routes };
export type { RouteRecordRaw };
