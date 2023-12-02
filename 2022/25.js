const fs = require('fs');

const input = fs.readFileSync('./2022/25_input.txt', 'utf-8');

const indexToPlace = (index) => {
  if (index === 0) return 1;
  return Math.pow(5, +index);
};

const charToNumber = (char) => {
  switch (char) {
    case '2':
      return 2;
    case '1':
      return 1;
    case '0':
      return 0;
    case '-':
      return -1;
    case '=':
      return -2;
  }
};

const snafuToDecimal = (sanfuNumber) => {
  let decimalNumber = 0;
  const places = sanfuNumber.split('');
  for (let i = 0; i < places.length; i++) {
    const diff = sanfuNumber.length - 1 - i;
    const valToAdd = indexToPlace(diff);
    const numToAdd = charToNumber(sanfuNumber[i]);
    decimalNumber += valToAdd * numToAdd;
  }
  return decimalNumber;
};

const decimalToSnafu = (decimalNumber) => {
  let remainder = decimalNumber;
  const finalSnafu = [];
  for (let i = 20; i > 0; i--) {
    const snafuVal = indexToPlace(i);
    console.log(snafuVal, 'snafuVal');
    const number = remainder / snafuVal;
    if (number < 1) {
      finalSnafu.push(0);
    }
    if (number >= 1 && number < 3) {
      finalSnafu.push(Math.floor(number));
      remainder = remainder % snafuVal;
    }
  }
  console.log(finalSnafu, remainder);
};

const sampleInput = `
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

/**
 SNAFU  Decimal
1=-0-2     1747
 12111      906
  2=0=      198
    21       11
  2=01      201
   111       31
 20012     1257
   112       32
 1=-1=      353
  1-12      107
    12        7
    1=        3
   122       37
 */

const testcases = [
  '1=-0-2',
  '12111',
  '2=0=',
  '21',
  '2=01',
  '111',
  '20012',
  '112',
  '1=-1=',
  '1-12',
  '12',
  '1=',
  '122',
];

// testcases.forEach((val) => {
//   console.log(snafuToDecimal(val));
// });

/*
2, 1, 0, minus (written -), and double-minus (written =). Minus is worth -1, and double-minus is worth -2."
 */

/*
  Decimal          SNAFU
        1              1
        2              2
        3             1=
        4             1-
        5             10
        6             11
        7             12
        8             2=
        9             2-
       10             20
       15            1=0
       20            1-0
     2022         1=11-2
    12345        1-0---0
314159265  1121-1110-1=0
 */

const test = sampleInput
  .trim()
  .split('\n')
  .reduce((prev, curr) => {
    return prev + snafuToDecimal(curr);
  }, 0);

// console.log(decimalToSnafu(test));

const partOne = input
  .trim()
  .split('\n')
  .reduce((prev, curr) => {
    return prev + snafuToDecimal(curr);
  }, 0);

// console.log(decimalToSnafu(partOne));

console.log('partOne', partOne);

// partOne Total
// 36332109854235

const snafuPlaces = [
  19073486328125, 3814697265625, 762939453125, 152587890625, 30517578125,
  6103515625, 1220703125, 244140625, 48828125, 9765625, 1953125, 390625, 78125,
  15625, 3125, 625, 125, 25, 5,
];

let currentFinal = 0;
currentFinal += 19073486328125 * 2;
//
currentFinal -= 3814697265625 * 0;
//
currentFinal -= 762939453125 * 2;
currentFinal -= 152587890625 * 2;
currentFinal += 30517578125 * 1;
currentFinal -= 6103515625 * 2;
currentFinal -= 1220703125 * 2;
//
currentFinal += 244140625 * 1;
currentFinal += 48828125 * 2;
//
currentFinal -= 9765625 * 2;
currentFinal -= 1953125 * 0;
currentFinal += 390625 * 1;
currentFinal += 78125 * 1;
currentFinal += 15625 * 1;
currentFinal -= 3125 * 2;
currentFinal += 625 * 2;
currentFinal -= 125 * 1;
currentFinal -= 25 * 1;
currentFinal += 5 * 2;
currentFinal += 1 * 0;

console.log(partOne - currentFinal);
console.log(('' + (partOne - currentFinal)).length);

const final = `2===`;
