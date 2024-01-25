import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

// import pages here
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'

// add paths here
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/admin/login' }, // to change to correct redirection screen
        { path: '/admin/login', component: Login },
        { path: '/admin/home', component: Home },
    ]
});

const app = createApp(App)

// add component here
app.use(router);
app.component('home', Home);

app.mount('#app')