var dailyApp = angular.module("dailyApp", ['ngRoute']);

dailyApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'accueilController',
      templateUrl: 'views/home.html'
    })
	.when('/galerie', {
	  controller: 'galerieController',
	  templateUrl: 'views/galerie.html'
	})
	.when('/contact', {
	  controller: 'contactController',
	  templateUrl: 'views/contact.html'
	})
    .otherwise({
      redirectTo: '/'
    });
});

dailyApp.factory('dataService', ['$scope','$http', '$q', function ($scope, $http, $q) {
	var services = {
		getDatas: function() {
			var deferred = $q.defer(); // Déclaration de la variable
		    $http.get('content/data.json').then(function(data){
		  	  deferred.resolve(data); // J'envoie à la promesse les valeurs
		    }, function(data){
		  	  deferred.reject('Erreur'); // j'envoie l'erreur à la promesse
		    });
		    return  deferred.promise; // n'est lancé que si resolve ou reject est lancé
		}
	};
	return services;
}]);

dailyApp.controller('accueilController', ['$scope', 'dataService', function($scope, dataService) {
  $scope.message = "Bienvenue sur la page accueil";
	$scope.datas = dataService.getDatas();
}]);

dailyApp.controller('galerieController', ['$scope', function($scope) {
  $scope.message = "Bienvenue sur la page de la galerie";
}]);

dailyApp.controller('contactController', ['$scope', function($scope) {
  $scope.message = "Bienvenue sur la page de contact";
}]);
