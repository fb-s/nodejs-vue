<script setup>
import { ref } from "vue";
import { useCar } from "../store/car";
import ModelSelector from "./model-selector.vue";
import BrandSelector from "./brand-selector.vue";
import StoreSelector from "./store-selector.vue";

const emit = defineEmits(["save"]);
const { createCurrent } = useCar();
const newItem = ref(createCurrent());

// Если бренд сменился, то сбрасываем модель
// brand: brandInterface
const changeBrand = (brand) => {
  newItem.value.brand = brand;
  newItem.value.model = null;
}
</script>
<template>
  <div class="row">
    <div><BrandSelector @update:value="changeBrand" /></div>
    <div><ModelSelector @update:value="newItem.model = $event" :brandId="newItem.brand?.id" /></div>
    <div><StoreSelector @update:value="newItem.store = $event" /></div>
    <div><input type="number" v-model="newItem.price" /></div>
    <div>
      <button @click="emit('save', newItem)">Добавить</button>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  margin-bottom: 5px;
}

input, button {
  margin: 5px;
  padding: 5px;
}
</style>
