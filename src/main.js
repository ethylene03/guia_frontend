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
import Menu from "./pages/admin/Menu.vue"

// import visitor pages here
import Home from "./pages/visitor/Home.vue"
import SearchMuseum from "./pages/visitor/SearchMuseum.vue"

// add paths here
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' }, // to change to correct redirection screen
        { path: '/admin', redirect: '/admin/login' },
        { name: 'Login', path: '/admin/login', component: Login },
        { name: 'Dashboard', path: '/admin/home', component: AdminHome },
        { name: 'ChangePassword', path: '/admin/change-password', component: ChangePassword },
        { name: 'AddArtwork', path: '/admin/add-artwork', component: AddArtwork },
        { name: 'EditArtwork', path: '/admin/edit-artwork', component: EditArtwork },
        { name: 'Menu', path: '/admin/menu', component: Menu },

        { name: 'Home', path: '/home', component: Home },
        { name: 'SearchMuseum', path: '/search-museum', component: SearchMuseum },
    ]
});

const app = createApp(App)
const vfm = createVfm()

// add component here
app.use(router);
app.use(vfm);
app.component('ModalsContainer', ModalsContainer);

app.mount('#app')