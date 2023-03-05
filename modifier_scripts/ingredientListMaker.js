var fs = require('fs');

var dirname = "C:/Users/alanl/OneDrive/Documents/GitHub/UW-Madison-CS/EmptyFridge/data/";
var filenames = fs.readdirSync(dirname);

var str;

var obj = {};

var count = 0;

filenames.forEach(function (filename) {
    if (filename.includes("RecipeNLG")) {
        console.log("Processing " + filename);
        csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));

        Object.keys(csv).forEach(function (row) {

            // Iterate through ingredient
            var NER = csv[row].NER;
            if (NER !== undefined) {
                nerLength = NER.length;
            }
        
            for (let i = 0; i < NER.length; i++) {
                if (obj[NER[i]] == undefined) {
                    obj[NER[i]] = {};
                }
            
                // if (obj[NER[i]][row] == undefined) {
                obj[NER[i]][row] = 1 / nerLength;
                // }
            }
       
        });


        console.log("Done " + filename);
    }
});

fs.writeFileSync(dirname + "IngredientDict" + count + ".json", JSON.stringify(obj));