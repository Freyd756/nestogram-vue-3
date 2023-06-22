import {createApp, markRaw} from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VueSocketIO from 'vue-socket.io';
// @ts-ignore
import VueNativeSock from "vue-native-websocket-vue3";

// @ts-ignore
import vuetify from '../plugins/vuetify'
import {useMessagesStore} from '@/stores/messagesStore';
import { storeToRefs } from 'pinia'


//socket.io-client To Do
// import { io } from "socket.io-client"
// export const socket = io(URL);


import './assets/main.scss'
// @ts-ignore
import { registerPlugins } from '../plugins'


export const app = createApp(App)

await registerPlugins(app)

app.use(createPinia())
const messagesStore:any =  storeToRefs(useMessagesStore())


// app.use(new VueSocketIO({
//     debug: true,
//     connection: 'http://localhost:8082/message',
//         // store
//     //     actionPrefix: 'SOCKET_',
//     //     mutationPrefix: 'SOCKET_'
//
//     // options: { path: "/my-app/" } //Optional options
// }))
app.use(VueNativeSock,"ws://172.17.0.2/:8082",{
    store: messagesStore,
    format: "json",
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000
});

app.use(router)

app.use(vuetify);

app.mount('#app')

