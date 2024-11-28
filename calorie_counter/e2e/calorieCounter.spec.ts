import { test, expect } from '@playwright/test'

test('Calorie Counter E2E Test', async ({ page }) => {
  await page.goto('http://localhost:5173') // Замените URL на ваш.

  // Set daily calories

  await page.fill('#daily-calories', '2000')
  await page.click('button:has-text("Set")')

  // Add a product

  await page.fill('input[placeholder="Food name"]', 'Apple')
  await page.fill('input[placeholder="Grams"]', '150')
  await page.click('button:has-text("Add")')

  // Check product list

  const foodItem = await page.locator('li').innerText()
  expect(foodItem).toContain('Apple - 150g (300 cal)')

  // View total calories

  const total = await page.locator('p').innerText()
  expect(total).toContain('300 / 2000 cal')
})
