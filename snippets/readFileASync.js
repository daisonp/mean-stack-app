var fs = require('fs');

// anonynmous function
console.log("Going to get a file");
fs.readFile('readFileSync.js', function(err, file) {
    console.log("Got the file");
});

console.log("App continues.....");



// named function
var onFileLoad = function(err, file) {
    console.log("Got the file with named function");
};
fs.readFile('readFileSync.js', onFileLoad);
