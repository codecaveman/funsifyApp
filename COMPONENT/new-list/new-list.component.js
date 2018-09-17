angular.module("newList", []).
component('newList', {
		templateUrl: 'COMPONENT/new-list/new-list.template.html',
		controller: function($scope, funsify) {
			this.listTitle = "";
			let viewListInput = true;
			this.viewListInput = viewListInput;
		
			let viewListItemsInput = "w3-hide";
			this.viewListItemsInput = viewListItemsInput;
			this.listItems = []
    	this.listItem = ""
			
			
			
			this.doneButtonClicked = function () {
				this.w3css.listTitleInputView = "w3-hide";
	    	this.viewListItemsInput = "w3-animate-top w3-center";
			} // end this.doneButtonClicked
			this.handleItemsEntered = function () {
				this.listItems.push(this.listItem)
    		this.listItem = ""
    		this.w3css.li = "w3-animate-bottom"
			} // this.handleItemsEntered
			this.handleSave = function () {
			
			let listDetails = { author: "funsify team",
	    	listItems: this.listItems,
	    	modified: new Date()
				}
			
			listRef = funsify.listsRef.child(this.listTitle)
			listRef.set(listDetails)
			
			
			
				const newListRef = firestoreDatabase.collection("lists").doc(this.listTitle)
				newListRef.set(listDetails) // end newListRef.set
				.then(function(docRef) {
	    		alert(`list saved - "${newListRef.id}"`);
				}) // end then
				.catch(function(error) {
	    		alert(`Error adding document: ${error}`);
				}); // end newListRef.set
			}
			
			
			
			this.w3css = {
					header: "",
					listTitleInputView: "w3-animate-top w3-margin",
					input: "w3-xlarge w3-margin",
					doneButton:"w3-btn w3-large w3-round-large w3-blue",
					enterItemsButton: "w3-btn w3-large w3-round-large w3-blue",
					saveButton: "w3-btn w3-xlarge w3-center w3-green",
					footer:"w3-bottom"
			} // end this.w3css
		} // end controller function
}); // end component

