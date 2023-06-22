<script>
export default {
  name: "RoomsListComponent",
  props: ["rooms"],
};
</script>

<template lang="pug">
v-tabs
  v-tab(
    v-for="room of rooms"
    :key="room.name"
    @click="$emit('changeRoom',room)"
  )  {{room.name}}
</template>



