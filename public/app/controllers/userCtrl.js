angular.module('userControllers', []).controller('regCtrl', function ($http) {
var app=this;
	app.regUser = function (regData) {
		$http.post('api/users', app.regData).then(function (data) {
			if (data.data.message) {
				app.successMsg = data.data.message;
			} else {
				app.errorMsg = data.data.message;
			}
		});
	};
})