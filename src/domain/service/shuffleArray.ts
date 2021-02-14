import { Random } from "./Random";

export function shuffleArray<T>([...array]: T[], rand: Random): T[] {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(rand.get() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
