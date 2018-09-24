angular.module("challengers", []).
component('challengers', {
    templateUrl: 'COMPONENT/challengers/challengers.template.html',
    controller: function($scope, game, funsify, $location) {

    	funsify.challengersRef.once("value", function(data) {
				$scope.$apply(function() {
					$scope.challengers = Object.keys(data.val());
				})
			});
			
			this.chooseChallengeClicked = function () {
				const challenger = event.target.innerText;
				funsify.user = challenger;
				$location.path("/quiz");
				/*
				
				
				
				*/
			}
    } // end controller function
}); // end component
	