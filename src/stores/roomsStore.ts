import {defineStore} from 'pinia';
import postData from "@/helpers/postData";
import getData from "@/helpers/getData";
import { useAppStore } from '@//stores/appStore'
import type IRoomState from "@/models/store/IRoomState";


export const useRoomsStore = defineStore('RoomsStore', {
    state: ():IRoomState =>({
        rooms: [],
        room: null,
        isShowCreateRoomPopup: false,
    }),
    actions: {
        IS_SHOW_CREATE_ROOM( value: any) {
            this.isShowCreateRoomPopup = value
        },
        async CREATE_ROOM( payload:any):Promise<void> {
            const token = localStorage.getItem('token');
            const { data: room } = await postData('rooms',payload, token)
            if (!room) {
                return useAppStore().SET_ERROR( true, 'Room was not created' );
            }
            this.ADD_ROOM(room)
            // commit('SET_IS_SHOW_CREATE_ROOM', false);
        },
        async GET_ROOMS() {
            const token = localStorage.getItem('token');
            const { data: rooms } = await getData('rooms', token)
            if (!rooms) {
                return useAppStore().SET_ERROR(true, 'Rooms were not found' );
            }
            this.SET_ROOMS(rooms)
            // commit('SET_IS_SHOW_CREATE_ROOM', false);
        },

        ADD_ROOM(room:any){
            if (room) { // @ts-ignore
                this.rooms.push(room)
            }
        },

        SET_ROOM(room:any){
            this.room = room
        },

        SET_ROOMS(value:any) {
            this.rooms = value
        }
    }
});

