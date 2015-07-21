var globalM = angular.module("myapp", []);
globalM.controller('stateFormCtrl', function ($scope, $http) {
    $scope.state = {
        content: null
    };
    $scope.stateSubmit = function () {
        console.log($scope.content);
        $http({
            method: 'post',
            url: '/state/send',
            data: $scope.state,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            if (data.success) {
                console.log(data);
            } else {
                console.log(data.message);
            }
        });
    };
});