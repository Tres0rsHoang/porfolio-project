import { NotificationType, useNotication } from "@/store/notification.store";
import Image from "next/image";
import { useTranslation } from "react-i18next";

type Contact = {
  name: string;
  onClick?: () => void;
};

export default function ContactSection() {
  const { addNotification } = useNotication();
  const { t } = useTranslation(["common", "home"]);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      addNotification(
        t("copied", { content: content }),
        NotificationType.SUCCESS,
      );
    } catch (err) {
      console.error(err);
      addNotification(t("copy_failed"), NotificationType.ERROR);
    }
  };

  const contacts: Contact[] = [
    {
      name: "Gmail",
      onClick: () => {
        handleCopy("hqbao10012002@gmail.com");
      },
    },
    {
      name: "Github",
      onClick: () => {
        window.open(
          "https://github.com/Tres0rsHoang",
          "_blank",
          "noopener,noreferrer",
        );
      },
    },
    {
      name: "Facebook",
      onClick: () => {
        window.open(
          "https://facebook.com/Tres0rs/",
          "_blank",
          "noopener,noreferrer",
        );
      },
    },
    {
      name: "Linkedin",
      onClick: () => {
        window.open(
          "https://www.linkedin.com/in/hoangquocbao/",
          "_blank",
          "noopener,noreferrer",
        );
      },
    },
    {
      name: "Leetcode",
      onClick: () => {
        window.open(
          "https://leetcode.com/u/baokyo002/",
          "_blank",
          "noopener,noreferrer",
        );
      },
    },
  ];
  return (
    <div>
      <h2 className="flex flex-row justify-center items-center">
        {t("contacts", { ns: "home" })}
      </h2>
      <div className="flex flex-row justify-around">
        {contacts.map((contact, i) => {
          return (
            <button
              key={i}
              onClick={contact.onClick}
              className="flex flex-col justify-center items-center"
              style={{
                border: 0,
                padding: 0,
              }}
            >
              <Image
                width={180}
                height={180}
                alt={`contact_icon_${contact.name}`}
                src={`/images/${contact.name}.png`}
              ></Image>
              <p>{contact.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
