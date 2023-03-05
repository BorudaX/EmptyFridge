var fs = require('fs');

var dirname = "C:/Users/alanl/OneDrive/Documents/GitHub/UW-Madison-CS/EmptyFridge/data/";
var filenames = fs.readdirSync(dirname);

var str;

var obj = {};

var count = 0;

var existingRecipes = [];

filenames.forEach(function (filename) {
    if (filename.includes("Recipe")) {
        console.log("Processing " + filename);
        csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));

        Object.keys(csv).forEach(function (recipe) {
            // Iterate through ingredient
            var NER = csv[recipe].NER;
            var nerLength;
            if (NER !== undefined) {
                nerLength = NER.length;
            }

            for (var i = 0; i < nerLength; i++) {
                score = 1 / (nerLength);
                score = score.toFixed(3); // trunactes it to 3 decimal places

                if (obj[NER[i]] == undefined) {
                    obj[NER[i]] = [];
                }

                if (!includes(obj[NER[i]], recipe)) { // if this is a new title, then add it to the array; otherwise do nothing
                    // if (obj[NER[i]]) {
                    obj[NER[i]].push([recipe, score]); // If ingredient is a title in obj, add recipe to obj's part
                }
                else {
                    obj[NER[i]][indexOf(obj[NER[i]], recipe)][1] = score; // If ingredient is not a title in obj, add ingredient as title and recipe as value
                }
                console.log[recipe];
                existingRecipes.push(recipe);
            }

        });


        console.log("Done " + filename);
    }
});
console.log("Saving file to:" + dirname + "Ingredient" + count + ".json");
fs.writeFileSync(dirname + "Ingredient" + count + ".json", JSON.stringify(obj));

function indexOf(array, recipie) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] === recipie) {
            return i;
        }
    }
}

function includes(array, recipe) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === recipe) {
            return true;
        }
    }
    return false;
}