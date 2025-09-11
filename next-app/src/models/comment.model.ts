import { User } from "./user.model";

export type Comment = {
  id: number;
  createdDate: Date;
  content: string;
  user: User;
  parentId?: number;
  pending?: boolean;
  replies: Comment[];
};
