angular.module('managementController', []).controller('managementCtrl', function (User) {
    var app = this;
    app.loading = true;

    // Function: get all the users from database
    function getUsers() {
        // Runs function to get all the users from database
        User.getUsers().then(function (data) {
            // Check if able to get data from database
            if (data.data.success) {
                // Check which permissions the logged in user has

                app.users = data.data.users; // Assign users from database to variable
                app.loading = false; // Stop loading icon
                app.accessDenied = false; // Show table
                // Check if logged in user is an admin or moderator

            } else {
                app.errorMsg = data.data.message; // Set error message
                app.loading = false; // Stop loading icon
            }
        });
    }

    getUsers(); // Invoke function to get users from databases
    app.showAll = function () {
        app.limit = undefined; // Clear ng-repeat limit
        app.showMoreError = false; // Clear error message
    };
})