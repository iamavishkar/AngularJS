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
    $scope.listTable = [];
    $scope.resetForm = function(){
        $scope.name = '';
        $scope.email = '';
        $scope.phone = '';
    }
    $scope.submitForm = function(){
        if($scope.name == "" || $scope.email == "" || $scope.phone == ""){
            $scope.error = "All fields are mandatory";
        }else{
            $scope.listTable.push({
                name: $scope.name, email: $scope.email, phone: $scope.phone
            });
            $scope.resetForm();
        }
    }
});

//ifsc api
app.controller("apiController", function($rootScope, $scope, $http){
    $rootScope.pageTitle = "IFSC API";
    $scope.goBackUrl = "/";
    $scope.listApi = "";
    var url = "https://ifsc.razorpay.com/";
    //reset form
    $scope.resetForm = function(){
        $scope.ifsc = '';
    }
    //submit form
    $scope.submitForm = function(){
        if($scope.ifsc == ""){
            $scope.inputError = "IFSC Code cannot be blank";
        }else{
            $scope.listApi = "";
            $http.get(url+$scope.ifsc)
            .then(function(response){
                $scope.listApi = response.data;
            }, function(error){
                $scope.error = "Invalid IFSC Code";
            });
            $scope.resetForm();
        }
    }
});
