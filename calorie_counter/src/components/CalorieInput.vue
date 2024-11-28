<template>
  <div class="calorie-input">
    <label for="daily-calories">Set Daily Calories:</label>
    <input
      id="daily-calories"
      type="number"
      v-model="calories"
      placeholder="e.g., 2000"
    />
    <button @click="emitCalories">Set</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CalorieInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const calories = ref(props.modelValue);

    const emitCalories = () => {
      if (calories.value !== null && calories.value > 0) {
        emit('update:modelValue', calories.value);
      }
    };

    return { calories, emitCalories };
  },
});
</script>

<style scoped>
.calorie-input {
  margin-bottom: 1rem;
}
</style>
