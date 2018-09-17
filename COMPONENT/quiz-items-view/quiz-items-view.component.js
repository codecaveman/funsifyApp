angular.module("quizItemsView", []).
component('quizItemsView', {
	templateUrl: 'COMPONENT/quiz-items-view/quiz-items-view.template.html',
	controller: function($scope, game, funsify, $firebaseObject, $firebaseArray, $location) {
	
//	funsify.listsRef.child("Ipads").push({items:["30","10.5","7.9"]})
	const itemsRef = funsify.gameRef.child('items');
	const titleRef = funsify.gameRef.child('title');
	$scope.listItems = $firebaseArray(itemsRef); 
	$scope.listTitle = funsify.currentGame.title;
	//$scope.listItems = funsify.currentGame.items;
	const getListOf = function (listTitle) {
			const listRef = funsify.listsRef.child(listTitle);
				listRef.once("value", function(data) {
				funsify.userSelectedList.items = data.val().listItems;
				alert(funsify.userSelectedList.items[1])
				$scope.$apply(function () {
					$scope.items
				})
			});
		}
		this.challengeButton = function () {
			funsify.issueChallenge();
		
		}
	//	getListOf("Clouds")
		this.headingClicked = function () {
		//	alert("heading Clicked")
			$location.path("/")
		}
		 
		this.handlelistItemClick = function () {
			let answerCorrect = game.checkAnswer()
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
		this.loginButton = function () {
			game.listenForInvites()
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
	} // end controller
}); // end component 
