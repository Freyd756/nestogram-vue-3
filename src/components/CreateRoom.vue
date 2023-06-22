<script setup lang="ts">
// import {mapActions} from 'vuex'
// name: "CreateRoomComponent",

import type { Ref } from "vue";
import { defineEmits, ref } from "vue";
import {mapActions} from "pinia";
import {useRoomsStore} from "@/stores/roomsStore";

interface INewRoom {
  name: String,
  password: String,
  isProtected: Boolean
};

const {IS_SHOW_CREATE_ROOM:closeCreateRoom} = useRoomsStore()

const name: Ref<String> = ref("");
const password: Ref<String> = ref("");
const isProtected: Ref<Boolean> = ref(false);

const emit = defineEmits<{
  (e: 'newRoom', value: INewRoom): void
}>();

const createRoomHandler = ():void =>{
  emit("newRoom", {
    name: name.value,
    password: password.value,
    isProtected: isProtected.value
  })
  name.value = "",
      password.value = "",
      isProtected.value = false
};

const closeRoomHandler = ():void =>{
  closeCreateRoom(false)
};

</script>
<template lang="pug">
v-app#inspire
  v-container(fluid fill-height)
    v-layout(align-center justify-center)
      v-flex(xs12 sm8 md4)
        v-card.elevation-12
          v-toolbar(dark color="primary")
            v-toolbar-title Create room
          v-card-text
            v-form
              v-text-field(
                prepend-icon="room"
                label="Room name"
                type="text"
                v-model="name"
              )
              v-text-field(
                prepend-icon="lock"
                name="password"
                label="Password"
                type="test"
                v-model="password"
              )
          v-card-actions
            v-spacer
            v-btn(
              color="primary"
              @click="createRoomHandler()"
            ) Create
            v-btn(
              color="red"
              @abort="closeRoomHandler()") Close
</template>

<style>
</style>
