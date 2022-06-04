angular.module('appModule')
  .config(($locationProvider) => {
    $locationProvider.hashPrefix('');
  })
  .config(($stateProvider) => {
    $stateProvider
      .state({
        name: 'app',
        url: '/',
        templateUrl: './pages/home-page/home-page.html',
        controller: 'homeController',
        controllerAs: 'homePageVm',
      })
      .state({
        name: 'team-performance',
        url: '/team-performance',
        template: '<v-performance-page></v-performance-page>',
      })
      .state('noroute', {
        url: '*path',
        template: '<v-not-found-page></v-not-found-page>',
      });
  });
