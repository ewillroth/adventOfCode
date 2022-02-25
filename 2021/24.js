const fs = require('fs');

/*
	inp a - Read an input value and write it to variable a.
	add a b - Add the value of a to the value of b, then store the result in variable a.
	mul a b - Multiply the value of a by the value of b, then store the result in variable a.
	div a b - Divide the value of a by the value of b, truncate the result to an integer, then store the result in variable a. (Here, "truncate" means to round the value toward zero.)
	mod a b - Divide the value of a by the value of b, then store the remainder in variable a. (This is also called the modulo operation.)
	eql a b - If the value of a and b are equal, then store the value 1 in variable a. Otherwise, store the value 0 in variable a.
 */

const program = fs.readFileSync('24_input.txt', 'utf-8').split('\n');
console.log(program);
let w;
let x;
let y;
let z;
ALU(program[0]);
const ALU = (string) => {
	const inpCount = 1;
};
