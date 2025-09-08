import { Paging } from "@/models/paging.model";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Comment } from "@/models/comment.model";

export interface PageComment {
  comments: Comment[];
  nextPage: number | undefined;
}

export interface RawComment {
  user: {
    id: number;
    name: string;
    company: string;
    gender: boolean;
  };
  id: number;
  createAt: string;
  content: string;
}

export const formatRawComment = (value: RawComment): Comment => {
  const commentInfo: Comment = {
    id: +value.id,
    content: value.content,
    createdDate: new Date(value.createAt),
    user: {
      id: value.user.id,
      name: value.user.name,
      company: value.user.company,
      gender: value.user.gender,
    },
  };
  return commentInfo;
};

async function fetchComments({ pageParam = 1 }): Promise<PageComment> {
  let nextPage: number | undefined = pageParam + 1;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment?page=${pageParam}`,
  );

  const resBody = await res.json();
  const data = resBody.data;
  const paging: Paging = resBody.paging as Paging;

  if (!paging || pageParam >= paging.totalPage) {
    nextPage = undefined;
  }
  if (!Array.isArray(data)) {
    throw new Error("Invalid /api/comment responsive");
  }
  const formatedComments: Comment[] = data.map((value) => {
    return formatRawComment(value);
  });
  return { comments: formatedComments, nextPage: nextPage };
}

export default function useFetchComments() {
  return useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
    getNextPageParam: (data) => data.nextPage,
    initialPageParam: 1,
  });
}
