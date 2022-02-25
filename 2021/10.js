const fs = require('fs');

const input = fs.readFileSync('./10_input.txt', 'utf-8');

const testInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const rows = input.split('\n');

const allFirsts = [];
const allExtras = [];

const doTheThing = (string) => {
	const invalid = [];
	const extras = [];
	const stack = [];
	const openers = ['(', '{', '<', '['];
	const closers = [')', '}', '>', ']'];
	const matches = {
		'(': ')',
		'{': '}',
		'<': '>',
		'[': ']',
	};
	string.split('').forEach((char) => {
		if (openers.includes(char)) {
			stack.push(char);
		}
		if (closers.includes(char)) {
			const match = stack.pop(char);
			if (matches[match] !== char) invalid.push(char);
		}
	});
	if (invalid.length === 0) {
		stack.reverse().forEach((char) => extras.push(matches[char]));
	}
	return { invalid: invalid, extras: extras };
};

rows.forEach((row) => {
	const { invalid, extras } = doTheThing(row);
	allFirsts.push(invalid[0]);
	allExtras.push(extras);
});

const findScore = (arr) => {
	let total = 0;
	const scores = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
	arr.forEach((char) => {
		total += scores[char];
	});
	return total;
};

const findScoreTwo = (arr) => {
	const stringScores = [];
	const scores = { ')': 1, ']': 2, '}': 3, '>': 4 };
	arr.forEach((array) => {
		let score = 0;
		array.forEach((char) => {
			score = score * 5 + scores[char];
		});
		stringScores.push(score);
	});
	const sortedScores = stringScores.sort((a, b) => a - b);
	console.log('sortedScores', sortedScores);
	const middleScore = sortedScores[Math.floor(sortedScores.length / 2)];
	return middleScore;
};
console.log(allFirsts);
console.log('part 1', findScore(allFirsts.filter((val) => !!val)));
console.log(allExtras);
console.log('part 2', findScoreTwo(allExtras.filter((val) => val.length > 0)));
