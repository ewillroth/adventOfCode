const fs = require('fs');

const input = fs.readFileSync('./9_input.txt', 'utf-8');
const rows = input.split('\n');

let answer = 0;

const isLow = (row, position) => {
	const val = rows[row][position];
	const above = rows?.[row - 1]?.[position] || 10;
	const right = rows?.[row]?.[position + 1] || 10;
	const below = rows?.[row + 1]?.[position] || 10;
	const left = rows?.[row]?.[position - 1] || 10;
	if (+val < +above && +val < +right && +val < +below && +val < +left) {
		answer += +val + 1;
	}
};

rows.forEach((row, rowIndex) => {
	row.split('').forEach((val, index) => {
		isLow(rowIndex, index);
	});
});

console.log('part 1', answer);

/***** Part Two ******/

const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

// const newRows = testInput.split('\n').map((row) => {
// 	const newRow = row.split('').map((val) => {
// 		if (val !== '9') return '.';
// 		return val;
// 	});
// 	if (newRow.length) {
// 		newRow.push(9);
// 		newRow.unshift(9);
// 	}
// 	return newRow;
// });

const newRows = rows.map((row) => {
	const newRow = row.split('').map((val) => {
		if (val !== '9') return '.';
		return val;
	});
	return newRow;
});

const mark = (rowIndex, positionIndex, direction, marker) => {
	if (rowIndex === undefined || positionIndex === undefined) return;
	let next;
	switch (direction) {
		case 'up':
			next = newRows?.[rowIndex - 1]?.[positionIndex];
			break;
		case 'right':
			next = newRows?.[rowIndex]?.[positionIndex + 1];
			break;
		case 'down':
			next = newRows?.[rowIndex + 1]?.[positionIndex];
			break;
		case 'left':
			next = newRows?.[rowIndex]?.[positionIndex - 1];
			break;
	}
	if (next == '9') {
		return;
	} else if (next === '.') {
		switch (direction) {
			case 'up':
				newRows[rowIndex - 1][positionIndex] = marker;
				mark(rowIndex - 1, positionIndex, direction, marker);
				break;
			case 'right':
				newRows[rowIndex][positionIndex + 1] = marker;
				mark(rowIndex, positionIndex + 1, direction, marker);
				break;
			case 'down':
				newRows[rowIndex + 1][positionIndex] = marker;
				mark(rowIndex + 1, positionIndex, direction, marker);
				break;
			case 'left':
				newRows[rowIndex][positionIndex - 1] = marker;
				mark(rowIndex, positionIndex - 1, direction, marker);
				break;
		}
	} else {
		return;
	}
};

const markEachSpot = (rowIndex, positionIndex, marker) => {
	const spotValue = newRows[rowIndex][positionIndex];
	if (spotValue == '9') {
		return;
	} else {
		newRows[rowIndex][positionIndex] = marker;
		mark(rowIndex, positionIndex, 'up', marker);
		mark(rowIndex, positionIndex, 'right', marker);
		mark(rowIndex, positionIndex, 'down', marker);
		mark(rowIndex, positionIndex, 'left', marker);
	}
};

const search = (rowIndex, positionIndex, direction) => {
	if (rowIndex === undefined || positionIndex === undefined) return;
	let basinNumber;
	switch (direction) {
		case 'up':
			if (!basinNumber)
				basinNumber = newRows?.[rowIndex - 1]?.[positionIndex];
			break;
		case 'right':
			if (!basinNumber)
				basinNumber = newRows?.[rowIndex]?.[positionIndex + 1];
			break;
		case 'down':
			if (!basinNumber)
				basinNumber = newRows?.[rowIndex + 1]?.[positionIndex];
			break;
		case 'left':
			if (!basinNumber)
				basinNumber = newRows?.[rowIndex]?.[positionIndex - 1];
			break;
	}
	if (basinNumber == '9') {
		return undefined;
	} else if (basinNumber === '.') {
		switch (direction) {
			case 'up':
				basinNumber = search(rowIndex - 1, positionIndex, direction);
				break;
			case 'right':
				basinNumber = search(rowIndex, positionIndex + 1, direction);
				break;
			case 'down':
				basinNumber = search(rowIndex + 1, positionIndex, direction);
				break;
			case 'left':
				basinNumber = search(rowIndex, positionIndex - 1, direction);
				break;
		}
	}
	return basinNumber;
};

const echoLocator = (rowIndex, positionIndex) => {
	const val = newRows[rowIndex][positionIndex];
	let basinNumber;
	if (val === '.') {
		if (!basinNumber) basinNumber = search(rowIndex, positionIndex, 'up');
		if (!basinNumber)
			basinNumber = search(rowIndex, positionIndex, 'right');
		if (!basinNumber) basinNumber = search(rowIndex, positionIndex, 'down');
		if (!basinNumber) basinNumber = search(rowIndex, positionIndex, 'left');
	} else {
		return val;
	}
	return basinNumber;
};

fs.writeFileSync('9_basins.txt', newRows.map((row) => row.join('')).join('\n'));

let nextMarker = 1;

newRows.forEach((row, rowIndex) => {
	row.forEach((position, positionIndex) => {
		const existingBasin = echoLocator(rowIndex, positionIndex);
		console.log(existingBasin);
		// console.log(letter);
		if (existingBasin == '9') {
			fs.writeFileSync(
				`./steps/9_${rowIndex}_${positionIndex}.txt`,
				newRows.map((row) => row.join('')).join('\n')
			);
			return;
		}
		if (!existingBasin) {
			markEachSpot(rowIndex, positionIndex, nextMarker);
			nextMarker++;
			fs.writeFileSync(
				`./steps/9_${rowIndex}_${positionIndex}.txt`,
				newRows.map((row) => row.join('')).join('\n')
			);
		} else {
			markEachSpot(rowIndex, positionIndex, existingBasin);
			fs.writeFileSync(
				`./steps/9_${rowIndex}_${positionIndex}.txt`,
				newRows.map((row) => row.join('')).join('\n')
			);
		}
	});
});

// console.log(newRows[0].map((val) => (val == '9' ? '.' : val)).join(''));
// console.log(newRows[1].map((val) => (val == '9' ? '.' : val)).join(''));
// console.log(newRows[2].map((val) => (val == '9' ? '.' : val)).join(''));
// console.log(newRows[3].map((val) => (val == '9' ? '.' : val)).join(''));
// console.log(newRows[4].map((val) => (val == '9' ? '.' : val)).join(''));

const totals = {};

newRows.forEach((row) => {
	row.forEach((val) => {
		if (!totals[val]) {
			totals[val] = 1;
		} else {
			totals[val] = totals[val] + 1;
		}
	});
});

console.log(totals);
const sums = Object.values(totals).sort((a, b) => b - a);
console.log('part 2', +sums[1] * +sums[2] * +sums[3]);
console.log('part 2', sums[1], sums[2], sums[3]);
// for each point, search all sides (until you hit a 9) for a number/letter
// mark each side with the number/letter found
// increase the default letter only when an existing letter is not found
// 72
