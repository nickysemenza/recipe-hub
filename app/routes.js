var settings = require('.././settings');
var Recipe = require('./models/recipe');
var RecipeIngredient = require('./models/recipeingredient');

module.exports = function(app) {
	app.get('/seed', function(req, res) {


		var ingredient_ids = [];
		var names = ['eggs','flour','water'];
		names.forEach(function(i) {
			var ing = new RecipeIngredient;
			ing.ingredient = i;
			ing.quantity = 2.5;
			ing.quantity_unit = "cups";
			ing.extra_info = "yay";
			ing.grams = 250;
			ing.save(function(err, item){
				console.log(item);
				ingredient_ids.push(item._id);
				if(names.length == ingredient_ids.length)
	        		cb_funct(ingredient_ids);
	    	});
		})

		cb_funct = function(input) {
			console.log("done!");
			console.log(input);

			var r = new Recipe();
			r.name = "Cinnamon Buns";
			r.slug = "cinnamon-buns";
			r.description = "Yum";
			r.photo = "todo";
			r.serves = 4;
			r.makes_quantity = 8;
			r.makes_noun = "buns";
			r.time_total = "4 hours";
			r.time_details = "20 minutes prep + 3 hours rising + 40 minutes baking";
			r.original_source = "Cook's Illustrated Baking Book"
			r.tags = ['yummy','sweet','baking'];
			r.tools = ['mixer','oven'];
			r.sections_instructions = [{title: "section 1", body: "hi2"},{title: "section 2", body: "hi3"}];

			r.sections_ingredients.push({title: "section 111", ingredients: input});
			r.sections_ingredients.push({title: "section 123", ingredients: input});

			var opts = [{ path: 'sections_ingredients.ingredients'}];
			r.save(function(err, r) {
				Recipe.populate(r, opts, function (err, user) {
				    res.json(user);
				})
		    });
		}

		
	});
	app.get('/recipes', function(req, res) {
		Recipe
		.find({},{name: 1, photo: 1, tags: 1})
		// .populate('sections_ingredients.ingredients')
		.exec(function (err, doc){
		  res.json(doc);
		});
	});
	app.get('/recipes/:slug', function(req, res) {
		Recipe
		.findOne({ slug: req.params.slug})
		.populate('sections_ingredients.ingredients')
		.exec(function (err, doc){
		  res.json(doc);
		});
	});
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};