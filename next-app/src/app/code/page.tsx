"use client";
import OnWorking from "@/components/on_working";
import { useTranslation } from "react-i18next";

export default function Code() {
  const { t } = useTranslation("common");
  return (
    <div>
      <OnWorking message={t("working")} />
    </div>
  );
}
