// https://medium.com/@adriennetjohnson/a-walkthrough-of-dijkstras-algorithm-in-javascript-e94b74192026

const fs = require('fs');

const input = fs.readFileSync('./15_input.txt', 'utf-8');

const newRiskOne = (string) => {
	if (+string === 9) return '1';
	return +string + 1 + '';
};

const newRiskTwo = (string) => {
	if (+string === 9) return '2';
	if (+string === 8) return '1';
	return +string + 2 + '';
};

const newRiskThree = (string) => {
	if (+string === 9) return '3';
	if (+string === 8) return '2';
	if (+string === 7) return '1';
	return +string + 3 + '';
};

const newRiskFour = (string) => {
	if (+string === 9) return '4';
	if (+string === 8) return '3';
	if (+string === 7) return '2';
	if (+string === 6) return '1';
	return +string + 4 + '';
};

const testInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

const rows = input.split('\n');
const data = rows.map((row) => row.split(''));
const moreColumns = data.map((row) => {
	return [
		...row,
		...row.map((val) => newRiskOne(val)),
		...row.map((val) => newRiskTwo(val)),
		...row.map((val) => newRiskThree(val)),
		...row.map((val) => newRiskFour(val)),
	];
});
const actualData = [
	...moreColumns,
	...moreColumns.map((row) => row.map((val) => newRiskOne(val))),
	...moreColumns.map((row) => row.map((val) => newRiskTwo(val))),
	...moreColumns.map((row) => row.map((val) => newRiskThree(val))),
	...moreColumns.map((row) => row.map((val) => newRiskFour(val))),
];

console.log(actualData[actualData.length - 1]);
const points = [];

actualData.forEach((row, rowIndex) => {
	row.forEach((val, valIndex) => {
		points.push(`${rowIndex},${valIndex}`);
	});
});

const start = points[0];
const end = points[points.length - 1];

console.log(start, end);

class Graph {
	constructor() {
		this.nodes = [];
		this.adjacencyList = {};
	}

	addNode(node) {
		this.nodes.push(node);
		this.adjacencyList[node] = [];
	}

	addEdge(node1, node2, weight) {
		this.adjacencyList[node1].push({ node: node2, weight: weight });
		// this.adjacencyList[node2].push({ node: node1, weight: weight });
	}

	findPathWithDijkstra(startNode, endNode) {
		let times = {};
		let backtrace = {};
		let pq = new PriorityQueue();

		times[startNode] = 0;

		this.nodes.forEach((node) => {
			if (node !== startNode) {
				times[node] = Infinity;
			}
		});

		pq.enqueue([startNode, 0]);
		while (!pq.isEmpty()) {
			let shortestStep = pq.dequeue();
			let currentNode = shortestStep[0];
			this.adjacencyList[currentNode].forEach((neighbor) => {
				let time = times[currentNode] + neighbor.weight;
				if (time < times[neighbor.node]) {
					times[neighbor.node] = time;
					backtrace[neighbor.node] = currentNode;
					pq.enqueue([neighbor.node, time]);
				}
			});
		}
		let path = [endNode];
		let lastStep = endNode;
		while (lastStep !== startNode) {
			path.unshift(backtrace[lastStep]);
			lastStep = backtrace[lastStep];
		}
		console.log(`Path is ${path} and time is ${times[endNode]}`);
		return `Path is ${path} and time is ${times[endNode]}`;
	}
}

let map = new Graph();

points.forEach((point) => {
	map.addNode(point);
});

points.forEach((point) => {
	const currentX = +point.split(',')[0];
	const currentY = +point.split(',')[1];

	const nextOptions = [
		`${currentX - 1},${currentY}`,
		`${currentX + 1},${currentY}`,
		`${currentX},${currentY - 1}`,
		`${currentX},${currentY + 1}`,
	].filter((option) => {
		if (
			+option.split(',')[0] < 0 ||
			+option.split(',')[1] < 0 ||
			+option.split(',')[0] > end.split(',')[0] ||
			+option.split(',')[1] > end.split(',')[1]
		) {
			return false;
		}
		return true;
	});

	nextOptions.forEach((nextOption) => {
		map.addEdge(
			point,
			nextOption,
			+actualData[+nextOption.split(',')[0]][+nextOption.split(',')[1]]
		);
	});
});

class PriorityQueue {
	constructor() {
		this.collection = [];
	}
	enqueue(element) {
		if (this.isEmpty()) {
			this.collection.push(element);
		} else {
			let added = false;
			for (let i = 1; i <= this.collection.length; i++) {
				if (element[1] < this.collection[i - 1][1]) {
					this.collection.splice(i - 1, 0, element);
					added = true;
					break;
				}
			}
			if (!added) {
				this.collection.push(element);
			}
		}
	}
	dequeue() {
		let value = this.collection.shift();
		return value;
	}
	isEmpty() {
		return this.collection.length === 0;
	}
}

map.findPathWithDijkstra(start, end);
