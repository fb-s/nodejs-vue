<script setup>
import { onMounted } from "vue";
import { useCar } from "./store/car";

import UiIsLoading from "./components/ui-is-loading.vue";
import VueTable from "./components/vue-table.vue";
import VueAddTableRow from "./components/vue-add-table-row.vue";

const { state, isLoading, error, load, save } = useCar();

onMounted(() => {
  load();
});
</script>
<template>
  <div>
    <div class="header">
      <UiIsLoading v-if="isLoading" />
      <div v-if="error" class="error">{{ error }}</div>
    </div>
    <div v-if="state.length">
      <VueAddTableRow @save="save" />
      <VueTable :list="state" />
    </div>
  </div>
</template>
<style scoped>
.header {
  height: 50px;
}
.error {
  color: red;
}
</style>
