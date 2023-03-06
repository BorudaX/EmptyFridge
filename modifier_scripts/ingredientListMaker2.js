var fs = require('fs');

var dirname = "C:/Users/giris/Repos/EmptyFridge/data/";
// var filenames = fs.readdirSync(dirname);

var filename = "IngredientDict0.json"
var str;

var obj = {};

var count = 0;

// filenames.forEach(function (filename) {
console.log("Processing " + filename);
json = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));

Object.keys(json).forEach(function (ingr) {

    // Iterate through ingredient
    var recipes = Object.keys(json[ingr]);

    obj[ingr] = [];
    for (let i = 0; i < recipes.length; i++) {
        obj[ingr].push([
            recipes[i],
            (json[ingr][recipes[i]]).toFixed(3)
        ]);
    }

});


console.log("Done " + filename);
// });

fs.writeFileSync(dirname + "Ingredient" + count + ".json", JSON.stringify(obj));