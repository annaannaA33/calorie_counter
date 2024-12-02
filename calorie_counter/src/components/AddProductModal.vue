<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
    <div class="modal-content">
      <h2>Add Product</h2>
      <AddFoodItem @add-food="handleAddFood" />
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AddFoodItem from '@/components/AddFoodItem.vue'

export default defineComponent({
  name: 'AddProductModal',
  components: { AddFoodItem },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'add-food'],
  setup(_, { emit }) {
    const closeModal = () => emit('close')

    const handleAddFood = (foodItem: { name: string; grams: number; calories: number }) => {
      emit('add-food', foodItem)
      closeModal()
    }

    return { closeModal, handleAddFood }
  },
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}
</style>