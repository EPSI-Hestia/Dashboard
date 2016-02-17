$('.dropdown-toggle').dropdown();
$('#myTabs a[href="#boards"]').tab('show');
$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

angular.module('dashboard', ['chart.js'])

    .controller('dashboardCtrl', ['$scope','$http', '$interval', function ($scope, $http, $interval){
        $scope.showAgent = false;
        $scope.valueExist = false;
         $scope.agentValues = {};
        $scope.url = "http://192.168.1.22:8080/";

        $http({method: 'GET', url: $scope.url})
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
    
	
        function async_func(){
  	       $http({
                     method: 'GET',
                     url: $scope.url + $scope.currentBoard + '/' + $scope.currentAgent + '/last/10',
                 })
                     .then(function successsCallback(response) {
                     $scope.dates = [];
                     $scope.secondes = [];
                     $scope.values = [];

                     angular.forEach(response.data, function (data) {
                         this.push(parseInt(data.datetime.split("-")[1].split(":")[2]));
                     }, $scope.secondes);

                     getSortSecondes($scope.secondes);

                     angular.forEach(response.data, function (data) {
                         this.push(parseFloat(data.value));
                     }, $scope.values);

                     $scope.min = Math.min.apply(Math, $scope.values);
                     $scope.max = Math.max.apply(Math, $scope.values);
                     
  		              var sum = $scope.values.reduce(function (a, b) {
                         return a + b;
                     });

                     $scope.average = Math.round(sum / $scope.values.length);
                     $scope.lastValue = $scope.values[$scope.values.length - 1];
                     $scope.data = [$scope.values];
                     $scope.labels = $scope.secondes;
                     $scope.valueExist = true;
                     $scope.legend = $scope.currentAgent;
                     $scope.series = ["valeur du capteur"];
                 });
          }

         function getSortSecondes(secondes){
                    secondes.sort(function (a, b) {
                        return a - b
                    }).toString().split(",");
                }

          $scope.async=$interval(async_func, 1000);
          $scope.async;
        }

        $scope.refreshDashboard = function(agent){
            $scope.listValuesAgent(agent);
        }

    }]);


