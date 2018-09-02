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

app.service('FunDB', function() { 
	this.setUpGame = function (title) { 
			getDoc(title, "lists")
	.then(function(doc) {
		if (doc.exists) {
			 game.quizListItems = doc.data().listItems;
			 saveGameDetails();
		} else {
				alert("This list does not exist. Please choose another");
		} // end if else
	}) // end then ()
	.catch(function(error) {
		    alert("Error getting document:", error);
	}); // catch()
	} 
});






