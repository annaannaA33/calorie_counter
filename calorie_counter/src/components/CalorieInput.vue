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
  emits: ['set-calories'],
  setup(_, { emit }) {
    const calories = ref<number | null>(null);

    const emitCalories = () => {
      if (calories.value !== null && calories.value > 0) {
        emit('set-calories', calories.value);
        calories.value = null;
      }
    };

    return { calories, emitCalories };
  },
});
</script>

<style></style>