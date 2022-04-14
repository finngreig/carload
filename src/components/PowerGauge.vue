<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import { Gauge } from "gaugeJS";

const props = defineProps({
  value: Number,
  showValue: Boolean,
});

const gaugeEl = ref(null);
const gauge = ref(null);

onMounted(() => {
  console.log(gaugeEl);
  gauge.value = new Gauge(gaugeEl.value).setOptions({ fontSize: 41 }); // create sexy gauge!
  gauge.value.maxValue = 15000; // set max gauge value
  gauge.value.setMinValue(0); // set min value
  gauge.value.set(props.value); // set actual value
});

watch(
  () => props.value,
  (selection) => {
    gauge.value.set(selection);
  }
);
</script>

<template>
  <div>
    <h2 v-if="props.showValue">{{ props.value }} MW</h2>
    <canvas ref="gaugeEl"></canvas>
  </div>
</template>
