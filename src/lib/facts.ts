export type Fact = {
  text: string;
  image?: string;
  source?: string;
};

const facts: Fact[] = [
  {
    text: 'Minnesota tops the social battery chart at 73.6% — Midwesterners have more social energy than you might expect.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  },
  {
    text: 'Nevada ranks lowest at 29.8% — sometimes people just want quiet time.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  },
  {
    text: 'The average American is ready to leave a social event after about 1 hour and 24 minutes.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  },
  {
    text: 'Nearly 1 in 4 excuses for canceling plans are made up — sometimes the social battery needs a break.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  },
  {
    text: 'Over half of Americans (54.8%) regularly choose solitude over socializing; Gen Z leads at 56.9%.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  },
  {
    text: 'Floridians have the longest staying power at events — almost 2 hours on average.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  },
  {
    text: 'In Alabama, the survey found a striking rate of plan-canceling for solitude.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  },
  {
    text: 'Tennesseans have one of the slowest recoveries — about 22% need a week or more to recharge after socializing.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  },
  {
    text: 'The national average social battery is 51.4% — people\'s needs vary widely by state.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  },
  {
    text: 'Urban states like California and New York still rank high — fast-paced life doesn\'t always drain social energy.',
    source: 'https://naplab.com/guides/states-with-highest-and-lowest-social-battery/'
  }
];

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
