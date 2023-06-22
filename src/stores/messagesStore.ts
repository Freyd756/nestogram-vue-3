import {defineStore} from 'pinia';
import type IMessageState from '@/models/store/IMessageState'


export const useMessagesStore = defineStore('MessagesStore', {
    state: ():IMessageState =>({
        messages:{}
    }),
    actions: {
        // async ADD_MESSAGE({ commit }, message) {
        //   //here i call fetch helpers
        //   console.log('CREATE_MESSAGE');
        //   // this.$socket.emit('addMessage', message)
        //   commit('CREATE_MESSAGE', message);
        //   // commit('ADD_USER', user);
        //   // const token = localStorage.getItem('token');
        //   // if (token) dispatch('CHECK_TOKEN', token);
        // },

        SOCKET_CREATE_NEW_MESSAGE_BACK(message:any) {
            console.log('MUTATION',message.roomId)
            this.messages[message.roomId].push(message);
        },
        SOCKET_REMOVE_MESSAGE_BACK( messageId:any, roomId:any) {
            this.messages[roomId] = this.messages[roomId].filter((item:any) => item._id !== messageId);
        },
        // async REMOVE_MESSAGE({ commit }, id) {
        //   console.log('REMOVE_MESSAGE');
        //
        //   commit('REMOVE_MESSAGE', id);
        // },
        SOCKET_EDIT_MESSAGE_BACK( id:number, text:string, roomId:number|string ) {
            console.log({ id, text,roomId })
            this.messages[roomId] = this.messages[roomId].map((item:any) => {
                if (item._id === id) {
                    item.text = text;
                }
                return item;
            });
        },
        // async EDIT_MESSAGE({ commit }, payload) {
        //   console.log('EDIT_MESSAGE');
        //   commit('EDIT_MESSAGE', payload);
        // },

        SOCKET_GET_MESSAGES_BACK(messages:string) {
            this.messages = messages
        },
        // To do!!
        // SOCKET_GET_MESSAGES_BACK_BY_ROOM_BACK( messages:any, roomId:any ) {
        //   app.set(store.messages, roomId , messages)
        // },
    }
});

