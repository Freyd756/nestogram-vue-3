<script setup lang="ts">
  import type {Ref} from "vue";
  import {nextTick, onUpdated, ref, watch, defineProps} from "vue";
  import  RoomsListComponent from "@/components/RoomsList.vue"
  import {useRoomsStore} from "@/stores/roomsStore";

  import {useUsersStore} from "@/stores/usersStore";
  // import { mapMutations, mapActions } from "vuex";

  interface IOptions {
    text:string,
    routeName:string
  }

  const props = defineProps<{rooms:any[]}>();
  const {SET_ROOM:setRoom, LOGOUT:logout ,isLogined}:any = useRoomsStore()


  const options:Ref<Array<IOptions>> = ref([{
    text: "Logout",
    routeName: "login"
  }]);

  const changeRoom = (room:any):void =>{
    setRoom(room);
  };

  const routerPush = (val:string):void =>{
    val === 'login' && logout()
    this.$router.push({ name: val });
  }

  watch(
      props,
      (newVal: any, oldVal: any) => {
        if (!!newVal.rooms.length && oldVal.rooms.length === 0) this.setRoom(props.rooms[0]);
      },
      {deep: true}
  );

  onUpdated(() =>{
    if (props.rooms.length !== 0) {
      setRoom(props.rooms[0]);
    }
  });

</script>


<template lang="pug">
div
  v-app-bar(app color="#ffff" elevation="0")
    RoomsListComponent(
      @changeRoom="changeRoom"
      v-if="rooms"
      :rooms="rooms"
    )
    v-spacer
    v-btn(icon)
      v-icon
        mdi-magnify
    v-btn(
      icon
      @click="$emit('createRoom', true)"
    )
      v-icon
        mdi-plus
    v-menu(left bottom)
      template(v-slot:activator="{ on, attrs }")
        v-btn(
          icon
          v-bind="attrs"
          v-on="on"
        )
          v-icon
            mdi-dots-vertical

      v-list( v-if="options")
        v-list-item(
          v-for="o in options"
          :key="o.name"
          @click="routerPush(o.routeName)"
        )
          v-list-item-title {{ o.text }}
</template>

