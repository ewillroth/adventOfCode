const fs = require('fs');

const input = fs.readFileSync('./2022/15_input.txt', 'utf-8').trim();

const testInput = `
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`.trim();

const createMap = (input) => {
  const map = {};
  const readings = input.split('\n');
  const sensorDetails = readings.map((reading, index) => {
    const [, , sX, sY, , , , , bX, bY] = reading.split(' ');
    const sensorX = +sX.split('=')[1].split(',')[0];
    const sensorY = +sY.split('=')[1].substring(0, sY.split('=')[1].length - 1);
    const beaconX = +bX.split('=')[1].substring(0, bX.split('=')[1].length - 1);
    const beaconY = +bY.split('=')[1];
    return { sensorX, sensorY, beaconX, beaconY, index };
  });

  const difference = (a, b) => {
    return Math.abs(a - b);
  };

  const findManhattanDistance = (sensorCoordinates, beaconCoordinates) => {
    // is it just xDiff + yDiff? (with math.abs or whatever it is)
    const xDiff = difference(
      +sensorCoordinates.split(',')[0],
      +beaconCoordinates.split(',')[0]
    );
    const yDiff = difference(
      +sensorCoordinates.split(',')[1],
      +beaconCoordinates.split(',')[1]
    );
    return xDiff + yDiff;
  };

  const coordinatesToMark = (sensorCoordinates, beaconCoordinates) => {
    const toMark = [];
    const manhattanDistance = findManhattanDistance(
      sensorCoordinates,
      beaconCoordinates
    );
    const [stringX, stringY] = sensorCoordinates.split(',');
    const x = +stringX;
    const y = +stringY;
    console.log(`manhattan distance is ${manhattanDistance}`);
    for (let i = 1; i < manhattanDistance + 1; i++) {
      // straight lines
      toMark.push(`${x + i},${y}`);
      toMark.push(`${x - i},${y}`);
      toMark.push(`${x},${y + i}`);
      toMark.push(`${x},${y - i}`);
      for (let j = 1; j < manhattanDistance - i + 1; j++) {
        toMark.push(`${x + i},${y - j}`);
        toMark.push(`${x + i},${y + j}`);
        toMark.push(`${x - i},${y + j}`);
        toMark.push(`${x - i},${y - j}`);
      }
    }

    return Array.from(new Set(toMark));
  };

  sensorDetails.forEach((detail) => {
    const { sensorX, sensorY, beaconX, beaconY, index } = detail;
    console.log(`sensor ${index}`);
    const toMark = coordinatesToMark(
      `${sensorX},${sensorY}`,
      `${beaconX},${beaconY}`
    );
    toMark.forEach((coordinate) => {
      map[coordinate] = '#';
    });
  });

  sensorDetails.forEach((detail) => {
    const { sensorX, sensorY, beaconX, beaconY } = detail;
    map[`${sensorX},${sensorY}`] = 'S';
    map[`${beaconX},${beaconY}`] = 'B';
  });

  return map;
};

const testMap = createMap(testInput);
const full = [];
for (let i = -5; i < 26; i++) {
  if (
    testMap[`${i},10`] !== undefined &&
    testMap[`${i},10`] !== 'B' &&
    testMap[`${i},10`] !== 'S'
  )
    full.push(`${i},10`);
}

console.log(full.length, 'testInput');

const partOneMap = createMap(input);
const fullPt1 = [];
console.log('checking for the answer now');
for (let i = -10000; i < 10000; i++) {
  console.log(i);
  if (
    partOneMap[`${i},2000000`] !== undefined &&
    partOneMap[`${i},2000000`] !== 'B' &&
    partOneMap[`${i},2000000`] !== 'S'
  )
    fullPt1.push(`${i},2000000`);
}

console.log(fullPt1.length, 'pt 1');
