<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CalculateCalories',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const gender = ref<'male' | 'female' | "I don't want to indicate">('male')
    const age = ref<number>(25)
    const weight = ref<number>(70)
    const height = ref<number>(170)
    const activityLevel = ref<number>(1.2)
    const goal = ref<'lose' | 'maintain' | 'gain'>('maintain')
    const calories = ref<number | null>(props.modelValue)

    //Method for calculating calories
    const calculateCalories = (): void => {
      let bmr: number

      // Mifflin-St. Geor Formula
      if (gender.value === 'female') {
        bmr = 655 + 9.6 * weight.value + 1.8 * height.value - 4.7 * age.value
      } else {
        bmr = 66 + 13.7 * weight.value + 5 * height.value - 6.8 * age.value
      }

      // Activity
      const tdee = bmr * activityLevel.value

      // Goals
      if (goal.value === 'lose') {
        calories.value = Math.round(tdee - 500)
      } else if (goal.value === 'gain') {
        calories.value = Math.round(tdee + 500)
      } else {
        calories.value = Math.round(tdee)
      }
    }
    // Listen for changes and send data to the parent
    watch(calories, (newCalories) => {
      if (newCalories !== null && newCalories > 0) {
        emit('update:modelValue', newCalories)
      }
    })

    return {
      gender,
      age,
      weight,
      height,
      activityLevel,
      goal,
      calories,
      calculateCalories,
    }
  },
})
</script>

<template>
  <div class="calculate-calories">
    <h2>Calculate Your Calorie Needs</h2>
    <form @submit.prevent="calculateCalories">
      <div>
        <label for="gender">Gender:</label>
        <select id="gender" v-model="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label for="age">Age:</label>
        <input type="number" id="age" v-model.number="age" placeholder="e.g., 25" />
      </div>
      <div>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" v-model.number="weight" placeholder="e.g., 70" />
      </div>
      <div>
        <label for="height">Height (cm):</label>
        <input type="number" id="height" v-model.number="height" placeholder="e.g., 170" />
      </div>
      <div>
        <label for="activity">Activity Level:</label>
        <select id="activity" v-model.number="activityLevel">
          <option :value="1.2">Sedentary</option>
          <option :value="1.375">Lightly Active</option>
          <option :value="1.55">Moderately Active</option>
          <option :value="1.725">Very Active</option>
          <option :value="1.9">Super Active</option>
        </select>
      </div>
      <div>
        <label for="goal">Goal:</label>
        <select id="goal" v-model="goal">
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </div>
      <button type="submit">Calculate</button>
    </form>
    <div v-if="calories !== null">
      <h3>Your Daily Calorie Needs: {{ calories }} cal</h3>
    </div>
  </div>
</template>

<style scoped>
.calculate-calories {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
}
form div {
  margin-bottom: 1rem;
}
button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
select {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}
select:focus {
  border-color: #4caf50;
  outline: none;
}
</style>
