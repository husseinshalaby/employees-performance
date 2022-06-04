<template>
  <div class="c-chart__container">
    <h1 v-if="loading">Loading...</h1>
    <h1 v-else-if="!loading && error">{{error}}</h1>
    <h1 v-else-if="!loading && chartData.length === 0 && !error">No Data</h1>
    <v-chart ref="chart" :option="chartOptions" v-else/>
  </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import store from "../../store/index.js";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent
]);

export default {
  name: "PerformanceChartComponent",
  components: {
    VChart
  },
  mounted() {
    this.getChartData();
  },
  computed: {
    chartData() {
      let data =
        store.getters.getFilteredChartData.length > 0 ||
        store.getters.getFiltered === true
          ? store.getters.getFilteredChartData
          : store.getters.getChartData;
      return data;
    },
    loading() {
      return store.getters.getLoading;
    },
    error() {
      return store.getters.getError;
    },
    initOptions() {
      return {
        width: "auto",
        height: "300px"
      };
    },
    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return `${params.name}
            <br/><span style=background:${
              params.color
            };display:inline-block;width:10px;height:10px;border-radius:50%;></span> Team Performance Index: ${
              params.data
            }%`;
          },
          transitionDuration: 0,
          extraCssText: "text-align: center;",
          confine: false,
          hideDelay: 0,
          padding: [15, 50],
          backgroundColor: "#000",
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 11
          }
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true }
        },
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "red"
            },
            {
              gt: 50,
              lte: 80,
              color: "yellow"
            },
            {
              gt: 80,
              color: "green"
            }
          ]
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2
            }
          }
        ]
      };
    },
    xAxisData() {
      return this.chartData.map(item => this.formatDate(item.date_ms));
    },
    yAxisData() {
      return this.chartData.map(item => +item.performance * 100);
    }
  },
  methods: {
    getChartData() {
      store.dispatch("getChartData");
    },
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    }
  }
};
</script>