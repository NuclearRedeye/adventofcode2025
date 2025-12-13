import type { Range } from './types/range.ts';

import { readFile } from './utils/file-utils.ts';
import { create, size, flatten } from './utils/range-utils.ts';

const day = 5;

const reRange = new RegExp(/^(\d+)-(\d+)$/);
const reItem = new RegExp(/^(\d+)$/);

type preparedData = {
  fresh: Range[];
  inventory: number[];
}

function prepareData(data: string[]): preparedData {
  const retVal: preparedData = {
    fresh: [],
    inventory: []
  }

  for (const row of data){
    const range = row.match(reRange);
    if (range) {
      retVal.fresh.push(create(parseInt(range[1]), parseInt(range[2])));
    }

    const item = row.match(reItem);
    if (item) {
      retVal.inventory.push(parseInt(item[1]));
    }
  }

  return retVal;
};

function exercise1(data: preparedData): number {
  let retVal = 0;
  const merged = flatten(data.fresh);
  for (const item of data.inventory) {
    for (const range of merged) {
      if (item >= range.start && item <= range.end) {
        retVal += 1;
        break;
      }
    }
  }
  return retVal;
};

function exercise2(data: preparedData): number {
  let retVal = 0;

  const merged = flatten(data.fresh);
  for (const item of merged) {
    retVal += size(item);
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
console.assert(answer === 14);

answer = exercise2(real);
console.log(`Day ${day} Exercise 2 = ${answer}`);
