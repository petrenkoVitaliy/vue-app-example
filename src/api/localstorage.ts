import { ConvertationResult } from "@/interfaces/convertValues.interface";

enum LocalStorageKeys {
  CALCULATION_HISTORY = "CALCULATION_HISTORY"
}

export const LocalStorageAPI = {
  addConvertationToHistory: (convertation: ConvertationResult) => {
    const jsonResult = localStorage.getItem(
      LocalStorageKeys.CALCULATION_HISTORY
    );
    let newHistory: ConvertationResult[];
    if (jsonResult) {
      const storedHistory = JSON.parse(jsonResult);
      newHistory = Array.isArray(storedHistory) ? [...storedHistory] : [];

      newHistory.push(convertation);
    } else {
      newHistory = [convertation];
    }

    if (newHistory.length > 20) {
      newHistory = newHistory.slice(1, 21);
    }

    return localStorage.setItem(
      LocalStorageKeys.CALCULATION_HISTORY,
      JSON.stringify(newHistory)
    );
  },

  getConvertationHistory: (): ConvertationResult[] => {
    const jsonResult = localStorage.getItem(
      LocalStorageKeys.CALCULATION_HISTORY
    );
    if (jsonResult) {
      return JSON.parse(jsonResult).reverse();
    }

    return [];
  }
};
