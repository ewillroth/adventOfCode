const fs = require("fs");

const input = fs.readFileSync("./2023/2_input.txt", "utf-8");
const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

//   part 1
(() => {
  const games = input
    .trim()
    .split("\n")
    .map((line) => line.split(":")[1].split(";"));

  const threshholds = {
    red: 12,
    green: 13,
    blue: 14,
    maxCubes: 12 + 13 + 14,
  };

  const gamesThatWork = [];

  games.forEach((arrayOfDraws, gameNumber) => {
    const maxInBag = {
      red: 0,
      blue: 0,
      green: 0,
      maxCubes: 0,
    };
    arrayOfDraws.forEach((draw) => {
      let cubesThisDraw = 0;
      const colors = draw.split(",");
      colors.forEach((each) => {
        const [space, number, color] = each.split(" ");
        if (maxInBag[color] <= +number) maxInBag[color] = +number;
        cubesThisDraw += +number;
      });
      if (cubesThisDraw > maxInBag.maxCubes) maxInBag.maxCubes = cubesThisDraw;
    });
    if (
      maxInBag.red <= threshholds.red &&
      maxInBag.blue <= threshholds.blue &&
      maxInBag.green <= threshholds.green &&
      maxInBag.maxCubes <= threshholds.maxCubes
    ) {
      gamesThatWork.push(gameNumber + 1);
    }
  });
  console.log(gamesThatWork.reduce((a, b) => a + b));
})();

//   part 2
(() => {
  const games = input
    .trim()
    .split("\n")
    .map((line) => line.split(":")[1].split(";"));

  const gamePowers = [];

  games.forEach((arrayOfDraws, gameNumber) => {
    const maxInBag = {
      red: 0,
      blue: 0,
      green: 0,
      maxCubes: 0,
    };

    arrayOfDraws.forEach((draw) => {
      let cubesThisDraw = 0;
      const colors = draw.split(",");
      colors.forEach((each) => {
        const [space, number, color] = each.split(" ");
        if (maxInBag[color] <= +number) maxInBag[color] = +number;
        cubesThisDraw += +number;
      });
      if (cubesThisDraw > maxInBag.maxCubes) maxInBag.maxCubes = cubesThisDraw;
    });
    const gamePower = maxInBag.red * maxInBag.blue * maxInBag.green;
    gamePowers.push(gamePower);
  });

  console.log(gamePowers.reduce((a, b) => a + b));
})();
