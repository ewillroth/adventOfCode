const dotenv = require('dotenv');
dotenv.config();

require(`./${process.env.YEAR}/${process.env.DAY}.js`);
