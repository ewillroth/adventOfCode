/*
Player 1 starting position: 2
Player 2 starting position: 7


positions = 1-10

*/

// const takeTurn = (player) => {
// 	const startingPosition = player === 1 ? positionOne : positionTwo;
// 	// console.log('player', player, 'starting position', startingPosition);
// 	let scoreForTurn = 0;
// 	rolls++;
// 	rollsCount++;
// 	if (rolls === 101) {
// 		rolls = 1;
// 	}
// 	scoreForTurn += rolls;
// 	rolls++;
// 	rollsCount++;
// 	if (rolls === 101) {
// 		rolls = 1;
// 	}
// 	scoreForTurn += rolls;
// 	rolls++;
// 	rollsCount++;
// 	if (rolls === 101) {
// 		rolls = 1;
// 	}
// 	scoreForTurn += rolls;
// 	// console.log('score for turn', scoreForTurn);
// 	if (player === 1) {
// 		positionOne = (positionOne + scoreForTurn) % 10 || 10;
// 		scoreOne += positionOne;
// 	} else {
// 		positionTwo = (positionTwo + scoreForTurn) % 10 || 10;
// 		scoreTwo += positionTwo;
// 	}
// 	// console.log(rollsCount, scoreOne, scoreTwo);
// };

// let player = 1;

// while (scoreOne < 1000 || scoreTwo < 1000) {
// 	takeTurn(player);
// 	if (scoreOne > 1000 || scoreTwo > 1000) {
// 		console.log(rolls, rollsCount, scoreOne, scoreTwo);
// 	}
// 	if (player === 2) {
// 		player = 1;
// 	} else {
// 		player = 2;
// 	}
// }

// 95337 - too low
// 96228 - too low
// 96552 - too low (108 * 894)
// 153000 - not right ( 850 * 180)
// 754020 (1062 * 710)
// 1101672 (1284 * 858)

// part one: (1098 * 734)

const universes = [
	{
		activePlayer: 1,
		scoreOne: 0,
		scoreTwo: 0,
		positionOne: 2,
		positionTwo: 7,
		rolls: [],
		rollsCount: 0,
	},
];

const takeTurn = (player) => {};
