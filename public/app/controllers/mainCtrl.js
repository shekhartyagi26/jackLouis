
angular.module('mainController',['authServices','userServices'])
.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window, $interval, User, AuthToken){
	// console.log('k');
var app=this;
app.loadme=false;
app.checkSession=function(){
	if(Auth.isloggedIn()){
		app.checkingSession=true;
		  var interval = $interval(function(){
			// console.log('test');
			var token = $window.localStorage.getItem('token'); 
			if(token==null){
				$interval.cancel(interval);
			}
			else{
				self.parseJwt = function(token) {
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');
                        return JSON.parse($window.atob(base64));
                    }
                    var expireTime =self.parseJwt(token);
                    var timeStamp = Math.floor(Date.now()/1000);
			console.log(expireTime.exp);
			console.log(timeStamp);
			var timeCheck=expireTime.exp-timeStamp;
			console.log('timeCheck'+ timeCheck);
			if(timeCheck<=1800)
			{
				console.log('token has expired');
				showModal(1);
				$interval.cancel(interval);
			}
			else{
				console.log('token is not expired');
			}
			}
			
		},30000);
	}
};
app.checkSession();


  // Function to open bootstrap modal     
    var showModal = function(option) {
        app.choiceMade = false; // Clear choiceMade on startup
        app.modalHeader = undefined; // Clear modalHeader on startup
        app.modalBody = undefined; // Clear modalBody on startup
        app.hideButton = false; // Clear hideButton on startup

        // Check which modal option to activate (option 1: session expired or about to expire; option 2: log the user out)      
        if (option === 1) {
            app.modalHeader = 'Timeout Warning'; // Set header
            app.modalBody = 'Your session will expired in 30 minutes. Would you like to renew your session?'; // Set body
            $("#myModal").modal({ backdrop: "static" }); // Open modal
            // Give user 10 seconds to make a decision 'yes'/'no'
            $timeout(function() {
                if (!app.choiceMade) app.endSession(); // If no choice is made after 10 seconds, select 'no' for them
            }, 10000);
        } else if (option === 2) {
            app.hideButton = true; // Hide 'yes'/'no' buttons
            app.modalHeader = 'Logging Out'; // Set header
            $("#myModal").modal({ backdrop: "static" }); // Open modal
            // After 1000 milliseconds (2 seconds), hide modal and log user out
            $timeout(function() {
                Auth.logout(); // Logout user
                $location.path('/logout'); // Change route to clear user object
                hideModal(); // Close modal
            }, 2000);
        }
    };

app.renewSession=function(){
	app.choiceMade=true;
	User.renewSession(app.username).then(function(data){
		if(data.data.success){
			AuthToken.setToken(data.data.token);
			app.checkSession();
		}
		else{
			app.modalBody=data.data.message;
		}
	});



	//console.log('session has been renewed');
	hideModal();
};
app.endSession= function(){
	app.choiceMade=true;
	console.log('session has ended');
	hideModal();
	$timeout(function(){
		showModal(2);
	}, 1000);
};
var hideModal= function(){
$('#myModal').modal('hide');
};
$rootScope.$on('$routeChangeStart',function(){
	if(!app.checkSession)app.checkSession();
if(Auth.isloggedIn())
{
	console.log('sucess: user logged in');
	app.isloggedIn=true;
	Auth.getUser().then(function(data){
		console.log(data.data.username);
		app.username=data.data.username;
		 checkLoginStatus = data.data.username;
		app.useremail=data.data.email;
		User.getPermission().then(function(data){
		   if (data.data.permission === 'admin' || data.data.permission === 'moderator') {
                            app.authorized = true; // Set user's current permission to allow management
                            app.loadme = true; // Show main HTML now that data is obtained in AngularJS
                        }
			else{
				   app.authorized = false;
                    app.loadme = true;
			}
		});
		
		////console.log(data.data.username);
		//console.log(data.data.email);
		
	});
}
else
{
	console.log('failure:not logged in');
	app.isloggedIn=false;
	app.username='';
	app.loadme=true;

}	
 if ($location.hash() == '_=_') $location.hash(null); // Check if facebook hash is added to URL
        app.disabled = false; // Re-enable any forms
        app.errorMsg = false; // Clear any error messages
});
  // Function to redirect users to facebook authentication page
    this.facebook = function() {
        app.disabled = true;
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
    };

    // Function to redirect users to twitter authentication page        
    this.twitter = function() {
        app.disabled = true;
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/twitter';
    };

    // Function to redirect users to google authentication page
    this.google = function() {
        app.disabled = true;
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/google';
    };

this.dologin=function(loginData){
	app.loading= true;
	app.errorMsg= false;
	 app.expired = false; // Clear expired whenever user attempts a login 
      app.disabled=true; 
	//console.log('form submmited');
	//console.log(this.regData);
	Auth.login(app.loginData).then(function(data){
		// console.log(data.data.success);
		// console.log(data.data.message);
		if(data.data.success){
			app.loading= false;
			// create success msg
			app.successMsg = data.data.message+'....redirecting'; 

			//redirect to home
			$timeout(function() {
				$location.path('/about');
				app.loginData='';
				app.successMsg=false;
				app.disabled=false;
				app.checkSession()
			}, 2000);
			
		}
		else
	 {
                // Check if the user's account is expired
                if (data.data.expired) {
                    app.expired = true; // If expired, set variable to enable "Resend Link" on login page
                    app.loading = false; // Stop bootstrap loading icon
                     app.errorMsg = data.data.message; // Return error message to login page
                } else {
                    app.loading = false; // Stop bootstrap loading icon
                    app.disabled = false; // Enable form
                    app.errorMsg = data.data.message; // Return error message to login page
                }
            }
	});
};



app.logout = function(){
	showModal(2);
};







});


