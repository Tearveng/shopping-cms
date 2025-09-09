import type { RouteRecordRaw, Router } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Login from "../pages/auth/Login.vue";
import Home from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";
import HomePageVue from "../pages/publish/HomePage.vue";
import Setting from "../pages/Setting.vue";
import ShoppingBanner from "../pages/ShoppingBanner.vue";
import ShoppingEditorPicks from "../pages/ShoppingEditorPicks.vue";
import ShoppingFeatureCollections from "../pages/ShoppingFeatureCollections.vue";
import ShoppingTopDesigners from "../pages/ShoppingTopDesigners.vue";
import { useAuthStore } from "../stores/auth";
import ShoppingLiveAnnounce from "../pages/ShoppingLiveAnnounce.vue";
import ShoppingMoreTopDesigners from "../pages/ShoppingMoreTopDesigners.vue";
import ShoppingContact from "../pages/ShoppingContact.vue";
import ShoppingProfile from "../pages/ShoppingProfile.vue";
import ShoppingShopInPerson from "../pages/ShoppingShopInPerson.vue";
import ShoppingCategory from "../pages/ShoppingCategory.vue";
import ShoppingItems from "../pages/ShoppingItems.vue";
import ShoppingNewArrivals from "../pages/publish/new-arrivals/ShoppingNewArrivals.vue";
import HomePageContent from "../pages/publish/HomePageContent.vue";
import ShoppingItemDetail from "../pages/publish/new-arrivals/detail/ShoppingItemDetail.vue";

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
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  {
    path: "/",
    name: "HomePage",
    component: HomePageVue,
    children: [
      {
        path: "",
        name: "HomeContent",
        component: HomePageContent,
        meta: {
          title: "HomeContent",
          icon: "homeContent",
          breadcrumb: ["HomeContent"],
        },
      },
      {
        path: "/:parent_key",
        name: "New Arrivals",
        component: ShoppingNewArrivals,
        meta: {
          title: "New Arrivals",
          icon: "new arrivals",
          breadcrumb: ["New Arrivals"],
        },
      },
      {
        path: "p/:item_id",
        name: "Item detail",
        component: ShoppingItemDetail,
        meta: {
          title: "Item detail",
          icon: "item detail",
          breadcrumb: ["Item detail"],
        },
      },
    ],
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
        path: "profile",
        name: "Profile",
        component: ShoppingProfile,
        meta: {
          title: "Profile",
          icon: "profile",
          breadcrumb: ["Profile"],
          requiresAuth: true,
        },
      },
      {
        path: "category",
        name: "Category",
        component: ShoppingCategory,
        meta: {
          title: "Category",
          icon: "category",
          breadcrumb: ["Category"],
          requiresAuth: true,
        },
      },
      {
        path: "items",
        name: "Item",
        component: ShoppingItems,
        meta: {
          title: "Item",
          icon: "item",
          breadcrumb: ["Item"],
          requiresAuth: true,
        },
      },
      {
        path: "banner",
        name: "Banner",
        component: ShoppingBanner,
        meta: {
          title: "Banner",
          icon: "banner",
          breadcrumb: ["Banner"],
          requiresAuth: true,
        },
      },
      {
        path: "top_design",
        name: "Top design",
        component: ShoppingTopDesigners,
        meta: {
          title: "Top design",
          icon: "top_design",
          breadcrumb: ["Top design"],
          requiresAuth: true,
        },
      },
      {
        path: "feature_collection",
        name: "Feature collection",
        component: ShoppingFeatureCollections,
        meta: {
          title: "Feature collection",
          icon: "feature_collection",
          breadcrumb: ["Feature collection"],
          requiresAuth: true,
        },
      },
      {
        path: "more_top_design",
        name: "More top design",
        component: ShoppingMoreTopDesigners,
        meta: {
          title: "More top design",
          icon: "more_top_design",
          breadcrumb: ["More top design"],
          requiresAuth: true,
        },
      },
      {
        path: "editor_pick",
        name: "Editor pick",
        component: ShoppingEditorPicks,
        meta: {
          title: "Editor pick",
          icon: "editor_pick",
          breadcrumb: ["Editor pick"],
          requiresAuth: true,
        },
      },
      {
        path: "live_announce",
        name: "Live announce",
        component: ShoppingLiveAnnounce,
        meta: {
          title: "Live announce",
          icon: "live_announce",
          breadcrumb: ["Live announce"],
          requiresAuth: true,
        },
      },
      {
        path: "shop_in_person",
        name: "Shop in person",
        component: ShoppingShopInPerson,
        meta: {
          title: "Shop in person",
          icon: "shop_in_person",
          breadcrumb: ["Shop in person"],
          requiresAuth: true,
        },
      },
      {
        path: "contact",
        name: "Contact",
        component: ShoppingContact,
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
    ],
  },
];

// Create Router Instance (Vue 3 way)
const router: Router = createRouter({
  // Use HTML5 History API (Vue 3 syntax)
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
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
    return next("admin/profile"); // already logged in, skip login
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
