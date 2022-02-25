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

const connections = input.split('\n');

connections.forEach((string) => {
	const caves = string.split('-');
	if (!map[caves[0]]) map[caves[0]] = [];
	if (!map[caves[1]]) map[caves[1]] = [];
	map[caves[0]].push(caves[1]);
	map[caves[1]].push(caves[0]);
});

const isSmall = (cave) => {
	if (cave.match(/[A-Z]/)) return false;
	if (cave === 'start') return false;
	if (cave === 'end') return false;
	return true;
};

const finalPaths = [];
const paths = [['start']];

console.log('map', map);

const containsTwoSmall = (path) => {
	path = path.filter((val) => isSmall(val));
	counts = {};
	path.forEach((val) => {
		if (!counts[val]) {
			counts[val] = 1;
		} else {
			counts[val] = counts[val] + 1;
		}
	});
	if (Object.values(counts).includes(2)) return true;
	return false;
};

while (paths.length > 0) {
	const currentPath = paths.pop();
	const nextOptions = map[currentPath[currentPath.length - 1]];
	nextOptions.forEach((option) => {
		if (option === 'start') return;
		if (option === 'end') {
			finalPaths.push([...currentPath, option]);
			return;
		}
		if (
			currentPath.includes(option) &&
			isSmall(option) &&
			!containsTwoSmall(currentPath)
		) {
			paths.push([...currentPath, option]);
			return;
		}
		if (
			currentPath.includes(option) &&
			isSmall(option) &&
			containsTwoSmall(currentPath)
		) {
			return;
		}
		if (!currentPath.includes(option) || !isSmall(option))
			paths.push([...currentPath, option]);
	});
}

// fs.writeFileSync('12_finalPaths.txt', finalPaths.join('\n'));

finalPaths.forEach((path) => {
	path.forEach((val) => {
		const counts = {};
		if (!counts[val]) {
			counts[val] = 1;
		} else {
			counts[val] = counts[val] + 1;
		}
		if (counts['start'] > 1) console.log('DUPLICATE START');
		if (counts['end'] > 1) console.log('DUPLICATE END');
	});
});

console.log('part one', finalPaths.length);
