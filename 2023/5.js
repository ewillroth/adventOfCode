const fs = require("fs");

const input = fs.readFileSync(
  `./${process.env.YEAR}/${process.env.DAY}_input.txt`,
  "utf-8"
);

const testInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

let [
  seedString,
  seed2soil,
  soil2fert,
  fert2water,
  water2light,
  light2temp,
  temp2humid,
  humid2loc,
] = input.split("\n\n");

// dest range start
// source range start
// range length

const seeds = seedString
  .trim()
  .split(" ")
  .slice(1)
  .map((seed) => +seed);

// console.log(seeds.length, "total seeds");

seed2soil = seed2soil
  .split("\n")
  .slice(1)
  .sort((a, b) => +a.split(" ")[1] - +b.split(" ")[1]);
soil2fert = soil2fert
  .split("\n")
  .slice(1)
  .sort((a, b) => +a.split(" ")[1] - +b.split(" ")[1]);
fert2water = fert2water
  .split("\n")
  .slice(1)
  .sort((a, b) => +a.split(" ")[1] - +b.split(" ")[1]);
water2light = water2light
  .split("\n")
  .slice(1)
  .sort((a, b) => +a.split(" ")[1] - +b.split(" ")[1]);
light2temp = light2temp
  .split("\n")
  .slice(1)
  .sort((a, b) => +a.split(" ")[1] - +b.split(" ")[1]);
temp2humid = temp2humid
  .split("\n")
  .slice(1)
  .sort((a, b) => +a.split(" ")[1] - +b.split(" ")[1]);
humid2loc = humid2loc
  .split("\n")
  .slice(1)
  .sort((a, b) => +a.split(" ")[1] - +b.split(" ")[1]);

const findDestIfInRange = (rangeStringThing, num) => {
  const [dest, start, length] = rangeStringThing.split(" ").map((val) => +val);
  if (num >= start && num < start + length) {
    const diff = num - start;
    return dest + diff;
  }
  return false;
};

const find = (thingToFind, mapToUse) => {
  let thing = thingToFind;
  mapToUse.every((rangeStringThing) => {
    const dest = findDestIfInRange(rangeStringThing, thingToFind);
    if (dest === false) return true;
    thing = dest;
    return false;
  });
  return thing;
};

const traceSeed = (seed) => {
  const soil = find(seed, seed2soil);
  const fert = find(soil, soil2fert);
  const water = find(fert, fert2water);
  const light = find(water, water2light);
  const temp = find(light, light2temp);
  const humid = find(temp, temp2humid);
  const loc = find(humid, humid2loc);
  return loc;
};

const soilNumbers = seeds.map((seed) => traceSeed(seed));
const sortedSoilNumbers = soilNumbers.sort((a, b) => a - b);
console.log(sortedSoilNumbers[0], "pt1");

// part 2
let lowestSeed = Infinity;

const p2seedRanges = seedString.trim().split(" ").slice(1);
p2seedRanges.forEach((num, index) => {
  console.log(index, "index");
  if (index % 2 == 0) {
    for (let i = +num; i < +num + +p2seedRanges[index + 1]; i++) {
      let loc = traceSeed(i);
      if (loc < lowestSeed) {
        lowestSeed = loc;
        console.log("new low", loc);
      }
    }
  }
});

console.log("p2", lowestSeed);
