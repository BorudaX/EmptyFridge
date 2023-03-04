var fs = require('fs');

var dirname = "C:/Users/ruben/Documents/GitHub/EmptyFridge/data/";
var filenames = fs.readdirSync(dirname);

var str;

filenames.forEach(function (filename) {

    var obj = {};

    console.log("Processing " + filename);
    csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));

    csv.forEach(function (row) {

        str = row.title;
        delete row.title;
        obj[str] = row;

    });

    fs.writeFileSync(dirname + filename, JSON.stringify(obj));
    console.log("Done " + filename);
});