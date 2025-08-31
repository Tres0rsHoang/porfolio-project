"use client";

import { useEffect, useState } from "react";
import styles from "./job_title.module.css";

const texts = [
  "A Fullstack Engineer",
  "A Code Learner",
  "A Tech Explorer",
  "A Digital Craftsman",
  "A System Dreamer",
];
function JobTitle() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const fullText = texts[textIndex];
    const delayTime = 1000; //1 second to show the text

    if (isDeleting) {
      setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setTypingSpeed(50);
      }, typingSpeed);
    } else {
      setTimeout(() => {
        setDisplayText((prev) => fullText.slice(0, prev.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && displayText === fullText) {
      setTimeout(() => setIsDeleting(true), delayTime);
    } else if (isDeleting && displayText === "") {
      setTimeout(() => {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 500);
    }
  }, [typingSpeed, displayText, isDeleting, textIndex]);

  return (
    <h2>
      {displayText}
      <span
        className={`border-r-2 border-white ${styles.animateBlick} ml-1`}
      ></span>
    </h2>
  );
}

export default JobTitle;
