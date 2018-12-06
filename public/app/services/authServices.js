angular.module('authServices',[])
.factory('Auth', function($http,AuthToken){
		authFactory={};
		// User.create(regData)
		authFactory.login= function(loginData){
			return $http.post('/api/authenticate',loginData).then(function(data){
				AuthToken.setToken(data.data.token);
				return data;
			});
		};
		//Auth.isloggedIn();
		authFactory.isloggedIn=function(){
			if(AuthToken.getToken()){
				return true;
			}
				else {
					return false;
				}
		};
		//Auth.getUser();
		authFactory.getUser=function(){
			if(AuthToken.getToken()){
				return $http.post('/api/me');
			}
			else{
				$q.reject({message:'user has no token'});
			}
		};
		//auth.logout()
		authFactory.logout= function(){
			AuthToken.setToken();
		};
		return authFactory;
}) 
.factory('AuthToken', function($window){
	var authTokenFactory={};
	authTokenFactory.setToken= function(token){
		// $window.localstorage.setItem('token', token);
		 if (token) {
            $window.localStorage.setItem('token', token); // If so, set the token in local storage
        } else {
            $window.localStorage.removeItem('token'); // Otherwise, remove any token found in local storage (logout)
        }
	};
	//authToken.getToken();
	authTokenFactory.getToken=function(){
		return $window.localStorage.getItem('token');
	};
	return authTokenFactory
})
	.factory('AuthInterceptors',function(AuthToken){
		var authInterceptorsFactory={};
		authInterceptorsFactory.request=function(config){
			var token= AuthToken.getToken();
			if(token) config.headers['x-access-token']= token;
			return config;

		};
		return authInterceptorsFactory;
	});