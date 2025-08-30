<script setup>
import { computed, ref } from "vue";
import VueTableRow from "./vue-table-row.vue";

const props = defineProps({
  list: {
    // carInterface[]
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:value"]);
// Массив id выбранных строк
const selectedIds = ref([]);
// Массив id машин, которые выбраны
const showColorSelectedIds = computed(() => {
  const uniqueAuto = props.list
    .filter((item) => selectedIds.value.includes(item.id))
    .reduce((prev, item) => {
      prev[`${item.brand.id}-${item.model.id}`] = true;
      return prev;
    }, {});
  return props.list
    .filter((item) => uniqueAuto[`${item.brand.id}-${item.model.id}`])
    .map((item) => item.id);
});

/**
 * Выбор строки
 * @param itemId carInterface["id"]
 */
function selectRow(itemId) {
  selectedIds.value.includes(itemId)
    ? (selectedIds.value = selectedIds.value.filter((item) => item !== itemId))
    : selectedIds.value.push(itemId);
}
</script>
<template>
  <VueTableRow
    v-for="item in list"
    :value="item"
    :key="item.id"
    :isSelected="showColorSelectedIds.includes(item.id)"
    @update:selected="selectRow"
  />
</template>
