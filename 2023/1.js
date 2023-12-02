const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const fs = require("fs");

const input = fs.readFileSync("./2023/1_input.txt", "utf-8");

const lines = input.split("\n");

const getNumbers = (line) =>
  line.split("").filter((char) => {
    const regex = new RegExp(/[1-9]/);
    return regex.test(char);
  });

let answer1 = 0;

lines.forEach((line) => {
  const numbers = getNumbers(line);
  const num1 = numbers[0];
  const numEnd = numbers[numbers.length - 1];
  const num = num1 + numEnd;
  answer1 += +num;
});

console.log(answer1);

const testInputTwo = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

// part 2

let answer2 = 0;

const findNumbers = (line) => {
  const possibilities = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const possibilityIndexToNum = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
    6: 7,
    7: 8,
    8: 9,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 6,
    15: 7,
    16: 8,
    17: 9,
  };

  const firstIndexOf = [...possibilities];
  const lastIndexOf = [...possibilities];

  firstIndexOf.forEach(
    (val, index) => (firstIndexOf[index] = line.indexOf(val))
  );

  lastIndexOf.forEach(
    (val, index) => (lastIndexOf[index] = line.lastIndexOf(val))
  );

  let firstNum = Infinity;
  let firstNumValue = 0;
  let lastNum = -Infinity;
  let lastNumValue = 0;

  firstIndexOf.forEach((positionInString, numberValue) => {
    if (positionInString === -1) return;
    if (positionInString < firstNum) {
      firstNum = positionInString;
      firstNumValue = possibilityIndexToNum[numberValue];
    }
  });

  lastIndexOf.forEach((positionInString, numberValue) => {
    if (positionInString === -1) return;
    if (positionInString > lastNum) {
      lastNum = positionInString;
      lastNumValue = possibilityIndexToNum[numberValue];
    }
  });

  //   console.log(firstNum, "firstNum index");
  //   console.log(lastNum, "lastNum index");
  //   console.log(firstNumValue, "firstNumValue");
  //   console.log(lastNumValue, "lastNumValue");
  if (firstNumValue === 0 || lastNumValue === 0) throw new Error("WTF");
  return [firstNumValue, lastNumValue];
};

const lines2 = input.split("\n");
console.log(lines2.length);
lines2.forEach((line) => {
  const [num1, num2] = findNumbers(line);
  const num = num1.toString() + num2.toString();
  //   console.log(num);
  answer2 += +num;
});

console.log(answer2);
