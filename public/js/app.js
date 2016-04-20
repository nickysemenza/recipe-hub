var app = angular.module('app', ['ngRoute','ngRoute','restangular','LocalStorageModule']);

app.controller('MainController', function($scope, Restangular, $rootScope) {

	$scope.range = function(n) {
        return new Array(n);
    };
 	var img = "http://res.cloudinary.com/nickysemenza/image/upload/c_limit,e_blur:2000,r_0,w_1000/v1460588400/recipe-hub/beef-tacos.jpg";
	$rootScope.bg_img = "url('"+img+"')";


	Restangular.one('recipes').get().then(function(data) {
	  $scope.recipes=data;
	});	

});
app.controller('RecipeDetailController', function($scope, Restangular,$routeParams, $rootScope, localStorageService) {
	var slug = $routeParams.slug;

	$scope.is_logged_in = (localStorageService.get('token') != null)

	Restangular.one('recipes/'+slug).get().then(function(data) {
	  $scope.r=data;
	});	

	$scope.scalePortionUp = function()
	{
		$scope.portion_scale++;
	}
	$scope.scalePortionDown = function()
	{
		$scope.portion_scale--;
		if($scope.portion_scale < 1)
			$scope.portion_scale = 1;
	}

	$scope.portion_scale = 1;

	var img = "http://res.cloudinary.com/nickysemenza/image/upload/c_limit,e_blur:1766,r_0,w_1000/recipe-hub/"+slug+".jpg";
	$rootScope.bg_img = "url('"+img+"')";
});

app.controller('RecipeEditDetailController', function($scope, Restangular,$routeParams, $rootScope, localStorageService) {
	var slug = $routeParams.slug;

	Restangular.one('recipes/'+slug).get().then(function(data) {
	  $scope.r=data;
	});

	$scope.update = function()
	{
		console.log($scope.r);
		Restangular.setDefaultHeaders({token: localStorageService.get('token')});
		Restangular.one('recipes/'+slug).customPUT($scope.r).then(function(data) {
		  // $scope.r=data;
		});
	}

	$scope.deleteTag = function(index)
	{
		$scope.r.tags.splice(index, 1);
	}
	$scope.addTag = function()
	{
		$scope.r.tags.push("aay");
	}
	$scope.deleteTool = function(index)
	{
		$scope.r.tools.splice(index, 1);
	}
	$scope.addTool = function()
	{
		$scope.r.tools.push("aay");
	}
	$scope.deleteIcon = function(index)
	{
		$scope.r.icons.splice(index, 1);
	}
	$scope.addIcon = function()
	{
		$scope.r.icons.push("aay");
	}

	$scope.addInstructionSection = function()
	{
		$scope.r.sections_instructions.push({"title": "a","body":["aa"]});
	}
	$scope.delInstructionSection = function(index)
	{
		console.log(index);
		$scope.r.sections_instructions.splice(index, 1);
	}
	$scope.delInstructionSubSection = function(s1,s2) {
		console.log(s1,s2);
		$scope.r.sections_instructions[s1].body.splice(s2, 1);
	}
	$scope.addInstructionSubSection = function(index) {
		console.log($scope.r.sections_instructions,index);
		$scope.r.sections_instructions[index].body.push("aaa");
	}

	$scope.addIngredientSection = function()
	{
		$scope.r.sections_ingredients.push(
			{"title": "section 123",
			"ingredients": [
			  {
			    "ingredient": "asdf",
			    "quantity": 2.2,
			    "quantity_unit": "asdf",
			    "grams": 222
			  }]}
			);
	}
	$scope.delIngredientSection = function(index)
	{
		console.log(index);
		$scope.r.sections_ingredients.splice(index, 1);
	}
	$scope.delIngredientSubSection = function(s1,s2) {
		console.log(s1,s2);
		$scope.r.sections_ingredients[s1].ingredients.splice(s2, 1);
	}
	$scope.addIngredientSubSection = function(index) {
		console.log($scope.r.sections_instructions,index);
		$scope.r.sections_ingredients[index].ingredients.push({
		    "ingredient": "asdf",
		    "quantity": 2.2,
		    "quantity_unit": "asdf",
		    "grams": 222
		  });
	}
	$rootScope.bg_img = "url('')";
});

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/:slug/edit', {
			templateUrl: 'views/recipe-edit.html',
			controller: 'RecipeEditDetailController',
			authorize: true
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

app.run(["$rootScope", "$location","localStorageService", function($rootScope, $location, localStorageService) {
        $rootScope.$on("$routeChangeStart", function(evt, to, from) {
            if(to.authorize)
            {
            	if(localStorageService.get('token') == null)
            		$location.path( "/" );
            }
        });
    }]);

app.filter('portion', function($filter) {

  return function(input, multiplier) {
    return input * multiplier;
  };
});