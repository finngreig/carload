<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { getGridPower } from "../model/transpower";
import { getPowerForAreas, getTotalPower } from "../model/chargenet";
import PowerGauge from "../components/PowerGauge.vue";
import PowerStat from "../components/PowerStat.vue";
import AreaList from "../components/AreaList.vue";

const gridMw = ref(-1);
const chargerAreas = ref([]);
const chargerMw = ref(-1);

onMounted(async () => {
  gridMw.value = await getGridPower();
  chargerAreas.value = await getPowerForAreas();
  chargerMw.value = await getTotalPower();
});
</script>

<template>
  <div class="w3-container">
    <div class="w3-row">
      <div class="w3-third w3-container w3-center">
        <h1>Grid Load</h1>
        <PowerGauge :value="parseFloat(gridMw.toFixed(2))" showValue />
      </div>
      <div class="w3-third w3-container w3-center">
        <h1>Charger Load</h1>
        <PowerGauge :value="parseFloat(chargerMw.toFixed(2))" showValue />
      </div>
      <div class="w3-third w3-container w3-center">
        <h1>Percentage of Grid Load</h1>
        <PowerStat :value="((chargerMw / gridMw) * 100).toFixed(2) + '%'" />
      </div>
    </div>
    <div class="w3-row">
      <AreaList :areas="chargerAreas" />
    </div>
  </div>
</template>
