const fs = require("fs");

const input = fs.readFileSync(
  `./${process.env.YEAR}/inputs/${process.env.DAY}_input.txt`,
  "utf-8"
);

const testInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const parseInputToGrid = (input) => {
  const grid = {};

  const lines = input.trim().split("\n");
  lines.forEach((line, index) => {
    const chars = line.split("");
    chars.forEach((char, index2) => (grid[`${index},${index2}`] = char));
  });

  return grid;
};

const isXmas = (grid, key) => {
  const obj = {
    up: false,
    upRight: false,
    right: false,
    downRight: false,
    down: false,
    downLeft: false,
    left: false,
    upLeft: false,
  };

  Object.keys(obj).forEach((direction) => {
    const [v, h] = key.split(",").map(Number);
    let word;
    switch (direction) {
      case "up":
        word =
          grid[key] +
          grid[`${v - 1},${h}`] +
          grid[`${v - 2},${h}`] +
          grid[`${v - 3},${h}`];
        break;
      case "upRight":
        word =
          grid[key] +
          grid[`${v - 1},${h + 1}`] +
          grid[`${v - 2},${h + 2}`] +
          grid[`${v - 3},${h + 3}`];
        break;
      case "right":
        word =
          grid[key] +
          grid[`${v},${h + 1}`] +
          grid[`${v},${h + 2}`] +
          grid[`${v},${h + 3}`];
        break;
      case "downRight":
        word =
          grid[key] +
          grid[`${v + 1},${h + 1}`] +
          grid[`${v + 2},${h + 2}`] +
          grid[`${v + 3},${h + 3}`];
        break;
      case "down":
        word =
          grid[key] +
          grid[`${v + 1},${h}`] +
          grid[`${v + 2},${h}`] +
          grid[`${v + 3},${h}`];
        break;
      case "downLeft":
        word =
          grid[key] +
          grid[`${v + 1},${h - 1}`] +
          grid[`${v + 2},${h - 2}`] +
          grid[`${v + 3},${h - 3}`];
        break;
      case "left":
        word =
          grid[key] +
          grid[`${v},${h - 1}`] +
          grid[`${v},${h - 2}`] +
          grid[`${v},${h - 3}`];
        break;
      case "upLeft":
        word =
          grid[key] +
          grid[`${v - 1},${h - 1}`] +
          grid[`${v - 2},${h - 2}`] +
          grid[`${v - 3},${h - 3}`];
        break;
    }
    if (word === "XMAS") obj[direction] = true;
  });

  return Object.values(obj).filter(Boolean).length;
};
const isXMas = (grid, key) => {
  const [v, h] = key.split(",").map(Number);
  const upLeft = grid[`${v - 1},${h - 1}`];
  const upRight = grid[`${v - 1},${h + 1}`];
  const downRight = grid[`${v + 1},${h + 1}`];
  const downLeft = grid[`${v + 1},${h - 1}`];
  const chars = [upLeft, upRight, downRight, downLeft];

  const checkOrientation = (charsArr) => {
    if (charsArr[0] === charsArr[2]) return false;
    if (charsArr[1] === charsArr[3]) return false;
    return true;
  };

  if (
    chars.filter((char) => char === "M").length === 2 &&
    chars.filter((char) => char === "S").length === 2 &&
    checkOrientation(chars)
  )
    return true;
  return false;
};

const one = (input) => {
  let xmases = 0;
  const grid = parseInputToGrid(input);
  Object.keys(grid).forEach((key) => {
    if (grid[key] !== "X") return;
    const xmasCount = isXmas(grid, key);
    xmases += xmasCount;
  });
  console.log(xmases);
};

const two = (input) => {
  let xMases = 0;
  const grid = parseInputToGrid(input);
  Object.keys(grid).forEach((key) => {
    if (grid[key] !== "A") return;
    if (isXMas(grid, key)) xMases++;
  });
  console.log(xMases);
};

one(input);

two(input);

// 1950 too high
