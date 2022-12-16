const fs = require('fs');

const input = fs.readFileSync('./2022/14_input.txt', 'utf-8').trim();

const testInput = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`.trim();

const partOne = (input) => {
  let largestX = 0;
  let largestY = 0;
  let smallestX = Infinity;
  let smallestY = Infinity;

  input.split('\n').forEach((row) =>
    row.split(' -> ').forEach((coordinate) => {
      const [x, y] = coordinate.split(',');
      if (x > largestX) largestX = x;
      if (x < smallestX) smallestX = x;
      if (y > largestY) largestY = y;
      if (y < smallestY) smallestY = y;
    })
  );

  const Xoffset = largestX - smallestX;
  const sandStartingPoint = `${500 - smallestX},${0}`;

  const map = [];
  for (let i = 0; i < +largestY + 1; i++) {
    map[i] = [];
  }

  map.forEach((row, rowIndex) => {
    for (let i = 0; i < +Xoffset + 1; i++) {
      map[rowIndex][i] = '.';
    }
  });

  const markAsRock = (x, y) => {
    map[y][+x - smallestX] = '#';
  };

  const markAsSand = (x, y) => {
    try {
      console.log(`marking ${x},${y} as sand`);
      map[y][x] = 'o';
      console.log(map.map((row) => row.join('')).join('\n'));
    } catch (error) {
      console.log(error, 'in markAsSand');
    }
  };

  const rockFormations = input.split('\n');
  rockFormations.forEach((formation) => {
    const points = formation.split(' -> ');
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const [x, y] = point.split(',');
      if (i === 0) {
        markAsRock(x, y);
        continue;
      }
      const [prevX, prevY] = points[i - 1]?.split(',');
      if (x < prevX) {
        // left
        const difference = prevX - x;
        for (let i = 1; i < difference + 1; i++) {
          const newPoint = `${+prevX - i},${prevY}`;
          const [newX, newY] = newPoint.split(',');
          markAsRock(newX, newY);
        }
      } else if (x > prevX) {
        // right
        const difference = x - prevX;
        for (let i = 1; i < difference + 1; i++) {
          const newPoint = `${+prevX + i},${prevY}`;
          const [newX, newY] = newPoint.split(',');
          markAsRock(newX, newY);
        }
      } else if (y < prevY) {
        // up
        const difference = prevY - y;
        for (let i = 1; i < difference + 1; i++) {
          const newPoint = `${prevX},${+prevY - i}`;
          const [newX, newY] = newPoint.split(',');
          markAsRock(newX, newY);
        }
      } else {
        // down
        const difference = y - prevY;
        for (let i = 1; i < difference + 1; i++) {
          const newPoint = `${prevX},${+prevY + i}`;
          const [newX, newY] = newPoint.split(',');
          markAsRock(newX, newY);
        }
      }
    }
  });

  let sandError = false;
  let totalSand = 0;
  let sandLocation = sandStartingPoint;

  const moveSand = (sandLocation) => {
    console.log(`moving sand ${sandLocation}`);
    try {
      const [sandX, sandY] = sandLocation.split(',');
      // console.log('sandX', sandX, 'sandY', sandY);
      // position directly below is open
      if (map[+sandY + 1][sandX] === '.') {
        // console.log('below is open:');
        // console.log(map[+sandY + 1][sandX]);
        return `${sandX},${+sandY + 1}`;
      }
      // position directly below is blocked, check diagonal left
      let blockedLeft = false;
      let l = 1;
      while (blockedLeft === false) {
        if (map[+sandY + l][+sandX - l] === undefined) {
          console.log(totalSand, 'totalSand');
          throw new Error('is this the end?');
        }
        console.log('checking down left', map[+sandY + l][+sandX - l]);
        if (map[+sandY + l][+sandX - l] === '.') {
          l++;
        } else {
          if (l > 1) {
            blockedLeft = true;
            console.log();
            return `${+sandX - (l - 1)},${+sandY + (l - 1)}`;
          } else {
            // can't go diagonal left at all, same check for right
            blockedLeft = true;
          }
        }
      }
      // position directly below is blocked, check diagonal right
      let blockedRight = false;
      let r = 1;
      while (blockedRight === false) {
        if (map[+sandY + r][+sandX + r] === undefined) {
          console.log(totalSand, 'totalSand');
          throw new Error('is this the end?');
        }
        if (map[+sandY + r][+sandX + r] === '.') {
          r++;
        } else {
          if (r > 1) {
            blockedRight = true;
            return `${+sandX + (r - 1)},${+sandY + (r - 1)}`;
          } else {
            // can't go diagonal right at all, stop here!
            blockedRight = true;
            return sandLocation;
          }
        }
      }

      // position can't change
      // console.log(`cant move from ${sandLocation}`);
      return sandLocation;
    } catch (error) {
      // console.log('sandError!!!', error);
      // console.log(totalSand, 'should I minus 1?');
      sandError = true;
    }
  };

  while (!sandError) {
    const newSandLocation = moveSand(sandLocation);
    console.log('newSandLocation', newSandLocation);
    if (newSandLocation === sandLocation) {
      console.log('newSandLocation === sandLocation');
      const [sandX, sandY] = newSandLocation.split(',');
      markAsSand(+sandX, +sandY);
      sandLocation = sandStartingPoint;
      totalSand++;
      if (newSandLocation === sandStartingPoint) {
        console.log(totalSand);
        throw new Error('sand has reached the top, why does it not fall');
      }
    } else {
      sandLocation = newSandLocation;
    }
  }

  return map;
};

const testMap = partOne(testInput);

fs.writeFileSync(
  './2022/14_testMap.txt',
  testMap.map((row) => row.join('')).join('\n')
);
