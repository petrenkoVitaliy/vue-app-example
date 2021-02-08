export function getConvertation(amount: number, koef: string) {
  return Number(amount / Number(koef)).toFixed(4);
}
