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

dailyApp.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});

dailyApp.factory('dataService', ['$rootScope','$http', '$q', function ($rootScope, $http, $q) {
	return {
		getDatas: function() {
			var deferred = $q.defer(); // Déclaration de la variable
		    $http.get('content/data.json').then(function(response){
		  	  deferred.resolve(response.data); // J'envoie à la promesse les valeurs
		  }, function(response){
		  	  deferred.reject('Erreur'); // j'envoie l'erreur à la promesse
		    });
		    return  deferred.promise; // n'est lancé que si resolve ou reject est lancé
		}
	};
}]);

dailyApp.controller('accueilController', ['$scope', 'dataService', '$http', '$q', function($scope, dataService) {
  	$scope.message = "Bienvenue sur la page accueil";
	$scope.index = 0;
	dataService.getDatas().then(function(data) {
		$scope.datas = data;
		$scope.project = data[$scope.index];
	});

	$scope.previousProject = function(){
		$scope.index > 0 ? $scope.index -- : $scope.index= $scope.datas.length -1 ;
		$scope.project= $scope.datas[$scope.index];
	}

	$scope.nextProject = function(){
		$scope.index+1<$scope.datas.length ? $scope.index ++ : $scope.index = 0;
		$scope.project= $scope.datas[$scope.index];
	}


}]);

dailyApp.controller('galerieController', ['$scope', 'dataService', function($scope,dataService) {
  $scope.message = "Bienvenue sur la page de la galerie";
  dataService.getDatas().then(function(data) {
	  $scope.datas = data;
  });

}]);

dailyApp.controller('contactController', ['$scope', function($scope) {
  $scope.message = "Bienvenue sur la page de contact";
}]);


$(document).ready(function() {
	$('.zoom-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}

	});
});
