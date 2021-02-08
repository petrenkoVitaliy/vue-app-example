import {
  ConvertValue,
  ConvertationResult
} from "@/interfaces/convertValues.interface";

interface StateValues {
  moneyAmount: number;
  selectedConvertCCY: string | null;
  convertValues: ConvertValue[];
  convertationResult: ConvertationResult;
}

export const state: StateValues = {
  moneyAmount: 0,
  convertValues: [],
  selectedConvertCCY: null,
  convertationResult: {
    saleResult: null,
    buyResult: null,
    base_ccy: null,
    buy: null,
    ccy: null,
    sale: null,
    amount: null,
    date: null
  }
};

export type State = typeof state;
