angular.module('userApp', ['appRoutes', 'userControllers','productControllers','homeControllers', 'blogControllers', 'userServices', 'authServices'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    });