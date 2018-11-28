angular.module('blogControllers', [])
    .controller('blogCtrl', function($http) {
        var app = this;
        this.blogUser = function(blogData) {
            console.log('form submitted');
            console.log(this.blogData);
            $http.post('api/blogs', this.blogData).then(function(data) {
                console.log(data.data.success);
                console.log(data.data.message);
                if (data.data.success) {
                    app.successMsg = data.data.message;

                } else {
                    app.errorMsg = data.data.message;
                }

            });
        };

        this.blogListUser = function(blogData) {
            $http.get('api/getBlogsList', this.blogData).then(function(data) {
               debugger;
            });
            $http.get('api/getBlogsList')
                .then(blogs => console.log(blogs))
            //.then(err=>console.log(err))
        };

    })