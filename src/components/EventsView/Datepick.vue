<template>
  <datepicker v-model="picked" />
</template>

<script>
import Datepicker from "vue3-datepicker";
import { computed } from "vue";

export default {
  components: {
    Datepicker,
  },
  props: ['modelValue'],
  setup(props, { emit }) {

   const picked = computed({ 
      get: () => new Date(props.modelValue), 
      set: (value) => emit('update:modelValue', value.toISOString()) 
    }) 

    return { picked };
  },
};
</script>
