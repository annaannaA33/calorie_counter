import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AddProductModal from '@/components/AddProductModal.vue'

describe('AddProductModal', () => {
  it('renders when isOpen is true', () => {
    const wrapper = mount(AddProductModal, {
      props: { isOpen: true },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
  })

  it('does not render when isOpen is false', () => {
    const wrapper = mount(AddProductModal, {
      props: { isOpen: false },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })
})
