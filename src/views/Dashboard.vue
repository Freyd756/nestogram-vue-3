<script setup lang="ts">
  // import { mapState, mapActions } from "vuex";
  import DrawerComponent from "@/components/Drawer.vue";
  import HeaderComponent from "@/components/Header.vue";
  import ChatComponent from "@/components/ChatComponent.vue";
  import CreateRoomComponent from "@/components/CreateRoom.vue"
  import {computed, onMounted, watch} from "vue";
  import {useRoomsStore} from '@/stores/roomsStore';
  import {useUsersStore} from '@/stores/usersStore';
  import {useMessagesStore} from '@/stores/messagesStore';
  import {storeToRefs} from "pinia";

  const usersStore = useUsersStore();
  const {user} = usersStore;

  const {
    IS_SHOW_CREATE_ROOM:isShowCreateRoom,
    CREATE_ROOM: createNewRoom,
    GET_ROOMS: getRooms
  } = useRoomsStore()
  const {
    rooms,
    room,
    isShowCreateRoomPopup
  } = storeToRefs(useRoomsStore());

  const messages = useMessagesStore();



  // sockets: {
  //   NEW_MESSAGE: () => {
  //     this.$socket.on("NEW_MESSAGE_BACK", message => {
  //       this.receivedMessage(message);
  //     });
  //   }
  // },

  // const getMessages = ():void =>{
  //   socket.emit("GET_MESSAGES");
  // };
  const createRoom =(val:any):void =>{
    isShowCreateRoom(val);
  };

  const newMessage = (val:any):void =>{
    // socket.emit("CREATE_NEW_MESSAGE", {
    //   text: val,
    //   userId: this.user._id,
    //   roomId: this.room._id,
    //   userName: this.user.name,
    //   type: "client"
    // });
  };

  const newRoom = (val:any):void =>{
    createNewRoom(val);
  }

  const members = computed((): any | null =>{
    // @ts-ignore
    return room ? room.members : null;
  })
  // watch(room,({ _id }) =>{
  //   this.$socket.emit("GET_MESSAGES_BACK_BY_ROOM", _id);
  // })

  onMounted(()=> {
    getRooms();
  })
</script>

<template lang="pug">
v-app.py-auto(app)
  CreateRoomComponent(v-if="isShowCreateRoomPopup" @newRoom="newRoom")
  v-main
    DrawerComponent(v-if="members" :users="members" :room="room")
    HeaderComponent(@createRoom="createRoom" :rooms="rooms")
    ChatComponent(
      v-if="room"
      :messages="messages"
      :user="user"
      @message="newMessage"
      :room="room"
    )
</template>
