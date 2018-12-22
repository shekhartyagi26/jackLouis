angular.module('productControllers', []).controller('productCtrl', function ($http) {
    var app = this;
    $http.init = function () {
        let id = window.location.href.split('/')[4];
        if (id) {
            getProductDetail(id)
        }
    }

    function getProductDetail(id) {
        $http.get(`api/products/${id}`).then(function (data) {
            if (data && data.data && data.data.response) {
                app.productDetail = data.data.response;
                app.url = "http://localhost:3001/";
                app.imageUrl = `${app.url}${app.productDetail.image[0].image_url}`;
            } else {
                window.location = '/';
            }
        }).catch(err => { window.location = '/'; })
    }
    $http.init();
})