import { AsyncAction } from "../store";
import { settingsServices } from "./settingsServices";
import { Settings } from "./types";

export const settingsActions = {
  fetchSettings: (): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@SETTINGS/FETCH_PENDING" });
    try {
      const payload = await settingsServices.getSettings();
      dispatch({ type: "@@SETTINGS/FETCH_SUCCESS", payload });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@SETTINGS/FETCH_FAILURE", payload: errMessage });
    }
  },

  saveSettings: (settings: Settings): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@SETTINGS/FETCH_PENDING" });
    try {
      await settingsServices.updateSettings(settings);
      dispatch({ type: "@@SETTINGS/FETCH_SUCCESS", payload: settings });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@SETTINGS/FETCH_FAILURE", payload: errMessage });
    }
  },

  toggleLedgerMode: (): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@SETTINGS/TOGGLE_LEDGER_MODE_PENDING" });
    try {
      await settingsServices.toggleLedgerMode();
      dispatch({ type: "@@SETTINGS/TOGGLE_LEDGER_MODE_SUCCESS" });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@SETTINGS/TOGGLE_LEDGER_MODE_FAILURE", payload: errMessage });
    }
  },

  changeLanguage: (lang: string): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@SETTINGS/CHANGE_LANGUAGE_PENDING" });
    try {
      await settingsServices.changeLanguage(lang);
      dispatch({ type: "@@SETTINGS/CHANGE_LANGUAGE_SUCCESS", payload: lang });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@SETTINGS/CHANGE_LANGUAGE_FAILURE", payload: errMessage });
    }
  },

}
