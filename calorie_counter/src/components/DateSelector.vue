<template>
  <div class="date-selector">
    <label for="date-picker">Select Date:</label>
    <input id="date-picker" type="date" v-model="selectedDate" @change="updateDate" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'DateSelector',
  emits: ['date-change'],
  setup(_, { emit }) {
    const selectedDate = ref<string>(new Date().toISOString().split('T')[0]); // Текущая дата

    const updateDate = () => {
      emit('date-change', selectedDate.value);
    };

    return { selectedDate, updateDate };
  },
});
</script>

<style scoped>
.date-selector {
  margin-bottom: 1rem;
}
</style>