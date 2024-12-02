const fs = require("fs");

const input = fs.readFileSync(
  `./${process.env.YEAR}/inputs/${process.env.DAY}_input.txt`,
  "utf-8"
);

const testInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

const isSafe = (numArr) => {
  let isSafe = true;
  let dir;
  numArr.forEach((num, index) => {
    if (!num || !numArr[index + 1]) return;
    const diff = +num - +numArr[index + 1];
    if (Math.abs(diff) > 3 || Math.abs(diff) < 1) {
      isSafe = false;
    }
    if (dir === "up" && diff < 0) {
      isSafe = false;
    }
    if (dir === "down" && diff > 0) {
      isSafe = false;
    }
    if (!dir) dir = diff < 0 ? "down" : "up";
  });
  return isSafe;
};

const one = (input) => {
  const reports = input.trim().split("\n");
  return reports.reduce((acc, report) => {
    const levels = report.split(" ");
    if (levels.length < 1) return acc;
    if (isSafe(levels)) return acc + 1;
    return acc;
  }, 0);
};

const isSafeWithSkipsCheckAll = (numArr) => {
  let safe = false;
  numArr.forEach((num, index) => {
    const newArr = [...numArr];
    newArr.splice(index, 1);
    if (isSafe(newArr)) safe = true;
  });
  return safe;
};

const two = (input) => {
  const reports = input.trim().split("\n");
  return reports.reduce((acc, report, index) => {
    const levels = report.split(" ");
    if (levels.length < 1) return acc;
    if (isSafeWithSkipsCheckAll(report.split(" "))) return acc + 1;
    return acc;
  }, 0);
};

console.log(one(testInput));
console.log(one(input));

console.log(two(testInput));
console.log(two(input));
