const app = angular.module('funsifyApp', [
'firebase',
'ngRoute',
'quizItemsView',
'listOfQuizesToChooseFrom',
'newList',
])

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "VIEW/main.html"
    })
    .when("/new-list-title", {
        templateUrl : "VIEW/new-list-title.html"
    })
    .when("/new-list", {
        templateUrl : "VIEW/new-list.html"
    })
    .when("/list-of-quizes-page", {
        templateUrl : "VIEW/list-of-quizes-page.html"
    });
});


app.controller('funsifyController', function($scope) {
	$scope.name = "John";
	$scope.lastName = "Doe";
});

