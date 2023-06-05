import { i18n } from "../../i18n";
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
    const settings: Settings = getLocalStorage(prefix, initialState);
    i18n.load(settings.language);
    return settings;
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
  },

  async changeLanguage(language: string) {
    const data: Settings = getLocalStorage(prefix, initialState);
    const newSettings: Settings = { 
      ...data, 
      language
    };
    i18n.load(language);
    setLocalStorage(prefix, newSettings);
  }
}
