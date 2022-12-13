const fs = require('fs');

const input = fs.readFileSync('./2022/12_input.txt', 'utf-8');
const testInput = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

class PriorityQueue {
  constructor() {
    this.collection = [];
  }
  enqueue(element) {
    // console.log(element, 'element in enqueue');
    if (this.isEmpty()) {
      this.collection.push(element);
      // console.log(`added ${element}`);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          // console.log(`added ${element}`);
          added = true;
          break;
        }
      }
      if (!added) {
        // console.log(`added ${element} at end`);
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
  getLength() {
    return this.collection.length;
  }
}

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

  getAdjacencyList() {
    return this.adjacencyList;
  }

  getAdjacencyListKeys() {
    return Object.keys(this.adjacencyList);
  }

  findPathWithDijkstra(startNode, endNode) {
    console.log('starting djikstra', 'start', startNode, 'end', endNode);
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
      // console.log('step', shortestStep);
      // console.log('queue length', pq.getLength());
      let currentNode = shortestStep[0];
      // console.log(currentNode, 'currentNode');
      // console.log('neighbors for step', this.adjacencyList[currentNode]);
      if (currentNode === endNode) {
        console.log('current === end');
      }
      this.adjacencyList[currentNode].forEach((neighbor) => {
        if (neighbor === endNode) {
          console.log('end is a neighbor');
        }
        let time = times[currentNode] + neighbor.weight;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          // console.log('adding to queue', [neighbor.node, time]);
          pq.enqueue([neighbor.node, time]);
        }
      });
    }
    let path = [endNode];
    let lastStep = endNode;
    while (lastStep !== startNode) {
      console.log('entering backtrace');
      console.log(
        'backtrace, neighbors of end',
        backtrace[`19,120`],
        backtrace[`21,120`],
        backtrace[`20,119`],
        backtrace[`20,121`]
      );
      if (backtrace[lastStep] == undefined) {
        throw new Error('lastStep is not in backtrace');
      }
      path.unshift(backtrace[lastStep]);
      lastStep = backtrace[lastStep];
    }
    console.log(`Path is ${path} and time is ${times[endNode]}`);
    return `Path is ${path} and time is ${times[endNode]}`;
  }
}

const partOne = () => {
  const elevationData = input
    .trim()
    .split('\n')
    .map((row) => row.split(''));

  let start;
  let end;

  const canMoveTo = (from, to) => {
    if (from === 'S') {
      from = 'a'.charCodeAt(0);
    } else if (from === 'E') {
      from = 'z'.charCodeAt(0);
    } else {
      from = from.charCodeAt(0);
    }
    if (to === 'E') {
      to = 'z'.charCodeAt(0);
    } else if (to === 'S') {
      to = 'a'.charCodeAt(0);
    } else {
      to = to.charCodeAt(0);
    }
    if (Math.abs(to - from) > 1) {
      return false;
    }
    if (Math.abs(from - to) > 1) {
      return false;
    }
    return true;
  };

  let graph = new Graph();
  const points = [];

  elevationData.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      points.push(`${rowIndex},${colIndex}`);
      if (col === 'S') start = `${rowIndex},${colIndex}`;
      if (col === 'E') end = `${rowIndex},${colIndex}`;
    });
  });

  points.forEach((point) => {
    graph.addNode(point);
  });

  points.forEach((point) => {
    const [currentX, currentY] = point.split(',');

    const nextOptions = [
      `${+currentX - 1},${+currentY}`,
      `${+currentX + 1},${+currentY}`,
      `${+currentX},${+currentY - 1}`,
      `${+currentX},${+currentY + 1}`,
    ].filter((option) => {
      const [optionX, optionY] = option.split(',');
      if (!elevationData[+optionX] || !elevationData[+optionX][+optionY]) {
        return false;
      }
      if (
        canMoveTo(
          elevationData[+currentX][+currentY],
          elevationData[+optionX][+optionY]
        )
      ) {
        return true;
      }
      return false;
    });

    nextOptions.forEach((nextOption) => {
      graph.addEdge(point, nextOption, 1);
    });
  });

  graph.findPathWithDijkstra(start, end);
};

partOne();
