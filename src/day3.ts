import { readFile } from './utils/file-utils.ts';

const day = 3;

function exercise1(data: string[]): number {
  let retVal = 0;
  for (const line of data) {
    const asArray = [...line];
    let highest = 0;
    for (let i = 0; i < asArray.length; i++) {
      for (let ii = i + 1; ii < asArray.length; ii++) {
        const asNumber = parseInt(asArray[i] + asArray[ii]);
        if (asNumber > highest) {
          highest = asNumber;
        } 
      }
    }
    retVal += highest;
  }
  return retVal;
};

function recurse(str: string[], start: number = 0, depth: number = 12) : string {
  if (depth === 0) {
    return "";
  }

  let highest = start;
  for (let i = start; i < str.length - (depth - 1); i++) {
    const current = parseInt(str[highest]);
    const consider = parseInt(str[i]);
    if (consider > current) {
      highest = i;
    }
  }

  return str[highest] + recurse(str, highest + 1, depth - 1);
}

function exercise2(data: string[]): number {
  let retVal = 0;
  for (const line of data) {
    const highest = recurse([...line]);
    retVal += parseInt(highest);
  }

  return retVal;
};


console.log(`Advent of Code 2025: Day ${day}`);

// Load data
const test = await readFile(`./data/day${day}/sample.txt`);
const real = await readFile(`./data/day${day}/data.txt`);

// Exercise 1: Test Case
let answer = exercise1(test);
console.assert(answer === 357);

answer = exercise1(real);
console.log(`Day ${day} Exercise 1 = ${answer}`);

// Exercise 2: Test Case
answer = exercise2(test);
console.assert(answer === 3121910778619);

answer = exercise2(real);
console.log(`Day ${day} Exercise 2 = ${answer}`);
