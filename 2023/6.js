const fs = require("fs");

// const input = fs.readFileSync(
//   `./${process.env.YEAR}/${process.env.DAY}_input.txt`,
//   "utf-8"
// );

// const lines = input.trim().split("\n");

const testInput = `
Time:      7  15   30
Distance:  9  40  200`;

const input = `
Time:        54     70     82     75
Distance:   239   1142   1295   1253
`;

const testRaces = [
  [7, 9],
  [15, 40],
  [30, 200],
];
const races = [
  [54, 239],
  [70, 1142],
  [82, 1295],
  [75, 1253],
];

const partTwoRace = races.reduce(
  (prev, cur) => {
    const newTotal = [...prev];
    newTotal[0] = Number(prev[0].toString() + cur[0].toString());
    newTotal[1] = Number(prev[1].toString() + cur[1].toString());
    return newTotal;
  },
  [0, 0]
);

const findMinHold = (race) => {
  const [raceTime, raceRecord] = race;
  for (let i = 0; i < raceTime + 1; i++) {
    const distanceCovered = (raceTime - i) * i;
    if (distanceCovered > raceRecord) {
      return i;
    }
  }
};
const findMaxHold = (race) => {
  const [raceTime, raceRecord] = race;
  for (let i = raceTime; i >= 0; i--) {
    const distanceCovered = (raceTime - i) * i;
    if (distanceCovered > raceRecord) {
      return i;
    }
  }
};

const partOne = () => {
  let answer = null;

  races.forEach((race) => {
    const min = findMinHold(race);
    const max = findMaxHold(race);
    const numberOfWaysToWin = max + 1 - min;
    if (answer === null) {
      answer = numberOfWaysToWin;
    } else {
      answer = answer * numberOfWaysToWin;
    }
  });

  console.log("pt1", answer);
};

const partTwo = () => {
  const min = findMinHold(partTwoRace);
  const max = findMaxHold(partTwoRace);
  const numberOfWaysToWin = max + 1 - min;
  console.log("pt2", numberOfWaysToWin);
};

partOne();
partTwo();
