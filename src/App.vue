<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import type {Ref} from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router'
import ErrorPopup from "@/components/modal/ErrorPopup.vue";
import {useAppStore} from '@/stores/appStore';
import {useUsersStore} from '@/stores/usersStore';

const messages: Ref<Array<any>> = ref([]);
const appStore: any =  useAppStore()
const usersStore:any = useUsersStore()
const router = useRouter();
const route = useRoute()

// errorMessage
// const auth =  mapActions(store,['AUTH'])

// ---------------
  // sockets: {
  //   connect() {
  //     // Fired when the socket connects.
  //     console.log("Fired when the socket connects.");
  //   },

  //   blal: function(res) {
  //     console.log("blal", res);
  //   },
  //   JoinedRoom: function(res) {
  //     console.log("res-JoinedRoom", res);
  //   },
  //   fromBack: () => {
  //     this.$socket.on("fromBack", message => {
  //       console.log("fromBack", message);
  //       // this.receivedMessage(message)
  //     });
  //   }
  // },
  // ---------------------
  // methods: {
  //   ...mapActions({ auth: "AUTH" }),
  //   ...mapMutations({
  //     setError: "SET_ERROR",
  //     addMessage: "CREATE_MESSAGE"
  //   }),
  // },

  // computed: {
  //   ...mapState(["error", "errorMessage"]),
  //
  // };

  const showError = computed({
    get() {
      if(route.name === 'login' || route.name === 'signup') {
        return false;
      }
      return appStore.error;
    },
    set(val) {

      appStore.setError(val);
    }
  });

  onMounted(() =>{
    router.push({ name: "dashboard" })
    if (usersStore.AUTH()) router.push({ name: "dashboard" })
  });

  // onUnmounted(() => sockets.unsubscribe("JoinedRoom"))

</script>

<template lang="pug">
RouterView
ErrorPopup(
  :error.sync="showError"
  :errorMessage="appStore.errorMessage"
)
</template>

<style>
* {
    box-sizing: border-box;
}
html {
    overflow: hidden !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

html::-webkit-scrollbar {
    width: 0;
    height: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    max-height: 100vh;

    /* margin-top: 60px; */
}
</style>
