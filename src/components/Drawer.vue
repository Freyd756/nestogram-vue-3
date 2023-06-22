<script setup lang="ts">
  import {defineProps, onMounted, ref} from "vue";
  import type {Ref} from 'vue';
  import type IIsTyping from "@/models/IIsTyping.d"

  const isTyping:Ref<IIsTyping> = ref({
    value: false,
    roomId: "",
    userName: ""
  });

  const props = defineProps<{
    users: any[],
    room: any,
  }>();

  const currentUser = (name:string):Boolean =>{
    const user = props.room?.members.find(
        (user:any) => user._id === isTyping.value.userId
    );
    return user.name === name;
  };

  const isTypingUser = ({name}):boolean =>{
      const isUserTyping = isTyping.value.value &&  name === isTyping.value.userName
      const inThisRoom = props.room?._id === isTyping.value?.roomId;
      return isUserTyping && inThisRoom && isTyping.value.value;
  }


  onMounted(() =>{
    sockets.subscribe("USER_TYPING_BACK", (payload:any) => {
      isTyping.value.value = payload.isTyping;
      isTyping.value.roomId = payload.roomId;
      isTyping.value.userName = props.room.members.find(
          (item:any) => item.userId === payload.userId
      )?.name;
    });
  })
</script>

<template lang="pug">
v-navigation-drawer(
  app
  mobile-breakpoint="700"
  width="250"
)
  v-card.mx-auto(
    elevation="0"
    max-width="500"
  )
    v-toolbar(
      color="light-blue accent-4"
      dark
    )
      v-toolbar-title Users
      v-spacer
    v-list(subheader)
      v-list-item(
        v-for="user in users"
        :key="user.name"
      )
        v-list-item-avatar
          v-img(
            :alt="`${user.name} avatar`"
            :src="user.avatar ? user.avatar : 'default_avatar.png'"
          )
        v-list-item-content(
          v-if="isTypingUser(user)"
        )
          v-list-item-title(
            style="color: grey"
            v-text="`${user.name} taping...`"
          )
        v-list-item-content(v-else)
          v-list-item-title(v-text="user.name")
        v-list-item-icon
          v-icon(:color="user.active ? 'deep-purple accent-4' : 'grey'")
            mdi-message-outline
</template>
