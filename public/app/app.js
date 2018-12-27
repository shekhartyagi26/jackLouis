angular.module('userApp', ['appRoutes', 'userControllers','productuploadControllers','productControllers','homeControllers', 'blogControllers', 'userServices', 'authServices'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    });