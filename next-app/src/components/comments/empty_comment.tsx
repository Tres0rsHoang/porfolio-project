import Image from "next/image";

function EmptyComment() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src="/images/EmptyComment.png"
        width={200}
        height={200}
        alt="empty-comment"
      />
    </div>
  );
}

export default EmptyComment;
