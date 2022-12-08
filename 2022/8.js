const fs = require('fs');

const input = fs.readFileSync('./2022/8_input.txt', 'utf-8');

const testInput = `
30373
25512
65332
33549
35390`;

/**
A tree is visible if all of the other trees between it and an edge of the grid are shorter than it.

0 is the shortest and 9 is the tallest.

Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

how many trees are visible from outside the grid?
 */

const makeArrays = (input) => {
  return input
    .trim()
    .split('\n')
    .map((row) => row.split(''));
};

const countVisible = (arrays) => {
  let isVisible = JSON.parse(JSON.stringify(arrays));
  arrays.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      isVisible[rowIndex][colIndex] = false;
    });
  });
  arrays.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (isVisibleFromAbove(arrays, rowIndex, colIndex)) {
        isVisible[rowIndex][colIndex] = true;
      }
      if (isVisibleFromRight(arrays, rowIndex, colIndex))
        isVisible[rowIndex][colIndex] = true;
      if (isVisibleFromBelow(arrays, rowIndex, colIndex))
        isVisible[rowIndex][colIndex] = true;
      if (isVisibleFromLeft(arrays, rowIndex, colIndex))
        isVisible[rowIndex][colIndex] = true;
    });
  });
  let count = 0;
  arrays.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (isVisible[rowIndex][colIndex] === true) count++;
    });
  });
  return count;
};

const isVisibleFromAbove = (arrays, row, col) => {
  let visible = true;
  const value = +arrays[row][col];
  if (row === 0) {
    return true;
  }
  for (let i = row - 1; i >= 0; i--) {
    const comparedValue = +arrays[i][col];
    if (comparedValue >= value) visible = false;
  }
  return visible;
};
const isVisibleFromRight = (arrays, row, col) => {
  let visible = true;
  const value = +arrays[row][col];
  if (col === arrays[0].length - 1) return true;
  for (let i = col + 1; i <= arrays[0].length - 1; i++) {
    const comparedValue = +arrays[row][i];
    if (comparedValue >= value) visible = false;
  }
  return visible;
};
const isVisibleFromBelow = (arrays, row, col) => {
  let visible = true;
  const value = +arrays[row][col];
  if (row === arrays.length - 1) return true;
  for (let i = row + 1; i <= arrays.length - 1; i++) {
    const comparedValue = +arrays[i][col];
    if (comparedValue >= value) visible = false;
  }
  return visible;
};
const isVisibleFromLeft = (arrays, row, col) => {
  let visible = true;
  const value = +arrays[row][col];
  if (col === 0) return true;
  for (let i = col - 1; i >= 0; i--) {
    const comparedValue = +arrays[row][i];
    if (comparedValue >= value) visible = false;
  }
  return visible;
};

const test = () => {
  const arrays = makeArrays(testInput);
  console.log('test', countVisible(arrays));
};

const partOne = () => {
  const arrays = makeArrays(input);
  console.log('pt1', countVisible(arrays));
};

const above = (arrays, row, col) => {
  let viewDistance = 0;
  const value = +arrays[row][col];
  if (row === 0) {
    return 0;
  }
  for (let i = row - 1; i >= 0; i--) {
    const comparedValue = +arrays[i][col];
    if (comparedValue < value) viewDistance++;
    if (comparedValue === value) return viewDistance + 1;
    if (comparedValue > value) return viewDistance;
  }
  return viewDistance;
};
const right = (arrays, row, col) => {
  let viewDistance = 0;
  const value = +arrays[row][col];
  if (col === arrays[0].length - 1) return 0;
  for (let i = col + 1; i <= arrays[0].length - 1; i++) {
    const comparedValue = +arrays[row][i];
    if (comparedValue < value) viewDistance++;
    if (comparedValue === value) return viewDistance + 1;
    if (comparedValue > value) return viewDistance;
  }
  return viewDistance;
};
const below = (arrays, row, col) => {
  let viewDistance = 0;
  const value = +arrays[row][col];
  if (row === arrays.length - 1) return 0;
  for (let i = row + 1; i <= arrays.length - 1; i++) {
    const comparedValue = +arrays[i][col];
    if (comparedValue < value) viewDistance++;
    if (comparedValue === value) return viewDistance + 1;
    if (comparedValue > value) return viewDistance;
  }
  return viewDistance;
};
const left = (arrays, row, col) => {
  let viewDistance = 0;
  const value = +arrays[row][col];
  if (col === 0) return 0;
  for (let i = col - 1; i >= 0; i--) {
    const comparedValue = +arrays[row][i];
    if (comparedValue < value) viewDistance++;
    if (comparedValue === value) return viewDistance + 1;
    if (comparedValue > value) return viewDistance;
  }
  return viewDistance;
};

const calculateScenicScore = (arrays) => {
  let scenicScores = JSON.parse(JSON.stringify(arrays));
  arrays.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      scenicScores[rowIndex][colIndex] = 0;
    });
  });
  arrays.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      scenicScores[rowIndex][colIndex] =
        above(arrays, rowIndex, colIndex) *
        right(arrays, rowIndex, colIndex) *
        below(arrays, rowIndex, colIndex) *
        left(arrays, rowIndex, colIndex);
    });
  });
  return scenicScores;
};

const partTwo = () => {
  let highScore = 0;
  const arrays = makeArrays(input);
  const scenicScoreArrays = calculateScenicScore(arrays);
  scenicScoreArrays.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (+col > highScore) highScore = +col;
    });
  });
  console.log('pt 2', highScore);
};

const partTwoTest = () => {
  let highScore = 0;
  const arrays = makeArrays(testInput);
  const scenicScoreArrays = calculateScenicScore(arrays);
  scenicScoreArrays.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (+col > highScore) highScore = +col;
    });
  });
  console.log('pt 2 test', highScore);
};

test();
partOne();
partTwoTest();
partTwo();
