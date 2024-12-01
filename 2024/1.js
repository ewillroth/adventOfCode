const fs = require("fs");

const input = fs.readFileSync(
  `./${process.env.YEAR}/${process.env.DAY}_input.txt`,
  "utf-8"
);

const testInput = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

const parseInput = (input) => {
  const lines = input.trim().split("\n");
  const listOne = [];
  const listTwo = [];

  lines.forEach((line) => {
    const [a, b] = line.split("   ");
    if (!!a && !!b) {
      listOne.push(a);
      listTwo.push(b);
    }
  });
  return [listOne, listTwo];
};

const one = (input) => {
  const [listOne, listTwo] = parseInput(input);
  const calculateDiffs = (listOne, listTwo) => {
    if (listOne.length !== listTwo.length)
      console.log("LIST LENGTHS ARE NOT COMPATIBLE");
    const diffs = [];

    listOne.forEach((item, index) => {
      const a = +item;
      const b = +listTwo[index];
      diffs.push(Math.abs(a - b));
    });

    return diffs;
  };

  const summarizeDiffs = (diffs) => {
    console.log(diffs.reduce((a, b) => a + b, 0));
  };

  summarizeDiffs(calculateDiffs(listOne.sort(), listTwo.sort()));
};

one(testInput);
one(input);

const two = (input) => {
  const countItemsInLeft = (item, list) => {
    return list.filter((i) => i === item).length;
  };
  const [listOne, listTwo] = parseInput(input);
  let score = 0;
  listOne.forEach((item) => {
    const count = countItemsInLeft(item, listTwo);
    const increase = +item * count;
    score += +item * count;
  });
  console.log(score);
};

two(testInput);
two(input);
