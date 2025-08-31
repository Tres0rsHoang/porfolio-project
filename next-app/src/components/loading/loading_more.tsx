import Image from "next/image";
type Props = {
  size?: number;
  isShow: boolean;
};
export const LoadingDonuts: React.FC<Props> = ({
  size = 80,
  isShow = false,
}) => {
  if (!isShow) return;

  return (
    <div className="flex flex-row justify-center loading-dots">
      <div>
        <Image
          src="/images/donut.png"
          alt="donut"
          width={size}
          height={size}
        ></Image>
      </div>
      <div>
        <Image
          src="/images/donut.png"
          alt="donut"
          width={size}
          height={size}
        ></Image>
      </div>
      <div>
        <Image
          src="/images/donut.png"
          alt="donut"
          width={size}
          height={size}
        ></Image>
      </div>
    </div>
  );
};
