const lineReader = require('line-reader'),
      Promise = require('bluebird'),
	  Prando = require('prando');

var now = new Date();
var drawingTime = Date.parse('04/14/2020 20:00:00 GMT');
var waitTime = drawingTime - now.getTime();

console.log("Pausing Until Start Time", drawingTime);
console.log("Waiting " + waitTime/1000 + "seconds");
console.log("Waiting " + waitTime + "ms");
setTimeout(sweepstakes, waitTime)

function sweepstakes() {
	var eachLine = Promise.promisify(lineReader.eachLine);
	eachLine('./entries/likes', function(line) {
		appendEntry(line, 1)
	}).then(function() {
		console.log("Loaded likes")
		eachLine('./entries/follows', function(line) {
			appendEntry(line, 1)
		}).then(function() {
			console.log("Loaded follows")
			eachLine('./entries/retweets', function(line) {
				appendEntry(line, 1)
			}).then(function() {
				console.log("Loaded retweets")
				eachLine('./entries/delegators', function(line) {
					appendEntry(line, 3)
				}).then(function() {
					console.log("Loaded delegators")
					pickWinner();
				});
			});
		});
	});
}

let entries = []
function appendEntry(entry, weight) {
	if (entry.trim() == "") {
		return
	}
	for (i=0; i < weight; i++) {
		entries.push(entry)
	}
}

function pickWinner() {
	d = new Date()
	ts = d.getTime()
	console.log("Date:", d)
	console.log("Timestamp:", ts)

	let rng = new Prando(ts);
	let winningIdx = rng.nextInt(0, entries.length);
	console.log(entries)

	var winner = entries[winningIdx];
	console.log("The winner is: " + winner)
}
