const fs = require('fs');

const input = fs.readFileSync('./11_input.txt', 'utf-8');
const rows = input.split('\n').map((row) => row.split('').map((val) => +val));
rows.pop();
let totalFlashes = 0;

const round = () => {
	const flashed = [];

	const checkForFlashes = () => {
		rows.forEach((row, rowIndex) => {
			row.forEach((val, valIndex) => {
				if (
					rows[rowIndex][valIndex] > 9 &&
					!flashed.includes(`${rowIndex},${valIndex}`)
				) {
					flashed.push(`${rowIndex},${valIndex}`);
					flash(rowIndex, valIndex);
				}
			});
		});
	};

	const flash = (rowIndex, valIndex) => {
		const topLeft = [rowIndex - 1, valIndex - 1];
		const topMiddle = [rowIndex - 1, valIndex];
		const topRight = [rowIndex - 1, valIndex + 1];
		const right = [rowIndex, valIndex + 1];
		const bottomRight = [rowIndex + 1, valIndex + 1];
		const bottomMiddle = [rowIndex + 1, valIndex];
		const bottomLeft = [rowIndex + 1, valIndex - 1];
		const left = [rowIndex, valIndex - 1];
		if (rows[topLeft[0]]?.[topLeft[1]] !== undefined)
			rows[topLeft[0]][topLeft[1]] = rows[topLeft[0]][topLeft[1]] + 1;
		if (rows[topMiddle[0]]?.[topMiddle[1]] !== undefined)
			rows[topMiddle[0]][topMiddle[1]] =
				rows[topMiddle[0]][topMiddle[1]] + 1;
		if (rows[topRight[0]]?.[topRight[1]] !== undefined)
			rows[topRight[0]][topRight[1]] = rows[topRight[0]][topRight[1]] + 1;
		if (rows[right[0]]?.[right[1]] !== undefined)
			rows[right[0]][right[1]] = rows[right[0]][right[1]] + 1;
		if (rows[bottomRight[0]]?.[bottomRight[1]] !== undefined)
			rows[bottomRight[0]][bottomRight[1]] =
				rows[bottomRight[0]][bottomRight[1]] + 1;
		if (rows[bottomMiddle[0]]?.[bottomMiddle[1]] !== undefined)
			rows[bottomMiddle[0]][bottomMiddle[1]] =
				rows[bottomMiddle[0]][bottomMiddle[1]] + 1;
		if (rows[bottomLeft[0]]?.[bottomLeft[1]] !== undefined)
			rows[bottomLeft[0]][bottomLeft[1]] =
				rows[bottomLeft[0]][bottomLeft[1]] + 1;
		if (rows[left[0]]?.[left[1]] !== undefined)
			rows[left[0]][left[1]] = rows[left[0]][left[1]] + 1;
		checkForFlashes();
	};

	// First, the energy level of each octopus increases by 1.
	rows.forEach((row, rowIndex) => {
		row.forEach((val, valIndex) => {
			rows[rowIndex][valIndex] = rows[rowIndex][valIndex] + 1;
		});
	});

	checkForFlashes();

	// Then, any octopus with an energy level greater than 9 flashes. This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than 9, it also flashes. This process continues as long as new octopuses keep having their energy level increased beyond 9. (An octopus can only flash at most once per step.)

	// Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
	flashed.forEach((string) => {
		const coordinates = string.split(',');
		rows[coordinates[0]][coordinates[1]] = 0;
	});
	totalFlashes += flashed.length;
	console.log(flashed.length);
	if (flashed.length === 100) return true;
	else return false;
};

let allFlashed = false;
let count = 0;

while (allFlashed === false) {
	count++;
	allFlashed = round();
}

console.log('round 2 answer', count);
