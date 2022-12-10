const fs = require('fs');

const input = fs.readFileSync('./2022/10_input.txt', 'utf-8');

const partOne = (input, debug = false) => {
  const rows = input.trim().split('\n');
  const ones = rows.filter((row) => row === 'noop').length;
  const twos = rows.length - ones;
  const totalCycles = twos * 2 + ones;
  let x = 1;
  let answer = 0;
  let operation;
  let add = false;

  for (let i = 1; i < totalCycles + 2; i++) {
    // get the operation for this cycle
    if (!operation) {
      operation = rows.shift();
    }
    // score for the cycle if necessary
    if (i === 20 || (i - 20) % 40 === 0) {
      answer += x * i;
    }
    // end the cycle
    if (operation === 'noop') {
      operation = undefined;
    } else {
      if (add) {
        x += +operation.split(' ')[1];
        operation = undefined;
        add = false;
      } else {
        add = true;
      }
    }
  }

  console.log('pt1', answer);
};

const partTwo = (input, debug = false) => {
  const rows = input.trim().split('\n');
  const ones = rows.filter((row) => row === 'noop').length;
  const twos = rows.length - ones;
  const totalCycles = twos * 2 + ones;
  let x = 1;
  let operation;
  let add = false;

  const rowArray = new Array(6).fill([]);
  const picture = rowArray.map((row) => new Array(40).fill('0'));

  const getRow = (i) => {
    if (i < 40) return 0;
    if (i < 80) return 1;
    if (i < 120) return 2;
    if (i < 160) return 3;
    if (i < 200) return 4;
    if (i < 240) return 5;
  };

  for (let i = 0; i < totalCycles; i++) {
    const row = getRow(i);
    const col = i % 40;
    if ([x, x + 1, x - 1].includes(col)) {
      picture[row][col] = '#';
    } else {
      picture[row][col] = '.';
    }
    // get the operation for this cycle
    if (!operation) {
      operation = rows.shift();
    }
    // end the cycle
    if (operation === 'noop') {
      operation = undefined;
    } else {
      if (add) {
        x += +operation.split(' ')[1];
        operation = undefined;
        add = false;
      } else {
        add = true;
      }
    }
  }

  console.log('pt 2');
  console.log(picture.map((row) => row.join('')).join('\n'));
};

partOne(input, true);

partTwo(input);
