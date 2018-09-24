const app = angular.module('funsifyApp', [
'firebase',
'ngRoute',
'quizItemsView',
'listOfQuizesToChooseFrom',
'newList',
'challengers',
'login',
])

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "VIEW/main.html"
    })
    .when("/quiz", {
        templateUrl : "VIEW/quiz.html"
    })
    .when("/login", {
        templateUrl : "VIEW/login.html"
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
		this.listTitles = [];
		this.listSelected = "";
		this.user = "Stranger";
		// NEW METHOD 
		// firebase database
		this.db = new Firebase("https://funsify-b5b13.firebaseio.com")
		this.usersRef = this.db.child("users");
		this.listsRef = this.db.child("lists"); 
		this.gamesRef = this.db.child("games");
		this.challengersRef = this.db.child("challengers");
		this.gameRef = this.gamesRef.child(this.user);
		// NEW METHOD
		this.uploadGame = function(title) {
			const listRef = self.listsRef.child(title);
			listRef.once("value", function(data) {
				let game = {};
				game.title = title;
				game.items = data.val().listItems;
			 	self.gameRef.set(game)
			}); // end listRef.on
		} // end this.uploadGame
		// NEW METHOD
		
		this.issueChallenge = function () {
			
			self.challengerRef = self.challengersRef.child(self.user);
			self.challengerRef.set({opponents:["Mary","Mike","Molly"] 
									
			})// end self.challengeRef
		}		
}); // end service here	, 