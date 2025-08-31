import Image from "next/image";
import Link from "next/link";

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
    <div>
      <h2 className="flex flex-row justify-center items-center">Contacts</h2>
      <div className="flex flex-row justify-around">
        {contacts.map((contact, i) => {
          return (
            <Link
              key={i}
              href={contact.url}
              className="flex flex-col justify-center items-center"
            >
              <Image
                width={180}
                height={180}
                alt={`contact_icon_${contact.name}`}
                src={`/images/${contact.name}.png`}
              ></Image>
              <p>{contact.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
