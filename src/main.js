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
        { path: '/', redirect: '/home' },
        { name: 'Home', path: '/home', component: Home },
        { name: 'SearchMuseum', path: '/search-museum', component: SearchMuseum },
        { name: 'Scanner', path: '/scan', component: Scanner },
        { name: 'SearchArtwork', path: '/search', component: SearchArtwork },
        { name: 'ViewArtwork', path: '/view/:id', component: ViewArtwork },
        { name: 'MuseumMap', path: '/map', component: MuseumMap },
        { name: 'Checklist', path: '/checklist/:section_id', component: Checklist },
        
        { path: '/admin', redirect: '/admin/login' },
        { name: 'Login', path: '/admin/login', component: Login },
        { name: 'Dashboard', path: '/admin/home', component: AdminHome },
        { name: 'ChangePassword', path: '/admin/change-password', component: ChangePassword },
        { name: 'AddArtwork', path: '/admin/add', component: AddArtwork },
        { name: 'EditArtwork', path: '/admin/edit/:id', component: EditArtwork },
        { name: 'ViewAll', path: '/admin/view/all', component: ViewAllArtworks },
        { name: 'AdminViewArtwork', path: '/admin/view/:id', component: AdminViewArtwork },
        { name: 'Menu', path: '/admin/menu', component: Menu },
    ]
});

const app = createApp(App)
const vfm = createVfm()

// add component here
app.use(router);
app.use(vfm);

app.component('ModalsContainer', ModalsContainer);

app.mount('#app')