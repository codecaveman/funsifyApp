angular.module("challengers", []).
component('challengers', {
    templateUrl: 'COMPONENT/challengers/challengers.template.html',
    controller: function($scope, game, funsify, $location) {
    	$scope.challenges = [];
    	funsify.challengesRef.on('child_added', function(data) { 
   			
   			 	// alert($scope.challenges.length)
    			$scope.$apply(function() {
    					$scope.challenges.push(data)
    			}) // end $scope.$apply
			}); // end game.dbRef.games
			
			this.chooseChallengeClicked = function () {
				alert(event.target.id)
				$location.path("/");
			}
    } // end controller function
}); // end component