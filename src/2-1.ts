import { getInputLines } from "./utils.ts";

const lines = getInputLines("2");
const colors = ["blue", "green", "red"] as const;

const maxColorsPerId: Record<
  string,
  { green: number; blue: number; red: number }
> = lines.reduce((accumulator, line) => {
  const gameMatch = line.match(/^Game (\d+):/);

  if (!gameMatch) {
    throw new Error();
  }

  const id = gameMatch[1];

  const gamePart = gameMatch[0];
  const numbers = line.replace(gamePart, "");

  const grabs = numbers.split(";");

  const maxColors = grabs.reduce(
    (accumulator, grab) => {
      colors.forEach((color) => {
        const numberAsString =
          grab.match(new RegExp(`(\\d+) ${color}`))?.[1] ?? "0";
        const number = Number(numberAsString);

        if (number > accumulator[color]) {
          accumulator[color] = number;
        }
      });

      return accumulator;
    },
    { blue: 0, green: 0, red: 0 }
  );

  accumulator[id] = maxColors;

  return accumulator;
}, {} as Record<string, { green: number; blue: number; red: number }>);

const total = Object.keys(maxColorsPerId)
  .filter((id) => {
    const { blue, green, red } = maxColorsPerId[id];

    return red <= 12 && green <= 13 && blue <= 14;
  })
  .reduce((accumulator, id) => {
    const idAsNumber = Number(id);

    return accumulator + idAsNumber;
  }, 0);

console.log('Result: ', total);
