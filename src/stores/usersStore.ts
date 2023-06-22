import {defineStore} from 'pinia';
import postData from "@/helpers/postData";

import type IUserState from "@/models/store/IUserState";
import type IUser from "@/models/IUser";
import { useAppStore } from "@//stores/appStore";

export const useUsersStore = defineStore('UsersStore', {
    state: ():IUserState =>({
        users: [
            {
                name: 'Vasya',
                _id: 1,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                active: true,
                taping: false,
                password: '1111',
            },
            {
                name: 'Leonid',
                _id: 2,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                active: false,
                taping: true,
                password: '1111',
            },
            {
                name: 'Ya',
                _id: 3,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                active: false,
                taping: false,
                password: '123456',
            },
        ],
        user: {
            name: 'Ya',
            _id: 3,
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            active: false,
            taping: false,
            password: '123456',
        }
    }),
    actions: {
        async ADD_USER( user:IUser) {
            const { error } =  await postData('auth/signup', user)
            if (error) useAppStore().SET_ERROR( true,  'Something went wrong or user already exist' );
            // const token = localStorage.getItem('token');
            // if (token) dispatch('CHECK_TOKEN', token);
            return !error
        },
        async LOG_IN( payload:any ) {
            const { data: user,error} = await postData('auth/login', payload)
            console.log(error)
            if (!user) {
                return useAppStore().SET_ERROR( true,  'User does not exist or password not match' );
            }
            localStorage.setItem('token', user.token);
            if(useAppStore().error){
                useAppStore().SET_ERROR( false,  '' );
            }
            if (localStorage.getItem('token') && user) {
                this.SET_USER_LOGINED( true);
                this.SET_CURRENT_USER( user);
                useAppStore().token = user.token;
            }

            return true;

            // commit('ADD_USER', user);
            // const token = localStorage.getItem('token');
            // if (token) dispatch('CHECK_TOKEN', token);
        },
        LOGOUT() {
            localStorage.removeItem('token');
            this.SET_LOGINED(false)
            this.SET_CURRENT_USER({})
        },
        async AUTH():Promise<Boolean| void>{
            const token = localStorage.getItem('token');
            const { data: user } = await postData('auth', {}, token)
            if (!user) {
                return useAppStore().SET_ERROR(true, 'User does not exist or password not match' );
            }
            console.log('user',user);
            if (user) {
                this.SET_USER_LOGINED( true);
                this.SET_CURRENT_USER( user)
            }
            return true;
        },
        SET_USER_LOGINED( value: boolean) {
            this.SET_LOGINED(value);
        },

        SET_CURRENT_USER (user:IUser| any) {
            this.user = user;
        },
        SET_LOGINED (payload:boolean) {
            useAppStore().isLogined = payload;
        }
    }
});

