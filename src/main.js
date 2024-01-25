import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

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

// add paths here
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' }, // to change to correct redirection screen
        { path: '/admin/login', component: Login },
        { path: '/admin/home', component: AdminHome },
        { path: '/admin/change-password', component: ChangePassword },
        { path: '/admin/add-artwork', component: AddArtwork },
        { path: '/admin/edit-artwork', component: EditArtwork },
        { path: '/admin/menu', component: Menu },

        { path: '/home', component: Home },
    ]
});

const app = createApp(App)

// add component here
app.use(router);
app.component('home', Home);

app.mount('#app')