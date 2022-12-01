// number of calories per item in a line
// empty line is a new elf

const testInput = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

// find the number of calories carried by the elf with the most calories

const fs = require('fs');

const input = fs.readFileSync('./2022/1_input.txt', 'utf-8');

const elves = input.split('\n\n');

const caloriesPerElf = elves.map((elf) => {
  const items = elf.split('\n');
  let total = 0;
  items.forEach((item) => {
    total = total + +item;
  });
  return total;
});

const sortedElves = caloriesPerElf.sort((a, b) => b - a);

const partOneAnswer = sortedElves[0];
console.log(partOneAnswer); // 71506
const partTwoAnswer = sortedElves[0] + sortedElves[1] + sortedElves[2];
console.log(partTwoAnswer); // 209603
