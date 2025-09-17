"use client";
import OnWorking from "@/components/on_working";
import { useTranslation } from "react-i18next";

export default function Project() {
  const { t } = useTranslation("common");
  return (
    <div className="flex items-center justify-center h-full w-full">
      <OnWorking message={t("working")} />
    </div>
  );
}
