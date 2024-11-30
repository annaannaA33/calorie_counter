<template>
  <div class="app">
    <!-- Компонент навигации по датам -->
    <DateNavigator />
    <DateSelector @date-change="changeDate" />
    <!-- Контент загружается через роутинг -->
    <router-view />
  </div>
  <footer class="footer">
  <p>&copy; 2024 Calorie Tracker. All rights reserved.</p>
  <p>Designed with ❤️ for better health.</p>
</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DateNavigator from '@/components/DateNavigator.vue'

export default defineComponent({
  name: 'App',
  components: { DateNavigator },
  methods: {
    changeDate(newDate: string) {
      console.log('Selected date:', newDate)
    },
  },
})
</script>

<style scoped>
.app, footer {
  padding: 1rem;
}
</style>
