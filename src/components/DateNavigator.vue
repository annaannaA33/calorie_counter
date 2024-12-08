<template>
  <div class="date-navigator">
    <button
      v-for="(date, index) in upcomingDates"
      :key="index"
      @click="navigateToDate(date)"
      :class="{ 'active': isSelectedDate(date), today: isToday(date) }"
    >
      {{ formatDate(date) }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'DateNavigator',
  setup() {
    const router = useRouter()
    const route = useRoute()

    // Generation of the closest 7 days
    const upcomingDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() + i)
      return date.toISOString().split('T')[0]
    })
    // Using ref for reactive selectedDate
    const selectedDate = ref(route.params.date || new Date().toISOString().split('T')[0])

    // Update selected date when route changes
    watch(
      () => route.params.date,
      (newDate) => {
        selectedDate.value = newDate || new Date().toISOString().split('T')[0]
      },
    )
    // Date formatting for buttons
    const formatDate = (date: string) => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }
      return new Date(date).toLocaleDateString('en-US', options)
    }

    // Navigation by selected date
    const navigateToDate = (date: string) => {
      router.push({ name: 'day', params: { date } })
    }
    // Check if the date is the selected one
    const isSelectedDate = (date: string) => {
      return date === selectedDate.value
    }

    // Check if the date is today's date
    const isToday = (date: string) => {
      const today = new Date().toISOString().split('T')[0]
      return date === today
    }

    return { upcomingDates, formatDate, navigateToDate, isSelectedDate, isToday }
  },
})
</script>

<style scoped>
.date-navigator {
  display: flex;
  gap: 1%;
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
button.active {
  border-color: green;
  box-shadow: 0 0 10px rgba(0, 128, 0, 0.5);
  background: #d9ffd9;
}

button.today {
  background: #4caf50;
  color: white;
  font-weight: bold;
}
@media (max-width: 768px) {
  .date-navigator {
    gap: 0.5rem;
  }

  button {
    padding: 0.3rem 0.4rem;
    font-size: 0.6rem; 
    max-width: 80%; 
  }
}
</style>
