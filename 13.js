const fs = require('fs');

const input = fs.readFileSync('./13_input.txt', 'utf-8');

const dots = input
	.split('fold')[0]
	.split('\n')
	.filter((val) => val.length > 0);

const foldInstructions = input
	.split('fold along')
	.filter((val) => val.includes('='))
	.map((val) => val.trim());

const map = {};

for (let i = 0; i < 997; i++) {
	for (let j = 0; j < 997; j++) {
		map[`${i},${j}`] = '_';
	}
}

dots.forEach((coordinate) => {
	const x = coordinate.split(',')[0];
	const y = coordinate.split(',')[1];
	map[`${x},${y}`] = 'o';
});

const fold = (axis, foldNumber) => {
	Object.keys(map).forEach((key) => {
		const previousValue = map[key];
		const previousX = +key.split(',')[0];
		const previousY = +key.split(',')[1];
		if (axis === 'x') {
			if (previousX <= foldNumber) {
				return;
			}
			if (previousValue === 'o') {
				map[`${foldNumber - (previousX - foldNumber)},${previousY}`] =
					'o';
			}
		} else if (axis === 'y') {
			if (previousY <= foldNumber) {
				return;
			}
			if (previousValue === 'o') {
				map[`${previousX},${foldNumber - (previousY - foldNumber)}`] =
					'o';
			}
		}
	});
	Object.keys(map).forEach((key) => {
		const previousX = +key.split(',')[0];
		const previousY = +key.split(',')[1];
		if (axis === 'y') {
			if (previousY >= foldNumber) {
				map[`${previousX},${previousY}`] = null;
			}
		}
		if (axis === 'x') {
			if (previousX >= foldNumber) {
				map[`${previousX},${previousY}`] = null;
			}
		}
	});
};

fold('x', 655);
fold('y', 447);
fold('x', 327);
fold('y', 223);
fold('x', 163);
fold('y', 111);
fold('x', 81);
fold('y', 55);
fold('x', 40);
fold('y', 27);
fold('y', 13);
fold('y', 6);

let biggestX = 0;
let biggestY = 0;

let zero = '';
let one = '';
let two = '';
let three = '';
let four = '';
let five = '';

Object.keys(map)
	.filter((val) => map[val] !== null)
	.forEach((val) => {
		console.log(val);
		const x = +val.split(',')[0];
		const y = +val.split(',')[1];
		switch (y) {
			case 0:
				zero = zero + map[val];
				break;
			case 1:
				one = one + map[val];
				break;
			case 2:
				two = two + map[val];
				break;
			case 3:
				three = three + map[val];
				break;
			case 4:
				four = four + map[val];
				break;
			case 5:
				five = five + map[val];
				break;
		}
	});

console.log(
	zero + '\n' + one + '\n' + two + '\n' + three + '\n' + four + '\n' + five
);

`RKHFZGUB`;
