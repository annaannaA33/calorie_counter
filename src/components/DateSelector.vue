<template>
  <div class="date-selector">
    <label for="date-picker">Select Date:</label>
    <input id="date-picker" type="date" :value="modelValue" @input="updateDate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DateSelector',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateDate = (event: Event) => {
      const input = event.target as HTMLInputElement;
      emit('update:modelValue', input.value);
    };

    return { updateDate };
  },
});
</script>

<style scoped>
.date-selector {
  margin-bottom: 1rem;
}
</style>
