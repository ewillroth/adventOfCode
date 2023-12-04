const fs = require("fs");

const input = fs.readFileSync("./2023/3_input.txt", "utf-8");

const testInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

let part2Total = 0;
const lines = input.trim().split("\n");

const charMap = lines.map((line) => line.split(""));

const numbersRegex = new RegExp(/[0-9]+/);
const numbers = [];
const stars = [];

const findNumbers = (line, rowIndex) => {
  // handle case where number is last in row
  let start = null;
  line.split("").forEach((char, index) => {
    if (start !== null && numbersRegex.test(char)) {
      if (index === line.length - 1) {
        numbers.push({ row: rowIndex, pos: `${start},${index}` });
      }
      return;
    }
    if (start !== null && !numbersRegex.test(char)) {
      numbers.push({ row: rowIndex, pos: `${start},${index - 1}` });
      start = null;
    }
    // if (start === null && char === "-") start = index;
    if (numbersRegex.test(char) && start === null) start = index;
  });
};

const findStars = (line, rowIndex) => {
  line.split("").forEach((char, index) => {
    if (char === "*") {
      stars.push(`${rowIndex},${index}`);
    }
  });
};

lines.forEach((line, rowIndex) => {
  findNumbers(line, rowIndex);
  findStars(line, rowIndex);
});

const isNextToASymbol = (number) => {
  const [start, end] = number.pos.split(",");
  const chars = [];
  for (let i = start - 1; i < +end + 2; i++) {
    chars.push(charMap[number.row - 1]?.[i]);
    chars.push(charMap[number.row]?.[i]);
    chars.push(charMap[number.row + 1]?.[i]);
  }
  const adjSymbols = chars.filter((char) => {
    if (
      numbersRegex.test(char) ||
      char === "." ||
      char === undefined
      // ||   char === "-"
    ) {
      return false;
    }
    return true;
  });
  if (adjSymbols.length) return true;
  return false;
};

const isNextToTwoNumbers = (coords) => {
  let adjNumberCount = 0;
  const adjNumbers = [];
  let [row, col] = coords.split(",");
  row = +row;
  col = +col;
  const topLeft = charMap[row - 1]?.[col - 1];
  const topMiddle = charMap[row - 1]?.[col];
  const topRight = charMap[row - 1]?.[col + 1];
  const left = charMap[row]?.[col - 1];
  const right = charMap[row]?.[col + 1];
  const bottomLeft = charMap[row + 1]?.[col - 1];
  const bottomMiddle = charMap[row + 1]?.[col];
  const bottomRight = charMap[row + 1]?.[col + 1];
  if (numbersRegex.test(+left)) {
    adjNumberCount++;
    // figure out the number left
    adjNumbers.push(assembleNumber(`${row},${+col - 1}`, "left"));
  }
  if (numbersRegex.test(+right)) {
    adjNumberCount++;
    // figure out the number right
    adjNumbers.push(assembleNumber(`${row},${+col + 1}`, "right"));
  }
  if (numbersRegex.test(+bottomMiddle)) {
    adjNumberCount++;
    // figure out the number left + right
    // figure out the number right
    adjNumbers.push(assembleNumber(`${+row + 1},${col}`, "both"));
  } else {
    if (numbersRegex.test(+bottomLeft)) {
      adjNumberCount++;
      // figure out the number left
      adjNumbers.push(assembleNumber(`${+row + 1},${+col - 1}`, "left"));
    }
    if (numbersRegex.test(+bottomRight)) {
      adjNumberCount++;
      // figure out the number right
      adjNumbers.push(assembleNumber(`${+row + 1},${+col + 1}`, "right"));
    }
  }
  if (numbersRegex.test(+topMiddle)) {
    adjNumberCount++;
    // figure out the number left + right
    adjNumbers.push(assembleNumber(`${+row - 1},${col}`, "both"));
  } else {
    if (numbersRegex.test(+topLeft)) {
      adjNumberCount++;
      //figure out the number left
      adjNumbers.push(assembleNumber(`${+row - 1},${+col - 1}`, "left"));
    }
    if (numbersRegex.test(+topRight)) {
      adjNumberCount++;
      //figure out the number right
      adjNumbers.push(assembleNumber(`${+row - 1},${+col + 1}`, "right"));
    }
  }
  if (adjNumberCount === 2) {
    const power = +adjNumbers[0] * +adjNumbers[1];
    part2Total += power;
    return true;
  }
  return false;
};

const assembleNumber = (coords, direction) => {
  const [row, col] = coords.split(",");
  let start = charMap[+row][+col];
  if (direction === "both") {
    let condition = true;
    let i = 0;
    while (condition) {
      if (numbersRegex.test(charMap[+row][+col - i - 1])) {
        start = charMap[+row][+col - i - 1] + start;
        i++;
      } else {
        condition = false;
      }
    }
    let conditionR = true;
    let iR = 0;
    while (conditionR) {
      if (numbersRegex.test(charMap[+row][+col + iR + 1])) {
        start += charMap[+row][+col + iR + 1];
        iR++;
      } else {
        conditionR = false;
      }
    }
  } else if (direction === "left") {
    let condition = true;
    let i = 0;
    while (condition) {
      if (numbersRegex.test(charMap[+row][+col - i - 1])) {
        start = charMap[+row][+col - i - 1] + start;
        i++;
      } else {
        condition = false;
      }
    }
  } else {
    let condition = true;
    let i = 0;
    while (condition) {
      if (numbersRegex.test(charMap[+row][+col + i + 1])) {
        start += charMap[+row][+col + i + 1];
        i++;
      } else {
        condition = false;
      }
    }
  }
  return +start;
};

const reassembleNumber = (number) => {
  let num = "";
  const [start, end] = number.pos.split(",");
  for (let i = start; i < +end + 1; i++) {
    if (charMap[number.row][i]) num += charMap[number.row][i];
  }
  if (isNaN(+num)) return 0;
  return +num;
};

const actualParts = [];
const actualPartsRows = charMap.map(() => []);

numbers.forEach((number) => {
  if (isNextToASymbol(number)) {
    const reassembledNumber = reassembleNumber(number);
    actualPartsRows[number.row].push(reassembledNumber);
    actualParts.push(reassembledNumber);
  }
});

stars.forEach((coords) => {
  console.log("star", coords);
  isNextToTwoNumbers(coords);
});

// actualPartsRows.forEach((row, index) => console.log(index + 1, row));

console.log(actualParts.reduce((a, b) => a + b));

console.log(part2Total);
