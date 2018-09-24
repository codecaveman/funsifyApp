angular.module("listOfQuizesToChooseFrom", []).
component('listOfQuizesToChooseFrom', {
		templateUrl: 'COMPONENT/list-of-quizes-to-choose-from/list-of-quizes-to-choose-from.template.html',
    controller: function($scope, game, funsify, $location) {
    	$scope.person = funsify.user;
    	$scope.$watch('person', function() {
        funsify.user = $scope.person;
    });

 			funsify.listsRef.once("value", function(data) {
				$scope.$apply(function() {
					$scope.listTitles = Object.keys(data.val());
				})
			});
			
			this.handleListClicked = function () {
					listTitle = event.target.innerText;
					funsify.uploadGame(listTitle)
		
					$location.path("/quiz");
			}
			
			this.w3css = {
				button: "w3-btn w3-xxlarge w3-center w3-blue",
				footer:"w3-bottom w3-black",
			} // end this.w3css
		} // end controller function
}); // end component
