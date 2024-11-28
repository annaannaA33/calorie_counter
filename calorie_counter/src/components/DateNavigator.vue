<template>
  <div class="date-navigator">
    <button
      v-for="(date, index) in upcomingDates"
      :key="index"
      @click="navigateToDate(date)"
    >
      {{ formatDate(date) }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DateNavigator',
  setup() {
    const router = useRouter();

    // Генерация ближайших 7 дней
    const upcomingDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date.toISOString().split('T')[0];
    });

    // Форматирование даты для кнопок
    const formatDate = (date: string) => {
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
      return new Date(date).toLocaleDateString('en-US', options);
    };

    // Навигация по выбранной дате
    const navigateToDate = (date: string) => {
      router.push({ name: 'day', params: { date } });
    };

    return { upcomingDates, formatDate, navigateToDate };
  },
});
</script>

<style scoped>
.date-navigator {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
}

button:hover {
  background: #e0e0e0;
}
</style>
