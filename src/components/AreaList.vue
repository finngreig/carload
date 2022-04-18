<script setup>
const props = defineProps({
  areas: Array,
});
</script>

<template>
  <div>
    <h1>Usage by Area</h1>
    <ul class="w3-ul">
      <li v-for="area in areas" :key="area.name" class="w3-bar">
        <span class="w3-bar-item">{{ area.name }}</span>
        <span class="w3-bar-item w3-right">{{ area.power.toFixed(2) }} MW</span>
      </li>
    </ul>
  </div>
</template>