<template>
  <div>
    <label for="start">
      Start Date:
      <input id="start" type="date" v-model="startDate">
    </label>
    <label for="end">
      End Date:
      <input id="end" type="date" v-model="endDate">
    </label>
    <h3>{{warning}}</h3>
  </div>
</template>

<script>
import store from "../../store/index.js";
export default {
  name: "DateFilterComponent",
  data() {
    return {
      startDate: "",
      endDate: "",
      warning: ""
    };
  },
  computed: {
    chartData() {
      return store.getters.getChartData;
    }
  },
  methods: {
    validateDate(dateOne, dateTwo) {
      if (dateOne > dateTwo) {
        this.warning = "End date should be after start date!";
        this.endDate = "";
      } else {
        this.warning = "";
      }
    },
    convertDate(date) {
      return Math.floor(new Date(date).getTime());
    },
    dateChecker(x, min, max) {
      if (x >= min && x <= max) {
        return true;
      }
    },
    filterChartData(data, dateOne, dateTwo) {
      const filteredChart = data.filter(point => {
        if (this.dateChecker(point["date_ms"], dateOne, dateTwo)) {
          return point;
        }
      });
      return filteredChart;
    }
  },
  watch: {
    endDate: function(value) {
      if (this.startDate != "") {
        this.validateDate(this.startDate, this.endDate);
      }
      if (this.warning === "") {
        store.commit(
          "SET_FILTERED_CHART_DATA",
          this.filterChartData(
            this.chartData,
            this.convertDate(this.startDate),
            this.convertDate(this.endDate)
          )
        );
      }
    }
  }
};
</script>