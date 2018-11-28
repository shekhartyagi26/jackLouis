// angular.module('userApp',['appRoutes','userControllers'])
// .config(function($httpProvider){
// 	$httpProvider.interceptors.push('AuthInterceptors');
// });
//angular.module('userApp',['appRoutes','userController'])
// .config(function($httpProvider){
// 	$httpProvider.interceptors.push('AuthInterceptors');
// });


angular.module('userApp',['appRoutes','userControllers','blogControllers','managementController', 'userServices','authServices','mainController'])
.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
