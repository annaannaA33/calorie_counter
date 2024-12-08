<script lang="ts">
import { defineComponent, ref } from 'vue'
import StorageService from '@/services/storageService'
import CalculateCalories from '@/components/CalculateCalories/CalculateCalories.vue'
import CalorieInput from '../CalorieInput/CalorieInput.vue'

export default defineComponent({
  name: 'DailyNormModal',
  components: { CalculateCalories, CalorieInput },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'set-daily-norm'],
  setup(_, { emit }) {
    const dailyCalories = ref(StorageService.getDailyCalories() || 2000)
    const isEditingCalories = ref(false)
    const isCalculatorVisible = ref(false)

    const closeDailyNormModal = () => {
      emit('close')
    }

    const saveDailyCalories = () => {
      if (dailyCalories.value > 0) {
        StorageService.setDailyCalories(dailyCalories.value) // Сохраняем в локальное хранилище
        emit('set-daily-norm', dailyCalories.value) // Уведомляем родителя
        closeDailyNormModal()
      } else {
        alert('Calorie limit must be greater than 0!')
      }
    }

    const editDailyCalories = () => {
      isEditingCalories.value = true
      isCalculatorVisible.value = false
    }

    const editCalculator = () => {
      isEditingCalories.value = false
      isCalculatorVisible.value = true
    }

    return {
      dailyCalories,
      isEditingCalories,
      isCalculatorVisible,
      closeDailyNormModal,
      saveDailyCalories,
      editDailyCalories,
      editCalculator,
    }
  },
})
</script>

<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal-content">
      <h2>Set Your Daily Calorie Limit</h2>
      <div class="daily-calories">
        <p>Calorie Limit: {{ dailyCalories }} cal</p>
        <button @click="editDailyCalories">Edit</button>
        <CalorieInput v-model="dailyCalories" v-if="isEditingCalories" />

        <p>or</p>
        <button @click="editCalculator">Calculate</button>
        <CalculateCalories v-if="isCalculatorVisible" v-model="dailyCalories" />
      </div>

      <div class="actions">
        <button @click="saveDailyCalories">Save</button>
        <button class="close-modal-button" @click="closeDailyNormModal">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}
.close-modal-button {
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

.close-modal-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
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
</style>
