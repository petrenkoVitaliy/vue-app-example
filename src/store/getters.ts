import {
  ConvertationResult,
  ConvertValue
} from "@/interfaces/convertValues.interface";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  getMoneyAmount(state: State): number;
  getCCY(state: State): ConvertValue[];
  getSelectedConvertCCY(state: State): string | null;
  getConvertationResult(state: State): ConvertationResult;
  getCCYOptions(state: State): string[];
};

export const getters: GetterTree<State, State> & Getters = {
  getMoneyAmount: state => {
    return state.moneyAmount;
  },
  getCCY: state => {
    return state.convertValues;
  },
  getCCYOptions: state => {
    return state.convertValues.map(
      ({ base_ccy, ccy }) => `${base_ccy} - ${ccy}`
    );
  },
  getSelectedConvertCCY: state => {
    return state.selectedConvertCCY;
  },
  getConvertationResult: state => {
    return state.convertationResult;
  }
};
