export function getLastNumber(input: string): number | null {
  const matches = input.match(/\d+$/);
  return matches ? parseInt(matches[0], 10) : null;
}
