$('.dropdown-toggle').dropdown();

angular.module('dashboard', ['chart.js'])

    .controller('dashboardCtrl', ['$scope','$http', function ($scope, $http){
        $scope.showAgent = false;
        $scope.valueExist = false;
         $scope.agentValues = {};

        $http({method: 'GET', url: 'http://localhost:8080/',})
            .then(function successCallback( response) {
                $scope.boards = response.data;
        });

        $scope.listAgentsBy = function(board){
            $scope.currentBoard = board;

            $http({method: 'GET', url: 'http://localhost:8080/'+board})
                .then(function successCallback( response) {
                    $scope.showAgent = true;
                    $scope.agents = response.data;
            });
        }

        $scope.listValuesAgent = function(agent) {
            $scope.currentAgent = agent;

            $http({
                method: 'GET',
                url: 'http://localhost:8080/' + $scope.currentBoard + '/' + $scope.currentAgent + '/last/10',
            }).then(function successsCallback(response) {
                $scope.dates = [];
                $scope.secondes = [];
                angular.forEach(response.data, function (data) {
                    this.push(parseInt(data.datetime.split("-")[1].split(":")[2]));
                }, $scope.secondes);

                $scope.secondes.sort(function (a, b) {
                    return a - b
                }).toString().split(",");

                $scope.values = [];
                angular.forEach(response.data, function (data) {
                    this.push(parseFloat(data.value));
                }, $scope.values);

            $scope.data = [$scope.values];
            $scope.labels = $scope.secondes;
            $scope.valueExist = true;
            $scope.legend = $scope.currentAgent;
            $scope.series = ["valeur du capteur"];
            });
        }
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };

        $scope.changeIntervalPeriod = function (period) {
            $scope.valueExist = true;

            if (period == 'jour') {
                $scope.labels = $scope.byDay;
            } else if (period == 'semaine') {
                $scope.labels = $scope.byWeek;
            } else if (period == 'mois') {
                $scope.labels = $scope.byMonth;
            }

        }


    }]);


