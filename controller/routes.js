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

        $scope.listValuesAgent = function(agent){
            $scope.currentAgent = agent;

            $http({ method: 'GET',
                url: 'http://localhost:8080/' + $scope.currentBoard + '/' + $scope.currentAgent + '/last/10',
            }).then(function successCallback(response) {
                $scope.valueExist = true;
                $scope.valuesAgent = response.data;
                console.log(response.data.datetime);
            });
        }
            $scope.byMonth = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "décembre"];
            $scope.byDay = ["00h", "01h", "02h", "03h", "04h", "05h", "06h", "07h", "08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h"];
            $scope.byWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
            $scope.labels = $scope.byDay;
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40]
            ];
            $scope.legend = $scope.currentAgent;
            $scope.series = ["valeur du capteur"];
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


