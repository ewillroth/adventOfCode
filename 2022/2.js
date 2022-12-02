const fs = require('fs');

const input = fs.readFileSync('./2022/2_input.txt', 'utf-8');
const rounds = input.split('\n');

// "The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors. The second column--"

//The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen.

//(1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

//calculate the score you would get if you were to follow the strategy guide

let score = 0;

const pointsForPlay = {
  X: 1,
  Y: 2,
  Z: 3,
};

rounds.forEach((round) => {
  const opponent = round[0];
  const me = round[2];
  score += pointsForPlay[me];
  switch (opponent) {
    case 'A':
      if (me === 'X') score += 3;
      if (me === 'Y') score += 6;
      break;
    case 'B':
      if (me === 'Y') score += 3;
      if (me === 'Z') score += 6;
      break;
    case 'C':
      if (me === 'Z') score += 3;
      if (me === 'X') score += 6;
      break;
  }
});

// part one
console.log(score);

let partTwoScore = 0;

// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"
// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
const whatToPlay = (opponent, outcome) => {
  switch (outcome) {
    case 'X': // lose
      if (opponent === 'A') return 'Z';
      if (opponent === 'B') return 'X';
      if (opponent === 'C') return 'Y';
      break;
    case 'Y': // draw
      if (opponent === 'A') return 'X';
      if (opponent === 'B') return 'Y';
      if (opponent === 'C') return 'Z';
      break;
    case 'Z': // win
      if (opponent === 'A') return 'Y';
      if (opponent === 'B') return 'Z';
      if (opponent === 'C') return 'X';
      break;
  }
};

const pointsForOutcome = {
  X: 0,
  Y: 3,
  Z: 6,
};

rounds.forEach((round) => {
  const opponent = round[0];
  const outcome = round[2];
  const me = whatToPlay(opponent, outcome);
  partTwoScore += pointsForPlay[me];
  partTwoScore += pointsForOutcome[outcome];
});

console.log(partTwoScore);
