<template>
  <div class="add-food-item">
    <input
      type="text"
      v-model="foodName"
      placeholder="Food name"
    />
    <input
      type="number"
      v-model="grams"
      placeholder="Grams"
    />
    <button @click="addFood">Add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AddFoodItem',
  emits: ['add-food'],
  setup(_, { emit }) {
    const foodName = ref('');
    const grams = ref<number | null>(null);

    const addFood = () => {
      if (foodName.value && grams.value && grams.value > 0) {
        emit('add-food', {
          name: foodName.value,
          grams: grams.value,
          calories: Math.round(grams.value * 2), // Пример: 2 калории за грамм.
        });
        foodName.value = '';
        grams.value = null;
      }
    };

    return { foodName, grams, addFood };
  },
});
</script>

<style>
.add-food-item {
  margin-bottom: 1rem;
}
</style>