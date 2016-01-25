$('.dropdown-toggle').dropdown();
angular.module('dashboard', ['chart.js'])
.controller('dashboardCtrl', ['$scope','$http', function ($scope, $http){
    $scope.showAgent = false;
    $scope.valueExist = false;

    $http({method: 'GET', url: 'http://localhost:8080/',})
        .then(function successCallback( response) {
            $scope.boards = response.data;
    });

    $scope.listAgentsBy = function(board){
        $http({method: 'GET', url: 'http://localhost:8080/'+board})
            .then(function successCallback( response) {
                $scope.showAgent = true;
                $scope.agents = response.data;
        });
    }

    $scope.listValuesAgent = function(board, agent){
        $http({ method: 'GET',
            url: 'http://localhost:8080/' + board + '/' + agent + '/last/1',
        }).then(function successCallback( response) {
            $scope.valueExist = true;
            $scope.agentValues = response.data;
            $scope.board = board;
            $scope.agent = agent;
        });
    }


  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

}]);

