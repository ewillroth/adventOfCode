const fs = require("fs");

const input = fs.readFileSync(
  `./${process.env.YEAR}/${process.env.DAY}_input.txt`,
  "utf-8"
);

const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

// part 1
const part1 = () => {
  const cards = input.trim().split("\n");
  let total = 0;
  cards.forEach((card) => {
    let cardtotal = 0;
    const [a, b] = card.split(" | ");
    const yourNumbers = b.split(" ").filter((val) => val);
    const winningNumbers = a
      .split(": ")[1]
      .split(" ")
      .filter((val) => val);
    yourNumbers.forEach((num) => {
      if (winningNumbers.includes(num)) {
        if (cardtotal === 0) {
          cardtotal = 1;
        } else {
          cardtotal = cardtotal * 2;
        }
      }
    });
    total += cardtotal;
  });
  console.log(total);
};

part1();

// part 2
const part2 = () => {
  let totalCards = 0;
  const cards = input
    .trim()
    .split("\n")
    .map((card, index) => ({
      card: card,
      number: index + 1,
    }));
  let cardsToProcess = [...cards];

  const checkCard = (card) => {
    let wins = 0;
    const [a, b] = card.card.split(" | ");
    const yourNumbers = b.split(" ").filter((val) => val);
    const winningNumbers = a
      .split(": ")[1]
      .split(" ")
      .filter((val) => val);
    yourNumbers.forEach((val) => {
      if (winningNumbers.includes(val)) wins++;
    });
    const cardsToAdd = cards.slice(card.number, wins + card.number);
    cardsToProcess = [...cardsToAdd, ...cardsToProcess];
  };

  while (cardsToProcess.length) {
    console.log(cardsToProcess.length);
    totalCards++;
    const cardToCheck = cardsToProcess.shift();
    checkCard(cardToCheck);
  }
  console.log(totalCards);
};
part2();
