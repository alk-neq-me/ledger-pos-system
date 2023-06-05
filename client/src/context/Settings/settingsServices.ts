import { getLocalStorage, setLocalStorage } from "../../utils/localStorage"
import { Settings, SettingsPrefix } from "./types"

const prefix: SettingsPrefix = "@@SETTINGS";

const initialState: Settings = {
  theme: "light",
  language: "en",
  ledgerMode: "2"
}

export const settingsServices = {
  async getSettings() {
    getLocalStorage(prefix, initialState);
  },

  async updateSettings(settings: Settings) {
    setLocalStorage(prefix, settings);
  },

  async toggleLedgerMode() {
    const data: Settings = getLocalStorage(prefix, initialState);
    const newSettings = { 
      ...data, 
      ledgerMode: data.ledgerMode === "2" ? "3" : "2" 
    };
    setLocalStorage(prefix, newSettings);
  }
}
