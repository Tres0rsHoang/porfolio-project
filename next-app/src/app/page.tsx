"use client";

import { useSearchParams } from "next/navigation";
import AboutMe from "../components/about_me/about_me";
import ProfileInfo from "../components/profile_info/profile_info";
import FeatureProject from "../components/project/feature_project";
import CommentSection from "@/components/comments/comments_section";
import ContactSection from "@/components/contact/contact_section";
import { scrollToSection } from "@/helpers/scroll_to_section";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { authFetch } from "@/helpers/authFetch";
import { Role, User } from "@/models/user.model";
import { useUserStore } from "@/store/user.store";
import { NotificationType, useNotication } from "@/store/notification.store";
import AnimateSection from "@/components/animate_section";

export default function Home() {
  const params = useSearchParams();
  const section = params.get("section");
  const [root, setRoot] = useState<Element | undefined>(undefined);
  const { setToken } = useAuthStore();
  const { setUser } = useUserStore();
  const { addNotification } = useNotication();
  const router = useRouter();

  useEffect(() => {
    if (section) scrollToSection(section);
    const container = document.querySelector(".content-container");
    if (container) setRoot(container);
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
    <AnimatePresence>
      <div className="profile-info">
        <AnimateSection root={root} id="profile">
          <ProfileInfo />
        </AnimateSection>
        <AnimateSection root={root} id="about">
          <AboutMe />
        </AnimateSection>
        <AnimateSection root={root} id="project">
          <FeatureProject />
        </AnimateSection>
        <AnimateSection root={root} id="contact">
          <ContactSection />
        </AnimateSection>
        <AnimateSection root={root} id="comment">
          <CommentSection />
        </AnimateSection>
      </div>
    </AnimatePresence>
  );
}
