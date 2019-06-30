import Login from "./Login";
import Register from "./Register";

export const authRoute = [
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
];