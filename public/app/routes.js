// var app= angular.module('appRoutes',['ngRoute'])
// .config(function($routeProvider,$locationProvider){
// $routeProvider
// .when('/',{
// 	templateUrl:'app/views/pages/home.html'
// })
// .when('/about',{
// 	templateUrl:'app/views/pages/about.html'
// })
// .when('/contact',{
// 	templateUrl:'app/views/pages/contact.html'
// })
// .otherwise({redirectedTo:'/'});
// $locationProvider.html5Mode({
// 	enabled:true,
// 	requireBase: false
// });
// });
angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider){
$routeProvider
.when('/',{
	templateUrl:'app/views/pages/home.html'
})
.when('/about',{
templateUrl:'app/views/pages/about.html'
})
.when('/contact',{
templateUrl:'app/views/pages/contact.html',
controller:'regCtrl',
    controllerAs:'register'
})
.when('/men',{
templateUrl:'app/views/pages/men.html'
})
.when('/top',{
templateUrl:'app/views/pages/top.html'
})
.when('/women',{
templateUrl:'app/views/pages/women.html'
})
.when('/mens',{
templateUrl:'app/views/pages/mens.html'
})
.when('/blog',{
	controller:'blogCtrl',
    controllerAs:'blog',
templateUrl:'app/views/pages/blog.html'
})
.when('/track',{
	templateUrl:'app/views/pages/track.html'
})

    //management
      .when('/management', {
        templateUrl: 'app/views/pages/management.html',
        controller: 'managementCtrl',
        controllerAs: 'management',
     
    })
.otherwise({redirectedTo:'/'});
$locationProvider.html5Mode({
	enabled:true,
	requireBase: false
});
});

