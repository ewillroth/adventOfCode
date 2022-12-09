const fs = require('fs');

const input = fs.readFileSync('./2022/9_input.txt', 'utf-8');
const moves = input.trim().split('\n');

const calculateNextKnotPosition = (newHeadPosition, tailPosition) => {
  // touching - does not move
  if (
    (tailPosition[0] === newHeadPosition[0] &&
      tailPosition[1] === newHeadPosition[1]) ||
    (tailPosition[0] === newHeadPosition[0] &&
      tailPosition[1] === newHeadPosition[1] - 1) ||
    (tailPosition[0] === newHeadPosition[0] &&
      tailPosition[1] === newHeadPosition[1] + 1) ||
    (tailPosition[1] === newHeadPosition[1] &&
      tailPosition[0] === newHeadPosition[0] + 1) ||
    (tailPosition[1] === newHeadPosition[1] &&
      tailPosition[0] === newHeadPosition[0] - 1) ||
    (tailPosition[1] === newHeadPosition[1] - 1 &&
      tailPosition[0] === newHeadPosition[0] - 1) ||
    (tailPosition[1] === newHeadPosition[1] - 1 &&
      tailPosition[0] === newHeadPosition[0] + 1) ||
    (tailPosition[1] === newHeadPosition[1] + 1 &&
      tailPosition[0] === newHeadPosition[0] + 1) ||
    (tailPosition[1] === newHeadPosition[1] + 1 &&
      tailPosition[0] === newHeadPosition[0] - 1)
  ) {
    return tailPosition;
  } else {
    // tail needs to move
    // up
    if (
      tailPosition[0] === newHeadPosition[0] - 2 &&
      tailPosition[1] === newHeadPosition[1]
    ) {
      return [tailPosition[0] + 1, tailPosition[1]];
    }
    // right
    if (
      tailPosition[0] === newHeadPosition[0] &&
      tailPosition[1] === newHeadPosition[1] - 2
    ) {
      return [tailPosition[0], tailPosition[1] + 1];
    }
    // down
    if (
      tailPosition[0] === newHeadPosition[0] + 2 &&
      tailPosition[1] === newHeadPosition[1]
    ) {
      return [tailPosition[0] - 1, tailPosition[1]];
    }
    // left
    if (
      tailPosition[0] === newHeadPosition[0] &&
      tailPosition[1] === newHeadPosition[1] + 2
    ) {
      return [tailPosition[0], tailPosition[1] - 1];
    }
    // up right
    if (
      tailPosition[0] > newHeadPosition[0] &&
      tailPosition[1] < newHeadPosition[1]
    ) {
      return [tailPosition[0] - 1, tailPosition[1] + 1];
    }
    // up left
    if (
      tailPosition[0] > newHeadPosition[0] &&
      tailPosition[1] > newHeadPosition[1]
    ) {
      return [tailPosition[0] - 1, tailPosition[1] - 1];
    }
    // down right
    if (
      tailPosition[0] < newHeadPosition[0] &&
      tailPosition[1] < newHeadPosition[1]
    ) {
      return [tailPosition[0] + 1, tailPosition[1] + 1];
    }
    // down left
    if (
      tailPosition[0] < newHeadPosition[0] &&
      tailPosition[1] > newHeadPosition[1]
    ) {
      return [tailPosition[0] + 1, tailPosition[1] - 1];
    }
  }
};

const partOne = () => {
  let headPosition = [0, 0];
  let tailPosition = [0, 0];

  const tailVisits = {};

  moves.forEach((move) => {
    const [direction, distance] = move.split(' ');
    let newHeadPosition;
    for (let i = distance; i > 0; i--) {
      if (direction === 'U') {
        newHeadPosition = [headPosition[0] - 1, headPosition[1]];
      } else if (direction === 'R') {
        newHeadPosition = [headPosition[0], headPosition[1] + 1];
      } else if (direction === 'D') {
        newHeadPosition = [headPosition[0] + 1, headPosition[1]];
      } else if (direction === 'L') {
        newHeadPosition = [headPosition[0], headPosition[1] - 1];
      }
      const newTailPosition = calculateNextKnotPosition(
        newHeadPosition,
        tailPosition
      );
      tailVisits[newTailPosition] = true;
      headPosition = newHeadPosition;
      tailPosition = newTailPosition;
    }
  });

  console.log('part one', Object.keys(tailVisits).length); // 5878
};

const partTwo = () => {
  const tailVisits = {};
  let headPosition = [0, 0];
  let onePosition = [0, 0];
  let twoPosition = [0, 0];
  let threePosition = [0, 0];
  let fourPosition = [0, 0];
  let fivePosition = [0, 0];
  let sixPosition = [0, 0];
  let sevenPosition = [0, 0];
  let eightPosition = [0, 0];
  let tailPosition = [0, 0];

  moves.forEach((move) => {
    const [direction, distance] = move.split(' ');
    for (let i = distance; i > 0; i--) {
      let newHeadPosition;
      if (direction === 'U') {
        newHeadPosition = [headPosition[0] - 1, headPosition[1]];
      } else if (direction === 'R') {
        newHeadPosition = [headPosition[0], headPosition[1] + 1];
      } else if (direction === 'D') {
        newHeadPosition = [headPosition[0] + 1, headPosition[1]];
      } else if (direction === 'L') {
        newHeadPosition = [headPosition[0], headPosition[1] - 1];
      }
      const newOnePosition = calculateNextKnotPosition(
        newHeadPosition,
        onePosition
      );
      const newTwoPosition = calculateNextKnotPosition(
        newOnePosition,
        twoPosition
      );
      const newThreePosition = calculateNextKnotPosition(
        newTwoPosition,
        threePosition
      );
      const newFourPosition = calculateNextKnotPosition(
        newThreePosition,
        fourPosition
      );
      const newFivePosition = calculateNextKnotPosition(
        newFourPosition,
        fivePosition
      );
      const newSixPosition = calculateNextKnotPosition(
        newFivePosition,
        sixPosition
      );
      const newSevenPosition = calculateNextKnotPosition(
        newSixPosition,
        sevenPosition
      );
      const newEightPosition = calculateNextKnotPosition(
        newSevenPosition,
        eightPosition
      );
      const newTailPosition = calculateNextKnotPosition(
        newEightPosition,
        tailPosition
      );
      tailVisits[newTailPosition] = true;
      headPosition = newHeadPosition;
      onePosition = newOnePosition;
      twoPosition = newTwoPosition;
      threePosition = newThreePosition;
      fourPosition = newFourPosition;
      fivePosition = newFivePosition;
      sixPosition = newSixPosition;
      sevenPosition = newSevenPosition;
      eightPosition = newEightPosition;
      tailPosition = newTailPosition;
    }
  });
  console.log('part two', Object.keys(tailVisits).length); // 2405
};

partOne();
partTwo();
