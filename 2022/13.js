const fs = require('fs');

const input = fs.readFileSync('./2022/13_input.txt', 'utf-8').trim();

const testInput = fs.readFileSync('./2022/13_testInput.txt', 'utf-8').trim();

const getPairs = (input) => {
  const pairs = input.split('\n\n');
  return pairs.map((pair) => {
    const [packet1, packet2] = pair.split('\n');
    return { packet1: JSON.parse(packet1), packet2: JSON.parse(packet2) };
  });
};

const areValuesInvalid = (val1, val2, innerI) => {
  if (val1 !== undefined && val2 === undefined) {
    return true;
  }
  if (val1 === undefined && val2 !== undefined) {
    return false;
  }
  if (typeof val1 === 'number' && typeof val2 === 'number') {
    if (val1 > val2) return true;
    if (val1 < val2) return false;
    return undefined;
  }

  if (typeof val1 === 'number' && typeof val2 === 'object') {
    val1 = [val1];
  }
  if (typeof val1 === 'object' && typeof val2 === 'number') {
    val2 = [val2];
  }
  if (typeof val1 === 'object' && typeof val2 === 'object') {
    const biggerArray = val1.length > val2.length ? val1.length : val2.length;
    // if right array is bigger - compare all the values inside the arrays
    for (let i = 0; i < biggerArray; i++) {
      const result = areValuesInvalid(val1[i], val2[i], i);
      if (result === false) {
        return false;
      } else if (result === true) {
        return true;
      } else {
        continue;
      }
    }
  }
};

const comparePairs = (pairsObject, index) => {
  let valid;
  const { packet1, packet2 } = pairsObject;
  const biggerArray =
    packet1.length > packet2.length ? packet1.length : packet2.length;
  for (let i = 0; i < biggerArray; i++) {
    const invalid = areValuesInvalid(packet1[i], packet2[i]);
    if (invalid === true) {
      valid = false;
      break;
    } else if (invalid === false) {
      valid = true;
      break;
    } else {
      continue;
    }
  }
  return valid;
};

const part1 = () => {
  const validPairs = [];
  const pairs = getPairs(input);
  pairs.forEach((pair, index) => {
    const valid = comparePairs(pair, index);
    if (valid) validPairs.push(index + 1);
  });
  console.log(validPairs.reduce((a, b) => a + b, 0));
};

part1();

// https://stackoverflow.com/questions/9960908/permutations-in-javascript
const permutator = (inputArr) => {
  let count = 0;
  console.time('omg');
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      count++;
      console.log(`permutation ${count}`);

      // check if all pairs are valid using the method from part 1
      const allValid = checkIfAllPairsAreValid(m);
      if (allValid) {
        console.log('answer is true');
        console.log(
          'index for [[2]]',
          Object.values(pairs).findIndex(
            (pair) => pair.packet1 === '[[2]]' || pair.packet1 === '[[2]]'
          )
        );
        console.log(
          'index for [[6]]',
          Object.values(pairs).findIndex(
            (pair) => pair.packet1 === '[[6]]' || pair.packet1 === '[[6]]'
          )
        );
        console.timeEnd('omg');
        throw new Error('hurray!');
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const part2 = (input) => {
  const inputWithDividers = input + `\n\n[[2]]\n[[6]]`;
  const inputWithoutEmptyLines = inputWithDividers.split('\n\n').join('\n');
  const rows = inputWithoutEmptyLines.split('\n');
  permutator(rows);
};

const checkIfAllPairsAreValid = (pairsArray) => {
  const validPairs = [];
  const invalidPairs = [];
  pairsArray.forEach((pair, index) => {
    if (pairsArray[index + 1] === undefined) {
      return true;
    }
    const valid = comparePairs(
      { packet1: pair, packet2: pairsArray[index + 1] },
      index
    );
    if (valid) {
      validPairs.push(index + 1);
    } else {
      invalidPairs.push(index + 1);
    }
  });
  if (invalidPairs.length > 0) return false;
  return true;
};

part2(input);
