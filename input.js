const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const axios = require("axios");

axios
  .get(
    `https://adventofcode.com/${process.env.YEAR}/day/${process.env.DAY}/input`,
    {
      headers: {
        Cookie: `session=${process.env.SESSION};`,
      },
    }
  )
  .then((response) => {
    const data = response.data;
    fs.writeFileSync(
      `./${process.env.YEAR}/inputs/${process.env.DAY}_input.txt`,
      data
    );
  })
  .catch((error) => {
    console.log(error.response.data, "error");
  });

fs.copyFileSync(
  `parseInput.js`,
  `./${process.env.YEAR}/${process.env.DAY}.js`,
  fs.constants.COPYFILE_EXCL,
  (err) => {
    if (err) console.log(`${err} - copying parseInput`);
  }
);
