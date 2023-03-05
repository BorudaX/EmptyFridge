var fs = require('fs');

var dirname = "C:/Users/alanl/OneDrive/Documents/GitHub/UW-Madison-CS/EmptyFridge/data/";
var filenames = fs.readdirSync(dirname);

var str;

var obj = {};

var count = 0;

var existingRecipes = [];

filenames.forEach(function (filename) {

    console.log("Processing " + filename);
    csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));

    Object.keys(csv).forEach(function (row) {
        // Iterate through ingredient
        var NER = csv[row].NER;
        var nerLength;
        if (NER !== undefined) {
            nerLength = NER.length;
        }
        for (var i = 0; i < nerLength; i++) {
            score = 1 / (nerLength); 
            score = score.toFixed(3); // trunactes it to 3 decimal places
            if (!existingRecipes.includes(row)) { // if this is a new title, then add it to the array; otherwise do nothing
                if (obj[NER[i]]) {
                    obj[NER[i]].push([row, score]); // If ingredient is a title in obj, add recipe to obj's part
                }
                else {
                    obj[NER[i]] = [[row, score]]; // If ingredient is not a title in obj, add ingredient as title and recipe as value
                }
                console.log[row];
                existingRecipes.push(row);
            }
        }

    });


    console.log("Done " + filename);
});
console.log("Saving file to:" + dirname + "Ingredient" + count + ".json");
fs.writeFileSync(dirname + "Ingredient" + count + ".json", JSON.stringify(obj));