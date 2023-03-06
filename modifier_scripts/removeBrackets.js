var fs = require('fs');

var dirname = "C:/Users/giris/Repos/EmptyFridge/data/";
var filenames = fs.readdirSync(dirname);

console.log(filenames);

filenames.forEach(function (filename) {
    if (filename.includes("RecipeNLG")) {
        console.log("Processing " + filename);
        csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));
        keys = Object.keys(csv);

        keys.forEach(function (row) {
            // row.NER[0] = row.NER[0].replace("[", "");
            // row.NER[row.NER.length - 1] = row.NER[row.NER.length - 1].replace("]", "");

            // row.directions[0] = row.directions[0].replace("[", "");
            // row.directions[row.directions.length - 1] = row.directions[row.directions.length - 1].replace("]", "");

            csv[row].ingredients[0] = csv[row].ingredients[0].replace("[", "");
            csv[row].ingredients[csv[row].ingredients.length - 1] = csv[row].ingredients[csv[row].ingredients.length - 1].replace("]", "");

            // delete row.source;
            // delete row.i;
        });

        fs.writeFileSync(dirname + filename, JSON.stringify(csv));
        console.log("Done " + filename);
    }
});