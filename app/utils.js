var getRecipeIngredientsList = function(recipe,quantity) {
    var result = [];
    for(var sectionNum in recipe.sections_ingredients) {
        for(var eachIngredientNum in recipe.sections_ingredients[sectionNum].ingredients) {
            var ingredients = recipe.sections_ingredients[sectionNum].ingredients[eachIngredientNum].toObject();
            ingredients.recipe = {name: recipe.name, quantity: quantity};
            //console.log("oo",ingredients);
            result.push(ingredients);
        }
    }
    return result;
};
var scaleRecipeIngredientsList = function(aaa, scale) {
    var ingredientsList = JSON.parse(JSON.stringify(aaa));
    //TODO: var x = {myProp: "value"};
    //var y = Object.assign({}, x);

    for(var each in ingredientsList) {//TODO: ES6 spread??
        ingredientsList[each].quantity=ingredientsList[each].quantity*scale;
        ingredientsList[each].grams=ingredientsList[each].grams*scale;
    }
    return ingredientsList;
};
var addIngredientListToShoppingList = function(ingredientsList, shoppingList) {
    for(var x in ingredientsList) {
        each = ingredientsList[x];
        if(!shoppingList[each.ingredient])
            shoppingList[each.ingredient] = {items: []};
        shoppingList[each.ingredient].items.push({quantity: each.quantity,quantity_unit: each.quantity_unit, grams: each.grams, recipe: each.recipe})
    }
    return shoppingList;
};
module.exports = {
    getRecipeIngredientsList: getRecipeIngredientsList,
    scaleRecipeIngredientsList: scaleRecipeIngredientsList,
    addIngredientListToShoppingList: addIngredientListToShoppingList
};