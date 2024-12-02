import { test, expect } from '@playwright/test'

test('Calorie Counter Date Selection Test', async ({ page }) => {
  // Open the home page with today's date
  await page.goto('http://localhost:5174/day/2024-12-01')

  // Setting a daily calorie limit
  await page.fill('#daily-calories', '2000')
  await page.click('button:has-text("Set")')

  // Adding a product for today's date
  await page.fill('input[placeholder="Food name"]', 'Apple')
  await page.fill('input[placeholder="Grams"]', '150')
  await page.click('button:has-text("Add")')

  // Checking that the product is displayed in the list
  const todayFoodItem = await page.locator('li').innerText()
  expect(todayFoodItem).toContain('Apple - 150g (78 cal)')

  // Moving to another date
  await page.click('button:has-text("Sun, Dec 6")')

  // Adding a product for a new date
  await page.fill('input[placeholder="Food name"]', 'Banana')
  await page.fill('input[placeholder="Grams"]', '120')
  await page.click('button:has-text("Add")')

  // Checking that the product for the new date is displayed
  const anotherDayFoodItem = await page.locator('li').innerText()
  expect(anotherDayFoodItem).toContain('Banana - 120g (107 cal)')

  // We return to today's date and check that the data has not changed
  await page.click('button:has-text("Today")')
  const backToTodayFoodItem = await page.locator('li').innerText()
  expect(backToTodayFoodItem).toContain('Apple - 150g (78 cal)')

  // Checking the total number of calories for today's date
  const todaySummary = await page.locator('.summary').innerText()
  expect(todaySummary).toContain('300 / 2000 cal')

  // Checking the total calories for another date
  await page.click('button:has-text("Sun, Dec 6")')
  const otherDaySummary = await page.locator('.summary').innerText()
  expect(otherDaySummary).toContain('107 / 2000 cal')
})