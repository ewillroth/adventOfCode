// https://adventofcode.com/2022/day/17
const fs = require("fs");

const input = fs.readFileSync("./2022/17_input.txt", "utf-8");
const rows = input.split("\n");

const testInput = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

const shapes = `
####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##
`;

/* 

The tall, vertical chamber is exactly seven units wide. 
Each rock appears so that its left edge is two units away from the left wall 
and its bottom edge is three units above the highest rock in the room (or the floor, if there isn't one).
*/
