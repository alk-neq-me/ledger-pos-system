import { ActionPayload } from "../types";
import { Settings, SettingsAction, SettingsState } from "./types";

const initialState: SettingsState = {
  loading: false,
  error: undefined,
  settings: {
    theme: "light",
    language: "en",
    ledgerMode: "2"
  }
}

export default function settingsReducer(
  state: SettingsState = initialState,
  action: ActionPayload<SettingsAction, Settings | string>
): SettingsState {
  switch (action.type) {
    case "@@SETTINGS/FETCH_PENDING":
    case "@@SETTINGS/TOGGLE_THEME_PENDING":
    case "@@SETTINGS/TOGGLE_LEDGER_MODE_PENDING":
    case "@@SETTINGS/CHANGE_LANGUAGE_PENDING":
      return {
        ...state,
        loading: true,
        error: undefined
      }

    case "@@SETTINGS/FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        settings: "payload" in action
          ? typeof action.payload === "object"
            ? action.payload
            : state.settings
          : state.settings
      };

    case "@@SETTINGS/TOGGLE_THEME_SUCCESS":
      return state;

    case "@@SETTINGS/CHANGE_LANGUAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        settings: {
          ...state.settings,
          language: "payload" in action
            ? typeof action.payload === "string"
              ? action.payload
              : state.settings.language
            : state.settings.language
        }
      }

    case "@@SETTINGS/TOGGLE_LEDGER_MODE_SUCCESS":
      return {
        ...state,
        loading: false,
        settings: {
          ...state.settings,
          ledgerMode: state.settings.ledgerMode === "2" ? "3" : "2"
        }
      };

    case "@@SETTINGS/TOGGLE_THEME_FAILURE":
    case "@@SETTINGS/FETCH_FAILURE":
    case "@@SETTINGS/TOGGLE_LEDGER_MODE_FAILURE":
    case "@@SETTINGS/CHANGE_LANGUAGE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "payload" in action
          ? typeof action.payload === "string"
            ? action.payload
            : "unknown error"
          : "unknown error"
      }

    default:
      // const _unreachable: never = action.type;
      return state;
  }
}
