const fs = require('fs');
/*

The probe's x,y position starts at 0,0

fire the probe with any integer velocity in the x (forward) and y (upward, or downward if negative)


The probe's x position increases by its x velocity.
The probe's y position increases by its y velocity.
The probe's x velocity changes by 1 toward the value 0; that is, it decreases by 1 if it is greater than 0, increases by 1 if it is less than 0, or does not change if it is already 0.
The probe's y velocity decreases by 1.

Target area: x=135..155, y=-102..-78

Highest you can shoot it where one step ends in the target area
 */

const map = {};

const takeStep = (currentPosition, currentVelocity) => {
	let inTarget = false;
	const nextPosition = [
		currentPosition[0] + currentVelocity[0],
		currentPosition[1] + currentVelocity[1],
	];
	const nextVelocity = [
		currentVelocity[0] > 0
			? currentVelocity[0] - 1
			: currentVelocity[0] < 0
			? currentVelocity[0] + 1
			: currentVelocity[0],
		currentVelocity[1] - 1,
	];
	// x=135..155, y=-102..-78
	if (
		nextPosition[0] > 134 &&
		nextPosition[0] < 156 &&
		nextPosition[1] > -103 &&
		nextPosition[1] < -79
	) {
		inTarget = true;
	}
	return { nextPosition, nextVelocity, inTarget };
};

for (let x = -1200; x < 1200; x++) {
	for (let y = -1200; y < 1200; y++) {
		map[`${x},${y}`] = {
			label: `${x},${y}`,
			valid: false,
			highestY: 0,
		};
	}
}

const validSolutions = [];

Object.keys(map).forEach((startingVelocity, i) => {
	const velX = +startingVelocity.split(',')[0];
	const velY = +startingVelocity.split(',')[1];
	let velocity = [velX, velY];
	let position = [0, 0];
	for (let i = 0; i < 800; i++) {
		const { nextPosition, nextVelocity, inTarget } = takeStep(
			position,
			velocity
		);
		if (map[startingVelocity].highestY < nextPosition[1]) {
			map[startingVelocity].highestY = nextPosition[1];
		}
		position = nextPosition;
		velocity = nextVelocity;
		if (inTarget) {
			map[startingVelocity].valid = true;
			validSolutions.push(startingVelocity);
			break;
		}
	}
});

console.log(validSolutions.length);

// fs.writeFileSync('17_valid.json', JSON.stringify(validSolutions));

// 894 is too low
