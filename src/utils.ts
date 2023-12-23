export function getInputLines(exercice: string): string[] {
  const input = Deno.readTextFileSync(`./inputs/${exercice}.txt`);

  return convertInputToArray(input);
}

function convertInputToArray(input: string): string[] {
  return input.split("\n").filter(Boolean);
}
