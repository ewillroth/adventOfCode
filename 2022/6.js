const fs = require('fs');

const input = fs.readFileSync('./2022/6_input.txt', 'utf-8');

// start of packet - four characters that are all different

const sampleInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const sampleInput2 = `nppdvjthqldpwncqszvftbrmjlhg`;
const sampleInput3 = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
const sampleInput4 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
const sampleInput5 = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

/*
bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11
 */

const checkForDuplicate = (array) => {
  let duplicate = false;
  array.forEach((value) => {
    if (array.filter((val) => val === value).length > 1) {
      duplicate = true;
    }
  });
  return duplicate;
};

const findFirstIndex = (input) => {
  let found = false;
  input.split('').forEach((val, index) => {
    if (found) return;
    const testArray = input.substring(index, index + 4).split('');
    if (checkForDuplicate(testArray)) {
      return;
    } else {
      console.log('pt 1', index + 4);
      found = true;
    }
  });
};
const findFirstIndexPt2 = (input) => {
  let found = false;
  input.split('').forEach((val, index) => {
    if (found) return;
    const testArray = input.substring(index, index + 14).split('');
    if (checkForDuplicate(testArray)) {
      return;
    } else {
      console.log('pt 2', index + 14);
      found = true;
    }
  });
};

// findFirstIndex(sampleInput);
// findFirstIndex(sampleInput2);
// findFirstIndex(sampleInput3);
// findFirstIndex(sampleInput4);
// findFirstIndex(sampleInput5);
findFirstIndex(input);

/**
mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26
 */

// findFirstIndexPt2(sampleInput);
// findFirstIndexPt2(sampleInput2);
// findFirstIndexPt2(sampleInput3);
// findFirstIndexPt2(sampleInput4);
// findFirstIndexPt2(sampleInput5);
findFirstIndexPt2(input);
