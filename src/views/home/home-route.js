import {ifAutheticated, ifAutheticatedAndIsAdmin} from "../../router";
import Home from "./Home";
import AdminHome from "./AdminHome";

export const homeRoute = [
    {
        path:'/',
        name: 'Home',
        component: Home,
        beforeEnter: ifAutheticated
    },
    {
        path: '/admin',
        name: 'AdminHome',
        component: AdminHome,
        beforeEnter: ifAutheticatedAndIsAdmin
    }
];