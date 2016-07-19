var getRecipeIngredientsList = function(recipe) {
    var result = [];
    for(var sectionNum in recipe.sections_ingredients) {
        for(var eachIngredientNum in recipe.sections_ingredients[sectionNum].ingredients) {
            result.push(recipe.sections_ingredients[sectionNum].ingredients[eachIngredientNum]);
        }
    }
    return result;
};
var scaleRecipeIngredientsList = function(aaa, scale) {
    var ingredientsList = JSON.parse(JSON.stringify(aaa));
    //TODO: var x = {myProp: "value"};
    //var y = Object.assign({}, x);

    for(each in ingredientsList) {//TODO: ES6 spread??
        ingredientsList[each].quantity=ingredientsList[each].quantity*scale;
        ingredientsList[each].grams=ingredientsList[each].grams*scale;
    }
    return ingredientsList;
};
var addIngredientListToShoppingList = function(ingredientsList, shoppingList) {
    for(x in ingredientsList) {
        each = ingredientsList[x];
        if(!shoppingList[each.ingredient])
            shoppingList[each.ingredient] = {items: []};
        shoppingList[each.ingredient].items.push({quantity: each.quantity,quantity_unit: each.quantity_unit, grams: each.grams,})
    }
    return shoppingList;
};
module.exports = {
    getRecipeIngredientsList: getRecipeIngredientsList,
    scaleRecipeIngredientsList: scaleRecipeIngredientsList,
    addIngredientListToShoppingList: addIngredientListToShoppingList
};