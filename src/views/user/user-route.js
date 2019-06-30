import BecomeVip from "./BecomeVip";
import {ifAutheticated} from "../../router";

export const userRoute = [
    {
        path:'/become-vip',
        name:'Become VIP',
        component: BecomeVip,
        beforeEnter: ifAutheticated
    }
];