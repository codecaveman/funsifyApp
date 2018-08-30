angular.module("quizItemsView", []).
component('quizItemsView', {
	templateUrl: 'COMPONENT/quiz-items-view/quiz-items-view.template.html',
	controller: function($scope) {
		// list selected
		const listSelected = "Bible Books";
		// reference to list that user has selected 
		const listRef = funsifyDatabase.collection("lists").doc(listSelected);
		
		this.quizListItemsDisplayed = this.copyQuizListItems
		// get list selected from database as an array
		$scope.quizListItemsFromFirestore = [3,0];
		
		// copy list array
		this.copyQuizListItems = angular.copy($scope.quizListItemsFromFirestore)

		// code that gets the list
		listRef.get().then(function(doc) {
			if (doc.exists) {
			
			 $scope.$apply(function () {
            $scope.quizListItemsFromFirestore = doc.data().listItems;
            alert($scope.quizListItemsFromFirestore[9])
      });
			
			
			
			
			
			} else {
			// doc.data() will be undefined in this case
	//		alert("This list does not exist. Please choose another");
			}
		}).catch(function(error) {
	    alert("Error getting document:", error);
		}); // end listRef.get().then
		
		
		
		// handle event when user taps on shuffled list array item
		this.handleListClick = function() {
			alert("change list")
		}
		this.handlePlay = function () {
			alert("Play Button Clicked")
			
		// shuffle copy of list array
		this.quizListItems = this.copyQuizListItems.sort(function() { return 0.5 - Math.random() });
		// counter for next correct item in list array
		this.counter = 0
		}
		this.handlelistItemClick = function () {
				// reference to clicked item
				const clickedItem = event.target;
				//inner text of clicked item
				const clickedItemInnerText = clickedItem.innerText;
				if (clickedItemInnerText == this.quizListItems[this.counter]) {
						clickedItem.style.display = "none";
						this.counter++;
					//	document.querySelectorAll("li").style.backgroundColor = "yellow";
				} else {
				alert("Wrong")
						clickedItem.style.backgroundColor = "red";
				} // end if else statement
			} // end this.handleClick
		// style component template using w3css framework
		this.w3css = {
			parentDiv: "w3-center w3-xlarge",
			listHeader: "w3-top w3-black",
			currentListItem: "w3-animate-fading",
			div:"",
			ul: "w3-ul", 
			li: "w3-panel w3-border-grey",
			playButton: "w3-btn w3-xlarge w3-center w3-green",
			footer:"w3-bottom"
		} // end w3css
	} // end controller
}); // end component 

