const fs = require("fs");

const input = fs.readFileSync("./2023/3_input.txt", "utf-8");

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const lines = input.trim().split("\n");

const charMap = lines.map((line) => line.split(""));

const numbersRegex = new RegExp(/[0-9]/);
const numbers = [];

const findNumbers = (line, rowIndex) => {
  let start = null;
  line.split("").forEach((char, index) => {
    if (start !== null && numbersRegex.test(char)) return;
    if (start !== null && !numbersRegex.test(char)) {
      numbers.push({ row: rowIndex, pos: `${start},${index - 1}` });
      start = null;
    }
    if (numbersRegex.test(char) && start === null) {
      start = index;
    }
  });
};

lines.forEach((line, rowIndex) => findNumbers(line, rowIndex));

let answer = 0;

const isNextToASymbol = (number) => {
  const [start, end] = number.pos.split(",");
  const chars = [];
  for (let i = start - 1; i < +end + 2; i++) {
    chars.push(charMap[number.row - 1]?.[i]);
    chars.push(charMap[number.row]?.[i]);
    chars.push(charMap[number.row + 1]?.[i]);
  }
  const adjSymbols = chars.filter((char) => {
    if (numbersRegex.test(char) || char === "." || char === undefined) {
      return false;
    }
    return true;
  });
  //   console.log(adjSymbols, "adjSymbols");
  if (adjSymbols.length) return true;
  return false;
};

const reassembleNumber = (number) => {
  //   console.log("reassembling", number);
  let num = "";
  const [start, end] = number.pos.split(",");
  for (let i = start; i < +end + 1; i++) {
    // console.log(i, "i");
    num += charMap[number.row][i];
  }
  //   console.log(+num);
  return +num;
};

const actualParts = [];
const actualPartsRows = charMap.map(() => []);

numbers.forEach((number) => {
  if (isNextToASymbol(number)) {
    const reassembledNumber = reassembleNumber(number);
    actualPartsRows[number.row].push(reassembledNumber);
    actualParts.push(reassembledNumber);
    console.log(`adding ${reassembledNumber}`);
    answer += reassembledNumber;
  }
});

// actualPartsRows.forEach((row, index) => console.log(index + 1, row));

console.log(answer);
// console.log(actualParts.reduce((a, b) => a + b));
