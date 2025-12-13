import type { Range } from './types/range.ts';

import { readFile } from './utils/file-utils.ts';
import { create, size, flatten } from './utils/range-utils.ts';

const day = 6;

const reNumbers = new RegExp(/(\d+)/g);
const reOperators = new RegExp(/([*+-/])/g);

type preparedData = {
  values: number[][];
  operators: string[];
}

function prepareData(data: string[]): preparedData {
  const retVal: preparedData = {
    values: [],
    operators: []
  }

  for (const row of data){
    const numbers = row.match(reNumbers);
    if (numbers) {
      let processed = []
      for (let i = 0; i < numbers.length; i++) {
        processed.push(parseInt(numbers[i]));
      }
      retVal.values.push(processed);
    }

    const operators = row.match(reOperators);
    if (operators) {
      for (let i = 0; i < operators.length; i++) {
        retVal.operators.push(operators[i]);
      }
    }
  }

  return retVal;
};

function prepareData2(data: string[]): preparedData {
  const retVal: preparedData = {
    values: [],
    operators: []
  }

  let numbers: number[] = [];
  for (let x = 0; x < data[0].length; x++) {
    let buffer: string[] = [];
    for (let y = 0; y < data.length - 1; y++) {
      buffer.push(data[y][x]);
    }
    const number = parseInt(buffer.join(''));
    if (isNaN(number)) {
      retVal.values.push(numbers.toReversed());
      numbers = [];
      continue;
    }
    numbers.push(number);
  }
  retVal.values.push(numbers.toReversed());

  const operators = data[data.length - 1].match(reOperators);
  if (operators) {
    for (let i = 0; i < operators.length; i++) {
      retVal.operators.push(operators[i]);
    }
  }

  return retVal;
};


function exercise1(data: preparedData): number {
  let retVal = 0;
  for (let x = 0; x < data.values[0].length; x++) {
    let consider: number[] = [];
    for (let y = 0; y < data.values.length; y++) {
      consider.push(data.values[y][x]);
    }
    const result = consider.reduce( (accumulator, value) => {
        switch(data.operators[x]) {
          case '+':
            return accumulator + value;
          case '*':
            return (accumulator * value);
          case '-':
            return accumulator - value;
          case '/':
            return accumulator / value;
          default:
            return value;
        }
      },
      (data.operators[x] === '*') ? 1 : 0
    );
    retVal += result;
  }
  return retVal;
};

function exercise2(data: preparedData): number {
  let retVal = 0;
  for (let i = 0; i < data.operators.length; i++) {
    const result = data.values[i].reduce( (accumulator, value) => {
        switch(data.operators[i]) {
          case '+':
            return accumulator + value;
          case '*':
            return (accumulator * value);
          case '-':
            return accumulator - value;
          case '/':
            return accumulator / value;
          default:
            return value;
        }
      },
      (data.operators[i] === '*') ? 1 : 0
    );
    retVal += result;
  }
  console.log(retVal);
  return retVal;
};


console.log(`Advent of Code 2025: Day ${day}`);

// Load data
const test = prepareData(await readFile(`./data/day${day}/sample.txt`));
const real = prepareData(await readFile(`./data/day${day}/data.txt`));

const test2 = prepareData2(await readFile(`./data/day${day}/sample.txt`));
const real2 = prepareData2(await readFile(`./data/day${day}/data.txt`));

// Exercise 1: Test Case
let answer = exercise1(test);
console.assert(answer === 4277556);

answer = exercise1(real);
console.log(`Day ${day} Exercise 1 = ${answer}`);

// Exercise 2: Test Case
answer = exercise2(test2);
console.assert(answer === 3263827);

answer = exercise2(real2);
console.log(`Day ${day} Exercise 2 = ${answer}`);
