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


app.service('game', function($location, $timeout ) { 
		// SELF = THIS 
		const self = this;
		//NEW OBJECT
		// dbRef
		this.dbRef = {
			lists : firestoreDatabase.collection("lists"),
			games : new Firebase("https://funsify-b5b13.firebaseio.com/games"),
		};
		//NEW OBJECT
		// currentQuiz
		this.currentQuiz = {};
		this.currentQuiz.id = "";
		this.currentQuiz.title = "Planets";
		this.currentQuiz.items = [];
		//NEW OBJECT
		// user
		this.user = {}
		this.user.name = "Bob Jones"
		// NEW METHOD
		// getQuiz 
		this.getQuiz = function(docId) {
			self.dbRef.lists
			.doc(docId)
			.get()
			.then(function(doc) {
				if (doc.exists) {
					self.currentQuiz.items = doc.data().listItems;
					$location.path("/");
				} else {
					alert("This list does not exist. Please choose another");
				} // end if else
			}) // end then
		} // end getQuiz
		// NEW METHOD
		// listenForInvites
		this.listenForInvites = function () {
			self.dbRef.games.on('value', function(data) { 
					alert("Listening for invites")
			}); // end gameRef.on
		} // end this.listenForInvites
		// NEW METHOD
		// listenForInvites
		this.uploadCurrentQuiz = function() {
			const timestamp = new Date().toGMTString()
			self.currentQuiz.id = self.user.name + "-" + timestamp;
			const gameRef = self.dbRef.games.child(self.currentQuiz.id)
			gameRef.set(self.currentQuiz);
		} // end uploadCurrentQuiz
		
		
		this.shuffleQuizList = function (quizList) {
			const copiedQuizListItems = angular.copy(self.settings.quizItems)
			self.settings.shuffledQuizItems = copiedQuizListItems.sort(function() { 
				return 0.5 - Math.random() 
				}); // end sort
				self.settings.quizListIsShuffled = true;
		} // end this.shuffleQuizList
		
		
		
		
		//NEW OBJECT
		this.settings = {
			user : "Harold Grey",
			quizId : "",
			
			quizInvitees : ["Tom","Bob","Sue",],
			shuffledQuizItems : [1,3,2],
			quizListIsShuffled : false,
			counter : 0,
			invitations : [],
			acceptedInvite : "",
		} // end this.settings
		this.getNextCorrectAnswer = function () {
				const nextCorrectAnswer = self.settings.quizItems[self.settings.counter]
				return nextCorrectAnswer 
		}
		
		// NEW METHOD
		
		// NEW METHOD
		this.checkAnswer = function () {
			let answerCorrect = false
			const clickedItem = event.target; // try with const
			let selectedAnswer = clickedItem.innerText;
			let correctAnswer = self.getNextCorrectAnswer()
			if (selectedAnswer === correctAnswer) {
				clickedItem.style.display = "none";
				self.settings.counter++
				answerCorrect = true
			} else {
				alert("wrong")
			} // end if else
			return answerCorrect;
		} // end this.checkAnswer
		
		
		
		// NEW METHOD
		this.updateQuizId = function () {
			firestoreDatabase.collection("games").doc(self.settings.quizId)
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
			firestoreDatabase.collection("unique")
			.doc("gameIds")
			.update({gameId: self.settings.quizId, host: self.settings.user }) 
			.then(function() {
				alert("Document successfully updated!"); 
			}) // end then
			.catch(function(error) {
			// The document probably doesn't exist.
					alert(`Error updating document: ${error}`) 
			}) // end catch
		} // end this.updateQuizId':
		

		
}); // end service here
		
		




