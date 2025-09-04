"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "vi"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      expirationTime: 7 * 24 * 60 * 60 * 1000,
      defaultVersion: "v1.0",
    },
    ns: ["common", "home"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
