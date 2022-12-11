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

const alternativelyAddAndSubtract = (bigInt) => {
  const asString = bigInt.toString();
  const array = asString.split('');
  const final = array.reduce((prev, current, currentIndex) => {
    if (currentIndex % 2 === 0) {
      return +prev + +current;
    } else {
      return +prev - current;
    }
  }, 0);
  return BigInt(final);
};

const canReduce = (bigIntArray) => {
  // https://www.cs.cornell.edu/andru/mathclub/handouts/Divisibility#:~:text=For%20big%20numbers%2C%20alternately%20add,so%20is%20the%20whole%20number
  // 2 If the last digit is even, the number is divisible by 2.
  if (
    bigIntArray.filter((bigInt) => {
      const asString = bigInt.toString();
      if (asString[asString.length - 1] === '2') return true;
      return false;
    }).length === bigIntArray.length
  ) {
    return 2n;
  }
  // 3 If the sum of the digits is divisible by 3, the number is also.
  // 4 If the last two digits form a number divisible by 4, the number is also.
  if (
    bigIntArray.filter((bigInt) => {
      const asString = bigInt.toString();
      if (
        +asString[asString.length - 1] +
          (+asString[asString.length - 2] % 4) ===
        0
      )
        return true;
      return false;
    }).length === bigIntArray.length
  ) {
    return 4n;
  }
  // 5 If the last digit is a 5 or a 0, the number is divisible by 5.
  if (
    bigIntArray.filter((bigInt) => {
      const asString = bigInt.toString();
      if (
        asString[asString.length - 1] === '5' ||
        asString[asString.length - 1] === '0'
      )
        return true;
      return false;
    }).length === bigIntArray.length
  ) {
    return 5n;
  }
  // 6 If the number is divisible by both 3 and 2, it is also divisible by 6.
  /* 7
	Take the last digit, double it, and subtract it from the rest of the number;
	if the answer is divisible by 7 (including 0), then the number is also. For big numbers, alternately
	add and subtract digits in groups of three. If the answer is divisible by 7, the number is too. For
	example 256242 is divisible by 7 because 256-242 = 14.
	*/
  /* 8 If the last three digits form a number divisible by 8, then so is the whole number.
	Double the hundreds’ digit, add the tens’ digits, double again and add the ones’ digit. If this is
	divisible by eight, so is the whole number. */
  // 9 If the sum of the digits is divisible by 9, the number is also.
  // 10 If the number ends in 0, it is divisible by 10.
  if (
    bigIntArray.filter((bigInt) => {
      const asString = bigInt.toString();
      if (asString[asString.length - 1] === '0') return true;
      return false;
    }).length === bigIntArray.length
  ) {
    return 10n;
  }
  /* 11 Alternately add and subtract the digits from left to right. (You can think of the first digit as being
	'added' to zero.) If the result (including 0) is divisible by 11, the number is also.
	Example: to see whether 365167484 is divisible by 11, start by subtracting:
	3-6+5-1+6-7+4-8+4 = 0; therefore 365167484 is divisible by 11. For big numbers, you can also
	alternately add and subtract digits in groups of three. If the answer is divisible by 11, the number is
	too. */
  if (
    bigIntArray.filter((bigInt) => {
      alternativelyAddAndSubtract(bigInt) % 11n === 0n;
    }).length === bigIntArray.length
  ) {
    return 11n;
  }
  // 12 If the number is divisible by both 3 and 4, it is also divisible by 12.
  /* 13 Remove the last digit from the number, then add 4 times the removed digit from the remaining
	number. If what is left is divisible by 13, then so is the original number.
	For big numbers, alternately add and subtract digits in groups of three, just like with 7. If the
	answer is divisible by 13, the number is too. */
  /* 17 Remove the last digit from the number, then subtract 5 times the removed digit from the remaining
	number. If what is left is divisible by 17, then so is the original number. */
  /* 19 Add twice the last digit to the remaining number. If the result is divisible by 19, so is the original
	number. */

  // nothing
  return 1n;
};

const gcd = (...numbers) => {
  return numbers.reduce((a, b) => (b === 0n ? a : gcd(b, a % b)));
};

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
  const allTestValues = Object.values(monkeyTracker)
    .map((monkey) => {
      if (monkey.id === undefined) return 1n;
      return monkey.testCondition;
    })
    .reduce((prev, current) => prev * current, 1n);
  console.log(allTestValues);
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
  // const divideBy = canReduce(monkeyTracker.items);
  // console.log('divideBy', divideBy);
  // monkeyTracker.items = monkeyTracker.items.map((val) => val / allTestValues);
  monkeyTracker.items = monkeyTracker.items.map((val) => val % allTestValues);
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
  for (let i = 0; i < 1001; i++) {
    playRoundExtraWorried(testMonkeyTracker, i + 1);
  }
  const sortedInspectionCounts = Object.values(testMonkeyTracker)
    .map((monkey) => {
      return monkey.itemsInspected;
    })
    .sort((a, b) => b - a);
};

partTwo();
// 14400720005 is too low

// testCasePartTwo();
