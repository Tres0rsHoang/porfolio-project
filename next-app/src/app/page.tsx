"use client";

import AboutMe from "../components/about_me/about_me";
import ProfileInfo from "../components/profile_info/profile_info";
import FeatureProject from "../components/project/feature_project";
import { Suspense, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AnimateSection from "@/components/animate_section";
import ContactSection from "@/components/contact/contact_section";
import CommentSection from "@/components/comments/comments_section";

export default function Home() {
  const [root, setRoot] = useState<Element | undefined>(undefined);

  useEffect(() => {
    const container = document.querySelector(".content-container");
    if (container) setRoot(container);
  }, []);

  return (
    <AnimatePresence>
      <div className="profile-info">
        <Suspense fallback={<p>Loading...</p>}>
          <AnimateSection root={root} id="profile">
            <ProfileInfo />
          </AnimateSection>
        </Suspense>
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
