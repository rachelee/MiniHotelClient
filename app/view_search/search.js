'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'view_search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$cookies','$scope','$http', function($cookies, $scope, $http) {
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
    };
    $scope.print = function(){
        console.log($scope.rooms);
    };
    $scope.reserve=function() {
        console.log("Saving information...")
        console.log($scope.rooms);
        var roomsToReserve = [];
        for (var i = 0; i < $scope.rooms.length; i++) {
            if ($scope.rooms[i].chosen === true) {
                roomsToReserve.push($scope.rooms[i]);
            }
        }
        if (roomsToReserve.count === 0) {
            console.log("No room selected");
        }
        else {
            $cookies.put("reserve", roomsToReserve);
            console.log(roomsToReserve);
        }
    };

}]);