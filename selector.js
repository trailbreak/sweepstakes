const lineReader = require('line-reader'),
      Promise = require('bluebird');

let likes = []
let follows = []
let retweets = []
let delegators = []

var eachLine = Promise.promisify(lineReader.eachLine);

eachLine('./entries/likes', function(line) {
	appendEntry(line, 1)
}).then(function() {
	pickWinner('likes');
});

eachLine('./entries/follows', function(line) {
	appendEntry(line, 1)
}).then(function() {
	pickWinner('follows');
});

eachLine('./entries/retweets', function(line) {
	appendEntry(line, 1)
}).then(function() {
	pickWinner('retweets');
});

eachLine('./entries/delegators', function(line) {
	appendEntry(line, 3)
}).then(function() {
	pickWinner('delegators');
});

let entries = []
function appendEntry(entry, weight) {
	if (entry.trim() == "") {
		return
	}
	for (i=0; i < weight; i++) {
		entries.push(entry)
	}
}

var loadCount = 0
function pickWinner(fileName) {
	console.log("Loaded " + fileName)
	loadCount++
	if (loadCount < 4) {
		return
	}

	console.log(entries)

	var winner = entries[Math.floor(Math.random()*entries.length)];
	console.log("The winner is: " + winner)
}
