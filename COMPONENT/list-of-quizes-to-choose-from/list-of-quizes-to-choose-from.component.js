angular.module("listOfQuizesToChooseFrom", []).
component('listOfQuizesToChooseFrom', {
    templateUrl: 'COMPONENT/list-of-quizes-to-choose-from/list-of-quizes-to-choose-from.template.html',
    controller: function() {
    	this.w3css = {
    	header:"w3-top w3-black",
    	activeList:"",
    	list:"",
    	button: "w3-btn w3-xxlarge w3-center w3-blue",
			footer:"w3-bottom w3-black",
			} // end this.w3css
    } // end controller function
}); // end component


