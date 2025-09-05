"use client";
import i18n from "@/helpers/i18n";
import { I18nextProvider, useTranslation } from "react-i18next";

export default function WordpressFooterText() {
  const { t } = useTranslation("common");
  return (
    <I18nextProvider i18n={i18n}>
      <p>{t("footer_content")}</p>
    </I18nextProvider>
  );
}
