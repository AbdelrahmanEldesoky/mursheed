import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import Page404Layout from '../layouts/Page404Layout.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'
import UIRoute from '../pages/admin/ui/route'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'dashboard' },
  },
  {
  name:'print',
  path:'/print',
  component: () => import('../pages/admin/settings/order/print.vue'),
  },
  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    beforeEnter: auth,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'statistics',
        path: 'users_management',
        // component: RouteViewComponent,
        children: [
          {
            name: 'users',
            path: 'users',
            component: () => import('../pages/admin/users.vue'),
          },
          {
            name: 'guides',
            path: 'guides',
            component: () => import('../pages/admin/guides/index.vue'),
          },
          {
            name: 'guides-show',
            path: 'guides-show/:id',
            component: () => import('../pages/admin/guides/show.vue'),
          },
          {
            name: 'drivers-show',
            path: 'drivers-show/:id',
            component: () => import('../pages/admin/drivers/show.vue'),
          },
          {
            name: 'drivers',
            path: 'drivers',
            component: () => import('../pages/admin/drivers/index.vue'),
          },
          {
            name: 'tourist',
            path: 'tourist',
            component: () => import('../pages/admin/torist/index.vue'),
          },
          {
            name: 'tourist-show',
            path: 'tourist-show/:id',
            component: () => import('../pages/admin/torist/show.vue'),
          },
        ],
      },
      {
        name: 'tourism-management',
        path: 'tourism',
        // component: RouteViewComponent,
        children: [
          {
            name: 'category',
            path: 'category',
            component: () => import('../pages/admin/management-tourism/category/index.vue'),
          },
          {
            name: 'category-create',
            path: 'category-create',
            component: () => import('../pages/admin/management-tourism/category/create.vue'),
          },
          {
            name: 'accommodition',
            path: 'accommodition',
            component: () => import('../pages/admin/management-tourism/accommodition/index.vue'),
          },
          {
            name: 'accommodition-create',
            path: 'accommodition-create',
            component: () => import('../pages/admin/management-tourism/accommodition/create.vue'),
          },
          {
            name: 'accommodition-update',
            path: 'accommodition-update/:id',
            component: () => import('../pages/admin/management-tourism/accommodition/update.vue'),
          },
          {
            name: 'offer',
            path: 'offer',
            component: () => import('../pages/admin/management-tourism/offer/index.vue'),
          },
          {
            name: 'offer-create',
            path: 'offer-create',
            component: () => import('../pages/admin/management-tourism/offer/create.vue'),
          },
          {
            name: 'offer-update',
            path: 'offer-update/:id',
            component: () => import('../pages/admin/management-tourism/offer/update.vue'),
          },
          {
            name: 'flight',
            path: 'flight',
            component: () => import('../pages/admin/management-tourism/flightReservation/index.vue'),
          },
          {
            name: 'flight-create',
            path: 'flight-create',
            component: () => import('../pages/admin/management-tourism/flightReservation/create.vue'),
          },
          {
            name: 'flight-update',
            path: 'flight-update/:id',
            component: () => import('../pages/admin/management-tourism/flightReservation/update.vue'),
          },
        ],
      },
      {
        name: 'tourism-management',
        path: 'tourism',
        // component: RouteViewComponent,
        children: [
          {
            name: 'category',
            path: 'category',
            component: () => import('../pages/admin/management-tourism/category/index.vue'),
          },
          {
            name: 'category-create',
            path: 'category-create',
            component: () => import('../pages/admin/management-tourism/category/create.vue'),
          },
          {

            name: 'accommodition',
            path: 'accommodition',
            component: () => import('../pages/admin/management-tourism/accommodition/index.vue'),
          },
          {
            name: 'accommodition-create',
            path: 'accommodition-create',
            component: () => import('../pages/admin/management-tourism/accommodition/create.vue'),
          },
          {
            name: 'accommodition-update',
            path: 'accommodition-update/:id',
            component: () => import('../pages/admin/management-tourism/accommodition/update.vue'),
          },
          {
            name: 'offer',
            path: 'offer',
            component: () => import('../pages/admin/management-tourism/offer/index.vue'),
          },
          {
            name: 'offer-create',
            path: 'offer-create',
            component: () => import('../pages/admin/management-tourism/offer/create.vue'),
          },
          {
            name: 'offer-update',
            path: 'offer-update/:id',
            component: () => import('../pages/admin/management-tourism/offer/update.vue'),
          },
          // {
          //   name: 'banner',
          //   path: 'banner',
          //   component: () => import('../pages/admin/management-tourism/banner/index.vue'),
          // },
          // {
          //   name: 'banner-create',
          //   path: 'banner-create',
          //   component: () => import('../pages/admin/management-tourism/banner/create.vue'),
          // },
          // {
          //   name: 'banner-update',
          //   path: 'banner-update/:id',
          //   component: () => import('../pages/admin/management-tourism/banner/update.vue'),
          // },
          {
            name: 'Attract',
            path: 'Attract',
            component: () => import('../pages/admin/management-tourism/Attractive/index.vue'),
          },
          {
            name: 'Attract-create',
            path: 'Attract-create',
            component: () => import('../pages/admin/management-tourism/Attractive/create.vue'),
          },
          {
            name: 'Attract-update',
            path: 'Attract-update/:id',
            component: () => import('../pages/admin/management-tourism/Attractive/update.vue'),
          },
          {
            name: 'flight',
            path: 'flight',
            component: () => import('../pages/admin/management-tourism/flightReservation/index.vue'),
          },
          {
            name: 'flight-create',
            path: 'flight-create',
            component: () => import('../pages/admin/management-tourism/flightReservation/create.vue'),
          },
          {
            name: 'flight-update',
            path: 'flight-update/:id',
            component: () => import('../pages/admin/management-tourism/flightReservation/update.vue'),
          },
        ],
      },
      {
        name: 'settings',
        path: 'settings',
        // component: RouteViewComponent,
        children: [
          {
            name: 'pages',
            path: 'pages',
            component: () => import('../pages/admin/settings/pages/index.vue'),
          },

          {
            name: 'pages-update',
            path: 'pages-update/:id',
            component: () => import('../pages/admin/settings/pages/update.vue'),
          },
          {
            name: 'contact',
            path: 'contact',
            component: () => import('../pages/admin/settings/media/index.vue'),
          },
          {
            name: 'banner',
            path: 'banner',
            component: () => import('../pages/admin/settings/banner/index.vue'),
          },
          {
            name: 'Country',
            path: 'Country',
            component: () => import('../pages/admin/settings/Country/index.vue'),
          },

          {
            name: 'order',
            path: 'order',
            component: () => import('../pages/admin/settings/order/index.vue'),
          },
          {
            name: 'order-print',
            path: 'order-print',
            component: () => import('../pages/admin/settings/order/print.vue'),
          },
          {
            name: 'reminder',
            path: 'reminder',
            component: () => import('../pages/admin/settings/reminder/index.vue'),
          },
        ],
      },

      UIRoute,
    ],
  },

  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/login/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/signup/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    path: '/404',
    component: Page404Layout,
    children: [
      {
        name: 'not-found-advanced',
        path: 'not-found-advanced',
        component: () => import('../pages/404-pages/VaPageNotFoundSearch.vue'),
      },
      {
        name: 'not-found-simple',
        path: 'not-found-simple',
        component: () => import('../pages/404-pages/VaPageNotFoundSimple.vue'),
      },
      {
        name: 'not-found-custom',
        path: 'not-found-custom',
        component: () => import('../pages/404-pages/VaPageNotFoundCustom.vue'),
      },
      {
        name: 'not-found-large-text',
        path: '/pages/not-found-large-text',
        component: () => import('../pages/404-pages/VaPageNotFoundLargeText.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      document.querySelector('.app-layout__page')?.scrollTo(0, 0)
    }
  },
  routes,
})

function auth(to: any, from: any, next: any) {
  if (!localStorage.getItem('token')) {
    return next({ name: 'login' })
  }

  next()
}

export default router
