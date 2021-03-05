import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "../locales/en/common.json";
import countriesEN from "../locales/en/countries_en.json";
import macroEN from "../locales/en/macro_en.json";
import translationIT from "../locales/it/common.json";
import homeEN from "../locales/en/home.json";
import aboutEN from "../locales/en/about.json";
import cartEN from "../locales/en/cart.json";
import checkoutEN from "../locales/en/checkout.json";
import contactEN from "../locales/en/contact.json";
import quotesEN from "../locales/en/quotes.json";
import privacyEN from "../locales/en/privacy-policy.json";
import featuresEN from "../locales/en/features.json";
import warrantiesEN from "../locales/en/warranties.json";
import gdprEN from "../locales/en/gdpr.json";
// the translations
const resources = {
  en: {
    common: translationEN,
    home: homeEN,
    about: aboutEN,
    macro: macroEN,
    countries:countriesEN,
    cart: cartEN,
    checkout: checkoutEN,
    contact: contactEN,
    quotes: quotesEN,
    privacy: privacyEN,
    features: featuresEN,
    warranties: warrantiesEN,
    gdpr: gdprEN
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
