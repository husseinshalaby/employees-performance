angular
  .module('appModule')
  .controller('EmployeesListComponent', EmployeesListComponent)
  .filter('highlight', function ($sce, $location) {
    return function (text, phrase) {
      if (phrase) {
        text = text.replace(new RegExp(phrase, 'gi'), '<span class=c-users-list__hightlighted>$&</span>');
        $location.search('filter', phrase);
      }
      return $sce.trustAsHtml(text);
    };
  })
  .component('employeesList', {
    templateUrl: 'components/employees-list/employees-list.html',
    controller: EmployeesListComponent,
    controllerAs: 'EmployeesListComponentVm',
    bindings: {
      employeesList: '<',
    },
  });

function EmployeesListComponent($scope, $rootScope) {
  $rootScope.$watch('users', function (newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.search = $rootScope.searchText;
    }
  });
}
