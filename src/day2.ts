import type { Vector } from './types/vector.ts';

import { readFile } from './utils/file-utils.ts';
import { allEquals } from './utils/array-utils.ts';

const day = 2;

const re = new RegExp(/^(\d+)-(\d+)$/);

function prepareData(data: string[]): Vector[] {
  const retVal: Vector[] = []; 

  const split = data[0].split(',');
  for (const item of split){
    const match = item.match(re);
    if (match) {
      retVal.push({
        x: parseInt(match[1]),
        y: parseInt(match[2])
      });
    }
  }

  return retVal;
};

function exercise1(data: Vector[]): number {
  let retVal = 0;
  for (const range of data){
    for (let i = range.x; i <= range.y; i++) {
      const asString = i.toString();
      const a = asString.substring(0, Math.floor(asString.length / 2));
      const b = asString.substring(Math.floor(asString.length / 2));
      if (a.length === b.length && a === b) {
        retVal += i;
      }
    }
  }
  return retVal;
};

function exercise2(data: Vector[]): number {
  let retVal = 0;
  for (const range of data){
    for (let i = range.x; i <= range.y; i++) {
      const asString = i.toString(); 
      for (let x = Math.floor(asString.length / 2); x >= 1; x--) {
        let chunks = [];
        for (let z = 0; z < asString.length; z += x) {
          chunks.push(asString.slice(z, z + x));
        }

        if (allEquals(chunks)) {
          retVal += i;
          break;
        }
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
console.assert(answer === 1227775554);

answer = exercise1(real);
console.log(`Day ${day} Exercise 1 = ${answer}`);

// Exercise 2: Test Case
answer = exercise2(test);
console.assert(answer === 4174379265);

answer = exercise2(real);
console.log(`Day ${day} Exercise 2 = ${answer}`);
