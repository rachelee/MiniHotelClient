'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngCookies',
    'ngRoute',
    'myApp.search',
    'myApp.view2',
    'myApp.check_in',
    'myApp.report'
]);

app.config(['$routeProvider', function($routeProvider) {
      $routeProvider.
          when('/signin', {
              templateUrl: 'signin.html',
          }).
          otherwise({redirectTo: '/search'});
}]);
app.controller('appCtrl', ['$cookies','$scope', function($cookies, $scope) {
        console.log($cookies.user);
        $scope.user={};
        $scope.user.username = $cookies.get("username");
        $scope.user.usertype = $cookies.get("usertype");
        $scope.isAgent=function(){
            return $cookies.get("usertype")==="agent";
        };
        $scope.isAdmin=function(){
            return $cookies.get("usertype")==="admin";
        };
        $scope.logout=function(){
            $cookies.remove("username");
            $cookies.remove("usertype");
        }
    }]
);

app.controller('SigninCtrl', ['$cookies','$scope','$http', '$location', function($cookies, $scope, $http, $location) {
        $scope.request={};
        $scope.signin=function(){
            console.log("Validating information...");
            $http({
                method: "GET",
                //url: 'http://localhost:8080/checkin',
                url:'session.json',
                params: $scope.request,
            })
            .success(function(data){
                $cookies.put("username", data.username);
                $cookies.put("usertype", data.usertype);
                $location.path('#search');
            });

        };

    }]

);

