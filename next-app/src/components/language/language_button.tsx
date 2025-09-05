import { useWindowSize } from "@/hooks/useWindowSize";
import Image from "next/image";

interface ButtonProps {
  imagePath: string;
  isSelect: boolean;
  alt: string;
  onClick?: () => void;
  className?: string;
}
export default function LanguageButton(props: ButtonProps) {
  const { width } = useWindowSize();
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      style={{
        border: props.isSelect ? "solid 3px white" : "none",
        padding: "0",
      }}
    >
      <Image
        src={props.imagePath}
        alt={props.alt}
        width={width && width < 1230 ? 50 : 80}
        height={width && width < 1230 ? 50 : 80}
      ></Image>
    </button>
  );
}
