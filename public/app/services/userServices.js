angular.module('userServices',[])
	.factory('User', function($http){
		var userFactory={};
		// User.create(regData)
		userFactory.create= function(regData){
			return $http.post('/api/users',regData);
		}
		// User.checkUsername(regData);
		 // Check if username is available at registration

     userFactory.getUsers = function() {
        return $http.get('/api/management/');
    };


    return userFactory;
});
	