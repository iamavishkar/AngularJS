//established angular app
var app = angular.module("app", ["ngRoute"]);

//routing
app.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl: "main.html",
        controller: "mainController"
    })
    .when("/table", {
        templateUrl: "table.html",
        controller: "tableController"
    })
    .when("/api", {
        templateUrl: "api.html",
        controller: "apiController"
    });
});

////  Controllers starts  ////

//main controller
app.controller("mainController", function($rootScope, $scope){
    $rootScope.pageTitle = "Home";
    $scope.banner_img = "assets/img/angularjs-banner.jpg";
    $scope.list = [
        {title: "Dynamic Table with Form", href: "#table"},
        {title: "Get IFSC details by API", href: "#api"}
    ];
});

//form and table controller
app.controller("tableController", function($rootScope, $scope){
    $rootScope.pageTitle = "Table";
    $scope.goBackUrl = "/";
    $scope.list = [];
    $scope.resetForm = function(){
        $scope.name = '';
        $scope.email = '';
        $scope.phone = '';
    }
    $scope.submitForm = function(){
        $scope.list.push({
            name: $scope.name, email: $scope.email, phone: $scope.phone
        });
        $scope.resetForm();
    }
});
