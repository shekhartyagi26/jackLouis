angular.module('productControllers', []).controller('productCtrl', function ($http) {
    var app = this;

    $http.init = function () {
        $http.get('api/products/:id').then(function (data) {
            app.productList123 = data.data.response || [];
        });
      
    } 
    $http.init();
})
