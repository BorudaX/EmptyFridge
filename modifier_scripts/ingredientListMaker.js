var fs = require('fs');

var dirname = "C:/Users/alanl/OneDrive/Documents/GitHub/UW-Madison-CS/EmptyFridge/data/";
var filenames = fs.readdirSync(dirname);

var str;

var obj = {};

var count = 0;

filenames.forEach(function (filename) {

    console.log("Processing " + filename);
    csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));

    Object.keys(csv).forEach(function (row) {

        // Iterate through ingredient
        var NER = csv[row].NER;
        if (NER !== undefined) {
            nerLength = NER.length;
        }
        for (var i = 0; i < nerLength; i++) {
            if (obj[NER[i]]) {
                obj[NER[i]].push(row); // If ingredient is a title in obj, add recipe to obj's part
            
            }
            else {
                obj[NER[i]] = [row]; // If ingredient is not a title in obj, add ingredient as title and recipe as value
            }
        }
       
    });


    console.log("Done " + filename);
});

fs.writeFileSync(dirname + "Ingredient" + count + ".json", JSON.stringify(obj));