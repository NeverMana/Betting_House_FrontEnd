import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/_public/Login.vue'
import Register from './components/_public/Register.vue'
import Football from './views/Listing/Football.vue'
import Basketball from './views/Listing/Basketball.vue'
import Formula1 from './views/Listing/Formula1.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {
        path:'/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path:'/register',
        name:'Register',
        component: Register
    },
    {
        path:'/football',
        name:'Futebol',
        component: Football
    },
    {
        path:'/basketball',
        name:'Basquetebol',
        component: Basketball
    },
    {
        path:'/formula1',
        name:'Formula 1',
        component: Formula1
    }
    ]
})