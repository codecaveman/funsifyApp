angular.module("login", []).
component('login', { 
  templateUrl: 'COMPONENT/login/login.template.html',
  controller: function($scope, funsify) {
  
  	$scope.displayName = "";
		$scope.email = "";
		$scope.password = "";
  	$scope.pin = "";
  this.handleSignUp = function () {
  	
		firebase.auth()
		.createUserWithEmailAndPassword($scope.email, $scope.password)
		.catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		}); // end firebase.auth()
		
	} // end login()
		
	
 this.handleSignOut = function name() {
 	
 	firebase.auth().signOut()
 	.then(function() { 
 		// Sign-out successful. 
 		
 	}) 
 	.catch(function(error) {
	// An error happened. 
	}); // end catch
 } // end this.hangleLogout
	
	
	this.handleSignIn = function () {
		firebase.auth()
		.signInWithEmailAndPassword($scope.email, $scope.password)
		.catch(function(error) { 
		// Handle Errors here.
		const errorCode = error.code; 
		const errorMessage = error.message; // ...
		}); // end catch
	} // end this.handleSignIn
	
	
	
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
	  // User is signed in.
	//    const user = firebase.auth().currentUser;
			let profile = { displayName: $scope.displayName, photoURL: $scope.pin };
		user.updateProfile(profile).then(function() {
		alert(`Your user name is ${user.displayName}`)
		alert(`Your user name is ${user.photoURL}`)
	  // Update successful. 
		})
		.catch(function(error) {
		// An error happened. 
		}); // end catch
	  } else {
	    // User is signed out.
	  }
		// ...
	}); // end firebase.auth()
	
	} // end controller
}); // end component





 

