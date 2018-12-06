angular.module('blogControllers', []).controller('blogCtrl', function ($http) {
    var app = this;
    this.blogUser = function (blogData) {
        $http.post('api/blogs', this.blogData).then(function (data) {
            if (data.data.success) {
                app.successMsg = data.data.message
            } else {
                app.errorMsg = data.data.message;
            }
        });
    };

    $http.init = function () {
        $http.get('api/getBlogsList').then(function (data) {
            app.blogListUserDetails = data.data.response || [];
        });
    }
    $http.init();
})