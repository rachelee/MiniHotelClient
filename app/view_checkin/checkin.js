'use strict';

var app = angular.module('myApp.check_in', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkin', {
    templateUrl: 'view_checkin/checkin.html',
    controller: 'CheckInCtrl'
  });
}])

app.controller('CheckInCtrl', ['$scope','$http', function($scope, $http) {
    $scope.reservation={};
    $scope.result={};
    $scope.result.checkedIn=true;

    $scope.checkIn=function(){
      console.log("Sending reservation number...");
      $http({
        method: "POST",
        url: 'http://localhost:8080/checkin',
        data: $scope.reservation,
        headers: {
          "Content-Type": "application/json"
        }
      })
          .success(function(data){
            console.log(data);
            $scope.result=data;
          });
      $scope.reservation={};
    };
}]);