import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Football from './views/Listing/Football.vue'
import Basketball from './views/Listing/Basketball.vue'
import Formula1 from './views/Listing/Formula1.vue'
import Formula1Event from './views/Query/Formula1Event.vue'
import FootballEvent from './views/Query/FootballEvent.vue'
import BasketballEvent from './views/Query/BasketballEvent.vue'
import httpService from "./api/http/http-service"
import Register from "./views/Register";
import BecomeVip from "./views/BecomeVip";
import Sport from "./views/Sport";
import Team from "./views/Team";
Vue.use(Router);

const ifAutheticated = (to, from, next) => {
    if (httpService.isUserLoggedIn()) {
        next();
        return
    } 
    next('/login');
};

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {
        path:'/',
        name: 'Home',
        component: Home,
        beforeEnter: ifAutheticated
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path:'/register',
        name:'Register',
        component: Register,
    },
    {
        path:'/become-vip',
        name:'Become VIP',
        component: BecomeVip,
    },
    {
        path:'/sport',
        name:'Sport',
        component: Sport,
    },
    {
        path:'/team',
        name:'Team',
        component: Team,
    },
    {
        path:'/football',
        name:'Futebol',
        component: Football,
        beforeEnter: ifAutheticated
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
    },
    {
        path:'/football/:id',
        name:'Football Profile',
        component: FootballEvent,
        props: true
    },
    {
        path:'/basketball/:id',
        name:'Basketball Profile',
        component: BasketballEvent,
        props: true
    },
    {
        path:'/formula1/:id',
        name:'Formula 1 Profile',
        component: Formula1Event,
        props: true
    }
    ]
})