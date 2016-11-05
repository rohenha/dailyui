var dailyApp = angular.module("dailyApp", []);

// dailyApp.config(function ($routeProvider) {
//   $routeProvider
// 	.when('/', {
// 	  controller: 'HomeController',
// 	  templateUrl: 'views/galerie.html'
//   })
//   .when('/galerie', {
// 	controller: 'HomeController',
// 	templateUrl: 'views/galerie.html'
//   });
// });

dailyApp.run(function($rootScope, $templateCache) {
	$templateCache.removeAll();
	var isshow = localStorage.getItem('isshow');

	if (isshow != null) {
		console.log(localStorage.getItem('isshow'));
		$('body').addClass('open');
		$('body').addClass('still');
	}else{  localStorage.setItem('isshow', 1); }

   $rootScope.prehome = function(){ $('body').addClass('open'); };

	$('#prehome.load').removeClass('load');
});

dailyApp.factory('dataService', ['$rootScope','$http', '$q', function ($rootScope, $http, $q) {
	return {
		getDatas: function() {
			var deferred = $q.defer(); // Déclaration de la variable
		    $http.get('content/data.json',{cache:false}).then(function(response){
		  	  deferred.resolve(response.data); // J'envoie à la promesse les valeurs
		  }, function(response){
		  	  deferred.reject('Erreur'); // j'envoie l'erreur à la promesse
		    });
		    return  deferred.promise; // n'est lancé que si resolve ou reject est lancé
		}
	};
}]);

dailyApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

dailyApp.controller('HomeController', ['$scope', 'dataService',function($scope,dataService) {
	dataService.getDatas().then(function(data) { $scope.datas = data; });
	$scope.lightbox=function(project){
			$('#lightbox img').attr('src', project.imgjpg);
			$('#lightbox h3').empty().append(project.nom);
			$('#lightbox img').attr('alt',project.nom);
			$('#lightbox').addClass("active");
	};
	$scope.closeLightbox=function(){
		$('#lightbox').removeClass('active');
	};
}]);


$(document).ready(function() {
	$(document).scroll(function(){
        var scrollTop = $(this).scrollTop();
        if(scrollTop > 150){
            $("header").addClass('fixed');
			$('#btnUp').addClass('active');
        }else {
            $("header").removeClass('fixed');
			$('#btnUp').removeClass('active');
        }
    });

	$('#btnUp').on('click', function(){
		$('html, body').animate({
			scrollTop:0
		}, 'slow');
	});

});
