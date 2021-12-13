const fs = require('fs');

const input = fs.readFileSync('./12_input.txt', 'utf-8');
const testInput = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const map = {};

const connections = input.split('\n').filter((string) => {
	if (string.includes('xm') || string.includes('TS')) {
		return false;
	}
	return true;
});

connections.forEach((string) => {
	const caves = string.split('-');
	if (!map[caves[0]]) map[caves[0]] = [];
	if (!map[caves[1]]) map[caves[1]] = [];
	map[caves[0]].push(caves[1]);
	map[caves[1]].push(caves[0]);
});

const caves = Object.keys(map);

const finalPaths = [];

const isSmall = (cave) => {
	if (cave.match(/[A-Z]/)) return false;
	if (cave === 'start') return false;
	if (cave === 'end') return false;
	return true;
};

const findValidPaths = (string) => {
	const visited = [];
	const optionsForNext = map[string];
	const numberOfOptionsForNext = optionsForNext.length;
	const paths = [];

	options.forEach((cave, index) => {
		paths.push([cave]);
		if (paths[index][paths[index].length - 1] === 'end') {
			finalPaths.push(paths[index]);
		}
	});
};
console.log(map);

findValidPaths('start');
