<script setup>
import { onMounted, computed  } from "vue";
import { useModel } from "../store/model";
import UiSelector from "./ui-selector.vue";
import UiIsLoading from "./ui-is-loading.vue";

const props = defineProps({
  brandId: {
    // brandInterface[id]
    type: Number,
    default: null,
  },
});
const { state, load, isLoading } = useModel();
const emit = defineEmits(["update:value"]);

// Убираем модели, которые не относятся к выбранному бренду
const stateFiltered = computed(() => state.value.filter(item => item.brand_id === props.brandId));

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
    <div v-else>Выберите марку: <UiSelector :list="stateFiltered" @update:value="handleChange" /></div>
  </div>
</template>
