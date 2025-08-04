import Image from "next/image";
import JobTitle from "../job_title/job_title";
import styles from "./profile_info.module.css";

function ProfileInfo() {
  return (
    <div className="relative flex col-e">
      <div className={styles.profilePicContainer}>
        <Image
          fill={true}
          src="/images/ProfilePic.jpg"
          alt="Profile Picture"
          className={styles.profilePic}
        />
      </div>
      <div className={styles.profileInfo}>
        <h1 className="">Hello, I&apos;m Bao</h1>
        <JobTitle />
        <h3>
          with a passion for knowledge and creativity, like Homer searching for
          a donut.
        </h3>
      </div>
      <Image
        width={300}
        height={300}
        src="/images/donut.png"
        alt="donut"
        className="absolute bottom-0 right-0 w-1/4 h-auto"
      />
    </div>
  );
}

export default ProfileInfo;
