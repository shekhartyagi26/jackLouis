angular.module('appRoutes', ['ngRoute']).config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        
        templateUrl: 'app/views/pages/home.html',
        controller: 'homeCtrl',
        controllerAs: 'home'
    }).when('/about', {
        templateUrl: 'app/views/pages/about.html'
    }).when('/contact', {
        templateUrl: 'app/views/pages/contact.html',
        controller: 'regCtrl',
        controllerAs: 'register'
    }).when('/men', {
        templateUrl: 'app/views/pages/mens.html',
         controller: 'homeCtrl',
        controllerAs: 'home'
    }).when('/top', {
        templateUrl: 'app/views/pages/top.html'
    }).when('/women', {
        templateUrl: 'app/views/pages/women.html'
    }).when('/mens', {
        templateUrl: 'app/views/pages/mens.html'
    }).when('/blog', {
        controller: 'blogCtrl',
        controllerAs: 'blog',
        templateUrl: 'app/views/pages/blog.html'
    }).when('/track', {
        templateUrl: 'app/views/pages/track.html',
          controller: 'homeCtrl',
        controllerAs: 'home'
    }).when('/productupload', {
        templateUrl: 'app/views/pages/productupload.html',
          controller: 'proupCtrl',
        controllerAs: 'productup'
    })
      
        .when('/products/:id', {
        templateUrl: 'app/views/pages/products.html',
        controller: 'productCtrl',
        controllerAs: 'productdeta'
    }).otherwise({ redirectedTo: '/' });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
