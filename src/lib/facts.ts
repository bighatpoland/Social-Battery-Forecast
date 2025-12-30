import factsData from '../data/facts.json';

export type Fact = {
  text: string;
  image?: string;
  source?: string;
};

const facts: Fact[] = factsData as Fact[];

export function getFact(index: number): Fact {
  return facts[index % facts.length];
}

export function randomIndex(exclude?: number): number {
  if (facts.length === 0) return 0;
  if (facts.length === 1) return 0;
  let idx = Math.floor(Math.random() * facts.length);
  let attempts = 0;
  while (exclude !== undefined && idx === exclude && attempts < 10) {
    idx = Math.floor(Math.random() * facts.length);
    attempts++;
  }
  return idx;
}

export { facts };
