<script setup>
const props = defineProps({
  value: {
    // carInterface
    type: Object,
    default: null,
  },
  isSelected: {
    // Должна ли строк подсвечена
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:selected"]);
</script>
<template>
  <div class="row" :class="{ selected: isSelected }">
    <div>{{ value.brand.name }}</div>
    <div>{{ value.model.name }}</div>
    <div>
      <div>{{ value.store.name }}</div>
      <div class="small">{{ value.store.phones.join(", ") }}</div>
    </div>
    <div>{{ value.price }}</div>
    <div><input class="large" type="checkbox" @change="emit('update:selected', value.id)"></div>
  </div>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  margin-bottom: 5px;
}
.row > div {
  border: 1px solid black;
}

.large {
  transform: scale(1.5);
  margin: 10px;
}

.small {
    font-size: 0.7rem;
    color: gray;
}

.selected {
  background-color: yellow;
}
</style>
