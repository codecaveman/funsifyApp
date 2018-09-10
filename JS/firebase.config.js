// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCNyA3lXpiJQoLpErtL6mfaW5oYBs47Zyg",
    authDomain: "funsify-b5b13.firebaseapp.com",
    databaseURL: "https://funsify-b5b13.firebaseio.com",
    projectId: "funsify-b5b13",
    storageBucket: "funsify-b5b13.appspot.com",
    messagingSenderId: "78991394295"
  };
  firebase.initializeApp(config);


// 
const firebaseDatabase = firebase.database(); // change to 

// Initialize Cloud Firestore through Firebase
const firestoreDatabase = firebase.firestore();  
const settings = {
										/* your settings... */ 
										timestampsInSnapshots: true
									};
firestoreDatabase.settings(settings);


// var ref = new Firebase("https://funsify-b5b13.firebaseio.com");


