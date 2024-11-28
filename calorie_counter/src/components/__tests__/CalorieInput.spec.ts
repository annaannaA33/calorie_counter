import { mount } from '@vue/test-utils'
import CalorieInput from '@/components/CalorieInput.vue'

describe('CalorieInput', () => {
  it('emits set-calories with correct value', async () => {
    const wrapper = mount(CalorieInput)
    const input = wrapper.find('input')
    await input.setValue('2000')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('set-calories')).toBeTruthy()
    expect(wrapper.emitted('set-calories')[0]).toEqual([2000])
  })
})
