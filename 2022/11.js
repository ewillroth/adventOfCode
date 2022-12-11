const fs = require('fs');

const input = fs.readFileSync('./2022/11_input.txt', 'utf-8');

const testInput = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`;

// part 1

const buildMonkeyTracker = (input) => {
  const monkeys = input.trim().split('\n\n');
  const monkeyData = monkeys.map((monkey) => {
    const [title, items, operation, test, trueResult, falseResult] =
      monkey.split('\n');
    return {
      id: title.split(' ')[1][0],
      items: items
        .split(': ')[1]
        .split(', ')
        .map((item) => +item),
      onInspection: (old) => {
        const [, , , , , , operator, amt] = operation.split(' ');
        const amount = amt === 'old' ? old : +amt;
        if (operator === '+') return old + amount;
        if (operator === '*') return old * amount;
      },
      testCondition: +test.split(' divisible by ')[1],
      ifTrue: trueResult.split('throw to monkey ')[1],
      ifFalse: falseResult.split('throw to monkey ')[1],
      itemsInspected: 0,
    };
  });

  const monkeyTracker = {};
  monkeyData.forEach((monkey) => {
    monkeyTracker[monkey.id] = monkey;
  });
  return monkeyTracker;
};

const playRound = (monkeyTracker) => {
  Object.keys(monkeyTracker).forEach((monkey) => {
    const monkeyData = monkeyTracker[monkey];
    while (monkeyData.items.length > 0) {
      monkeyTracker[monkeyData.id].itemsInspected++;
      const itemToInspect = monkeyData.items.shift();
      const newWorryLevel = monkeyData.onInspection(itemToInspect);
      const testResult =
        Math.floor(newWorryLevel / 3) % monkeyData.testCondition === 0;
      if (testResult === true) {
        monkeyTracker[monkeyData.ifTrue].items.push(
          Math.floor(newWorryLevel / 3)
        );
      }
      if (testResult === false) {
        monkeyTracker[monkeyData.ifFalse].items.push(
          Math.floor(newWorryLevel / 3)
        );
      }
    }
  });
};

const partOne = () => {
  const monkeyTracker = buildMonkeyTracker(input);
  for (let i = 0; i < 20; i++) {
    playRound(monkeyTracker);
  }

  const sortedInspectionCounts = Object.values(monkeyTracker)
    .map((monkey) => {
      return monkey.itemsInspected;
    })
    .sort((a, b) => b - a);

  console.log(sortedInspectionCounts[0] * sortedInspectionCounts[1]); // 58794
};

// partOne();
/////////////////////
/////////////////////
// part 2
/////////////////////
/////////////////////

const checkDivisible = () => {
  // is this something?
  // https://www.cs.cornell.edu/andru/mathclub/handouts/Divisibility#:~:text=For%20big%20numbers%2C%20alternately%20add,so%20is%20the%20whole%20number
};

function gcd(...numbers) {
  return numbers.reduce((a, b) => (b === 0n ? a : gcd(b, a % b)));
}

const buildMonkeyTrackerWithBigInt = (input) => {
  let nextId = 0;
  const itemMap = [];
  const monkeys = input.trim().split('\n\n');
  const monkeyData = monkeys.map((monkey) => {
    const [title, items, operation, test, trueResult, falseResult] =
      monkey.split('\n');
    const itemsAsBigInt = items
      .split(': ')[1]
      .split(', ')
      .map((item) => BigInt(item));
    const itemIds = [];
    itemsAsBigInt.forEach((item) => {
      itemMap[nextId] = item;
      itemIds.push(nextId);
      nextId++;
    });
    return {
      id: title.split(' ')[1][0],
      items: itemIds,
      onInspection: (old) => {
        const [, , , , , , operator, amt] = operation.split(' ');
        const amount = amt === 'old' ? old : BigInt(amt);
        if (operator === '+') return old + amount;
        if (operator === '*') return old * amount;
      },
      testCondition: BigInt(test.split(' divisible by ')[1]),
      ifTrue: trueResult.split('throw to monkey ')[1],
      ifFalse: falseResult.split('throw to monkey ')[1],
      itemsInspected: 0,
    };
  });

  const monkeyTracker = {
    items: itemMap,
  };
  monkeyData.forEach((monkey) => {
    monkeyTracker[monkey.id] = monkey;
  });
  return monkeyTracker;
};

const playRoundExtraWorried = (monkeyTracker, round) => {
  if (round) console.log(`rd: ${round}`);
  Object.keys(monkeyTracker).forEach((monkey) => {
    console.log(
      `before rd:${monkeyTracker[monkey].id} inspected ${monkeyTracker[monkey].itemsInspected}`
    );
    if (monkeyTracker[monkey].id === undefined) return;
    while (monkeyTracker[monkey].items.length > 0) {
      monkeyTracker[monkey].itemsInspected++;
      const itemToInspectId = monkeyTracker[monkey].items.shift();
      const itemToInspect = monkeyTracker.items[itemToInspectId];
      const testResult =
        monkeyTracker[monkey].onInspection(itemToInspect) %
          monkeyTracker[monkey].testCondition ===
        0n;
      monkeyTracker.items[itemToInspectId] =
        monkeyTracker[monkey].onInspection(itemToInspect);
      if (testResult === true) {
        monkeyTracker[monkeyTracker[monkey].ifTrue].items.push(itemToInspectId);
      }
      if (testResult === false) {
        monkeyTracker[monkeyTracker[monkey].ifFalse].items.push(
          itemToInspectId
        );
      }
    }
  });
  const divideBy = gcd(...Object.values(monkeyTracker.items));
  console.log('divideBy', divideBy);
  monkeyTracker.items = monkeyTracker.items.map((val) => val / divideBy);
};

const partTwo = () => {
  const monkeyTracker = buildMonkeyTrackerWithBigInt(input);

  for (let i = 0; i < 10000; i++) {
    playRoundExtraWorried(monkeyTracker, i + 1);
  }
  const sortedInspectionCounts = Object.values(monkeyTracker)
    .map((monkey) => {
      return monkey.itemsInspected;
    })
    .sort((a, b) => b - a);
  console.log(sortedInspectionCounts[0] * sortedInspectionCounts[1]);
};

const testCasePartTwo = () => {
  const testMonkeyTracker = buildMonkeyTrackerWithBigInt(testInput);
  for (let i = 0; i < 10000; i++) {
    playRoundExtraWorried(testMonkeyTracker, i + 1);
  }
  const sortedInspectionCounts = Object.values(testMonkeyTracker)
    .map((monkey) => {
      return monkey.itemsInspected;
    })
    .sort((a, b) => b - a);
  console.log(sortedInspectionCounts[0] * sortedInspectionCounts[1]);
};

// partTwo();
// 14400720005 is too low

testCasePartTwo();
