<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <date-filter-component/>
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component/>
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
import DateFilterComponent from "../components/vue-components/date-filter.vue";
export default {
  name: "AboutPageComponent",
  components: {
    DateFilterComponent,
    PerformanceChartComponent
  }
};
</script>
