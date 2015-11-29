'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'view_search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope','$http', function($scope, $http) {
    $scope.request={};
    $scope.rooms=[];
    $scope.search=function(){
        console.log("Searching rooms...");
        $http({
            method: "GET",
            //url: 'http://localhost:8080/checkin',
            url:'view_search/rooms.json',
            params: $scope.request,
        })
        .success(function(data){
            $scope.rooms=data.rooms;
        });
    }

}]);