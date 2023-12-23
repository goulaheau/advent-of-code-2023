import { getInputLines } from "./utils.ts";

const numberRegExp = /\d/;

const lines = getInputLines("1");
const total = getTotal(lines);
console.log("Result: ", total);

function getTotal(lines: string[]): number {
  return lines.reduce((total, line) => total + getLineTotal(line), 0);
}

function getLineTotal(line: string): number {
  const lineAsArray = Array.from(line);
  const numbers = lineAsArray.filter((character) =>
    numberRegExp.test(character)
  );
  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1];

  return Number(`${firstNumber}${lastNumber}`);
}
