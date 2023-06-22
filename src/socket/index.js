import VueSocketIO from 'vue-socket.io';
import store from './store'
import {app} from "@/main";

const config = {
    debug: false,
    // eslint-disable-next-line no-undef
    connection: process.env.BASE_URL,
    vuex:{
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    // options:{path:'/my-app/'}
}
app.use(new VueSocketIO(config))