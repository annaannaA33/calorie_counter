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
import foodData from '../assets/foodData.json' // JSON с продуктами

export default defineComponent({
  name: 'AddFoodItem',
  emits: ['add-food'],
  setup(_, { emit }) {
    const foodName = ref('')
    const grams = ref<number | null>(null)
    const showSuggestions = ref(false)
    const filteredSuggestions = ref<string[]>([])

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
            name: productKey,
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input,
button {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

input:focus,
button:focus {
  outline: none;
  border-color: #007bff;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input::placeholder {
  color: #888;
}

button {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1e7121;
}

.suggestions-list {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  background: white;
  border: 1px solid #ccc;

  max-height: 150px;
  overflow-y: auto;
  border-radius: 4px;
  z-index: 10;
}

.suggestions-list li {
  padding: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.suggestions-list li:hover {
  background: #f0f0f0;
}

.add-food-item input,
.add-food-item button {
  transition:
    border-color 0.2s,
    background-color 0.2s;
}
</style>
