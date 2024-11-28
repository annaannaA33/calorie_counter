<template>
  <div class="home-view">
    <!-- Date Selector component -->
    <DateSelector v-model="selectedDate" />
    <h1>Calorie Tracker for {{ formattedDate }}</h1>

    <!-- Daily calorie intake -->
    <div class="daily-calories">
      <p>Daily Calorie Goal: {{ dailyCalories }} cal</p>
      <button @click="editDailyCalories">Edit</button>
    </div>

    <!-- Remaining calories -->
    <div class="remaining-calories">
      <p>Remaining Calories: {{ remainingCalories }} cal</p>
    </div>

    <CalorieInput v-model="dailyCalories" v-if="isEditingCalories" />
    <AddFoodItem @add-food="addFoodItem" />
    <FoodList :items="currentDay.items" :dailyCalories="dailyCalories" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DateSelector from '@/components/DateSelector.vue'
import CalorieInput from '@/components/CalorieInput.vue'
import AddFoodItem from '@/components/AddFoodItem.vue'
import FoodList from '@/components/FoodList.vue'
import StorageService from '@/components/services/storageService'
import type { DayData } from '@/components/types/CalorieData'

export default defineComponent({
  name: 'HomeView',
  components: { DateSelector, CalorieInput, AddFoodItem, FoodList },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const selectedDate = ref(
      (route.params.date as string) || new Date().toISOString().split('T')[0],
    )
    const dailyCalories = ref(StorageService.getDailyCalories())
    const currentDay = ref<DayData>(StorageService.getDayData(selectedDate.value))
    const isEditingCalories = ref(false) // Управление режимом редактирования

    watch(
      () => route.params.date,
      (newDate) => {
        if (newDate) {
          selectedDate.value = newDate as string
          currentDay.value = StorageService.getDayData(newDate as string)
        }
      },
    )

    // Режим редактирования дневной нормы калорий
    const editDailyCalories = () => {
      isEditingCalories.value = true
    }

    // Сохраняем дневную норму при её изменении
    watch(dailyCalories, (newCalories) => {
      if (!isEditingCalories.value) return
      if (newCalories && newCalories > 0) {
        StorageService.setDailyCalories(newCalories)
        isEditingCalories.value = false
      }
    })

    const addFoodItem = (foodItem: { name: string; grams: number; calories: number }) => {
      currentDay.value.items.push(foodItem)
      currentDay.value.totalCalories += foodItem.calories
      StorageService.saveDayData(currentDay.value)
    }

    const formattedDate = computed(() => {
      const date = new Date(selectedDate.value)
      return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
    })

    // Вычисление остатка калорий
    const remainingCalories = computed(() => {
      return dailyCalories.value - currentDay.value.totalCalories
    })

    return {
      selectedDate,
      dailyCalories,
      currentDay,
      isEditingCalories,
      editDailyCalories,
      addFoodItem,
      formattedDate,
      remainingCalories, // Возвращаем вычисляемое свойство
    }
  },
})
</script>

<style scoped>
.home-view {
  margin: 1rem 0;
}

.daily-calories {
  margin-bottom: 1rem;
}

.remaining-calories {
  margin-bottom: 1rem;
  font-weight: bold;
}
</style>
