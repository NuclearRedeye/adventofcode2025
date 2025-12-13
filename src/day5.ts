import { start } from 'repl';
import { readFile } from './utils/file-utils.ts';

const day = 5;

const reRange = new RegExp(/^(\d+)-(\d+)$/);
const reItem = new RegExp(/^(\d+)$/);

type range = {
  start: bigint,
  end: bigint
};

type preparedData = {
  fresh: range[];
  inventory: bigint[];
}

function prepareData(data: string[]): preparedData {
  const retVal: preparedData = {
    fresh: [],
    inventory: []
  }

  for (const row of data){

    // Match ranges
    const range = row.match(reRange);
    if (range) {
      retVal.fresh.push({
        start: BigInt(range[1]),
        end: BigInt(range[2])
      });
    }

    // Match Items
    const item = row.match(reItem);
    if (item) {
      retVal.inventory.push(BigInt(item[1]));
    }
  }

  return retVal;
};

function deDuplicate(data: range[]): range[] {
  const processed = new Set<range>();
  for (const range of data) {

    const toAdd = {
      start: range.start,
      end: range.end
    }

    const duplicates = new Set<range>();
    for (const entry of processed) {
      if (toAdd.start >= entry.start && toAdd.start <= entry.end || toAdd.end >= entry.start && toAdd.end <= entry.end) {
        toAdd.start = (toAdd.start < entry.start) ? toAdd.start : entry.start;
        toAdd.end = (toAdd.end > entry.end) ? toAdd.end : entry.end;
        duplicates.add(entry);
      }

      if (entry.start < toAdd.start && entry.end > toAdd.end || toAdd.start < entry.start && toAdd.end > entry.end) {
        toAdd.start = (toAdd.start < entry.start) ? toAdd.start : entry.start;
        toAdd.end = (toAdd.end > entry.end) ? toAdd.end : entry.end;
        duplicates.add(entry);
      }
    }

    for (const duplicate of duplicates) {
      processed.delete(duplicate);
    }
    
    processed.add(toAdd);
  }

  return Array.from(processed);
}


function exercise1(data: preparedData): bigint {
  let retVal = 0n;
  const merged = deDuplicate(data.fresh);
  for (const item of data.inventory) {
    for (const range of merged) {
      if (item >= range.start && item <= range.end) {
        retVal += 1n;
        break;
      }
    }
  }
  return retVal;
};

function exercise2(data: preparedData): bigint {
  let retVal = 0n;

  const merged = deDuplicate(data.fresh);
  for (const item of merged) {
    retVal += ((item.end - item.start) + 1n);
  }

  return retVal;
};


console.log(`Advent of Code 2025: Day ${day}`);

// Load data
const test = prepareData(await readFile(`./data/day${day}/sample.txt`));
const real = prepareData(await readFile(`./data/day${day}/data.txt`));


// Exercise 1: Test Case
let answer = exercise1(test);
console.assert(answer === 3n);

answer = exercise1(real);
console.log(`Day ${day} Exercise 1 = ${answer}`);

// Exercise 2: Test Case
answer = exercise2(test);
console.assert(answer === 14n);

answer = exercise2(real);
console.log(`Day ${day} Exercise 2 = ${answer}`);
