import { Random } from "./Random";

export function shuffleArray<T>([...array]: T[], rand: Random): T[] {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = rand.getBetween(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
