const fs = require('fs');

const input = fs.readFileSync('./2022/24_input.txt', 'utf-8');

const sampleInput = `
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#
`;

const findBorders = (input) => {
  let maxX;
  let maxY;
  const rows = input.trim().split('\n');
  maxX = rows[0].length - 1;
  maxY = rows.length - 1;
  return { maxX, maxY, minX: 0, minY: 0 };
};

const findArrowPositions = (input) => {
  const map = {};
  const blizzards = [];
  const rows = input.trim().split('\n');
  rows.forEach((row, rowIndex) => {
    row.split('').forEach((col, colIndex) => {
      map[`${rowIndex},${colIndex}`] = col;
      if (['<', '>', 'v', '^'].includes(col))
        blizzards.push({ direction: col, location: `${rowIndex},${colIndex}` });
    });
  });
  return [map, blizzards];
};

const sample = () => {
  const { maxX, maxY, minX, minY } = findBorders(sampleInput);
  console.log(minX, maxX, minY, maxY);
  const [map, blizzards] = findArrowPositions(sampleInput);
  console.log(map);
  console.log(blizzards);
};

const moveArrow = (arrow, currentPosition, borders) => {
  switch (arrow) {
    case '>':
      break;
    case 'v':
      break;
    case '<':
      break;
    case '^':
      break;
  }
};

sample();
