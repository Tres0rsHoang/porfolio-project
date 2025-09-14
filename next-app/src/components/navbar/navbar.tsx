"use client";

import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "@/helpers/i18n";

interface NavButton {
  label: string;
  onClick?: () => void;
}

function NavBar() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const { t } = useTranslation("common");
  const [navButtons] = useState<NavButton[]>([
    {
      label: "Home",
      onClick: () => {
        router.push("/");
      },
    },
    {
      label: "About",
      onClick: () => {
        router.push("/?section=about");
      },
    },
    {
      label: "Projects",
      onClick: () => {
        router.push("/project");
      },
    },
    {
      label: "Contacts",
      onClick: () => {
        router.push("/?section=contact");
      },
    },
    {
      label: "My Code",
      onClick: () => {
        router.push("/code");
      },
    },
    {
      label: "Resume",
      onClick: () => {
        router.push("/resume");
      },
    },
  ]);

  return (
    <I18nextProvider i18n={i18n}>
      <nav className="relative">
        <ul className="flex w-full justify-center">
          <AnimatePresence>
            {navButtons.map((buttonInfo) => (
              <motion.li
                onClick={buttonInfo.onClick}
                key={buttonInfo.label}
                className={styles.navItem}
                initial={{
                  y: 60,
                }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: 60,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <h5>{t(buttonInfo.label).toUpperCase()}</h5>
              </motion.li>
            ))}
            {accessToken && (
              <motion.li
                onClick={() => {
                  router.push("/profile");
                }}
                className={styles.navItem}
                initial={{
                  y: 60,
                }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: 60,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <h5>{t("You").toUpperCase()}</h5>
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
        <div className="bg-(--background) w-full h-20 absolute"></div>
      </nav>
    </I18nextProvider>
  );
}

export default NavBar;
