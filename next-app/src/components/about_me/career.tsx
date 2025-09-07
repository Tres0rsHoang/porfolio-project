import { useTranslation } from "react-i18next";
import { SubItemFrame } from "./sub_item_frame";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

export default function Career() {
  const { t } = useTranslation("home");

  return (
    <div className="pb-5">
      <h2>{t("careers")}</h2>
      <SubItemFrame
        title={t("game_plugin_developer")}
        titleImagePath="/images/Minecraft.png"
        period="2022-2023"
        subtitle={t("independent_work")}
        shortDescription={[t("plugin_1"), t("plugin_2"), t("plugin_3")]}
        className="mb-5"
      >
        <div className="my-5">
          <h3>{t("description")}:</h3>
          <p>{t("plugin_description")}</p>
        </div>
      </SubItemFrame>
      <SubItemFrame
        title="Fullstack Mobile, Website Developer"
        titleImagePath="/images/CloudGo.png"
        period="Jun 2023 - Dec 2024"
        subtitle={
          <Link
            href="https://cloudgo.vn/"
            className="flex flex-row items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mr-2">CloudGo</span>
            <LinkIcon size={20} />
          </Link>
        }
        shortDescription={[t("cloudgo_1"), t("cloudgo_2"), t("cloudgo_3")]}
        className="mb-5"
      >
        <div className="my-5">
          <h3>{t("description")}:</h3>
          <ul className="list-disc pl-4">
            <li>
              <p>{t("cloudgo_description_1")}</p>
            </li>
            <li>
              <p>{t("cloudgo_description_2")}</p>
            </li>
            <li>
              <p>{t("cloudgo_description_3")}</p>
            </li>
          </ul>
          <h3>{t("achievements")}:</h3>
          <ul className="list-disc pl-4">
            <li>
              <p>{t("cloudgo_achievement_1")}</p>
            </li>
            <li>
              <p>{t("cloudgo_achievement_2")}</p>
            </li>
            <li>
              <p>{t("cloudgo_achievement_3")}</p>
            </li>
            <li>
              <p>{t("cloudgo_achievement_4")}</p>
            </li>
            <li>
              <p>{t("cloudgo_achievement_5")}</p>
            </li>
            <li>
              <p>{t("cloudgo_achievement_6")}</p>
            </li>
          </ul>
        </div>
      </SubItemFrame>
      <SubItemFrame
        title="Freelancer"
        titleImagePath="/images/BartWorking.png"
        shortDescription={[
          t("freelancer_1"),
          t("freelancer_2"),
          t("freelancer_3"),
        ]}
        imageBackground="bg-(--highlight-4)"
        period="Jan 2025 - Present"
      >
        <div className="my-5">
          <h3>{t("description")}:</h3>
          <p>{t("freelancer_description")}</p>
        </div>
      </SubItemFrame>
    </div>
  );
}
