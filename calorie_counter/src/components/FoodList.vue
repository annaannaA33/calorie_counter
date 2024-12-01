<template>
  <div class="food-list">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }} - {{ item.grams }}g ({{ item.calories }} cal)
      </li>
    </ul>

    <div class="summary">
      <h2>Total:</h2>
      <h2>{{ totalCalories }} / {{ dailyCalories }} cal</h2>
      <h2>Calories consumed: {{ totalCalories }} cal</h2>
      <h2>Calories left: {{ caloriesLeft }} cal</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'FoodList',
  props: {
    items: {
      type: Array,
      required: true,
    },
    dailyCalories: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const totalCalories = computed(() => props.items.reduce((sum, item) => sum + item.calories, 0))

    const caloriesLeft = computed(() => props.dailyCalories - totalCalories.value)

    return { totalCalories, caloriesLeft }
  },
})
</script>

<style>
.food-list {
  margin-top: 1rem;
}
.summary {
  margin-top: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0.5rem 0;
}
</style>
