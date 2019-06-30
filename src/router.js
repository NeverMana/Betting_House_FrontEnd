import Vue from 'vue'
import Router from 'vue-router'
import Football from './views/zOLD/Listing/Football.vue'
import Basketball from './views/zOLD/Listing/Basketball.vue'
import Formula1 from './views/zOLD/Listing/Formula1.vue'
import Formula1Event from './views/zOLD/Query/Formula1Event.vue'
import FootballEvent from './views/zOLD/Query/FootballEvent.vue'
import BasketballEvent from './views/zOLD/Query/BasketballEvent.vue'
import httpService from "./api/http/http-service"
import Sport from "./views/sport/Sport";
import Team from "./views/Team";
import Sports from "./views/zOLD/Listing/Sports";
import Teams from "./views/zOLD/Listing/Teams";
import {authRoute} from "./views/auth/auth-route";
import {homeRoute} from "./views/home/home-route";
import {userRoute} from "./views/user/user-route";
import {eventRoute} from "./views/event/event-route";
import {sportRoute} from "./views/sport/sport-route";

Vue.use(Router);

export const ifAutheticated = (to, from, next) => {
    if (httpService.isUserLoggedIn()) {
        next();
        return
    }
    next('/login');
};

export const ifAutheticatedAndIsAdmin = (to, from, next) => {
    if (httpService.isUserLoggedIn()) {
        if (httpService.isUserAdmin()) {
            next();
            return null;
        } else {
            next('/')
        }
    } else {
        next('/login');
    }
};

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...authRoute,
        ...homeRoute,
        ...userRoute,
        ...eventRoute,
        ...sportRoute,
        {
            path:'/team',
            name:'Team',
            component: Team,
        },
        {
            path:'/teams',
            name:'Teams',
            component: Teams,
        }
    ]
})