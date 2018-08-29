angular.module("quizItemsView", []).
component('quizItemsView', {
	templateUrl: 'COMPONENT/quiz-items-view/quiz-items-view.template.html',
	controller: function() {
		// list selected
		const listSelected = "Planets in Solar System";
		// reference to list that user has selected 
		const listRef = funsifyDatabase.collection("lists").doc(listSelected);
		// get list selected from database as an array
		this.quizListItems = [
		
    'Genesis',         'Exodus',          'Leviticus',     'Numbers',
    'Deuteronomy',     'Joshua',          'Judges',        'Ruth',
    '1 Samuel',        '2 Samuel',        '1 Kings',       '2 Kings',
    '1 Chronicles',    '2 Chronicles',    'Ezra',          'Nehemiah',
    'Esther',          'Job',             'Psalm',         'Proverbs',
    'Ecclesiastes',    'Song of Solomon', 'Isaiah',        'Jeremiah',
    'Lamentations',    'Ezekiel',         'Daniel',        'Hosea',
    'Joel',            'Amos',            'Obadiah',       'Jonah',
    'Micah',           'Nahum',           'Habakkuk',      'Zephaniah',
    'Haggai',          'Zechariah',       'Malachi',       'Matthew',
    'Mark',            'Luke',            'John',          'Acts',
    'Romans',          '1 Corinthians',   '2 Corinthians', 'Galatians',
    'Ephesians',       'Philippians',     'Colossians',    '1 Thessalonians', 
    '2 Thessalonians', '1 Timothy',       '2 Timothy',     'Titus',
    'Philemon',        'Hebrews',         'James',         '1 Peter',
    '2 Peter',         '1 John',          '2 John',        '3 John',
    'Jude',            'Revelation'
		];

		// code that gets the list
		listRef.get().then(function(doc) {
			if (doc.exists) {
			this.quizListItems = doc.data().list;
			} else {
			// doc.data() will be undefined in this case
	//		alert("This list does not exist. Please choose another");
			}
		}).catch(function(error) {
	    alert("Error getting document:", error);
		}); // end listRef.get().then
		// copy list array
		this.copyQuizListItems = angular.copy(this.quizListItems)
		// shuffle copy of list array
		this.shuffledQuizListItems = this.copyQuizListItems.sort(function() { return 0.5 - Math.random() });
		// counter for next correct item in list array
		this.counter = 0
		// handle event when user taps on shuffled list array item
		this.handleListClick = function() {
			alert("change list")
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
		} // end w3css
	} // end controller
}); // end component 

