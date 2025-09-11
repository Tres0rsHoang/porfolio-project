import { Paging } from "@/models/paging.model";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
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
  replies: Array<RawComment>;
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
    replies: value.replies
      ? value.replies.map((rawValue) => formatRawComment(rawValue))
      : [],
  };

  return commentInfo;
};

async function fetchComments(
  { pageParam = 1 }: { pageParam?: number },
  comments: Array<Comment>,
): Promise<PageComment> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment?page=${pageParam}`,
  );

  const resBody = await res.json();
  const data = resBody.data;

  if (!Array.isArray(data)) {
    throw new Error("Invalid /api/comment responsive");
  }

  const formatedComments: Comment[] = data.map((value: RawComment) => {
    return formatRawComment(value);
  });

  const removedDuplicateComments: Comment[] = formatedComments.filter(
    (comment) => !comments.some((c) => c.id == comment.id),
  );

  const paging: Paging = resBody.paging as Paging;
  let nextPage: number | undefined = pageParam + 1;
  if (!paging || pageParam >= paging.totalPage) {
    nextPage = undefined;
  }

  return {
    comments:
      removedDuplicateComments.length == 0
        ? formatedComments
        : removedDuplicateComments,
    nextPage: nextPage,
  };
}

export default function useFetchComments() {
  const queryClient = useQueryClient();
  const commentPages = queryClient.getQueryData<{ pages: PageComment[] }>([
    "comments",
  ]);
  let comments: Array<Comment> = [];

  if (commentPages) {
    comments = commentPages.pages.flatMap((page) => page.comments);
  }

  return useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: ({ pageParam }) => fetchComments({ pageParam }, comments),
    getNextPageParam: (data) => data.nextPage,
    initialPageParam: 1,
  });
}
