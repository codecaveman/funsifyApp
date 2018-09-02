angular.module("quizItemsView", []).
component('quizItemsView', {
	templateUrl: 'COMPONENT/quiz-items-view/quiz-items-view.template.html',
	controller: function($scope) {
	// FIRESTONE REFS
	const gamesRef = funsifyDatabase.collection("games");
	
	// ORIGINAL LIST FROM DATABASE
		const quizUserSelected = "Bible Books";
	// GAME OBJECT WILL BE POPULATED BY SETUPGAME FUNCTION AND SAVED TO FIRESTOR
		let game = {};
		game.quizTitle = quizUserSelected;
		game.quizListItems = [];
		game.id = "";
		
		// RUN THIS FUNCTION WHEN A LIST ITEM IS PRESSED
	  setUpGame(quizUserSelected);
		
		
		$scope.listItemsToDisplay = [];
		
		
		

		
		
function setUpGame(title) {
	getDoc(title, "lists")
	.then(function(doc) {
		if (doc.exists) {
			 game.quizListItems = doc.data().listItems;
			 saveGameDetails();
		} else {
				alert("This list does not exist. Please choose another");
		} // end if else
	}) // end then ()
	.catch(function(error) {
		    alert("Error getting document:", error);
	}); // catch()
}






function getDoc (docName, collectionName) {
  const doc =	accessDatabaseCollection(collectionName).doc(docName).get()
  return doc;
}

function addDoc (data, collectionName) {
	const addDocFunction = accessDatabaseCollection(collectionName).add(data);
	return addDocFunction;
}

function accessDatabaseCollection (collectionName) {
	const collection = funsifyDatabase.collection(collectionName);
	return collection;
}

function saveGameDetails () {
		addDoc (game, "games")
		.then(function(gameDoc) {
			alert(`Document written with ID: ${gameDoc.id}`); 
			game.Id = gameDoc.id;
			$scope.$apply(function () {
				$scope.listItemsToDisplay = game.quizListItems;
			}) // end $scope.$apply
	})
	.catch(function(error) {
		alert(`Error adding document: ${error}`); 
	});
}


/*
// PLAY BUTTON
this.playButton = function () {
	funsifyDatabase.collection("lists")
	.doc(quizUserSelected)
	.get()
	.then(function(doc) {
		if (doc.exists) {
			$scope.$apply(function () {
				$scope.listItemsToDisplay = doc.data().listItems;
			}) // end $scope.$apply
		} else {
				alert("This list does not exist. Please choose another");
		} // end if else
	}) // end then ()
	.catch(function(error) {
		    alert("Error getting document:", error);
	}); // catch()
}		
		
		



funsifyDatabase.collection("UniqueCollection").doc("uniqueDocument").set({

invitees: "No invites",


}) .then(function() {

alert("Document successfully written!"); }) .catch(function(error) {

alert("Error writing document: ", error); });


// UNIVERSAL LISTENER
		funsifyDatabase.collection("UniqueCollection")
		.doc("uniqueDocument")
		.onSnapshot(function(doc) { 
			$scope.$apply(function () {
				$scope.invites = doc.data()
			})
		});


// INVITE BUTTON
	this.invite = function () {
		alert("Player Invited")
		funsifyDatabase.collection("UniqueCollection")
		.doc("uniqueDocument")
		.update({
		invitees: "You have been invited",
		})
		.then(function() {
			alert("Document successfully updated!");
			});
	}
	
	*/

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
