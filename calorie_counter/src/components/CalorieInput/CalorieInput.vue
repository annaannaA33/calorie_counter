<template>
  <div class="calorie-input">
    <label for="daily-calories">Set Daily Calories:</label>
    <input
      id="daily-calories"
      type="number"
      v-model="calories"
      placeholder="e.g., 2000"
    />
    <button class="set-calorie-button" @click="emitCalories">Set</button>
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
.set-calorie-button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white !important;
  border: none;
  border-radius: 8%;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.set-calorie-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}
</style>
