<template>
<v-text-field
  :label="label"
  v-model="localValue"
  :disabled="disabled"
  :rules="[rules.required, rules.limit, rules.noRepeat]"
  :outlined="outlined"
/>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 25,
    },
    required: {
      type: Boolean,
      default: false,
    },
    noRepeat: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    rules: {
      required: v => {
        const a = this.required && !!v;
        const b = !this.required;
        const res = !(a && b) && (a || b);
        return res || 'Input is required';
      },
      limit: v => v.length <= this.limit || `Max ${this.limit} characters`,
      noRepeat: value => {
        return !this.noRepeat || value !== this.noRepeat || 'Text must not match';
      },
    },
  }),
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update:value', val);
      },
    },
    methods: {
      showInput() {
        this.$emit('update:disabled', false);
      },
    },
  },
};
</script>
