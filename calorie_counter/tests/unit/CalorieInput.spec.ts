import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CalorieInput from '@/components/CalorieInput.vue'

describe('CalorieInput', () => {
  it('emits update:modelValue with correct value', async () => {
    const wrapper = mount(CalorieInput, {
      props: {
        modelValue: 1500, // Initialization with values
      },
    })
    const input = wrapper.find('input')
    await input.setValue('2000') // Set the value to input
    await wrapper.find('button').trigger('click') // Press the button

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy() // Checking that the event is emitted
    expect(emitted?.[0]).toEqual([2000]) // Checking that the value is correct, with secure access
  })
})