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
		// SELF = THIS 
		const self = this;
		//NEW OBJECT
		this.settings = {
			user : "Harold Grey",
			quizId : "",
			quizTitle : "Elements",
			quizItems : ["Earth","Wind","Fire"],
			quizInvitees : ["Tom","Bob","Sue",],
			shuffledQuizItems : [],
			quizListIsShuffled : false,
			counter : 0,
		} // end this.settings
		this.getNextCorrectAnswer = function () {
				const nextCorrectAnswer = self.settings.quizItems[self.settings.counter]
				return nextCorrectAnswer 
		}
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
		// NEW METHOD
		this.checkAnswer = function () {
			const clickedItem = event.target; // try with const
			let selectedAnswer = clickedItem.innerText;
			let correctAnswer = self.getNextCorrectAnswer()
			if (selectedAnswer === correctAnswer) {
				clickedItem.style.display = "none";
				self.settings.counter++
			} else {
				alert("wrong")
			} // end if else
		} // end this.checkAnswer
		// NEW METHOD
		this.sendInvite = function () {
			const sharedGame = self.settings;
			funsifyDatabase.collection("games")
			.add(sharedGame)
			.then(function(docRef) {
				alert(`Document written with ID: ${docRef.id}`)
				self.settings.quizId = docRef.id
				self.updateQuizId()  // in firestore
				self.updateGameIds() // in firestore
			}) // end then
			.catch(function(error) {
				alert(`Error adding document: ${error}`); 
			}); // end catch	
		} // end this.sendInvite
		// NEW METHOD
		this.updateQuizId = function () {
			funsifyDatabase.collection("games").doc(self.settings.quizId)
			.update({quizId: self.settings.quizId }) 
			.then(function() {
				alert("Document successfully updated!"); 
			}) // end then
			.catch(function(error) {
			// The document probably doesn't exist.
					alert(`Error updating document: ${error}`) 
			}) // end catch
		} // end this.updateQuizId
			// NEW METHOD
		this.updateGameIds = function () {
			funsifyDatabase.collection("unique")
			.doc("gameIds")
			.update({gameId: self.settings.quizId, host: self.settings.user }) 
			.then(function() {
				alert("Document successfully updated!"); 
			}) // end then
			.catch(function(error) {
			// The document probably doesn't exist.
					alert(`Error updating document: ${error}`) 
			}) // end catch
		} // end this.updateQuizId
		// NEW METHOD
		this.listenForInvites = function () {
			funsifyDatabase.collection("unique")
			.doc("gameIds")
			.onSnapshot(function(doc) { 
				alert("Listening for invites")
				alert(`${ doc.data().host} has inivted you to play game ${doc.data().gameId}`); 
			}); // end onSnapshot
		} // end this.listenForInvites
}); // end service		
		
		




