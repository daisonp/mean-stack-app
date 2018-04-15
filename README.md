# The complete javascript developer - mean stack zero to hero

The MEAN stack is

+ **M** ongo - A NoSQL database
+ **E** xpress - A webserver
+ **A** ngularJS - a javascript front end framework
+ **N** odeJS - javascript runtime engine

---
## Node JS

**Download from** https://nodejs.org/en/

### Console commands
| Description | command | Example |
|-------------|---------|---------|
| Check version of node installed | `node -v` |
| Check version of npm installed | `npm -v` |
| To run a node program | `node <javascript file>` | `node ./snippets/hello-world.js` |
| Install npm package globally | `npm install -g <package name>` | -- install globally
| install locally and update dependencies in package.json | `npm i --save <package name>` |  
| install locally and update devDependcies in package.json | `npm install --save-dev <package name>` | --


---
## Javascript tidbits

**How to export functions from a file.**

The `module.exports` command is used to export functions from a source file.  There are a number of different ways this can be used, these are;

Export an anonymous function
```javascript
./snippets/Goodbye.js
----------------------

module.exports = function() {
    console.log("Goodbye!");
};
```
Export named functions 
```javascript
./talk/question.js
------------------

var answer = "Now that's a good question";

module.exports.ask = function(question) {
    console.log(question);
    return answer;
};

module.exports.whatIsTheMeaningOfLife = function() {
    console.log("Answer to the Ultimate Question of Life, the Universe, and Everything is 42");
}
```

Export multiple functions
```javascript
./talk/index.js
-----------------

var filename = "index.js";

var hello = function(name) {
    console.log("Hello " +name);
}; 

var intro = function () {
    console.log("I'm a node file called " +filename);
};

module.exports = {
    hello : hello,
    intro : intro
};
```

**How to import external functions**

Importing functions from external files is done using the `require` command. Examples of importing and using functions;
```javascript
require('./instanthello');  // import and run the code straight away
var goodbye = require('./../talk/goodbye'); // import the function and storing in the variable
var talk = require('./../talk'); // look for a talk.js file and if not found treat talk as and directory and look for an index.js file
var question = require('./../talk/question');

talk.intro();
talk.hello("bob");

var answer = question.ask("What is the meaning of life?");
console.log(answer);
question.whatIsTheMeaningOfLife();

goodbye();
```

  

---
## Application API

**_Hotels_**
| Method | URL                  | Action                     |
|--------|----------------------|----------------------------|
| GET    | /api/hotels          | Get all / Multiple hotels  |
| POST   | /api/hotels          | Create a new hotel         |
| GET    | /api/hotels/:hotelid | Get a specific hotel       |
| PUT    | /api/hotels/:hotelid | Update a specific hotel    |
| DELETE | /api/hotels/:hotelid | Delete a specific hotel    |


**_Hotel Reviews_**
| Method | URL                                    | Action                                        |
|--------|----------------------------------------|-----------------------------------------------|
| GET    | /api/hotels/:hotelid/reviews           | Get all reviews for a specific hotel          |
| POST   | /api/hotels/:hotelid/reviews           | Add reviews for a specific hotel              |
| GET    | /api/hotels/:hotelid/reviews/:reviewId | Get a specific review for a specific hotel    |
| PUT    | /api/hotels/:hotelid/reviews/:reviewId | Update a specific review for a specific hotel |
| DELETE | /api/hotels/:hotelid/reviews/:reviewId | Delete a specific review for a specific hotel |


