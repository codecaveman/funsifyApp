angular.module("listOfQuizesToChooseFrom", []).
component('listOfQuizesToChooseFrom', {
		templateUrl: 'COMPONENT/list-of-quizes-to-choose-from/list-of-quizes-to-choose-from.template.html',
    controller: function($scope, game, funsify) {
			$scope.listTitles = [];
			funsify.listsRef.on("child_added", function(data) {
				$scope.$apply(function () {
					$scope.listTitles.push(data.key()) 
				}); //end $scope.$apply
			});
			this.handleListClicked = function () {
				title = event.target.innerText;
				funsify.updateCurrentGame(title)
			}
			this.w3css = {
				button: "w3-btn w3-xxlarge w3-center w3-blue",
				footer:"w3-bottom w3-black",
			} // end this.w3css
		} // end controller function
}); // end component
