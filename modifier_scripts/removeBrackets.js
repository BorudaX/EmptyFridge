var fs = require('fs');

var dirname = "E:/csv/datajson/";
var filenames = fs.readdirSync(dirname);

console.log(filenames);

filenames.forEach(function (filename) {
    console.log("Processing " + filename);
    csv = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));

    csv.forEach(function (row) {
        row.NER[0] = row.NER[0].replace("[", "");
        row.NER[row.NER.length - 1] = row.NER[row.NER.length - 1].replace("]", "");

        // row.directions[0] = row.directions[0].replace("[", "");
        // row.directions[row.directions.length - 1] = row.directions[row.directions.length - 1].replace("]", "");

        // delete row.source;
        // delete row.i;
    });

    fs.writeFileSync(dirname + filename, JSON.stringify(csv));
    console.log("Done " + filename);
});