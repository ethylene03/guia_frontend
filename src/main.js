import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { ModalsContainer } from 'vue-final-modal';
import { createVfm } from 'vue-final-modal'
import { isExpired, logout } from './assets/components/common';

import App from './App.vue'

// import admin pages here
import AdminHome from './pages/admin/Home.vue'
import Login from './pages/admin/Login.vue'
import ChangePassword from './pages/admin/ChangePassword.vue'
import AddArtwork from "./pages/admin/AddArtwork.vue"
import EditArtwork from "./pages/admin/EditArtwork.vue"
import ViewAllArtworks from "./pages/admin/ViewAllArtworks.vue"
import AdminViewArtwork from "./pages/admin/ViewArtwork.vue"
import Menu from "./pages/admin/Menu.vue"

// import visitor pages here
import Home from "./pages/visitor/Home.vue"
import SearchMuseum from "./pages/visitor/SearchMuseum.vue"
import Scanner from "./pages/visitor/Scanner.vue"
import SearchArtwork from "./pages/visitor/SearchArtwork.vue"
import ViewArtwork from "./pages/visitor/ViewArtwork.vue"
import MuseumMap from "./pages/visitor/MuseumMap.vue"
import Checklist from "./pages/visitor/Checklist.vue"

// add paths here
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // visitor pages
        // add meta: { requiresAuth: true, role: 'visitor' } after visitor integration!!
        { path: '/', redirect: '/search-museum' },
        { name: 'Home', path: '/hands-down/:id', component: Home },
        { name: 'SearchMuseum', path: '/search-museum', component: SearchMuseum },
        { name: 'Scanner', path: '/scan', component: Scanner, meta: { requiresAuth: true, role: 'visitor' } },
        { name: 'SearchArtwork', path: '/search', component: SearchArtwork, meta: { requiresAuth: true, role: 'visitor' } },
        { name: 'ViewArtwork', path: '/view/:id', component: ViewArtwork, meta: { requiresAuth: true, role: 'visitor' } },
        { name: 'MuseumMap', path: '/map', component: MuseumMap, meta: { requiresAuth: true, role: 'visitor' } },
        { name: 'Checklist', path: '/checklist/:section_id', component: Checklist, meta: { requiresAuth: true, role: 'visitor' } },
        
        // admin pages
        { path: '/on-cloud-nine', meta: { requiresAuth: true, role: 'admin' } },
        { name: 'Login', path: '/on-cloud-nine/login', component: Login, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'Dashboard', path: '/on-cloud-nine/home', component: AdminHome, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'ChangePassword', path: '/on-cloud-nine/change-password', component: ChangePassword, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'AddArtwork', path: '/on-cloud-nine/add', component: AddArtwork, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'EditArtwork', path: '/on-cloud-nine/edit/:id', component: EditArtwork, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'ViewAll', path: '/on-cloud-nine/view/all', component: ViewAllArtworks, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'AdminViewArtwork', path: '/on-cloud-nine/view/:id', component: AdminViewArtwork, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'Menu', path: '/on-cloud-nine/menu', component: Menu, meta: { requiresAuth: true, role: 'admin' } },
    ]
});


// Navigation guard
router.beforeEach((to, from, next) => {

    if(to.meta.role === 'admin' && to.path !== '/on-cloud-nine') {
        if(isExpired())
            logout();    
    }

    // special guards for admin pages
    if(to.path === '/on-cloud-nine') {
        if(localStorage.getItem('admin_token'))
            next('/on-cloud-nine/home');
        else
            next('/on-cloud-nine/login');
    } else if(to.path === '/on-cloud-nine/login') {
        if(localStorage.getItem('admin_token')) {
            if(from.path != '/')
                next(false);
            else
                next('/on-cloud-nine/home');
        } else
            next();

    // special guards for visitor pages
    } else if(to.path === '/search-museum') {
        // clear token (to change for expired token)
        localStorage.removeItem('visitor_token');
        next();
    
    // normal guards for all pages
    } else {
        if (to.meta.requiresAuth) {
            const token = localStorage.getItem(to.meta.role + '_token');
    
            if (!token && to.meta.role === 'admin') // redirect to login if no token (admin)
                next('/on-cloud-nine/login');
            else if(!token && to.meta.role === 'visitor') // redirect to home if no token (visitor)
                next('/search-museum');
            else // proceed to page
                next();
        } else
            next(); // proceed to page
    }

    // next();
});

const app = createApp(App)
const vfm = createVfm()

// add component here
app.use(router);
app.use(vfm);

app.component('ModalsContainer', ModalsContainer);

app.mount('#app')