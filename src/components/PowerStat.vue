<script setup>
const props = defineProps({
  value: String,
});
</script>

<template>
  <div>
    <h2>{{ props.value }}</h2>
  </div>
</template>
