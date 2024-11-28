<template>
  <div id="app">
    <h1>Calorie Counter</h1>
    <CalorieInput @set-calories="setDailyCalories" />
    <AddFoodItem @add-food="addFoodItem" />
    <FoodList :items="foodItems" :dailyCalories="dailyCalories" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CalorieInput from '../src/components/CalorieInput.vue'
import AddFoodItem from '../src/components/AddFoodItem.vue'
import FoodList from '../src/components/FoodList.vue'

export default defineComponent({
  name: 'App',
  components: { CalorieInput, AddFoodItem, FoodList },
  setup() {
    const dailyCalories = ref(0)
    const foodItems = ref<{ name: string; grams: number; calories: number }[]>([])

    const setDailyCalories = (calories: number) => {
      dailyCalories.value = calories
    }

    const addFoodItem = (item: { name: string; grams: number; calories: number }) => {
      foodItems.value.push(item)
    }

    return { dailyCalories, foodItems, setDailyCalories, addFoodItem }
  },
})
</script>

<style src="./assets/main.css"></style>
