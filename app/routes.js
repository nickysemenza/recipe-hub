var settings = require('.././settings');
var Recipe = require('./models/recipe');

module.exports = function(app) {
	app.get('/seed', function(req, res) {


		
		cb_funct = function(input) {
			console.log("done!");
			console.log(input);

			var r = new Recipe();
			r.name = "Cinnamon Buns";
			r.slug = "cinnamon-buns";
			r.description = "this is a description blah";
			r.photo = "todo";
			r.serves = 4;
			r.makes_quantity = 8;
			r.makes_noun = "buns";
			r.time_total = "4 hours";
			r.time_details = "20 minutes prep + 3 hours rising + 40 minutes baking";
			r.original_source = "Cook's Illustrated Baking Book"
			r.tags = ['yummy','sweet','baking'];
			r.tools = ['mixer','oven'];
			r.icons = ['mixer','oven'];
			r.sections_instructions = [
				{
					title: "dough",
					body: ["Make foil sling for 13 by 9-inch baking pan by folding 2 long sheets of aluminum foil; first sheet should be 13 inches wide and second sheet should be 9 inches wide. Lay sheets of foil in pan perpendicular to each other, with extra foil hanging over edges of pan. Push foil into corners and up sides of pan, smoothing foil flush to pan. Grease foil. Whisk milk and yeast together in liquid measuring cup until yeast dissolves, then whisk in eggs.","Adjust oven rack to middle position and place loaf or cake pan on bottom of oven. Using stand mixer fitted with dough hook, mix flour, cornstarch, sugar, and salt on low speed until combined. Add warm milk mixture in steady stream and mix until dough comes together, about 1 minute. Increase speed to medium and add butter, 1 piece at a time, until incorporated. Continue to mix until dough is smooth and comes away from sides of bowl, about 10 minutes (if dough is still wet and sticky, add up to ¼ cup flour, 1 tablespoon at a time, until it releases from bowl). Turn dough out onto counter and knead to form smooth, round ball. Transfer dough to medium greased bowl, cover with plastic wrap, and transfer to middle rack of oven. Pour 3 cups boiling water into loaf pan in oven, close oven door, and let dough rise until doubled in size, about 2 hours."]
				},
				{
					title: "filling",
					body: ["Combine sugar, cinnamon, and salt in small bowl. Remove dough from oven and turn out onto lightly floured counter. Roll dough into 18-inch square and, leaving ½-inch border around edges, spread butter over dough, then sprinkle evenly with sugar mixture and lightly press sugar mixture into dough. Starting with edge closest to you, roll dough into tight cylinder, pinch lightly to seal seam, and cut into 8 pieces. Transfer pieces, cut side up, to prepared pan. Cover with plastic and let rise in oven until doubled in size, about 1 hour."]
				},
				{
					title: "glaze",
					body: ["Remove buns and water pan from oven and heat oven to 350 degrees. Whisk all glaze ingredients together in medium bowl until smooth. Remove plastic and bake buns until deep golden brown and filling is melted, 35 to 40 minutes, rotating pan halfway through baking. Transfer to wire rack, top buns with ½ cup glaze, and let cool for 30 minutes. Using foil overhang, lift buns from pan and top with remaining glaze. Serve."]
				}
			];

			r.sections_ingredients.push({title: "section 111", ingredients: input});
			r.sections_ingredients.push({title: "section 123", ingredients: input});

			r.save(function(err, r) {
				    res.json(r);
		    });
		}

		var ingredient_ids = [];
		var names = ['eggs','flour','water'];
		names.forEach(function(i) {
			var ing = {};
			ing.ingredient = i;
			ing.quantity = 2.5;
			ing.quantity_unit = "cups";
			ing.extra_info = "yay";
			ing.grams = 250;
			ingredient_ids.push(ing);
			if(names.length == ingredient_ids.length)
        		cb_funct(ingredient_ids);
		})

		
	});
	app.get('/recipes', function(req, res) {
		Recipe
		.find({},{name: 1, photo: 1, tags: 1, slug: 1, description: 1, time_total: 1})
		.exec(function (err, doc){
		  res.json(doc);
		});
	});
	app.get('/recipes/:slug', function(req, res) {
		Recipe
		.findOne({ slug: req.params.slug})
		.exec(function (err, doc){
		  res.json(doc);
		});
	});
	app.put('/recipes/:slug', function(req, res) {
		if(req.headers.token != settings.token)//auth
		{
			res.json("not allowed!");
			return;
		}
		var conditions = { slug: req.params.slug};
		var update = req.body;
		var options = { multi: true };

		Recipe.update(conditions, update, options, callback);

		function callback (err, numAffected) {
			console.log(err);
			console.log(numAffected);
			res.json("yay");
		}
	});
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};