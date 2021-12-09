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

const newRows = rows.map((row) =>
	row.split('').map((val) => {
		if (val !== '9') return '.';
		return val;
	})
);
console.log(newRows);

const markAbove = (rowIndex, positionIndex, basinNumber) => {
	if (rowIndex === undefined || positionIndex === undefined) return;
	const above = newRows?.[rowIndex - 1]?.[positionIndex];
	if (above === '9') {
		return;
	} else if (above === '.') {
		newRows[rowIndex - 1][positionIndex] = basinNumber;
		markAbove(rowIndex - 1, positionIndex, basinNumber);
	} else {
		console.log('above pt 3');
		return;
	}
};

const markBelow = (rowIndex, positionIndex, basinNumber) => {
	if (rowIndex === undefined || positionIndex === undefined) return;
	const below = newRows?.[rowIndex + 1]?.[positionIndex];
	if (below === '9') {
		return;
	} else if (below === '.') {
		newRows[rowIndex + 1][positionIndex] = basinNumber;
		markBelow(rowIndex + 1, positionIndex, basinNumber);
	} else {
		console.log('below pt 3');
		return;
	}
};

const markRight = (rowIndex, positionIndex, basinNumber) => {
	if (rowIndex === undefined || positionIndex === undefined) return;
	const right = newRows?.[rowIndex]?.[positionIndex + 1];
	if (right === '9') {
		return;
	} else if (right === '.') {
		newRows[rowIndex][positionIndex + 1] = basinNumber;
		markRight(rowIndex, positionIndex + 1, basinNumber);
	} else {
		console.log('right pt 3');
		return;
	}
};

const markLeft = (rowIndex, positionIndex, basinNumber) => {
	if (rowIndex === undefined || positionIndex === undefined) return;
	const left = newRows?.[rowIndex]?.[positionIndex - 1];
	if (left === '9') {
		return;
	} else if (left === '.') {
		newRows[rowIndex][positionIndex - 1] = basinNumber;
		markLeft(rowIndex, positionIndex - 1, basinNumber);
	} else {
		console.log('left pt 3');
		return;
	}
};

const findBasin = (rowIndex, positionIndex) => {
	const val = newRows[rowIndex][positionIndex];
	if (val === '9') {
		return;
	} else if (val === '.') {
		newRows[rowIndex][positionIndex] = basinNumber;
	}
	markAbove(rowIndex, positionIndex);
	markRight(rowIndex, positionIndex);
	markBelow(rowIndex, positionIndex);
	markLeft(rowIndex, positionIndex);
};

const markBasin = (rowIndex, positionIndex) => {
	const val = newRows[rowIndex][positionIndex];
	if (val === '9') {
		return;
	} else if (val === '.') {
		newRows[rowIndex][positionIndex] = basinNumber;
	}
	markAbove(rowIndex, positionIndex);
	markRight(rowIndex, positionIndex);
	markBelow(rowIndex, positionIndex);
	markLeft(rowIndex, positionIndex);
};

fs.writeFileSync('9_basins.txt', newRows.map((row) => row.join('')).join('\n'));

let countByLetters = (letter) => {
	if (!letter) return 'a';
	if (letter == 'a') return 'b';
	if (letter == 'b') return 'c';
	if (letter == 'c') return 'd';
	if (letter == 'd') return 'e';
	if (letter == 'e') return 'f';
	if (letter == 'f') return 'g';
	if (letter == 'g') return 'h';
	if (letter == 'h') return 'i';
	if (letter == 'i') return 'j';
	if (letter == 'j') return 'k';
	if (letter == 'k') return 'l';
	if (letter == 'l') return 'm';
	if (letter == 'm') return 'n';
	if (letter == 'n') return 'o';
	if (letter == 'o') return 'p';
	if (letter == 'p') return 'q';
	if (letter == 'q') return 'r';
	if (letter == 'r') return 's';
	if (letter == 's') return 't';
	if (letter == 't') return 'u';
	if (letter == 'u') return 'v';
	if (letter == 'v') return 'w';
	if (letter == 'w') return 'x';
	if (letter == 'x') return 'y';
	if (letter == 'y') return 'z';
	if (letter == 'z') return '0';
	if (letter == '0') return '1';
	if (letter == '1') return '2';
	if (letter == '2') return '3';
	if (letter == '3') return '4';
	if (letter == '4') return '5';
	if (letter == '5') return '6';
	if (letter == '6') return '7';
	if (letter == '7') return '8';
};

newRows.forEach((row, rowIndex) => {
	row.forEach((position, positionIndex) => {
		const rowNumber = findBasin(rowIndex, positionIndex);
	});
});

console.log(newRows);

fs.writeFileSync(
	'9_letters.txt',
	newRows.map((row) => row.join('')).join('\n')
);

// for each point, search all sides (until you hit a 9) for a number/letter
// mark each side with the number/letter found
// increase the default letter only when an existing letter is not found
