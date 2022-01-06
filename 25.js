const fs = require('fs');

const input = fs.readFileSync('./25_input.txt', 'utf-8');

const testInput = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

const identifyCucumber = (string) => {
	if (string === '>') return `0,1`;
	if (string === 'v') return `1,0`;
	if (string === '.') return `0,0`;
};

const rows = input.split('\n');
const data = rows.map((row) => row.split(''));
const bottomEdge = rows.length - 1;
const rightEdge = data[0].length - 1;

const moveStep = () => {
	const eastmoverz = [];
	const southmoverz = [];
	data.forEach((row, rowIndex) => {
		row.forEach((val, valIndex) => {
			const cucumber = identifyCucumber(val);
			const cucumberIdentifier = val;
			if (cucumberIdentifier !== '>') return;
			if (+cucumber.split(',')[0] === 0 && +cucumber.split(',')[1] === 0)
				return;
			let x = rowIndex + +cucumber.split(',')[0];
			let y = valIndex + +cucumber.split(',')[1];
			if (x > bottomEdge) x = 0;
			if (y > rightEdge) y = 0;
			if (data[x][y] === '.' && cucumberIdentifier === '>')
				eastmoverz.push(`${rowIndex},${valIndex}`);
			if (data[x][y] === '.' && cucumberIdentifier === 'v')
				southmoverz.push(`${rowIndex},${valIndex}`);
		});
	});
	eastmoverz.forEach((val) => {
		const x = +val.split(',')[0];
		const y = +val.split(',')[1];
		const cucumber = identifyCucumber(data[x][y]);
		const cucumberIdentifier = data[x][y];
		let newX = x + +cucumber.split(',')[0];
		let newY = y + +cucumber.split(',')[1];
		if (newX > bottomEdge) newX = 0;
		if (newY > rightEdge) newY = 0;
		if (data[newX][newY] === '.') {
			data[newX][newY] = cucumberIdentifier;
			data[x][y] = '.';
		}
	});
	data.forEach((row, rowIndex) => {
		row.forEach((val, valIndex) => {
			const cucumber = identifyCucumber(val);
			const cucumberIdentifier = val;
			if (cucumberIdentifier !== 'v') return;
			if (+cucumber.split(',')[0] === 0 && +cucumber.split(',')[1] === 0)
				return;
			let x = rowIndex + +cucumber.split(',')[0];
			let y = valIndex + +cucumber.split(',')[1];
			if (x > bottomEdge) x = 0;
			if (y > rightEdge) y = 0;
			if (data[x][y] === '.' && cucumberIdentifier === '>')
				eastmoverz.push(`${rowIndex},${valIndex}`);
			if (data[x][y] === '.' && cucumberIdentifier === 'v')
				southmoverz.push(`${rowIndex},${valIndex}`);
		});
	});

	southmoverz.forEach((val) => {
		const x = +val.split(',')[0];
		const y = +val.split(',')[1];
		const cucumber = identifyCucumber(data[x][y]);
		const cucumberIdentifier = data[x][y];
		let newX = x + +cucumber.split(',')[0];
		let newY = y + +cucumber.split(',')[1];
		if (newX > bottomEdge) newX = 0;
		if (newY > rightEdge) newY = 0;
		if (data[newX][newY] === '.') {
			data[newX][newY] = cucumberIdentifier;
			data[x][y] = '.';
		}
	});
	// console.log(eastmoverz.length + southmoverz.length);
	return eastmoverz.length + southmoverz.length;
};

let rounds = 0;
let movers = Infinity;

while (movers > 0) {
	rounds++;
	movers = moveStep();
	// fs.writeFileSync(
	// 	`25_round${rounds}.txt`,
	// 	data.map((row) => row.join('')).join('\n')
	// );
}

console.log(rounds);

// 439 is too low
