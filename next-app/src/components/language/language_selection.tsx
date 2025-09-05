"use client";
import { I18nextProvider, useTranslation } from "react-i18next";
import LanguageButton from "./language_button";
import i18n from "@/helpers/i18n";

export default function LanguageSelection() {
  const { i18n: currentLanguageState } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <div className="flex flex-row justify-start items-center absolute top-5 left-5">
        <LanguageButton
          imagePath="/images/VietNamFlag.png"
          alt="vi"
          isSelect={currentLanguageState.language == "vi"}
          onClick={() => currentLanguageState.changeLanguage("vi")}
          className="mr-2"
        />
        <LanguageButton
          imagePath="/images/USAFlag.png"
          alt="en"
          isSelect={currentLanguageState.language == "en"}
          onClick={() => currentLanguageState.changeLanguage("en")}
        />
      </div>
    </I18nextProvider>
  );
}
