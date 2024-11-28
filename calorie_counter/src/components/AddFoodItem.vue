<template>
  <div class="add-food-item">
    <input
      type="text"
      v-model="foodName"
      placeholder="Food name"
      @input="filterSuggestions"
      @focus="showSuggestions = true"
    />
    <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions-list">
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
    <input type="number" v-model="grams" placeholder="Grams" />
    <button @click="addFood">Add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import foodData from '../assets/foodData.json' // Ваш JSON с продуктами

export default defineComponent({
  name: 'AddFoodItem',
  emits: ['add-food'],
  setup(_, { emit }) {
    const foodName = ref('')
    const grams = ref<number | null>(null)
    const showSuggestions = ref(false)
    const filteredSuggestions = ref<string[]>([])

    // Метод фильтрации для автозаполнения
    const filterSuggestions = () => {
      const searchKey = foodName.value.toLowerCase().trim()
      if (searchKey.length > 0) {
        filteredSuggestions.value = Object.keys(foodData).filter((key) =>
          key.toLowerCase().startsWith(searchKey),
        )
      } else {
        filteredSuggestions.value = []
      }
    }

    // Выбор подсказки из выпадающего списка
    const selectSuggestion = (suggestion: string) => {
      foodName.value = suggestion
      showSuggestions.value = false
      filteredSuggestions.value = []
    }

    // Добавление продукта в список
    const addFood = () => {
      if (foodName.value && grams.value && grams.value > 0) {
        // Поиск калорийности продукта с учётом регистра
        const productKey = Object.keys(foodData).find(
          (key) => key.toLowerCase() === foodName.value.toLowerCase(),
        )

        if (productKey) {
          const caloriesPer100g = foodData[productKey]
          const calories = Math.round((caloriesPer100g * grams.value) / 100)

          emit('add-food', {
            name: productKey, // Используем оригинальное название из базы
            grams: grams.value,
            calories: calories,
          })

          // Очистка полей
          foodName.value = ''
          grams.value = null
        } else {
          alert('Product not found in the database')
        }
      } else {
        alert('Please enter valid food name and grams')
      }
    }

    return {
      foodName,
      grams,
      showSuggestions,
      filteredSuggestions,
      filterSuggestions,
      selectSuggestion,
      addFood,
    }
  },
})
</script>

<style scoped>
.add-food-item {
  margin-bottom: 1rem;
  position: relative;
}

.suggestions-list {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
}

.suggestions-list li {
  padding: 0.5rem;
  cursor: pointer;
}

.suggestions-list li:hover {
  background: #f0f0f0;
}
</style>
