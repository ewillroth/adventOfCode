const fs = require('fs');

const input = fs.readFileSync('./14_input.txt', 'utf-8');

const rows = input.split('\n');

const start = rows[0];

const rules = rows.filter((row) => row.includes(' -> '));

const map = {};

rules.forEach((rule) => {
	const rulePair = rule.split(' -> ')[0];
	const insert = rule.split(' -> ')[1];
	map[rulePair] = insert;
});

const applyRules = (string) => {
	const letters = string.split('');
	const pairs = [];
	let newPairs = string[0];
	letters.forEach((letter, index) => {
		if (letters[index + 1]) pairs.push(letter + letters[index + 1]);
	});
	while (pairs.length) {
		const pair = pairs.shift();
		if (Object.keys(map).includes(pair)) {
			newPairs = newPairs + map[pair] + pair[1];
		}
	}
	return newPairs;
};

for (let i = 0; i < 40; i++) {
	console.log(i);
	let nextString;
	if (i === 0) {
		nextString = applyRules(start);
		fs.writeFileSync(`14_string_${i}`, nextString);
	} else {
		const previous = fs.readFileSync(`14_string_${i - 1}`, 'utf-8');
		nextString = applyRules(previous);
		fs.writeFileSync(`14_string_${i}`, nextString);
	}

	const counts = {};
	nextString.split('').forEach((letter) => {
		if (!counts[letter]) {
			counts[letter] = 1;
		} else {
			counts[letter] = counts[letter] + 1;
		}
	});

	fs.writeFileSync(`14_${i}.txt`, JSON.stringify(counts));
}

const counts = {};
strings[39].split('').forEach((letter) => {
	if (!counts[letter]) {
		counts[letter] = 1;
	} else {
		counts[letter] = counts[letter] + 1;
	}
});

console.log(counts);

const letters = Object.keys(counts).sort((a, b) => counts[a] - counts[b]);
console.log(counts[letters[0]]);
console.log(counts[letters[letters.length - 1]]);
