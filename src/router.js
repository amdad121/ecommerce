import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from './layouts/AppLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'
import GuestLayout from './layouts/GuestLayout.vue'

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
            }
        } else if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/pages/Home.vue'),
            meta: {
                layout: AppLayout,
                title: 'Most popullar ecommerce site in BD'
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./views/admin/Dashboard.vue'),
            meta: {
                layout: AdminLayout,
                forAuth: true,
                title: 'Dashboard'
            }
        },
        {
            path: '/products',
            name: 'products',
            component: () => import('./views/admin/Products.vue'),
            meta: {
                layout: AdminLayout,
                forAuth: true,
                title: 'Products'
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/auth/Login.vue'),
            meta: {
                layout: GuestLayout,
                forGuest: true,
                title: 'Login'
            }
        },
        {
            path: '/reset',
            name: 'reset',
            component: () => import('./views/auth/Reset.vue'),
            meta: {
                layout: GuestLayout,
                forGuest: true,
                title: 'Reset'
            }
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('./views/pages/NotFound.vue'),
            meta: {
                title: 'Not Found'
            }
        }
    ]
})

router.beforeEach(
    (to, from, next) => {
        document.title = to.meta.title + ' :: ' + app_name;
        if (to.matched.some(record => record.meta.forGuest)) {
            if (localStorage.getItem('token')) {
                next({ name: 'home' })
            } else next()
        } else if (to.matched.some(record => record.meta.forAuth)) {
            if (!localStorage.getItem('token')) {
                next({ name: 'login' })
            } else next()
        } else next()
    }
)

export default router