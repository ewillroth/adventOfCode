const { group } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./2022/3_input.txt', 'utf-8');
const rucksacks = input.trim().split('\n');

const sampleInput = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`
  .trim()
  .split('\n');

let answer = 0;

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.

const isLowercase = (char) => {
  if (char === char.toLowerCase()) return true;
  return false;
};

const calculatePriority = (char) => {
  if (isLowercase(char)) {
    return char.charCodeAt(0) - 96;
  } else {
    return char.charCodeAt(0) - 38;
  }
};

rucksacks.forEach((rucksack) => {
  const half = rucksack.length / 2;
  const rucksackOne = rucksack.slice(0, half);
  const rucksackTwo = rucksack.slice(half);
  let found = false;
  // find the character shared between the two
  rucksackOne.split('').forEach((char) => {
    if (found) return;
    if (rucksackTwo.includes(char)) {
      found = true;
      const add = calculatePriority(char);
      answer += add;
    }
  });
});

console.log(answer);

let answerTwo = 0;

const groups = [];
let groupCount = 0;

rucksacks.forEach((rucksack, index) => {
  const final = (index + 1) % 3 === 0;
  if (groups[groupCount] !== undefined) {
    groups[groupCount] = [...groups[groupCount], rucksack];
  } else {
    groups[groupCount] = [rucksack];
  }
  if (final) groupCount++;
});

groups.forEach((group) => {
  let found = false;
  group[0].split('').forEach((char) => {
    if (found) return;
    if (group[1].includes(char) && group[2].includes(char)) {
      found = true;
      const add = calculatePriority(char);
      answerTwo += add;
    }
  });
});

console.log(answerTwo);
