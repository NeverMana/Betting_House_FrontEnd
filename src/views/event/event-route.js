import {ifAutheticated} from "../../router";
import Event from "../event/Event"

export const eventRoute = [
    {
        path:'/event',
        name:'Event',
        component: Event,
        beforeEnter: ifAutheticated
    },
    {
        path: '/event/:id'
    }
];