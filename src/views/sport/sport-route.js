import {ifAutheticated} from "../../router";
import Sport from "./Sport";
import EventBySport from "./EventBySport";

export const sportRoute = [
    {
        path:'/sport/:id',
        name:'EventBySport',
        props: true,
        component: EventBySport,
        beforeEnter: ifAutheticated
    },
    {
        path:'/sport',
        name:'Sport',
        component: Sport,
    },
];