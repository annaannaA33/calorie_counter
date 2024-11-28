export interface FoodItem {
  name: string
  grams: number
  calories: number
}

export interface DayData {
  date: string // Формат YYYY-MM-DD
  items: FoodItem[]
  totalCalories: number
}

export interface AppState {
  dailyCalories: number
  history: Record<string, DayData> // Ключ — дата, значение — данные за день
}
