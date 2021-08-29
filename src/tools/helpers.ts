export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomBoolean(chance = 0.5): boolean {
  return Math.random() > chance;
}
