<script setup></script>
<template>
  <div>Loading...</div>
</template>
<style scoped>
@keyframes pulse {
  0% {
    color: rgba(0, 0, 0, 0.1);
  }
  50% {
    color: rgba(0, 0, 0, 1);
  }
  100% {
    color: rgba(0, 0, 0, 0.1);
  }
}
div {
  animation: pulse 1s infinite;
}
</style>
