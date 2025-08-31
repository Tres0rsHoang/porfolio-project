"use client";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";

interface NavButton {
  label: string;
  onClick?: () => void;
}

function NavBar() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
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
    { label: "My Code" },
    { label: "Resume" },
  ]);

  return (
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
              <h4>{buttonInfo.label.toUpperCase()}</h4>
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
              <h4>YOU</h4>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
      <div className="bg-(--background) w-full h-20 absolute"></div>
    </nav>
  );
}

export default NavBar;
