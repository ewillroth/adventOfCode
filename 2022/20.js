const fs = require("fs");

const input = fs.readFileSync("./2022/20_input.txt", "utf-8");
const rows = input.split("\n");

const testInput = `
1
2
-3
3
-2
0
4
`;

const printOrder = (solutionObject) => {
  console.log(
    Object.values(solutionObject)
      .sort((objA, objB) => objA.currentPosition - objB.currentPosition)
      .map((obj) => obj.val)
  );
};

const findPartOneSolution = (input) => {
  let solutionObject = {};

  input
    .trim()
    .split("\n")
    .forEach((val, index) => {
      solutionObject[index] = {
        val: +val,
        originalIndex: index,
        currentPosition: index,
        current: false,
      };
    });

  const max = Object.keys(solutionObject).length - 1;

  for (let i = 0; i < +max + 1; i++) {
    console.log(`ROUND ${i}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
    printOrder(solutionObject);
    const { val, currentPosition } = solutionObject[i];
    solutionObject[i].current = true;
    console.log("current val to move", solutionObject[i]);
    const negative = val !== Math.abs(val);
    let finalNewPosition;
    if (negative) {
      // negative
      let newPosition = currentPosition + val;
      while (newPosition < 0) {
        newPosition = max + newPosition;
      }
      finalNewPosition = newPosition;

      // Todo - adjust position of everything that was affected by this change in position
    } else {
      // positive
      let newPosition = currentPosition + val;
      while (newPosition > max) {
        newPosition = 0 + newPosition;
      }
      finalNewPosition = newPosition;
    }

    if (finalNewPosition < currentPosition) {
      console.log(`finalNewPosition < currentPosition`);
      console.log("finalNewPosition", finalNewPosition);
      console.log("currentPosition", currentPosition);
      // everything between currentPosition and newPosition moves up one (including anything at newPosition)
      let toMove = [];
      for (let i = finalNewPosition; i <= currentPosition; i++) {
        toMove.push(
          Object.keys(solutionObject).find(
            (val, index) =>
              solutionObject[val].currentPosition === i &&
              solutionObject[val].current === false
          )
        );
      }
      toMove.forEach((key) => {
        console.log(key);
        console.log("toMove", solutionObject[key]);
        solutionObject[key].currentPosition =
          solutionObject[key].currentPosition + 1;
      });
    } else if (finalNewPosition > currentPosition) {
      console.log(`finalNewPosition > currentPosition`);
      console.log("finalNewPosition", finalNewPosition);
      console.log("currentPosition", currentPosition);
      // everything between currentPosition and newPosition moves down one (including anything at newPosition)
      let toMove = [];
      for (let i = finalNewPosition; i > currentPosition; i--) {
        toMove.push(
          Object.keys(solutionObject).find(
            (val, index) =>
              solutionObject[val].currentPosition === i &&
              solutionObject[val].current === false
          )
        );
      }
      toMove.forEach((key) => {
        console.log(key);
        console.log("toMove", solutionObject[key]);
        solutionObject[key].currentPosition =
          solutionObject[key].currentPosition - 1;
      });
    } else {
      // the same :o
      console.log("the same");
    }
    solutionObject[i].currentPosition = finalNewPosition;
    solutionObject[i].current = false;
    console.log(`after ${i}`);
    printOrder(solutionObject);
  }

  const one = "";
  const two = "";
  const three = "";
  return one + two + three;
};

console.log("part one test", findPartOneSolution(testInput));
// console.log("part one:", findPartOneSolution(input));
