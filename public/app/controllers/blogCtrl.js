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

    //     this.blogListUser = function(blogData) {
    //         $http.get('api/getBlogsList', this.blogData).then(function(data) {
    //            debugger;
    //         });
    //         $http.get('api/getBlogsList')
    //             .then(blogs => console.log(blogs))
    //         //.then(err=>console.log(err))
    //     };

    // })
  $http.init = function () {
        $http.get('api/getBlogsList').then(function (data) {
            app.blogListUserDetails = data.data.response || [];
        });
    }
    $http.init();
}) 