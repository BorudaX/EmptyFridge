var fs = require('fs');

var dirname = "C:/Users/alanl/OneDrive/Documents/GitHub/UW-Madison-CS/EmptyFridge/data/";
// var filenames = fs.readdirSync(dirname);

var filename = "Ingredient0.json";
csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));
var str;

var obj = {};

var count = 0;

    console.log("Processing " + filename);

Object.keys(csv).forEach(function (row) {
    obj[row] = csv[row].sort(compare); // sort through each value of the hashtable
});


    console.log("Done " + filename);
function compare(a, b) {
    if (Number(a[1]) < Number(b[1])) {
        return 1;
    }
    else if (Number(a[1]) > Number(b[1])) {
        return -1;
    }
    else {
        return 0;
    }
}
fs.writeFileSync(dirname + "Ingredient" + count + ".json", JSON.stringify(obj));