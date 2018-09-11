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
		this.user = {
			name : "David Smith",
		
		}
		//NEW OBJECT
		this.settings = {
			user : "Harold Grey",
			quizId : "",
			quizTitle : "Elements",
			quizItems : ["Earth","Wind","Fire"],
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
		this.updateQuizList = function(docName, collectionName) {
			
	  	const self = this;
			firestoreDatabase.collection("lists")
				.doc(self.settings.quizTitle)
				.get()
				.then(function(doc) {
			
					if (doc.exists) {
				
						self.settings.quizItems = doc.data().listItems;
							 $location.path("/");
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
		this.sendInvite = function () {
			const sharedGame = self.settings;
			
			
			// Firebase Version
			const ref = new Firebase("https://funsify-b5b13.firebaseio.com/");
			const gamesRef = ref.child("games")
			const gameInviteObj = {};
			gameInviteObj.user = "brains"
			gameInviteObj.timestamp = new Date().toGMTString()
			gameInviteObj.gameId = gameInviteObj.user + '-' + gameInviteObj.timestamp;
			gameInviteObj.gameList = ["Ball","Stick","Onion","Pillow","Lollies","Bril"];
			const gameRef = gamesRef.child(gameInviteObj.gameId)
			gameRef.set(gameInviteObj);
			alert(`Document written with ID: ${gameInviteObj.gameId}`)
			
			
			
			// Firebase Version
			
			/*
			firestoreDatabase.collection("games")
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
			*/
		} // end this.sendInvite
		
		
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
		} // end this.updateQuizId
		// NEW METHOD
		this.listenForInvites = function () {
			firestoreDatabase.collection("unique")
			.doc("gameIds")
			.onSnapshot(function(doc) { 
				alert("Listening for invites")
				alert(`${ doc.data().host} has inivted you to play game ${doc.data().gameId}`); 
				self.settings.invitations.push(doc.data())
				alert(self.settings.invitations.length)
			}); // end onSnapshot
		} // end this.listenForInvites
		/*
		//NEW METHOD
		this.acceptInvite = function () {
			firestoreDatabase.collection("games")
			.doc(self.settings.invitations[0].gameId)
			.onSnapshot(function(doc) { 
				alert(`Part of game ${self.settings.invitations[0].gameId}`)
				alert(doc.data().quizItems)
					self.settings.quizItems	= doc.data().quizItems; 
					$scope.quizItems = [];
			}); // end onSnapshot
		} // end this.acceptInvite
		*/
		// NEW METHOD
		this.updateDBforCorrectAnswer = function () {
			firestoreDatabase.collection("games")
			.doc(self.settings.invitations[0].gameId)
			.update({capital: true }) 
			.then(function() {
				alert("Phew!"); 
			}) // end then
			.catch(function(error) {
					alert(`Error updating document: ${error}`); 
			}); // end catch
		} // end this.updateDBforCorrectAnswer
}); // end service		
		
		




