import type { Vector } from './types/vector.ts';

import { readFile } from './utils/file-utils.ts';
import { isInBounds2d, clone2d } from './utils/array-utils.ts';
import { adjacents, create, add } from './utils/vector-utils.ts';

const day = 4;

function prepareData(data: string[]): number[][] {
  const retVal: number[][] = []; 

  for (const row of data){
    retVal.push([...row].map(c => { return c === '@' ? 1 : 0}));
  }

  return retVal;
};

function exercise1(data: number[][]): number {
  let retVal = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] > 0) {
        let count = 0;
        for (const adjacent of adjacents) {
          const consider = add(create(x, y), adjacent);
          if (isInBounds2d(data, consider)) {
            count += data[consider.y][consider.x];
          }
        }
        if (count < 4) {
          retVal += 1;
        }
      }
    }
  }
  return retVal;
};

function exercise2(data: number[][]): number {
  let retVal = 0;
  let removed = 0;
  do {
    removed = 0;
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        if (data[y][x] > 0) {
          let count = 0;
          for (const adjacent of adjacents) {
            const consider = add(create(x, y), adjacent);
            if (isInBounds2d(data, consider)) {
              count += data[consider.y][consider.x];
            }
          }
          if (count < 4) {
            retVal += 1;
            removed += 1;
            data[y][x] = 0;
          }
        }
      }
    }
  } while (removed > 0)
  return retVal;
};


console.log(`Advent of Code 2025: Day ${day}`);

// Load data
const test = prepareData(await readFile(`./data/day${day}/sample.txt`));
const real = prepareData(await readFile(`./data/day${day}/data.txt`));

// Exercise 1: Test Case
let answer = exercise1(test);
console.assert(answer === 13);

answer = exercise1(real);
console.log(`Day ${day} Exercise 1 = ${answer}`);

// Exercise 2: Test Case
answer = exercise2(clone2d(test));
console.assert(answer === 43);

answer = exercise2(clone2d(real));
console.log(`Day ${day} Exercise 2 = ${answer}`);
