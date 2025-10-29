"use client";
import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { Loading } from "../loading/loading_full";

export const GitHubContributions = () => {
  const [loading, setLoading] = useState<boolean>(true);

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
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="bg-(--semi-highlight)
      pl-5 pb-5
      border-s-black border-3 border-r-0 
      rounded-(--border-radius) rounded-r-none relative"
    >
      <h2>My GitHub Contributions</h2>
      <GitHubCalendar
        username="Tres0rsHoang"
        colorScheme="light"
        transformData={(data) => {
          return data;
        }}
        theme={simpsonsTheme}
      />
      <p>
        *NOTE: During my time at CloudGO, all my commits went to the company’s
        GitLab. So if you don’t see much action here, don’t blame me—blame Mr.
        Burns for hiding them in the nuclear vault! 🍩
      </p>
      {loading && (
        <div
          className="w-full h-full
        absolute top-0 left-0 
        rounded-(--border-radius) rounded-r-none"
        >
          <Loading />
        </div>
      )}
    </div>
  );
};
