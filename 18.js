const fs = require('fs');

const input = fs.readFileSync('./18_input.txt', 'utf-8');

const numbers = input.split('\n');

let start;

/*
If any pair is nested inside four pairs, the leftmost such pair explodes.
If any regular number is 10 or greater, the leftmost such regular number splits.
 */

const isReduced = () => {};
const reduce = (weirdArrayNumber) => {
	let levels = 0;
};

numbers.forEach((number, index) => {
	if (index === 0) {
		start = number;
	} else {
		/// add!
		let newNumber = [start, number];
		console.log(newNumber);
		/// reduce!
		newNumber = reduce(newNumber);
	}
});
