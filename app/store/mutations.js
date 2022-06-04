export const SET_CHART_DATA = (state, chartData) => {
  state.chartData = chartData;
};

export const SET_FILTERED_CHART_DATA = (state, filteredChartData) => {
  state.filteredChartData = filteredChartData;
  state.filtered = true;
};

export const SET_LOADING = (state, loading) => {
  state.loading = loading;
};

export const SET_ERROR = (state, error) => {
  state.error = error;
};
