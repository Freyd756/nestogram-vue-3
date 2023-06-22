<script setup lang="ts">
  import {
    computed,
    defineEmits,
    defineProps,
    ref,
    watch,
    onUnmounted,
    onUpdated,
    onMounted,
    nextTick
  } from "vue";
  // import socket from '@/main'
  import type { Ref } from 'vue'
  import type IIsTyping from "@/models/IIsTyping.d"

  import MessageComponent from "@/components/MessageComponent.vue"


  const message:Ref<String> = ref("");
  const isTyping: Ref<IIsTyping> = ref({ value: false, userName: "", roomId: "" });

  const scrollToMe: Ref<HTMLElement | null> = ref(null);

  const props = defineProps<{
    messages: any,
    user: any,
    room:any
  }>();

  const emit = defineEmits<{
    (e: 'message', value: String): void
  }>();
  const createMess = ():void =>{
    if ( message.value.trim().length > 0 ) emit("message", message.value.trim());
    message.value = "";
  };
  const scrollToElement = ():void =>{
    const el = scrollToMe;
    if (el.value) {
      el.value.scrollTop = el.value.scrollHeight + 1000;
    }
  };
  const scrollToTop = ():void =>{
    const el = scrollToMe;
    if ( el.value) {
      el.value.scrollTop = 0;
    }
  };
  const  removeMessage = (id:string):void =>{
    // socket.emit("REMOVE_MESSAGE", id);
  };
  const editMessage = (payload:string):void =>{
    // socket.emit("EDIT_MESSAGE", payload);
  };

  const messagesByTheRoom = computed(() => props.messages[`${props.room._id}`]);
  const isCurrentRoom = computed(() => `${props.room._id}` === isTyping.value.roomId);

  watch(
    message,
    (newVal) => {
      if (newVal && newVal.length > 0) {
        // socket.emit("USER_TYPING", {
        //   isTyping: true,
        //   userId: props.user._id,
        //   roomId: props.room._id
        // });
        return;
      }
      // socket.emit("USER_TYPING", {
      //   isTyping: false,
      //   roomId: props.room._id,
      //   userId: props.user._id
      // });
      isTyping.value.value = false;
    },
    { immediate: true }
  );

  onMounted(() =>{
    // sockets.subscribe("USER_TYPING_BACK", (payload: any) => {
    //   isTyping.value.value = payload.isTyping;
    //   isTyping.value.roomId = payload.roomId;
    //   isTyping.value.userName = props.room.members.find(
    //       (item:any) => item.userId === payload.userId
    //   ).name;
    // });
  });

  onUpdated(() =>{
    nextTick(() => {
      const el = scrollToMe;
      if (el.value) {
        el.value.scrollTop = el.value.scrollHeight + 1000;
      }
    });
  });

  // onUnmounted(() =>{
  //   sockets.unsubscribe("USER_TYPING_BACK");
  // });
</script>

<template lang="pug">
.c-wrap
  div
    .c-chat(
      v-if="messages"
      ref="scrollToMe"
    )
      MessageComponent(
        v-for="m of messagesByTheRoom"
        :key="m._id"
        :id="m._id"
        :message="m"
        :owner="m.userId === user._id"
        @remove="removeMessage"
        @edit="editMessage"
      )
      div(style="height: 20px")
        span.taping(
          v-if="isTyping.value && isCurrentRoom"
        ) {{ isTyping.userName }} is typing...


  .c-input(
    v-on:keyup.enter="createMess"
  )
    .scrollBtns
      v-btn.toTop(
        icon
        @click="scrollToTop"
      ) Up
      v-btn.toDown(
        icon
        @click="scrollToElement"
      ) Down

    v-textarea.pb-3(
      label="Message"
      rows="2"
      outlined
      no-resize
      v-model="message"
    )
</template>



<style lang="scss" scoped>
.c-wrap {
  margin-top: 20px;
  max-height: 80vh;
}
.c-chat {
  position: relative;
  height: 69vh;
  overflow-y: scroll;
  padding-bottom: 10px;
  .taping {
    display: block;
    text-align: start;
    margin-left: 17px;
    bottom: 0;
  }
}
.c-input {
  padding: 5px;
  width: 100%;
  bottom: 0;
}
.scrollBtns {
  display: flex;
  justify-content: space-between;
  button {
    box-sizing: border-box;

    display: block;
    margin: 0 20px;
  }
}
</style>
