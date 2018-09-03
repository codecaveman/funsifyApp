angular.module("quizItemsView", []).
component('quizItemsView', {
	templateUrl: 'COMPONENT/quiz-items-view/quiz-items-view.template.html',
	controller: function($scope, game) {
	
		
		$scope.quizTitle = game.settings.quizTitle;
		$scope.quizItems = game.settings.quizItems;
		
		
		
		
// style component template using w3css framework
		this.w3css = {
			parentDiv: "",
			listHeader: "w3-top w3-black",
			currentListItem: "w3-animate-fading",
			playButton: "w3-btn w3-xlarge w3-center w3-green",
			inviteButton: "w3-btn w3-xlarge w3-center w3-blue",
			footer:"w3-bottom"
		} // end w3css
	} // end controller
}); // end component 
