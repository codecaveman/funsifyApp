angular.module("quizItemsView", []).
component('quizItemsView', {
	templateUrl: 'COMPONENT/quiz-items-view/quiz-items-view.template.html',
	controller: function($scope, game, funsify, $firebaseObject, $firebaseArray, $location) {
		alert(`Hello ${funsify.user}`)
	$scope.listItems = [];
	const gameRef = funsify.gamesRef.child(funsify.user);
	/*
	gameRef.once("value", function(data) {
	$scope.$apply(function () {
		$scope.listItems = data.val().items;
	  $scope.listTitle = data.val().title;
	})
			
	}) // end gameRef.once
	
	*/
	let score = 0
	this.handleX = function () {
	
		alert(`${score} to ${funsify.user}`)
		score++;
	}
	this.headingClicked = function () {
		alert("heading Clicked")
	  $location.path("/")
	}
	
	this.challengeButton = function () {
			funsify.issueChallenge();
		
		}
	
	this.beginButton = function () {
		
	alert("Begin")
	const itemsRef = funsify.gameRef.child('items'); 
	 	  $scope.listItems = $firebaseArray(itemsRef); 
	}
		/*
		
		

	
	const titleRef = funsify.gameRef.child('title');
	
	
	

	
	
		
	
		
		 
		this.handlelistItemClick = function () {
			let answerCorrect = game.checkAnswer()
		}
		this.playButton = function () {
			$scope.listItems = $firebaseArray(itemsRef);
		}
		this.unshuffleButton = function () {
			$scope.quizItems = game.settings.quizItems;
			game.settings.counter = 0;
		}
		this.loginButton = function () {
		alert(120)
		//	game.listenForInvites()
		}
		this.startButton = function name() {
			$scope.quizItems = game.settings.quizItems;
		} // end 
// style component template using w3css framework
		this.w3css = {
			listHeader: "w3-top",
			currentListItem: "w3-animate-fading",
			playButton: "w3-btn w3-xlarge w3-center w3-green",
			unshuffleButton : "w3-btn w3-xlarge w3-center w3-blue",
			inviteButton: "w3-btn w3-xlarge w3-center w3-blue",
			footer:"w3-bottom"
		} // end w3css
		
		
		*/
		
		
	} // end controller
}); // end component 
