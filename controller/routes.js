$('.dropdown-toggle').dropdown();

angular.module('dashboard', ['chart.js'])

    .controller('dashboardCtrl', ['$scope','$http', function ($scope, $http){
        $scope.showAgent = false;
        $scope.valueExist = false;
         $scope.agentValues = {};
        $scope.url = "http://172.20.10.14:8080/";

        $http({method: 'GET', url: $scope.url,})
            .then(function successCallback( response) {
                $scope.boards = response.data;
        });

        $scope.listAgentsBy = function(board){
            $scope.currentBoard = board;

            $http({method: 'GET', url: $scope.url + board})
                .then(function successCallback( response) {
                    $scope.showAgent = true;
                    $scope.agents = response.data;
            });
        }

        $scope.listValuesAgent = function(agent) {
            $scope.currentAgent = agent;

            $http({
                method: 'GET',
                url:  $scope.url + $scope.currentBoard + '/' + $scope.currentAgent + '/last/10',
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
                    smallestValue = data.value[0];
                    highterValue = data.value[response.data.length];
                    this.push(parseFloat(data.value));
                }, $scope.values);

            $scope.min = Math.min.apply(Math, $scope.values);
            $scope.max = Math.max.apply(Math, $scope.values);
            var sum = $scope.values.reduce(function(a , b){
                                              return a + b;
                                            });
            $scope.average = sum / $scope.values.length;
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

        $scope.refreshDashboard = function(){

        }


    }]);


