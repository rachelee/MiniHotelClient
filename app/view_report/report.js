'use strict';

var app = angular.module('myApp.report', ['ngRoute', "ng-fusioncharts"]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/report', {
    templateUrl: 'view_report/report.html',
      controller: 'ReportCtrl'
  });
}]);

app.controller('ReportCtrl', ['$scope','$http', function($scope, $http) {
    $scope.hide = true;
    $scope.chosenDate=new Date();
    $scope.request = {};
    $scope.result={};
    $scope.dateType="NULL";

    $scope.result.chart={};
    $scope.result.chart.caption="Mini Hotel Daily Report";
    $scope.result.chart.theme="ocean";

    console.log($scope.result);

    $scope.chooseDate=function(){
      $scope.hide = false;
      $scope.request.date = $scope.chosenDate.getUTCMonth()+"/"+$scope.chosenDate.getUTCDay()+"/"+$scope.chosenDate.getUTCFullYear();
      $scope.result.chart.subCaption=$scope.request.date;
      console.log("Creating report...");
      $http({
        method: "GET",
        //url: 'http://localhost:8080/api/v1/reports/daily',
        url: 'view_report/report.json',
        //params: $scope.request,
      })
      .success(function(data){
          $scope.dateType=data.dateType;
          $scope.result.data=[];
          if(data.in_service !== "0"){
              var obj = {};
              obj.label="In service";
              obj.value = data.in_service;
              $scope.result.data.push(obj)
          }
          if(data.vacant !== "0"){
              var obj = {};
              obj.label="Vacant";
              obj.value = data.vacant;
              $scope.result.data.push(obj)
          }
          if(data.available !== "0"){
              var obj = {};
              obj.label="Available";
              obj.value = data.avaiable;
              $scope.result.data.push(obj)
          }
          if(data.under_reservation !== "0"){
              var obj = {};
              obj.label="Under reservation";
              obj.value = data.under_reservation;
              $scope.result.data.push(obj)
          }
          console.log($scope.result);
          //if($scope.dateType === "Past"){
          //    var obj = {};
          //    obj.label="In service";
          //    obj.value = data.num1;
          //    $scope.result.data.push(obj);
          //    obj={};
          //    obj.label="Vacant";
          //    obj.value = data.num2;
          //    $scope.result.data.push(obj);
          //}else if($scope.dateType === "Future"){
          //    var obj = {};
          //    obj.label="Under reservation";
          //    obj.value = data.num1;
          //    $scope.result.data.push(obj);
          //    obj={};
          //    obj.label="Available";
          //    obj.value = data.num2;
          //    $scope.result.data.push(obj);
          //}else if($scope.dateType === "Today"){
          //    var obj = {};
          //    obj.label="In service";
          //    obj.value = data.num1;
          //    $scope.result.data.push(obj);
          //    obj={};
          //    obj.label="Under reservation";
          //    obj.value = data.num2;
          //    $scope.result.data.push(obj);
          //    obj={};
          //    obj.label="Available";
          //    obj.value = data.num3;
          //    $scope.result.data.push(obj);
          //}

      });
    };
}]);


