angular.module('userControllers',[])
.controller('regCtrl',function($http){
var app=this;
this.regUser=function(regData){
	// console.log('form submitted');
	// console.log(this.regData);
	$http.post('api/users',this.regData).then(function(data){
		console.log(data.data.success);
		console.log(data.data.message);
		if(data.data.success)
		{
			app.successMsg=data.data.message;

		}
		else{
			app.errorMsg=data.data.message;
		}

	});
};
})
// .controller('detailsCtrl', function($scope,$http) {

//     $scope.users = [];

//     $http.get('/details').then(function(d)
//         {
//             console.log(d);
//             $scope.users= d.data;
//         },function(err)
//         {
//             console.log(err);            }
//     )

// })


// (function() {
//   'use strict';

//   angular.module('navBarDemoBasicUsage', ['ngMaterial'])
//       .controller('AppCtrl', AppCtrl);

//   function AppCtrl($scope) {
//     $scope.currentNavItem = 'page1';

//     $scope.goto = function(page) {
//       console.log("Goto " + page);
//     }
//   }
// })();

