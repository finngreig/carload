<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { getGridPower } from "../model/transpower";
import { getTotalChargerPower } from "../model/chargenet";
import PowerGauge from "../components/PowerGauge.vue";
import PowerStat from "../components/PowerStat.vue";

const gridMw = ref(-1);
const chargerMw = ref(-1);

onMounted(async () => {
  gridMw.value = await getGridPower();
  chargerMw.value = await getTotalChargerPower();
});
</script>

<template>
  <div class="w3-container">
    <div class="w3-row">
      <div class="w3-third w3-container w3-center">
        <h1>Grid Load</h1>
        <PowerGauge :value="gridMw" showValue />
      </div>
      <div class="w3-third w3-container w3-center">
        <h1>Charger Load</h1>
        <PowerGauge :value="chargerMw" showValue />
      </div>
      <div class="w3-third w3-container w3-center">
        <h1>Percentage of Grid Load</h1>
        <PowerStat :value="((chargerMw / gridMw) * 100).toFixed(2) + '%'" />
      </div>
    </div>
  </div>
</template>
