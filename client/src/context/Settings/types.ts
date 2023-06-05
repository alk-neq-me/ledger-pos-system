import { I18n } from "../../i18n"
import { ExtractAction, ReadAction } from "../types"
import { BaseState } from "../types"

export type Settings = {
  ledgerMode: "2" | "3",
  theme: "dark" | "light",
  language: keyof I18n["translations"]
}

export type SettingsPrefix = "@@SETTINGS";

export type SettingsState = BaseState & {
  settings: Settings
}

export type SettingsAction = 
  | ReadAction<SettingsPrefix>
  | ExtractAction<SettingsPrefix, "TOGGLE_THEME">
  | ExtractAction<SettingsPrefix, "TOGGLE_LEDGER_MODE">
