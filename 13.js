const fs = require('fs');

const input = fs.readFileSync('./13_input.txt', 'utf-8');

const dots = input
	.split('fold')[0]
	.split('\n')
	.filter((val) => val.length > 0);

const foldInstructions = input
	.split('fold along')
	.filter((val) => val.includes('='))
	.map((val) => val.trim());
