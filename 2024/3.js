const fs = require("fs");

const input = fs
  .readFileSync(
    `./${process.env.YEAR}/inputs/${process.env.DAY}_input.txt`,
    "utf-8"
  )
  .trim();

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testInputTwo = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const findValidMulls = (string) => {
  const matches = [];
  const regex = /(mul\([0-9]+,[0-9]+\))/g;
  while ((match = regex.exec(string))) {
    matches.push(match[0]);
  }
  return matches;
};

const filterOnOff = (matchesObj) => {
  let on = true;
  const validMulls = [];
  const instructionArr = Object.values(matchesObj);
  for (i of instructionArr) {
    if (i === "don't()") on = false;
    if (i === "do()") on = true;
    if (on && i.includes("mul")) validMulls.push(i);
  }
  return validMulls;
};

const findValidMullsConditional = (string) => {
  let on = true;
  const matches = {};
  const regex = /(mul\([0-9]+,[0-9]+\))/g;
  const doRegex = /(do\(\))/g;
  const dontRegex = /(don't\(\))/g;
  while ((match = regex.exec(string))) {
    matches[match.index] = match[0];
  }
  while ((match1 = doRegex.exec(string))) {
    matches[match1.index] = match1[0];
  }
  while ((match2 = dontRegex.exec(string))) {
    matches[match2.index] = match2[0];
  }

  const validMatches = filterOnOff(matches);
  return validMatches;
};

const output = (input, conditional = false) => {
  const validMulls = conditional
    ? findValidMullsConditional(input)
    : findValidMulls(input);
  const multiplied = validMulls.map((mult) => {
    const [, num] = mult.split("(");
    const [n] = num.split(")");
    const [a, b] = n.split(",");
    return +a * +b;
  });
  const total = multiplied.reduce((prev, curr) => prev + curr, 0);
  console.log(total);
};

// one
output(input);

// two
output(input, true);
