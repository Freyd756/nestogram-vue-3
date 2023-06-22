import type { RouteRecordRaw } from "vue-router";

import {useAppStore} from "@/stores/appStore";
import LogInComponent from '@/components/LogIn.vue';


const routes : Array<RouteRecordRaw> =  [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        beforeEnter(to, from, next) {
            if (useAppStore().isLogined || to.path === '/signup') {
              next();
            } else {
                next({ name: 'login' });
            }
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/LogIn.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/components/SignUp.vue'),
    },

    // {
    //   path: '*',
    //   redirect: '/',
    //   component: LogInComponent,
    // },
]

 export default routes;