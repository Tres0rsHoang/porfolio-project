import Image from "next/image";

type Contact = {
  name: string;
  url: string;
};
const contacts: Contact[] = [
  {
    name: "Gmail",
    url: "",
  },
  {
    name: "Github",
    url: "",
  },
  {
    name: "Facebook",
    url: "",
  },
  {
    name: "Linkedin",
    url: "",
  },
  {
    name: "Leetcode",
    url: "",
  },
];

export default function ContactSection() {
  return (
    <div className="flex flex-row justify-center items-center">
      {contacts.map((contact, i) => {
        return (
          <div key={i}>
            <Image
              width={180}
              height={180}
              alt={`contact_icon_${contact.name}`}
              src={`/images/${contact.name}.png`}
            ></Image>
          </div>
        );
      })}
    </div>
  );
}
