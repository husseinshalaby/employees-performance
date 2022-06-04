import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import PerformancePageComponent from './pages/performance-page.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import SearchComponent from './components/vue-components/search.vue';
import ButtonComponent from './components/vue-components/button.vue';
import NotFoundPageComponent from './pages/not-found-page.vue';
import DateFilterComponent from './components/vue-components/date-filter.vue';

angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
]);

angular.module('appModule').directive('vPerformancePage', (createVueComponent) => {
  return createVueComponent(Vue.component('performancePageComponent', PerformancePageComponent));
});

angular.module('appModule').directive('vPerformanceChart', (createVueComponent) => {
  return createVueComponent(Vue.component('performanceChartComponent', PerformanceChartComponent));
});

angular.module('appModule').directive('searchComponent', (createVueComponent) => {
  return createVueComponent(Vue.component('SearchComponent', SearchComponent));
});

angular.module('appModule').directive('buttonComponent', (createVueComponent) => {
  return createVueComponent(Vue.component('ButtonComponent', ButtonComponent));
});

angular.module('appModule').directive('vNotFoundPage', (createVueComponent) => {
  return createVueComponent(Vue.component('NotFoundPageComponent', NotFoundPageComponent));
});

angular.module('appModule').directive('vDateFilter', (createVueComponent) => {
  return createVueComponent(Vue.component('DateFilterComponent', DateFilterComponent));
});
