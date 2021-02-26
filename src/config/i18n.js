import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "../locales/en/common.json";
import translationES from "../locales/en/common.json";
import translationFR from "../locales/en/common.json";
import translationIT from "../locales/it/common.json";
import homeEN from "../locales/en/home.json";
import aboutEN from "../locales/en/about.json";
import aboutES from "../locales/es/about.json";
import aboutFR from "../locales/fr/about.json";

// the translations
const resources = {
  en: {
    common: translationEN,
    home: homeEN,
    about: aboutEN
  },
  es: {
    common: translationES,
    about: aboutES
  },
  fr: {
    common: translationFR,
    about: aboutFR
  },
  it: {
    common: translationIT
  }
};



i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: i18n.language,
    keySeparator: false,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // react already safes from xss
      unescapePrefix: "-"
    },
    fallbackLng: false,
    debug: false,
    // have a common namespace used around the full app
    saveMissing: false,
    // path to post missing resources
    /*addPath: "/locales/add/en/{{ns}}",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },*/
    // react-i18next options
    react: {
      wait: true,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default"
    },
    detection: {
      order: ["cookie", "navigator", "querystring"],
      caches: ["cookie"]
    }
  });

export default i18n;
