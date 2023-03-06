var fs = require('fs');

var dirname = "C:/Users/alanl/OneDrive/Documents/GitHub/UW-Madison-CS/EmptyFridge/data/";
// var filenames = fs.readdirSync(dirname);

var filename = "Ingredient0.json";
csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));
var str;

var obj = {};

var count = 0;

console.log("Processing " + filename);
// var size = Object.keys(csv).length;

var firstElements = {};
var keyValues = Object.keys(csv);

for (let j = 0; j < keyValues.length; j++) {
    var obj;
    var arr = csv[keyValues[j]];

    arr = arr.filter((item,
        index) => arr.indexOf(item) === index);

    
    csv[keyValues[j]] = arr;
}

console.log("Done " + filename);
fs.writeFileSync(dirname + "IngredientSorted" + count + ".json", JSON.stringify(csv));