"use client";
import { useState } from "react";
import GitHubCalendar from "react-github-calendar";

export const GitHubContributions = () => {
  const [loading] = useState<boolean>(false);
  const simpsonsTheme = {
    light: [
      "rgba(167, 216, 255, 0.2)",
      "#FADA5E",
      "#FFC30B",
      "#FF8C42",
      "#FF3B3F",
    ],
    dark: [
      "rgba(167, 216, 255, 0.3)",
      "#FADA5E",
      "#FFC30B",
      "#FF8C42",
      "#FF3B3F",
    ],
  };
  return (
    <div
      className="bg-(--semi-highlight)
      pl-5 pb-5
      border-s-black border-3 border-r-0 
      rounded-(--border-radius) rounded-r-none "
    >
      <h2>My GitHub Contributions</h2>
      <GitHubCalendar
        username="Tres0rsHoang"
        loading={loading}
        colorScheme="light"
        theme={simpsonsTheme}
      />
      <p>
        *NOTE: During my time at CloudGO, all my commits went to the company’s
        GitLab. So if you don’t see much action here, don’t blame me—blame Mr.
        Burns for hiding them in the nuclear vault! 🍩
      </p>
    </div>
  );
};
