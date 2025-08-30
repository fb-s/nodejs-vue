<script setup>
import { onMounted } from "vue";
import { useStore } from "../store/store";
import UiSelector from "./ui-selector.vue";
import UiIsLoading from "./ui-is-loading.vue";

const { state, load, isLoading } = useStore();
const emit = defineEmits(["update:value"]);

onMounted(() => {
  load();
});

// При изменении значения в селекторе, ищем в state выбранный элемент
const handleChange = (valueId) => {
  emit("update:value", state.value.find(item => item.id === +valueId))
}
</script>
<template>
  <div>
    <UiIsLoading v-if="isLoading" />
    <div v-else>Выберите магазин: <UiSelector :list="state" @update:value="handleChange" /></div>
  </div>
</template>
