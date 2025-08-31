"use client";

import { useState } from "react";

interface ErrorNotiProps {
  message?: string;
}
export const ErrorNoti = (props: ErrorNotiProps) => {
  const [showError, setShowError] = useState<boolean>(true);

  const onErrorClick = () => {
    setShowError(false);
  };

  if (!props.message || !showError) return;
  return (
    <button
      onClick={onErrorClick}
      className="text-red-500 absolute right-0 -top-9 max-w-80 rounded border-2 border-black px-2 bg-white flex flex-col justify-center items-center"
    >
      <h4>{props.message}</h4>
      <div className="bg-white w-3 h-3 border-r-black border-b-black border-t-0 border-l-0 rotate-45 border-2 absolute -bottom-2"></div>
    </button>
  );
};
