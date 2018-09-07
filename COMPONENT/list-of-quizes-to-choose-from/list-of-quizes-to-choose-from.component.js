angular.module("listOfQuizesToChooseFrom", []).
component('listOfQuizesToChooseFrom', {
		templateUrl: 'COMPONENT/list-of-quizes-to-choose-from/list-of-quizes-to-choose-from.template.html',
    controller: function($scope, game) {
			$scope.listTitles = []
			const listTitlesRef = funsifyDatabase.collection("lists");
			listTitlesRef.get().then(function(querySnapshot) { 
				querySnapshot.forEach(function(doc) {
				
					$scope.$apply(function () {
					
					$scope.listTitles.push(doc.id) 
					});
				}); 
			});
			this.handleListClicked = function () {
				 game.settings.quizTitle = event.target.innerText;
				 const quizTitle = event.target.innerText;
				 game.updateQuizList(quizTitle, "lists")
				 game.settings.counter = 0;
			}
		
			this.w3css = {
				header:"",
				button: "w3-btn w3-xxlarge w3-center w3-blue",
				footer:"w3-bottom w3-black",
			} // end this.w3css
		} // end controller function
}); // end component
