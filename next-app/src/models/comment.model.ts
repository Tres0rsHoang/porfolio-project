export type Comment = {
  id: number;
  createdDate: Date;
  content: string;
  user: User;
  parentId?: number;
};

export type User = {
  name: string;
  company?: string;
  gender: boolean;
};
