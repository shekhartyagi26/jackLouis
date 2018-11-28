var myApp = angular.module('myApp',[]);

function MyCtrl($scope, filterFilter) {
    $scope.useMakes = [];
    
    $scope.filterMakes = function () {
        return function (p) {
            for (var i in $scope.useMakes) {
                if (p.make == $scope.group[i] && $scope.useMakes[i]) {
                    return true;
                }
            }
        };
    };
    
    $scope.cars = [
        {model: '316', make: 'Bmw'},
        {model: '520', make: 'Bmw'},
        {model: 'Fiesta', make: 'Ford'},
        {model: 'Focus', make: 'Ford'},
        {model: 'Clio', make: 'Renault'},
        {model: 'Toledo', make: 'Seat'},
        {model: 'Leon', make: 'Seat'},
        {model: 'Insignia', make: 'Opel'},
        {model: 'Astra', make: 'Opel'},
        {model: 'Corsa', make: 'Opel'}
    ];    
}


var uniqueItems = function (data, key) {
    var result = new Array();
    for (var i = 0; i < data.length; i++) {
        var value = data[i][key];
 
        if (result.indexOf(value) == -1) {
            result.push(value);
        }
    
    }
    return result;
};

myApp.filter('groupBy',
            function () {
                return function (collection, key) {
                    if (collection === null) return;
                    return uniqueItems(collection, key);
        };
    });