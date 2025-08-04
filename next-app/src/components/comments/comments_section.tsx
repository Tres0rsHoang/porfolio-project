"use client";
import { useEffect, useState } from "react";
import styles from "./comments_sections.module.css";
import { Comment } from "@/models/comment.model";
import { CommentFrame } from "./comment_frame";

const rawComments: Comment[] = [
  {
    id: 1,
    user: { name: "John Smith", company: "ACME Inc", gender: true },
    content: "This guy is super professional! The project was a total success!",
    createdDate: new Date("2025-07-10T10:00:00"),
  },
  {
    id: 2,
    user: { name: "Emily Nguyen", company: "GlobalTech", gender: false },
    content: "Very responsive and easy to work with. Highly recommended.",
    createdDate: new Date("2025-07-11T09:30:00"),
  },
  {
    id: 3,
    user: { name: "Carlos Martinez", company: "InnovateX", gender: true },
    content: "Delivered everything on time and went above expectations!",
    createdDate: new Date("2025-07-11T14:45:00"),
  },
  {
    id: 4,
    user: { name: "Aiko Tanaka", company: "Zen Solutions", gender: false },
    content: "Creative and committed. Would work again for sure.",
    createdDate: new Date("2025-07-12T08:20:00"),
  },
  {
    id: 5,
    user: { name: "Mohammed Al-Karim", company: "NextSoft", gender: true },
    content: "Clean code, good communication, and great teamwork.",
    createdDate: new Date("2025-07-12T17:15:00"),
  },
  {
    id: 6,
    user: { name: "Sophie Dubois", company: "CodeCraft", gender: false },
    content: "An absolute pleasure to collaborate with.",
    createdDate: new Date("2025-07-13T11:10:00"),
  },
  {
    id: 7,
    user: { name: "Nguyễn Văn Tài", company: "Công ty ABC", gender: true },
    content:
      "Tôi thật sự ấn tượng với cách bạn tiếp cận vấn đề và xử lý công việc một cách có hệ thống, rõ ràng. Từng bước đều được thực hiện một cách cẩn thận và chu đáo. Dự án được hoàn thành đúng thời hạn và vượt qua cả kỳ vọng ban đầu. Một sự hợp tác đáng nhớ và đầy hiệu quả.",
    createdDate: new Date("2025-07-13T19:00:00"),
  },
  {
    id: 8,
    user: { name: "Anna Müller", company: "SoftHaus GmbH", gender: false },
    content: "Professional and always delivers great results.",
    createdDate: new Date("2025-07-14T09:00:00"),
  },
  {
    id: 9,
    user: { name: "David O'Connor", company: "Bridgepoint Ltd.", gender: true },
    content: "Will definitely recommend to others.",
    createdDate: new Date("2025-07-14T13:30:00"),
  },
  {
    id: 10,
    user: { name: "Linh Trần", company: "Creative Minds", gender: false },
    content:
      "Nếu phải chọn một từ để miêu tả phong cách làm việc của bạn, tôi sẽ chọn từ “truyền cảm hứng”. Không chỉ hoàn thành nhiệm vụ được giao, bạn còn mang đến những góc nhìn mới mẻ, những ý tưởng sáng tạo giúp cải thiện toàn bộ quy trình. Một đối tác tuyệt vời!",
    createdDate: new Date("2025-07-14T17:45:00"),
  },
];

export default function CommentSection() {
  const [comments, setComments] = useState<Array<Comment>>([]);

  useEffect(() => {
    setComments(rawComments);
  }, []);

  return (
    <div className={styles.commentSectionContainer}>
      <div className="flex justify-between items-center">
        <h2>What people say about me...</h2>
      </div>
      <div className="h-96 w-full overflow-y-auto">
        {comments.map((comment, i) => (
          <CommentFrame comment={comment} key={i} isRight={i % 2 == 0} />
        ))}
      </div>
    </div>
  );
}
