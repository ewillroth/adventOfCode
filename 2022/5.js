const fs = require('fs');

const input = fs.readFileSync('./2022/5_input.txt', 'utf-8');

const sampleInput = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

const sampleStacks = [[], ['N', 'Z'], ['D', 'C', 'M'], ['P']];

const [crates, instructions] = input.trim().split('\n\n');

const stacks = [
  [],
  ['S', 'P', 'H', 'V', 'F', 'G'],
  ['M', 'Z', 'D', 'V', 'B', 'F', 'J', 'G'],
  ['N', 'J', 'L', 'M', 'G'],
  ['P', 'W', 'D', 'V', 'Z', 'G', 'N'],
  ['B', 'C', 'R', 'V'],
  ['Z', 'L', 'W', 'P', 'M', 'S', 'R', 'V'],
  ['P', 'H', 'T'],
  ['V', 'Z', 'H', 'C', 'N', 'S', 'R', 'Q'],
  ['J', 'Q', 'V', 'P', 'G', 'L', 'F'],
];

instructions.split('\n').forEach((instruction) => {
  const quantity = +instruction.split(' from ')[0].split(' ')[1];
  const from = +instruction.split(' from ')[1].split(' to ')[0];
  const to = +instruction.split(' from ')[1].split(' to ')[1];
  for (let i = 0; i < quantity; i++) {
    const toMove = stacks[from].shift();
    stacks[to].unshift(toMove);
  }
});
// console.log(stacks);

console.log(stacks.map((stack) => stack[0]).join(''));

const [crates2, instructions2] = input.trim().split('\n\n');
const [sampleCrates, sampleInstructions] = sampleInput.trim().split('\n\n');

const stacks2 = [
  [],
  ['S', 'P', 'H', 'V', 'F', 'G'],
  ['M', 'Z', 'D', 'V', 'B', 'F', 'J', 'G'],
  ['N', 'J', 'L', 'M', 'G'],
  ['P', 'W', 'D', 'V', 'Z', 'G', 'N'],
  ['B', 'C', 'R', 'V'],
  ['Z', 'L', 'W', 'P', 'M', 'S', 'R', 'V'],
  ['P', 'H', 'T'],
  ['V', 'Z', 'H', 'C', 'N', 'S', 'R', 'Q'],
  ['J', 'Q', 'V', 'P', 'G', 'L', 'F'],
];

instructions2.split('\n').forEach((instruction, index) => {
  const quantity = +instruction.split(' from ')[0].split(' ')[1];
  const from = +instruction.split(' from ')[1].split(' to ')[0];
  const to = +instruction.split(' from ')[1].split(' to ')[1];
  const toMove = stacks2[from].slice(0, quantity);
  for (let i = 0; i < quantity; i++) stacks2[from].shift();
  stacks2[to] = [...toMove, ...stacks2[to]];
});

console.log(stacks2.map((stack) => stack[0]).join(''));
