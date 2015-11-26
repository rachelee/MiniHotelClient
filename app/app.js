'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.check_in',
  'myApp.version'
]);

app.config(['$routeProvider', function($routeProvider) {
      $routeProvider.
          otherwise({redirectTo: '/view1'});
}]);

app.controller('appCtrl', ['$scope',function($scope) {
      $scope.User={};
      $scope.User.type="admin";
      console.log($scope.User.type);
      $scope.User.isAgent=function(){
        return $scope.User.type==="agent";
      };
      $scope.User.isAdmin=function(){
        return $scope.User.type==="admin";
      }
    }]

);
