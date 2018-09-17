const app = angular.module('funsifyApp', [
'firebase',
'ngRoute',
'quizItemsView',
'listOfQuizesToChooseFrom',
'newList',
'challengers',
])

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "VIEW/main.html"
    })
    .when("/quiz", {
        templateUrl : "VIEW/quiz.html"
    })
    .when("/new-list-title", {
        templateUrl : "VIEW/new-list-title.html"
    })
    .when("/new-list", {
        templateUrl : "VIEW/new-list.html"
    })
    .when("/challengers-list", {
        templateUrl : "VIEW/challengers-list.html"
    });
}); 

app.service('game', function($location) { 
		// SELF = THIS 
		const self = this;

		// NEW METHOD
		// listenForInvites
		this.listenForInvites = function () {
			self.dbRef.games.on('value', function(data) { 
					alert("Listening for invites")
			}); // end gameRef.on
		} // end this.listenForInvites
		
		this.shuffleQuizList = function (quizList) {
			const copiedQuizListItems = angular.copy(self.settings.quizItems)
			self.settings.shuffledQuizItems = copiedQuizListItems.sort(function() { 
				return 0.5 - Math.random() 
				}); // end sort
				self.settings.quizListIsShuffled = true;
		} // end this.shuffleQuizList

		this.getNextCorrectAnswer = function () {
//				const nextCorrectAnswer = self.settings.quizItems[self.settings.counter]
	//			return nextCorrectAnswer 
		}
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
}); // end service here



// NEW SERVICE
app.service('funsify', function($location) { 
		// SELF = THIS
		const self = this;
		// user
		this.user = "Fred Smith"
		// NEW METHOD 
		// currentGame Object (Default is Planets)
		this.currentGame = {}
		this.currentGame.title = "Planets";
		this.currentGame.items = ["Mercury", "Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"]
		// firebase database
		this.db = new Firebase("https://funsify-b5b13.firebaseio.com")
		this.usersRef = this.db.child("users");
		this.listsRef = this.db.child("lists"); 
		this.gamesRef = this.db.child("games");
		this.challengesRef = this.db.child("challenges");
		this.challengeRef = this.challengesRef.child(this.user);
		this.gameRef = this.gamesRef.child(this.user);
		// NEW METHOD
		this.updateCurrentGame = function(title) {
			const listRef = self.listsRef.child(title);
			listRef.on("value", function(data) {
				self.currentGame.title = title;
			 	self.currentGame.items = data.val().listItems;
			 	self.uploadGame();
				$location.path("/quiz");
			}); // end listRef.on
		} // end getQuiz
		// NEW METHOD
		this.uploadGame = function() {
			this.gameRef.set(this.currentGame)
		}
		this.issueChallenge = function () {
			self.challengeRef.set({opponents:["Mary","Mike","Molly"], 
														title: this.currentGame.title
			})// end self.challengeRef
		}		
}); // end service here	, 