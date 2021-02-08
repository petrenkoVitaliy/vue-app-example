import { LocalStorageAPI } from "@/api/localstorage";
import { API_ROUTES } from "@/api/routes";
import { ConvertationResult } from "@/interfaces/convertValues.interface";
import { getConvertation } from "@/utils/conversion";
import axios from "axios";
import { ActionContext, ActionTree } from "vuex";
import { ActionTypes, MutationTypes } from "./constant";
import { Mutations } from "./mutations";
import { State } from "./state";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.GET_CONVERTATION_MAP]({
    commit
  }: AugmentedActionContext): Promise<void>;
  [ActionTypes.GET_CONVERT_CCV](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<string>;
  [ActionTypes.GET_CONVERTATION_RESULT](
    { commit }: AugmentedActionContext,
    payload: { queryAmount?: string; queryCCV?: string }
  ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GET_CONVERTATION_MAP]({ commit }) {
    try {
      const res = await axios.get(API_ROUTES.EXCHANGE);

      commit(MutationTypes.SET_CONVERTATION_MAP, res.data);
    } catch (ex) {
      // error notification here
      console.error(ex);
    }
  },

  async [ActionTypes.GET_CONVERT_CCV]({ commit }, payload) {
    /*
      not a best solution to store convertation as a string (concatenated strings)
      but we need to identify convertation pair regardless of incoming order to store history
      (best solution is ID from db) 
    */
    const convertCCV = payload.split(" - ").join("_");

    commit(MutationTypes.SET_CONVERT_CCY, convertCCV);

    return convertCCV;
  },

  async [ActionTypes.GET_CONVERTATION_RESULT]({ commit, state }, payload) {
    const { queryAmount, queryCCV } = payload;

    const amount = queryAmount ? Number(queryAmount) : state.moneyAmount;
    const convertCCV = queryCCV ? queryCCV : state.selectedConvertCCY;

    if (amount !== state.moneyAmount) {
      commit(MutationTypes.SET_MONEY_TO_CONVERT, amount);
    }
    if (convertCCV !== state.selectedConvertCCY) {
      commit(MutationTypes.SET_CONVERT_CCY, convertCCV);
    }

    if (convertCCV) {
      const [baseCCY, CCY] = convertCCV.split("_");
      const convertationMap = state.convertValues.find(
        ccyValues => ccyValues.base_ccy === baseCCY && ccyValues.ccy === CCY
      );

      if (convertationMap) {
        const saleResult = getConvertation(amount, convertationMap.sale);
        const buyResult = getConvertation(amount, convertationMap.buy);

        const convertationResult: ConvertationResult = {
          ...convertationMap,
          buyResult,
          saleResult,
          date: new Date().toString(),
          amount: String(amount)
        };
        LocalStorageAPI.addConvertationToHistory(convertationResult);
        commit(MutationTypes.SET_CONVERTATION_RESULT, convertationResult);
      }
    }
  }
};
