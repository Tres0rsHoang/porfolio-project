import { Paging } from "@/models/paging.model";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Comment } from "@/models/comment.model";
import { formatRawComment } from "@/components/comments/comments_section";

export interface PageComment {
  comments: Comment[];
  nextPage: number | undefined;
}

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
