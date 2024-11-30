<template>
  <div class="food-list">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }} - {{ item.grams }}g ({{ item.calories }} cal)
      </li>
    </ul>
    <h2>Total: {{ totalCalories }} / {{ dailyCalories }} cal</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

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
    const totalCalories = computed(() =>
      props.items.reduce((sum, item) => sum + item.calories, 0)
    );

    return { totalCalories };
  },
});
</script>

<style>
.food-list {
  margin-top: 1rem;
}
</style>