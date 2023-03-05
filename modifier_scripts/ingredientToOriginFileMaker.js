var fs = require('fs');

var dirname = "C:/Users/ruben/Documents/GitHub/EmptyFridge/data/";
var filenames = fs.readdirSync(dirname);

var obj = {};

filenames.forEach(function (filename) {

    console.log("Processing " + filename);
    csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));

    Object.keys(csv).forEach(function (row) {

        obj[row] = filename;
       
    });


    console.log("Done " + filename);
});

fs.writeFileSync(dirname + "ingredientToOriginFile.json", JSON.stringify(obj));