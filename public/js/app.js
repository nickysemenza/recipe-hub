var app = angular.module('app', ['ngRoute','ngRoute','restangular']);

app.controller('MainController', function($scope, Restangular) {

});
app.controller('RecipeDetailController', function($scope, Restangular,$routeParams) {
	var slug = $routeParams.slug;

	Restangular.one('recipes/'+slug).get().then(function(data) {
	  console.log(data);
	  $scope.r=data;
	});	

});

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/:slug', {
			templateUrl: 'views/recipe.html',
			controller: 'RecipeDetailController'
		})
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		});
	$locationProvider.html5Mode(true);
}]);