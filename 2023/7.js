const fs = require("fs");

const input = fs.readFileSync(
  `./${process.env.YEAR}/${process.env.DAY}_input.txt`,
  "utf-8"
);

const testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const typeMap = {
  1: "highCard",
  2: "onePair",
  3: "twoPair",
  4: "threeOfKind",
  5: "fullHouse",
  6: "fourOfKind",
  7: "fiveOfKind",
};

const sortHandsByCardOrder = (handA, handB, cardRanks) => {
  const [a1, a2, a3, a4, a5] = handA.split("");
  const [b1, b2, b3, b4, b5] = handB.split("");

  let diff = 0;
  diff = cardRanks[a1] - cardRanks[b1];
  if (diff !== 0) return diff;
  diff = cardRanks[a2] - cardRanks[b2];
  if (diff !== 0) return diff;
  diff = cardRanks[a3] - cardRanks[b3];
  if (diff !== 0) return diff;
  diff = cardRanks[a4] - cardRanks[b4];
  if (diff !== 0) return diff;
  diff = cardRanks[a5] - cardRanks[b5];
  return diff;
};

const partOne = () => {
  const findHandType = (hand) => {
    const sortedCards = hand.split("").sort();

    if (Array.from(new Set(hand.split(""))).length === 1) return 7; // five of a kind
    if (Array.from(new Set(hand.split(""))).length === 2) {
      if (
        sortedCards[0] === sortedCards[1] &&
        sortedCards[3] === sortedCards[4]
      )
        return 5; // full house
      return 6; // four of a kind
    }
    if (Array.from(new Set(hand.split(""))).length === 3) {
      // three of a kind or two pair
      const threeOfKind =
        (sortedCards[0] === sortedCards[1] &&
          sortedCards[1] === sortedCards[2]) ||
        (sortedCards[1] === sortedCards[2] &&
          sortedCards[2] === sortedCards[3]) ||
        (sortedCards[2] === sortedCards[3] &&
          sortedCards[3] === sortedCards[4]);
      if (threeOfKind) return 4;
      return 3;
    }
    if (Array.from(new Set(hand.split(""))).length === 4) return 2; // one pair
    if (Array.from(new Set(hand.split(""))).length === 5) return 1; // high card
  };

  const cardRanks = {
    A: 13,
    K: 12,
    Q: 11,
    J: 10,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1,
  };

  /*
> 0	sort a after b, e.g. [b, a]
< 0	sort a before b, e.g. [a, b]
=== 0	keep original order of a and b
 */
  const camelCardsSortFn = (handA, handB) => {
    const handAType = findHandType(handA.hand);
    const handBType = findHandType(handB.hand);
    const diff = handAType - handBType;
    if (diff === 0) {
      return sortHandsByCardOrder(handA.hand, handB.hand, cardRanks);
    }
    return diff;
  };

  const lines = input
    .trim()
    .split("\n")
    .map((line) => {
      const [hand, bid] = line.split(" ");
      const type = findHandType(hand);
      const typeText = typeMap[type];
      return { hand, bid: +bid, type, typeText };
    })
    .sort(camelCardsSortFn);

  let answer = 0;

  lines.forEach((line, index) => {
    const val = line.bid * (index + 1);
    answer += val;
  });

  console.log("pt1", answer);
};

partOne();
// wrong answers
// 248018453
// 247776069
// 247720941
// 247992781

const partTwo = () => {
  const findHandType = (hand) => {
    const sortedCards = hand.split("").sort();
    const wildCards = hand.split("").filter((char) => char === "*").length;
    const noWildsSorted = sortedCards.filter((val) => val !== "*");
    const uniqueCards = Array.from(new Set(hand.split(""))).length;
    const uniqueNonWilds = Array.from(new Set(noWildsSorted)).length;

    if (uniqueNonWilds === 1 || wildCards === 5) {
      return 7; // five of a kind
    }
    if (uniqueNonWilds === 2) {
      // full house or four of a kind
      if (wildCards === 3) {
        return 6; // four of a kind
      } else if (wildCards === 2) {
        if (uniqueNonWilds === 2) return 6;
        return 5;
      } else if (wildCards === 1) {
        const [a, b] = Array.from(new Set(noWildsSorted));
        const numA = noWildsSorted.filter((char) => char === a).length;
        const numB = noWildsSorted.filter((char) => char === b).length;
        if (numA === 3 || numB === 3) return 6;
        return 5;
      } else {
        if (
          sortedCards[0] === sortedCards[1] &&
          sortedCards[3] === sortedCards[4]
        )
          return 5; // full house
        return 6; // four of a kind
      }
    }
    if (uniqueNonWilds === 3) {
      if (wildCards === 2) {
        return 4;
      } else if (wildCards === 1) {
        if (noWildsSorted[0] === noWildsSorted[1]) return 4;
        if (noWildsSorted[1] === noWildsSorted[2]) return 4;
        if (noWildsSorted[2] === noWildsSorted[3]) return 4;
      } else {
        const threeOfKind =
          (sortedCards[0] === sortedCards[1] &&
            sortedCards[1] === sortedCards[2]) ||
          (sortedCards[1] === sortedCards[2] &&
            sortedCards[2] === sortedCards[3]) ||
          (sortedCards[2] === sortedCards[3] &&
            sortedCards[3] === sortedCards[4]);
        if (threeOfKind) return 4;
      }
      return 3;
    }
    if (uniqueNonWilds - wildCards <= 4) return 2; // one pair
    if (uniqueNonWilds - wildCards <= 5) return 1; // high card
  };

  const cardRanks = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    "*": 0,
  };

  /*
> 0	sort a after b, e.g. [b, a]
< 0	sort a before b, e.g. [a, b]
=== 0	keep original order of a and b
 */
  const camelCardsSortFn = (handA, handB) => {
    const handAType = findHandType(handA.hand);
    const handBType = findHandType(handB.hand);
    const diff = handAType - handBType;
    if (diff === 0) {
      return sortHandsByCardOrder(handA.hand, handB.hand, cardRanks);
    }
    return diff;
  };

  const lines = input
    .trim()
    .split("\n")
    .map((line) => {
      let [hand, bid] = line.split(" ");
      hand = hand.replaceAll("J", "*");
      const type = findHandType(hand);
      const typeText = typeMap[type];
      return { hand, bid: +bid, type, typeText };
    })
    .sort(camelCardsSortFn);

  fs.writeFileSync("./2023/7_input_sorted.json", JSON.stringify(lines));

  let answer = 0;

  lines.forEach((line, index) => {
    const val = line.bid * (index + 1);
    answer += val;
  });

  console.log("pt2", answer);
};

partTwo();

// wrong answers
// 245851480 too low
// 246454153 too high
// 246537496 too high
