import Image from "next/image";
import styles from "../components/about_me/about_me.module.css";

export default function Education() {
  return (
    <div>
      <h2>Education</h2>
      <div className="flex flex-row justify-around">
        <p className={styles.verticalTimeText}>2017 - 2020</p>
        <div>
          <div className="flex flex-row justify-between">
            <div className="w-1/2 pr-5">
              <h3>Tien Giang High School for Gifted</h3>
              <p className="mb-2">
                Information Technology Major
                <br />
                12 years of excellent student
              </p>
              <hr className="border-b-1 border-solid border-(--foreground)" />
              <p className="my-2">
                History: This is a public high school located in Tien Giang
                Province. Officially established in 1995, the school has been a
                leading institution in the province, the Mekong Delta region,
                and even the entire southern region of Vietnam in terms of both
                educational quality and student union activities.
                <br />
                <a href="https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_Trung_h%E1%BB%8Dc_ph%E1%BB%95_th%C3%B4ng_chuy%C3%AAn_Ti%E1%BB%81n_Giang">
                  (Source: Wikipedia)
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
          <div className="relative my-2">
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
              Achievements: It was at this school that I was first introduced to
              programming and where I learned the majority of my foundational
              algorithms — including graph theory, pathfinding, dynamic
              programming, searching, and more. This solid groundwork equipped
              me with strong problem-solving skills in programming, as well as
              the ability to think creatively when approaching complex
              challenges. During my time at the school, I actively participated
              in numerous programming competitions and was honored with various
              awards and medals. Notable achievements among others include:
            </p>
            <ul>
              <li>
                <p>A silver medal at the Southern Summer Camp</p>
              </li>
              <li>
                <p>First prize in the City-Level Innovation Contest</p>
              </li>
              <li>
                <p>Third place in the Provincial Informatics Olympiad</p>
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
              <h3>University of Science VNU - HCM</h3>
              <p className="mb-2">
                High-Quality Information Technology
                <br />
                (Specializing in Software Engineering)
                <br />
                GPA: 7.79 / 10
              </p>
              <hr className="border-b-1 border-solid border-(--foreground)" />
              <p className="my-2">
                History: This university is a leading institution in Southern
                Vietnam for education, scientific research, technology, and
                applied sciences. It is a member of the Vietnam National
                University, Ho Chi Minh City and is recognized as one of the
                country&apos;s key national universities.
                <br />
                <a href="https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc_T%E1%BB%B1_nhi%C3%AAn,_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Qu%E1%BB%91c_gia_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh">
                  (Source: Wikipedia)
                </a>
                <br />
                The university ranks 4th in Ho Chi Minh City and 9th nationwide
                for overall teaching quality.
                <br />
                <a href="https://edurank.org/uni/ho-chi-minh-city-university-of-science/rankings/">
                  (Source: EduRank)
                </a>
              </p>
              <hr className="border-b-1 border-solid border-(--foreground)" />
            </div>
          </div>
          <div className="relative my-2">
            <p>Achievements:</p>
            <p>
              One of the first questions that may arise when looking at my
              academic record is why my overall GPA is only at a “good” level
              rather than “excellent,” especially given my strong foundation in
              programming from high school. And it’s a fair question.
            </p>
            <p>
              While I entered university with solid programming skills, I found
              myself challenged by several general education subjects such as
              philosophy, physics, economics, and law — areas that are not my
              strengths. At my university, however, these subjects are mandatory
              components of the curriculum. As a result, my grades in these
              courses were often just enough to pass (typically around 5 or 6
              out of 10), which significantly affected my overall GPA.
            </p>
            <p>
              That said, I take great pride in my performance in all
              programming-related courses, where I consistently scored above 8.
              Additionally, I achieved high marks in project management, soft
              skills, and my internship evaluation. These strong performances
              helped bring my overall GPA up to 7.79.
            </p>
            <p>
              What I’m most proud of during my four years at university is that
              my graduation thesis received the highest score (9.4/10) among all
              student projects that year. More importantly, university was where
              I honed my abilities and learned how to apply my knowledge to
              real-world problems — enabling me to create the best possible
              products I could deliver.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
