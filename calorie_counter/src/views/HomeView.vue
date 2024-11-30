<template>
  <div class="home-view">
    <!-- Date Selector component -->
    <DateSelector v-model="selectedDate" />
    <h1>Calorie Tracker for {{ formattedDate }}</h1>

    <!-- Daily calorie intake -->
    <div class="daily-calories">
      <p>Calorie Limit:: {{ dailyCalories }} cal</p>
      <button @click="editDailyCalories">Edit</button>
    </div>

    <!-- Remaining calories -->
    <div class="remaining-calories">
      <p>Calories Exceeded: {{ remainingCalories }} cal</p>
    </div>

    <CalorieInput v-model="dailyCalories" v-if="isEditingCalories" />
    <AddFoodItem @add-food="addFoodItem" />
    <FoodList :items="currentDay.items" :dailyCalories="dailyCalories" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
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
    //const router = useRouter()

    const selectedDate = ref(
      (route.params.date as string) || new Date().toISOString().split('T')[0],
    )
    const dailyCalories = ref(StorageService.getDailyCalories())
    const currentDay = ref<DayData>(StorageService.getDayData(selectedDate.value))
    const isEditingCalories = ref(false)

    watch(
      () => route.params.date,
      (newDate) => {
        if (newDate) {
          selectedDate.value = newDate as string
          currentDay.value = StorageService.getDayData(newDate as string)
        }
      },
    )

    
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
  margin: 2rem auto;
  max-width: 1200px;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.daily-calories, .remaining-calories {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.daily-calories p, .remaining-calories p {
  font-weight: bold;
}

.daily-calories button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.daily-calories button:hover {
  background-color: #45a049;
}

.remaining-calories p {
  font-size: 1.5rem;
  color: #FF5722; /* Red for remaining calories */
}

.remaining-calories {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remaining-calories .progress-bar {
  width: 70%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.remaining-calories .progress-bar div {
  height: 100%;
  width: 100%;
  background-color: #FF5722;
  transition: width 0.3s ease;
}

.remaining-calories .progress-bar-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.food-item {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.food-item p {
  margin: 0;
}

.food-item .food-name {
  font-weight: bold;
}

.food-item .food-calories {
  color: #4CAF50;
}

@media (max-width: 768px) {
  .home-view {
    padding: 1rem;
  }

  .remaining-calories p {
    font-size: 1.2rem;
  }

  .food-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .food-item .food-calories {
    margin-top: 0.5rem;
  }
}
</style>