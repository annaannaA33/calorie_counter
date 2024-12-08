<template>
  <div class="home-view">
    <!-- Date Selector component -->
    <DateSelector v-model="selectedDate" />
    <h1>{{ formattedDate }}</h1>
    <!-- Daily calorie intake -->
    <div class="daily-calories">
      <p>Calorie Limit: {{ dailyCalories }} cal</p>
    </div>

    <!--Set daily calorie norm-->
    <div class="set-daily-norm">
      <button class="open-modal-button" @click="openDailyNormModal">Set Daily Calories</button>
    </div>

    <!-- Remaining calories -->
    <div class="remaining-calories">
      <p>Calories Exceeded: {{ remainingCalories }} cal</p>
    </div>

    <!-- Add item-->
    <button class="open-modal-button" @click="openAddProductModal">+</button>

    <!-- Modal for adding products -->
    <FoodList :items="currentDay.items" :dailyCalories="dailyCalories" />
  </div>

  <!-- Modals -->
  <AddProductModal
    :isOpen="isAddProductModalOpen"
    @close="closeAddProductModal"
    @add-food="addFoodItem"
  />
  <DailyNormModal
    :isOpen="isDailyNormModalOpen"
    @close="closeDailyNormModal"
    @set-daily-norm="updateDailyCalories"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import DateSelector from '@/components/DateSelector.vue'
import FoodList from '@/components/FoodList.vue'
import StorageService from '@/services/storageService'
import type { DayData } from '@/types/CalorieData'
import AddProductModal from '@/components/AddProductModal/AddProductModal.vue'
import DailyNormModal from '@/components/ DailyNorm/DailyNormModal.vue'
export default defineComponent({
  name: 'HomeView',

  components: { DateSelector, FoodList, AddProductModal, DailyNormModal },
  setup() {
    const route = useRoute()
    const selectedDate = ref(
      (route.params.date as string) || new Date().toISOString().split('T')[0],
    )
    const dailyCalories = ref(StorageService.getDailyCalories() || 2000)
    const currentDay = ref<DayData>(StorageService.getDayData(selectedDate.value))
    const isAddProductModalOpen = ref(false)
    const isDailyNormModalOpen = ref(false)

    // Monitor the date changes from the route
    watch(
      () => route.params.date,
      (newDate) => {
        if (newDate) {
          selectedDate.value = newDate as string
          currentDay.value = StorageService.getDayData(newDate as string)
        }
      },
    )
    // Monitor changes in the selected date
    watch(selectedDate, (newDate) => {
      if (newDate) {
        currentDay.value = StorageService.getDayData(newDate)
      }
    })
    // Computed properties
    const formattedDate = computed(() => {
      const date = new Date(selectedDate.value)
      return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
    })

    // Modal open/close functions
    const openAddProductModal = () => (isAddProductModalOpen.value = true)
    const closeAddProductModal = () => (isAddProductModalOpen.value = false)
    const openDailyNormModal = () => (isDailyNormModalOpen.value = true)
    const closeDailyNormModal = () => (isDailyNormModalOpen.value = false)

    // Update daily calories
    const updateDailyCalories = (newCalories: number) => {
      dailyCalories.value = newCalories
      StorageService.setDailyCalories(newCalories) // Save to storage
    }

    const addFoodItem = (foodItem: { name: string; grams: number; calories: number }) => {
      currentDay.value.items.push(foodItem)
      currentDay.value.totalCalories += foodItem.calories
      StorageService.saveDayData(currentDay.value)
    }

    // Calculation of remaining calories
    const remainingCalories = computed(() => {
      return dailyCalories.value - currentDay.value.totalCalories
    })

    return {
      selectedDate,
      dailyCalories,
      currentDay,
      isAddProductModalOpen,
      openAddProductModal,
      closeAddProductModal,
      isDailyNormModalOpen,
      openDailyNormModal,
      closeDailyNormModal,
      updateDailyCalories,
      addFoodItem,
      formattedDate,
      remainingCalories,
    }
  },
})
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  background-color: #f8fff9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  justify-content: center;
}

.daily-calories,
.remaining-calories {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.daily-calories p,
.remaining-calories p {
  font-weight: bold;
}

.daily-calories button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
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
  color: #000000;
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
  background-color: #ff5722;
  transition: width 0.3s ease;
}

.remaining-calories .progress-bar-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  font-size: 1.5rem;
}

.open-modal-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: #4caf50;
  color: white !important;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.open-modal-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .home-view {
    padding: 1rem;
    width: auto;
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
  .open-modal-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  .calories-output {
    animation: fade-in 0.5s ease-in-out;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
