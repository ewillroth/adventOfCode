const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const axios = require('axios');

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
      `./${process.env.YEAR}/${process.env.DAY}_input.txt`,
      data
    );
  })
  .catch((error) => {
    console.log(error.response.data, 'error');
  });

// axios
//   .get(
//     `https://adventofcode.com/${process.env.YEAR}/day/${process.env.DAY}/input`,
//     (response) => {
//       let data = '';

//       // A chunk of data has been received.
//       response.on('data', (chunk) => {
//         data += chunk;
//       });

//       // The whole response has been received. Print out the result.
//       response.on('end', () => {
//         console.log(JSON.parse(data).explanation);
//       });
//     }
//   )
//   .on('error', (err) => {
//     console.log('Error: ' + err.message);
//   });
