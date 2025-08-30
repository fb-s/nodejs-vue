<script setup>
const props = defineProps({
  list: {
    // список элементов {id: number, name: string}
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:value"]);

const onValueChanged = (e) => {
  emit("update:value", e.target.value);
};
</script>
<template>
  <select @change="onValueChanged">
    <option :value="null">---</option>
    <option v-for="item in list" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>
<style scoped>
select {
  margin: 5px;
  padding: 5px;
  min-width: 150px;
}
</style>
