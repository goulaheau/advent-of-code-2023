import { getInputLines } from "./utils.ts";

const numberByString = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;
const numbersInFullString = Object.keys(numberByString) as (keyof typeof numberByString)[];
const numbers = Object.values(numberByString);

const lines = getInputLines("1");
const total = getTotal(lines);

console.log("Result: ", total);

function getTotal(lines: string[]): number {
  return lines.reduce((total, line) => total + getLineTotal(line), 0);
}

function getLineTotal(line: string): number {
  const numbersFoundByIndex: Record<string, string> = {};

  numbersInFullString.forEach((value) => {
    [...line.matchAll(new RegExp(value, "gi"))].forEach(({ index }) => {
      if (typeof index === "number") {
        numbersFoundByIndex[index] = numberByString[value];
      }
    });
  });

  numbers.forEach(value => {
    [...line.matchAll(new RegExp(value, "gi"))].forEach(({ index }) => {
      if (typeof index === "number") {
        numbersFoundByIndex[index] = value;
      }
    });
  });

  const numbersFound = Object.keys(numbersFoundByIndex)
    .sort((a, b) => Number(a) - Number(b))
    .map((index) => numbersFoundByIndex[index]);

  const firstNumber = numbersFound[0];
  const lastNumber = numbersFound[numbersFound.length - 1];

  return Number(`${firstNumber}${lastNumber}`);
}
