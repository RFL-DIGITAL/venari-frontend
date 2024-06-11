import { zipObject } from 'lodash'

export function getDeclensionText(number: number, wordForms: [string, string, string]) {
  if (number === 0)
    return `нет ${wordForms[2]}`;

  const cases = [2, 0, 1, 1, 1, 2];
  const titles = zipObject([0, 1, 2], wordForms);

  return titles[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
  ];
}