var app = angular.module('app', ['ngRoute','ngRoute','restangular']);

app.controller('MainController', function($scope, Restangular, $rootScope) {

	$scope.range = function(n) {
        return new Array(n);
    };
 	var img = "http://res.cloudinary.com/nickysemenza/image/upload/c_limit,e_blur:2000,r_0,w_1000/v1460588400/recipe-hub/beef-tacos.jpg";
	$rootScope.bg_img = "url('"+img+"')";
});
app.controller('RecipeDetailController', function($scope, Restangular,$routeParams, $rootScope) {
	var slug = $routeParams.slug;

	Restangular.one('recipes/'+slug).get().then(function(data) {
	  $scope.r=data;
	});	

	var img = "http://res.cloudinary.com/nickysemenza/image/upload/c_limit,e_blur:1766,r_0,w_1000/v1460588400/recipe-hub/cinnamon.jpg";
	$rootScope.bg_img = "url('"+img+"')";
});

app.controller('RecipeEditDetailController', function($scope, Restangular,$routeParams, $rootScope) {
	var slug = $routeParams.slug;

	Restangular.one('recipes/'+slug).get().then(function(data) {
	  $scope.r=data;
	});

	$scope.update = function()
	{
		console.log($scope.r);
		Restangular.one('recipes/'+slug).customPUT($scope.r).then(function(data) {
		  // $scope.r=data;
		});
	}



	$rootScope.bg_img = "url('')";
});

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/:slug/edit', {
			templateUrl: 'views/recipe-edit.html',
			controller: 'RecipeEditDetailController'
		})
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