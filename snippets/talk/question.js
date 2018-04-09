var answer = "Now that's a good question";

module.exports.ask = function(question) {
    console.log(question);
    return answer;
};

module.exports.whatIsTheMeaningOfLife = function() {
    console.log("Answer to the Ultimate Question of Life, the Universe, and Everything is 42");
}