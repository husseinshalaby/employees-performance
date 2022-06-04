import axios from 'axios';

export const getChartData = ({ commit }) => {
  commit('SET_LOADING', true);
  commit('SET_ERROR', null);
  axios.get('https://fe-task.getsandbox.com/performance')
    .then(response =>{
      if (response.status === 200) {
        commit('SET_CHART_DATA', response.data);
        commit('SET_LOADING', false);
      } else {
        throw new Error('Sorry something went wrong!');
      }
    })
    .catch(error => {
      commit('SET_LOADING', false);
      commit('SET_ERROR', error.message);
    });
};
