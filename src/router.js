import Vue from 'vue'
import Router from 'vue-router'
import httpService from "./api/http/http-service"
import Team from "./views/Team";
import History from "./views/History";
import {authRoute} from "./views/auth/auth-route";
import {homeRoute} from "./views/home/home-route";
import {userRoute} from "./views/user/user-route";
import {eventRoute} from "./views/event/event-route";
import {sportRoute} from "./views/sport/sport-route";
import Transaction from "./views/Transaction";

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
            path:'/history',
            name:'History',
            component: History,
        },
        {
            path:'/transactions',
            name:'Transaction',
            component: Transaction,
        }
    ]
})