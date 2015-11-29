'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'view_search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$cookies', '$scope', function($cookies, $scope) {
    $scope.user=$scope.cookies;

}]);