angular.module("quizItemsView", []).
component('quizItemsView', {
	templateUrl: 'COMPONENT/quiz-items-view/quiz-items-view.template.html',
	controller: function($scope, game) {
	
		$scope.quizTitle = game.settings.quizTitle;
		$scope.quizItems = game.settings.quizItems;
		  
		this.handlelistItemClick = function () {
			
			let answerCorrect = game.checkAnswer()
			alert(answerCorrect)
			game.updateDBforCorrectAnswer() // doesnt belong here
			if(game.settings.quizItems.length > 4) {
			$scope.quizItems = game.settings.quizItems;
			}
			
		}
		this.playButton = function () {
			game.shuffleQuizList()
			$scope.quizItems = game.settings.shuffledQuizItems;
			game.settings.counter = 0;
		}
		this.unshuffleButton = function () {
			$scope.quizItems = game.settings.quizItems;
			game.settings.counter = 0;
		}
		this.inviteButton = function () {
			game.sendInvite()
		}
		
		this.loginButton = function () {
			game.listenForInvites()
		}
		
		this.acceptButton = function () {
		//	game.acceptInvite()
		// NEW METHOD
		
			funsifyDatabase.collection("games")
			.doc(game.settings.invitations[0].gameId)
			.onSnapshot(function(doc) { 
				alert(`Part of game ${game.settings.invitations[0].gameId}`)
				alert(doc.data().quizItems)
					game.settings.quizItems	= doc.data().quizItems; 
					$scope.$apply(function () {
							$scope.quizItems = doc.data().quizItems; 
					})
				
			}); // end onSnapshot
		
		}
		
		this.startButton = function name() {
			$scope.quizItems = game.settings.quizItems;
		}
		
		
		
		
// style component template using w3css framework
		this.w3css = {
			parentDiv: "",
			listHeader: "w3-top",
			currentListItem: "w3-animate-fading",
			playButton: "w3-btn w3-xlarge w3-center w3-green",
			unshuffleButton : "w3-btn w3-xlarge w3-center w3-blue",
			inviteButton: "w3-btn w3-xlarge w3-center w3-blue",
			footer:"w3-bottom"
		} // end w3css
	} // end controller
}); // end component 
