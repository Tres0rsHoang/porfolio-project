import { Comment } from "@/models/comment.model";
import styles from "./comments_sections.module.css";
import Image from "next/image";
import Avatar from "../avatars/avatar";

type CommentFrameProps = {
  comment: Comment;
  isRight?: boolean;
};

export const CommentFrame = ({
  comment,
  isRight = true,
}: CommentFrameProps) => {
  const formattedDate = comment.createdDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isRight)
    return (
      <div className="relative pb-5 pr-16 flex flex-row justify-end">
        <div className={`${styles.commentBox} relative`}>
          <p className="text-end">&quot;{comment.content}&quot;</p>
          <h3>{comment.user.name}</h3>
          <h4>{comment.user.company}</h4>
          <div className="text-end pr-7">{formattedDate}</div>
          <div className="absolute -bottom-[28px] right-16">
            <Image
              alt="right-tail"
              src="/images/RightCommentTail.png"
              width={32}
              height={32}
            ></Image>
          </div>
          <div className="absolute -bottom-16 -right-16">
            <Avatar
              name={comment.user.name}
              gender={comment.user.gender}
              size={125}
            ></Avatar>
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative pb-5 pl-16 flex flex-row justify-start">
      <div className={`${styles.commentBox} relative`}>
        <p className="text-start">&quot;{comment.content}&quot;</p>
        <h3 className="text-end">{comment.user.name}</h3>
        <h4 className="text-end">{comment.user.company}</h4>
        <div className="text-start pl-7">{formattedDate}</div>
        <div className="absolute -bottom-[28px] left-16">
          <Image
            alt="right-tail"
            src="/images/RightCommentTail.png"
            width={32}
            height={32}
            className="scale-x-[-1]"
          ></Image>
        </div>
        <div className="absolute -bottom-16 -left-16">
          <Avatar
            name={comment.user.name}
            gender={comment.user.gender}
            size={125}
          ></Avatar>
        </div>
      </div>
    </div>
  );
};
