import Image from "next/image";
import { useTranslation } from "react-i18next";
import { SubItemFrame } from "./sub_item_frame";
import Link from "next/link";

export default function Education() {
  const { t } = useTranslation("home");

  return (
    <div className="pb-5">
      <h2>{t("education")}</h2>
      <SubItemFrame
        title={t("Tien Giang High School for Gifted")}
        titleImagePath="/images/CTG_Logo.png"
        subtitle={
          <div>
            <h4>{t("Information Technology Major")}</h4>
            <h4 className="text-(--highlight-3)">
              {t("12 years of excellent student")}
            </h4>
          </div>
        }
        shortDescription={[
          t("A silver medal at the Southern Summer Camp"),
          t("First prize in the City-Level Innovation Contest"),
          t(
            "Third prize in provincial competition for excellent students in information technology (Specialized schools)",
          ),
        ]}
        period="2017 - 2020"
        className="mb-5"
      >
        <div className="my-5">
          <div className="flex flex-row justify-between items-center">
            <div className="relative w-2/3">
              <span className="text-(--default-4) text-2xl">
                {t("history")}:
              </span>
              <span className="text-xl">{t("highschool_description")}</span>
              <br />
              <Link
                className="text-lg"
                href="https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_Trung_h%E1%BB%8Dc_ph%E1%BB%95_th%C3%B4ng_chuy%C3%AAn_Ti%E1%BB%81n_Giang"
                target="_blank"
                rel="noopener noreferrer"
              >
                ({t("source")}: Wikipedia)
              </Link>
              <hr className="border-b-1 mt-2 border-solid border-(--foreground)" />
            </div>
            <div className="relative w-1/3">
              <Image
                src="/images/CTG.png"
                alt="CTG"
                className="rounded-lg border-2 border-solid border-(--foreground)"
                height={300}
                width={400}
              ></Image>
            </div>
          </div>
          <div className="relative">
            <p className="mt-2">
              <span className="text-(--default-4) text-2xl">
                {t("achievements")}:
              </span>
              {t("highschool_achievement")}
            </p>
            <div className="flex flex-row justify-between">
              <ul className="list-disc ml-3 w-4/5">
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
              <div className="flex w-1/5 justify-end items-center">
                <Image
                  height={100}
                  width={90}
                  src="/images/Medal.png"
                  alt="Medal"
                  className="rotate-[20deg]"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </SubItemFrame>
      <SubItemFrame
        title={t("University of Science VNU - HCM")}
        subtitle={
          <div>
            <h4>{t("High-Quality Information Technology")}</h4>
            <p>{t("Specializing in Software Engineering")}</p>
            <h4 className="text-(--highlight-3)">GPA: 7.79 / 10</h4>
          </div>
        }
        titleImagePath="/images/KHTN_Logo.png"
        shortDescription={[
          t("university_1"),
          t("university_2"),
          t("university_3"),
          t("university_4"),
        ]}
        period={"2020-2024"}
      >
        <div className="my-5">
          <div className="flex flex-row justify-between items-center">
            <div className="w-1/2 mr-5">
              <Image
                width={300}
                height={300}
                src="/images/KHTN.png"
                alt="KHTN"
                className="rounded-lg border-2 border-solid border-(--foreground)"
              ></Image>
            </div>
            <div className="w-2/3">
              <p>
                <span className="text-(--default-4) text-2xl">
                  {t("history")}:
                </span>
                {t("university_description_1")}
                <br />
                <Link
                  href="https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc_T%E1%BB%B1_nhi%C3%AAn,_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Qu%E1%BB%91c_gia_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ({t("source")}: Wikipedia)
                </Link>
                <br />
                {t("university_description_2")}
                <br />
                <Link
                  href="https://edurank.org/uni/ho-chi-minh-city-university-of-science/rankings/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ({t("source")}: EduRank)
                </Link>
              </p>
              <hr className="border-b-1 mt-2 border-solid border-(--foreground)" />
            </div>
          </div>
          <div className="relative my-2">
            <span className="text-(--default-4) text-2xl">
              {t("achievements")}:
            </span>
            <span className="text-[1.2rem]">
              {t("university_achievement_1")}
            </span>
            <p>{t("university_achievement_2")}</p>
            <p>{t("university_achievement_3")}</p>
            <div className="flex flex-row justify-between">
              <p className="w-3/4">{t("university_achievement_4")}</p>
              <div className="relative w-1/4">
                <Image
                  src="/images/Podium.png"
                  alt="Podium"
                  height={100}
                  width={200}
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </SubItemFrame>
    </div>
  );
}
