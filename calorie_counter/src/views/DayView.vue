<template>
  <div class="day-view">
    <h1>Calorie Tracker for {{ formattedDate }}</h1>
    <div class="date-buttons">
      <button
        v-for="(date, index) in weekDates"
        :key="index"
        @click="goToDate(date)"
      >
        {{ date }}
      </button>
    </div>
    <CalorieInput v-model="dailyCalories" />
    <AddFoodItem @add-food="addFoodItem" />
    <FoodList :items="currentDay.items" :dailyCalories="dailyCalories" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CalorieInput from '@/components/CalorieInput.vue';
import AddFoodItem from '@/components/AddFoodItem.vue';
import FoodList from '@/components/FoodList.vue';
import StorageService from '@/components/services/storageService';
import type { DayData } from '@/components/types/CalorieData';

export default defineComponent({
  name: 'DayView',
  components: { CalorieInput, AddFoodItem, FoodList },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const selectedDate = ref<string>(route.params.date as string || new Date().toISOString().split('T')[0]);
    const dailyCalories = ref(StorageService.getAppState().dailyCalories);
    const currentDay = ref<DayData>(StorageService.getDayData(selectedDate.value));

    // Форматированная дата для заголовка
    const formattedDate = computed(() => {
      return new Date(selectedDate.value).toLocaleDateString('en-US', { year: 'numeric', month: