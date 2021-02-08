import {
  ConvertationResult,
  ConvertValue
} from "@/interfaces/convertValues.interface";
import { MutationTree } from "vuex";
import { MutationTypes } from "./constant";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationTypes.SET_MONEY_TO_CONVERT](state: S, payload: number): void;
  [MutationTypes.SET_CONVERTATION_MAP](state: S, payload: ConvertValue[]): void;
  [MutationTypes.SET_CONVERT_CCY](state: S, payload: string | null): void;
  [MutationTypes.SET_CONVERTATION_RESULT](
    state: S,
    payload: ConvertationResult
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_MONEY_TO_CONVERT](state, payload) {
    state.moneyAmount = payload;
  },
  [MutationTypes.SET_CONVERTATION_MAP](state, payload) {
    state.convertValues = payload;
  },
  [MutationTypes.SET_CONVERT_CCY](state, payload) {
    state.selectedConvertCCY = payload;
  },
  [MutationTypes.SET_CONVERTATION_RESULT](state, payload) {
    state.convertationResult = payload;
  }
};
