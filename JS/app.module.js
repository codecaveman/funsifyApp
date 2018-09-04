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


app.service('game', function($location, $timeout) { 
		
		const self = this;
		//NEW OBJECT
		this.settings = {
			quizTitle : "Elements",
			quizItems : ["Earth","Wind","Fire"],
			j : [],
			quizListIsShuffled : false,
		} // end this.settings
		// NEW METHOD
		this.updateQuizList = function(docName, collectionName) {
	  const self = this;
		this.$location = $location;
			funsifyDatabase.collection("lists")
				.doc(self.settings.quizTitle)
				.get()
				.then(function(doc) {
					if (doc.exists) {
					self.$location.path("/");
						self.settings.quizItems = doc.data().listItems;
					} else {
						alert("This list does not exist. Please choose another");
					} // end if else
				}) // end then
		}; // end this.updateQuizList
		// NEW METHOD
		this.shuffleQuizList = function (quizList) {
			const copiedQuizListItems = angular.copy(self.settings.quizItems)
			
			self.settings.shuffledQuizItems = copiedQuizListItems.sort(function() { 
				return 0.5 - Math.random() 
				}); // end sort
				
				self.settings.quizListIsShuffled = true;
				
		} // end this.shuffleQuizList
});



