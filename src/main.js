import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { ModalsContainer } from 'vue-final-modal';
import { createVfm } from 'vue-final-modal'

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
        { path: '/', redirect: '/home' },
        { name: 'Home', path: '/home', component: Home },
        { name: 'SearchMuseum', path: '/search-museum', component: SearchMuseum },
        { name: 'Scanner', path: '/scan', component: Scanner },
        { name: 'SearchArtwork', path: '/search', component: SearchArtwork },
        { name: 'ViewArtwork', path: '/view/:id', component: ViewArtwork },
        { name: 'MuseumMap', path: '/map', component: MuseumMap },
        { name: 'Checklist', path: '/checklist/:section_id', component: Checklist },
        
        // admin pages
        { path: '/admin', meta: { requiresAuth: true, role: 'admin' } },
        { name: 'Login', path: '/admin/login', component: Login },
        { name: 'Dashboard', path: '/admin/home', component: AdminHome, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'ChangePassword', path: '/admin/change-password', component: ChangePassword, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'AddArtwork', path: '/admin/add', component: AddArtwork, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'EditArtwork', path: '/admin/edit/:id', component: EditArtwork, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'ViewAll', path: '/admin/view/all', component: ViewAllArtworks, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'AdminViewArtwork', path: '/admin/view/:id', component: AdminViewArtwork, meta: { requiresAuth: true, role: 'admin' } },
        { name: 'Menu', path: '/admin/menu', component: Menu, meta: { requiresAuth: true, role: 'admin' } },
    ]
});


// Navigation guard
router.beforeEach((to, from, next) => {
    if(to.path === '/admin') {
        if(localStorage.getItem('admin_token'))
            next('/admin/home');
        else
            next('/admin/login');
    } else if(to.path === '/admin/login') {
        if(localStorage.getItem('admin_token'))
            next(false);
        else
            next();
    } else {
        if (to.meta.requiresAuth) {
            const token = localStorage.getItem(to.meta.role + '_token');
    
            if (!token && to.meta.role === 'admin') // redirect to login if no token (admin)
                next('/admin/login');
            else if(!token && to.meta.role === 'visitor') // redirect to home if no token (visitor)
                next('/search-museum');
            else // proceed to page
                next();
        } else
            next(); // proceed to page
    }

});

const app = createApp(App)
const vfm = createVfm()

// add component here
app.use(router);
app.use(vfm);

app.component('ModalsContainer', ModalsContainer);

app.mount('#app')