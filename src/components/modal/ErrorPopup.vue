<script setup lang="ts">
import { computed,defineProps,defineEmits } from "vue";

const props = defineProps<{
  error: Boolean,
  errorMessage: Number
}>()

const emit = defineEmits<{
  (e: 'error', value: Boolean): void
}>()

const close = computed({
  get() {
    return props.error;
  },
  set() {
    emit('error', false);
  }
})
const closePopup = () => { close.value = false }

</script>

<template lang="pug">
.error-wrap(
  v-if="error"
  @click="closePopup"
)
  v-card
    v-toolbar(color="#bd0a2e" dark) Error
    v-card-text
      .text-h2.pa-12 {{ errorMessage }}
</template>


<style scoped>
.error-wrap {
  width: 300px;
  position: absolute;
  left: calc(50% - 150px);
  top: calc(50% - 100px);
}
</style>
