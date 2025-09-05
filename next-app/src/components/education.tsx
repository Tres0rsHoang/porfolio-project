import Image from "next/image";
import styles from "../components/about_me/about_me.module.css";
import { useTranslation } from "react-i18next";

export default function Education() {
  const { t } = useTranslation("home");

  return (
    <div>
      <h2>{t("education")}</h2>
      <div className="flex flex-row justify-around">
        <p className={styles.verticalTimeText}>2017 - 2020</p>
        <div>
          <div className="flex flex-row justify-between">
            <div className="w-1/2 pr-5">
              <h3>{t("Tien Giang High School for Gifted")}</h3>
              <div className="mb-2">
                <h4>{t("Information Technology Major")}</h4>
                <h4 className="text-(--highlight-2)">
                  {t("12 years of excellent student")}
                </h4>
              </div>
              <hr className="border-b-1 border-solid border-(--foreground)" />
              <p className="my-2">
                <span className="text-(--default-4) text-2xl">
                  {t("history")}:
                </span>
                {t("highschool_description")}
                <br />
                <a href="https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_Trung_h%E1%BB%8Dc_ph%E1%BB%95_th%C3%B4ng_chuy%C3%AAn_Ti%E1%BB%81n_Giang">
                  ({t("source")}: Wikipedia)
                </a>
              </p>
              <hr className="border-b-1 border-solid border-(--foreground)" />
            </div>
            <div className="relative w-1/2 h-auto mt-2">
              <Image
                fill={true}
                src="/images/CTG.png"
                alt="CTG"
                className="rounded-lg border-2 border-solid border-(--foreground)"
              ></Image>
            </div>
          </div>
          <div className="relative my-2 pr-5">
            <div className="flex flex-row absolute bottom-0 right-0">
              <Image
                height={100}
                width={90}
                src="/images/Medal.png"
                alt="Medal"
                className="rotate-[20deg]"
              ></Image>
            </div>
            <p>
              <span className="text-(--default-4) text-2xl">
                {t("achievements")}:
              </span>
              {t("highschool_achievement")}
            </p>
            <ul className="list-disc">
              <li>
                <p className="text-(--blue)">
                  {t("A silver medal at the Southern Summer Camp")}
                </p>
              </li>
              <li>
                <p className="text-(--blue)">
                  {t("First prize in the City-Level Innovation Contest")}
                </p>
              </li>
              <li>
                <p className="text-(--blue)">
                  {t(
                    "Third prize in provincial competition for excellent students in information technology (Specialized schools)",
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around">
        <p className={styles.verticalTimeText}>2020 - 2024</p>
        <div>
          <div className="flex flex-row justify-between">
            <div className="relative w-1/2 h-auto mt-2">
              <Image
                fill={true}
                src="/images/KHTN.png"
                alt="KHTN"
                className="rounded-lg border-2 border-solid border-(--foreground)"
              ></Image>
            </div>
            <div className="w-1/2 pl-5">
              <h3>{t("University of Science VNU - HCM")}</h3>
              <div className="mb-2">
                <h4>{t("High-Quality Information Technology")}</h4>
                <p>{t("Specializing in Software Engineering")}</p>
                <h4 className="text-(--highlight-2)">GPA: 7.79 / 10</h4>
              </div>
              <hr className="border-b-1 border-solid border-(--foreground)" />
              <p className="my-2">
                <span className="text-(--default-4) text-2xl">
                  {t("history")}:
                </span>
                {t("university_description_1")}
                <br />
                <a href="https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc_T%E1%BB%B1_nhi%C3%AAn,_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Qu%E1%BB%91c_gia_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh">
                  ({t("source")}: Wikipedia)
                </a>
                <br />
                {t("university_description_2")}
                <br />
                <a href="https://edurank.org/uni/ho-chi-minh-city-university-of-science/rankings/">
                  ({t("source")}: EduRank)
                </a>
              </p>
              <hr className="border-b-1 border-solid border-(--foreground)" />
            </div>
          </div>
          <p className="relative my-2">
            <span className="text-(--default-4) text-2xl">
              {t("achievements")}:
            </span>
            {t("university_achievement_1")}
            <br />
            {t("university_achievement_2")}
            <br />
            {t("university_achievement_3")}
            <br />
            {t("university_achievement_4")}
          </p>
        </div>
      </div>
    </div>
  );
}
