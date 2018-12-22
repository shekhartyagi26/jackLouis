angular.module('homeControllers', []).controller('homeCtrl', function ($http) {
    var app = this;

    $http.init = function () {
        $http.get('api/product').then(function (data) {
            app.productList = data.data.response || [];
        });
      
    } 

    filter(){
		//app.productList = app.productList.filter(product => product.)
    }
    $http.init();
})


