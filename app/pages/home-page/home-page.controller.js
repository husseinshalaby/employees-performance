angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees, $scope, $location, $rootScope) {
  this.handleSearchEvent = function (list, text) {
    $rootScope.users = list;
    $rootScope.searchText = text;
    $location.search('filter', text);
  };
  this.handleClearEvent = function () {
    $rootScope.searchText = '';
    $rootScope.users = $scope.originalList;
    $location.url($location.path());
  };
  this.handleSortEvent = function (list) {
    $rootScope.searchText = '';
    $rootScope.users = list;
    console.log('$rootScope.users', $rootScope.users);
  };

  const homePageVm = this;
  homePageVm.employees = [];
  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        $location.url($location.path());
      });
  }
}
