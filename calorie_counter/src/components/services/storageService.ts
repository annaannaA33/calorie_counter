import { AppState, DayData, FoodItem } from '@/types/CalorieData'

const STORAGE_KEY = 'calorie_tracker_app'

export default class StorageService {
  static getAppState(): AppState {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data) as AppState
    }
    return {
      dailyCalories: 2000, // Значение по умолчанию
      history: {},
    }
  }

  static saveAppState(state: AppState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  static getDayData(date: string): DayData {
    const appState = this.getAppState()
    return appState.history[date] || { date, items: [], totalCalories: 0 }
  }

  static saveDayData(dayData: DayData): void {
    const appState = this.getAppState()
    appState.history[dayData.date] = dayData
    this.saveAppState(appState)
  }
}
