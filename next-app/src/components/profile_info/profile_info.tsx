"use client";
import Image from "next/image";
import JobTitle from "../job_title/job_title";
import styles from "./profile_info.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import { useAuthStore } from "@/store/auth.store";
import { NotificationType, useNotication } from "@/store/notification.store";
import { scrollToSection } from "@/helpers/scroll_to_section";
import { useEffect } from "react";
import { Role, User } from "@/models/user.model";
import { authFetch } from "@/helpers/api";

function ProfileInfo() {
  const params = useSearchParams();
  const section = params.get("section");
  const { setToken } = useAuthStore();
  const { setUser } = useUserStore();
  const { addNotification } = useNotication();
  const router = useRouter();

  useEffect(() => {
    if (section) scrollToSection(section);
  }, [section]);

  useEffect(() => {
    const accessToken = params.get("access_token");
    const linkAccount = params.get("linked");
    if (!accessToken) return;
    setToken(accessToken);
    if (linkAccount) {
      addNotification(
        "Link your comment to this account successfully!!!",
        NotificationType.SUCCESS,
      );
    }

    const userFetch = async () => {
      const res = await authFetch("/auth");
      const userRes = await res.json();

      const user: User = {
        id: userRes.id ?? 0,
        company: userRes.company ?? "",
        name: userRes.name ?? "",
        gender: userRes.gender ?? "",
        role: userRes.roles[0] as Role,
      };

      setUser(user);
      router.push("/");
      const currentTime: Date = new Date();
      const hour = currentTime.getHours();
      let greeting = "Hi";

      if (6 <= hour && hour < 14) {
        greeting = "Good Morning";
      }
      if (14 <= hour && hour < 18) {
        greeting = "Good Afternoon";
      }
      if (18 <= hour && hour <= 24) {
        greeting = "Good Evening";
      }
      if (0 <= hour && hour < 6) {
        greeting = "Good Night";
      }
      addNotification("Login Successfully!!!", NotificationType.SUCCESS);
      addNotification(`${greeting}, ${user.name}`);
    };
    userFetch();
  }, [setToken, setUser, addNotification, router, params]);

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
