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
    // debug: process.env.NODE_ENV === "development",
    fallbackLng: "en",
    supportedLngs: ["en", "vi"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      defaultVersion: "v1.0",
      expirationTime:
        process.env.NODE_ENV === "development" ? 0 : 7 * 24 * 60 * 60 * 1000,
      queryStringParams:
        process.env.NODE_ENV === "development" ? { v: Date.now() } : {},
    },
    ns: ["common", "home"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
