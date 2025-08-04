import Image from "next/image";

type AvatarProps = {
  name: string;
  gender: boolean;
  size?: number;
};

function nameHashingAvatarPath(name: string, gender: boolean): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0; // convert to 32bit integer
  }
  const hashNumber = (Math.abs(hash) % 4) + 1;

  let defaultPath = "/images/" + (gender ? "Male" : "Female");

  switch (hashNumber) {
    case 1:
      return (defaultPath += "Avatars1.png");
    case 2:
      return (defaultPath += "Avatars2.png");
    case 3:
      return (defaultPath += "Avatars3.png");
    case 4:
      return (defaultPath += "Avatars4.png");
    default:
      return "";
  }
}

export default function Avatar({ name, gender, size = 100 }: AvatarProps) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className={`relative w-full h-full`}>
        <Image
          fill={true}
          src={nameHashingAvatarPath(name, gender)}
          alt="circle pic"
          className="rounded-full border-2 border-solid border-(--foreground)"
        ></Image>
      </div>
    </div>
  );
}
