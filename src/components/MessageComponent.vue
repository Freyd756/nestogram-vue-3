<script setup lang="ts">
  import type {Ref} from "vue";
  import {defineEmits, ref, defineProps} from "vue";

  const props = defineProps<{
    message: any,
    owner:string,
    id:number
  }>();

  const isEdit:Ref<boolean> = ref(false);
  const showMenu:Ref<boolean> = ref(false);
  const events:Ref<Array<{type:string}>> = ref([{ type: 'Edit' }, { type: 'Remove' }]);

  const emit = defineEmits<{
    (e: 'remove', value: number | string): void,
    (e: 'edit', value: {text:string, id: number | string}): void
  }>();

  const actionWithMessage = (type:string):void =>{
    isEdit.value = type === 'Edit' && Boolean(props.owner);
    if( type === 'Remove' && props.owner ) emit('remove', props.id);
  };

  const editMessage = ():void =>{
    emit('edit', { text: props.message.text, id: props.id });
    isEdit.value = false;
  };

</script>

<template lang="pug">
v-menu(
  v-model="showMenu"
  absolute
  offset-y
  style="max-width: 600px"
)
  template(
    v-slot:activator="{ on, attrs }"
  )
    div(
      v-bind="attrs"
      v-on="owner && !isEdit && on"
    )
      div.system(v-if="message.type === 'system'")
        p.text-xs-center {{ message.text }}
        hr
      div.wrap(v-else)
        div.message(
          :class="{ owner: owner }"
        )
          v-row
            div.mb-3.ml-3
              small
                strong {{ message.userName }}
          v-row.ma-3
            span.spanMessage(v-if="!isEdit") {{ message.text }}
            v-text-field(
              :keyup.enter="editMessage"
              dark
              v-else
              v-model="message.text"
            )
  v-list
    v-list-item(
      @click="actionWithMessage(item.type)"
      v-for="(item, index) in events"
      :key="item.type"
    )
      v-list-item-title {{ item.type }}
</template>



<style lang="scss" scoped>
.system {
  margin-bottom: 1rem;
  p {
    margin-bottom: 1rem;
  }
}
.spanMessage {
  word-wrap: break-word;
}
.wrap {
  display: flex;
  flex-direction: column;

  .message {
    padding: 1rem;
    width: 60%;
    margin: 0 1rem 1rem;
    box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
    border-radius: 4px;
    background: #e8e8e8;
    position: relative;
    p {
      margin-bottom: 0;
    }
  }
  .owner {
    background: #0592d2;
    color: #ffff;
    align-self: flex-end;
    box-shadow: 2px 2px 2px 0 rgba(84, 86, 240, 0.3);
  }
}
</style>
