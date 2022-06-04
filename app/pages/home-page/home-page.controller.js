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
  };

  this.handleGetMoreEmployees = function (number) {
    getMoreEmployees(number);
  };

  const homePageVm = this;
  homePageVm.employees = [];
  activate();

  function getMoreEmployees(number) {
    $rootScope.loading = true;
    setTimeout(()=>{
      Employees.loadMoreEmployees(number)
        .then(({ data }) => {
          $rootScope.users = data.employees;
          $rootScope.loading = false;
        })
    }, 50);
  }

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.pages = +data.pages;
        $location.url($location.path());
        $rootScope.loading = false;
      });
  }
}
