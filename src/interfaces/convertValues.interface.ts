export interface ConvertValue {
  base_ccy: string;
  buy: string;
  ccy: string;
  sale: string;
}

export interface ConvertationResult {
  saleResult: string | null;
  buyResult: string | null;
  base_ccy: string | null;
  buy: string | null;
  ccy: string | null;
  sale: string | null;
  date: string | null;
  amount: string | null;
}
