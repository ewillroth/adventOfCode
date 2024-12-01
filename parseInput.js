const fs = require("fs");

const input = fs.readFileSync(
  `./${process.env.YEAR}/inputs/${process.env.DAY}_input.txt`,
  "utf-8"
);

const lines = input.trim().split("\n");

const testInput = ``;
