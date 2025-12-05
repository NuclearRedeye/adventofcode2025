import type { Vector } from './types/vector.ts';

import { readFile } from './utils/file-utils.ts';

const day = 1;

const re = new RegExp(/^(\w{1})(\d+)$/);

function prepareData(data: string[]): Vector[] {
  const retVal: Vector[] = []; 

  for (const line of data){
    const match = line.match(re);
    if (match) {
      retVal.push({
        x: (match[1] === 'L') ? -1 : 1,
        y: parseInt(match[2])
      });
    }
  }

  return retVal;
};

function exercise1(data: Vector[]): number {
  let retVal = 0;
  let position = 50;
  for (const move of data) {
    for (let i = 0; i < move.y; i++) {
      position = (move.x < 0) ? position - 1: position + 1;

      if (position > 99) {
        position = 0;
      }

      if (position < 0) {
        position = 99;
      }
    }

    if (position === 0) {
      retVal += 1;
    }
  }

  return retVal;
};

function exercise2(data: Vector[]): number {
  let retVal = 0;
  let position = 50;
  for (const move of data) {
    for (let i = 0; i < move.y; i++) {
      position = (move.x < 0) ? position - 1: position + 1;

      if (position > 99) {
        position = 0;
      }

      if (position < 0) {
        position = 99;
      }

      if (position === 0) {
        retVal += 1;
      }
    }
  }

  return retVal;
};


console.log(`Advent of Code 2025: Day ${day}`);

// Load data
const test = prepareData(await readFile(`./data/day${day}/sample.txt`));
const real = prepareData(await readFile(`./data/day${day}/data.txt`));

// Exercise 1: Test Case
let answer = exercise1(test);
console.assert(answer === 3);

answer = exercise1(real);
console.log(`Day ${day} Exercise 1 = ${answer}`);

// Exercise 2: Test Case
answer = exercise2(test);
console.assert(answer === 6);

answer = exercise2(real);
console.log(`Day ${day} Exercise 2 = ${answer}`);